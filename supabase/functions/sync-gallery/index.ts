/**
 * Sync Gallery Edge Function
 * 
 * Security Notes:
 * - verify_jwt is disabled in config.toml to allow custom authorization logic
 * - This function manually verifies JWT and requires admin role
 * - DO NOT REMOVE the authorization checks below
 * - CORS is restricted to allowed origins for additional security
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Allowed origins for CORS - restrict to known domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:8080',
  'https://id-preview--773f37ba-56bf-4259-bdd7-c43753aff9ae.lovable.app',
  'https://nihal-ai-portfolio-showcase.lovable.app',
]

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0]
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
}

interface StorageObject {
  name: string
  id: string
  created_at: string
}

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin')
  const corsHeaders = getCorsHeaders(origin)

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Verify user is admin - manual JWT verification
    // This is required because verify_jwt is disabled for custom auth flow
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      console.log('Missing authorization header')
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const token = authHeader.replace('Bearer ', '').trim()
    
    // Validate token format before calling API
    if (!token || token.length < 20) {
      console.log('Invalid token format')
      return new Response(JSON.stringify({ error: 'Invalid token format' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      console.log('Auth error:', authError?.message || 'No user found')
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Check if user is admin
    const { data: isAdmin } = await supabase.rpc('has_role', { 
      _user_id: user.id, 
      _role: 'admin' 
    })

    if (!isAdmin) {
      console.log('User is not admin:', user.id)
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log('Starting gallery sync...')

    // Get existing images in database to avoid duplicates
    const { data: existingItems } = await supabase
      .from('gallery_items')
      .select('image_url')

    const existingUrls = new Set(existingItems?.map(item => item.image_url) || [])
    console.log(`Found ${existingUrls.size} existing gallery items`)

    // List all files in the gallery bucket recursively
    const allFiles: { path: string; created_at: string }[] = []
    
    // Helper function to list files in a folder
    async function listFilesInFolder(folder: string = '') {
      const { data: files, error } = await supabase.storage
        .from('gallery')
        .list(folder, { limit: 1000 })

      if (error) {
        console.error(`Error listing folder ${folder}:`, error)
        return
      }

      for (const file of files || []) {
        const fullPath = folder ? `${folder}/${file.name}` : file.name
        
        // Check if it's a folder (no metadata means it's a folder)
        if (!file.metadata) {
          await listFilesInFolder(fullPath)
        } else if (file.name.match(/\.(jpg|jpeg|png|gif|webp|mp4|mov|webm)$/i)) {
          allFiles.push({ 
            path: fullPath, 
            created_at: file.created_at 
          })
        }
      }
    }

    await listFilesInFolder()
    console.log(`Found ${allFiles.length} media files in storage`)

    // Process each file
    const newItems: any[] = []
    let displayOrder = existingItems?.length || 0

    for (const file of allFiles) {
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/gallery/${file.path}`
      
      // Skip if already exists
      if (existingUrls.has(publicUrl)) {
        console.log(`Skipping existing: ${file.path}`)
        continue
      }

      // Parse metadata from path
      const pathParts = file.path.split('/')
      const filename = pathParts[pathParts.length - 1]
      const folderPath = pathParts.slice(0, -1).join('/')

      // Extract category and location from folder structure
      let category = 'Highlight'
      let location = ''
      let tags: string[] = []

      if (folderPath.toLowerCase().includes('hackathon') || folderPath.toLowerCase().includes('hackthon')) {
        category = 'Hackathon'
        tags.push('hackathon', 'competition')
        
        // Extract location from folder name
        if (folderPath.toLowerCase().includes('jaipur') || folderPath.toLowerCase().includes('acehack')) {
          location = 'Jaipur, India'
          tags.push('acehack')
        } else if (folderPath.toLowerCase().includes('mumbai') || folderPath.toLowerCase().includes('mumba')) {
          location = 'Mumbai, India'
        } else if (folderPath.toLowerCase().includes('dehradun')) {
          location = 'Dehradun, India'
          tags.push('national-level')
        }
      } else if (folderPath.toLowerCase().includes('project')) {
        category = 'Project'
        tags.push('project', 'development')
      } else if (folderPath.toLowerCase().includes('learning') || folderPath.toLowerCase().includes('certificate')) {
        category = 'Learning'
        tags.push('learning', 'growth')
      }

      // Determine media type
      const isVideo = filename.match(/\.(mp4|mov|webm)$/i)
      const mediaType = isVideo ? 'video' : 'image'

      // Clean up title from filename
      const title = filename
        .replace(/\.(jpg|jpeg|png|gif|webp|mp4|mov|webm)$/i, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
        .trim() || 'Gallery Item'

      // Extract date
      const dateMatch = file.created_at ? new Date(file.created_at) : new Date()
      const formattedDate = dateMatch.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      })

      newItems.push({
        title,
        category,
        date: formattedDate,
        location: location || 'India',
        description: `${category} - ${title}`,
        image_url: publicUrl,
        tags,
        display_order: displayOrder++,
        media_type: mediaType
      })
    }

    console.log(`Inserting ${newItems.length} new items`)

    // Insert new items
    if (newItems.length > 0) {
      const { error: insertError } = await supabase
        .from('gallery_items')
        .insert(newItems)

      if (insertError) {
        console.error('Insert error:', insertError)
        return new Response(JSON.stringify({ 
          error: 'Failed to insert items', 
          details: insertError.message 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Synced ${newItems.length} new media files`,
      total_in_storage: allFiles.length,
      already_synced: existingUrls.size,
      newly_added: newItems.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Sync error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
