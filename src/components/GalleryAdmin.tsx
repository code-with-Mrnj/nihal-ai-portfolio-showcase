import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { toast } from "@/hooks/use-toast";
import { Trash2, Plus, Upload, X, Edit2, Save, RefreshCw } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  image_url: string;
  tags: string[];
  display_order: number;
}

const defaultFormData = {
  title: "",
  category: "Project",
  date: new Date().getFullYear().toString(),
  location: "",
  description: "",
  tags: "",
};

export function GalleryAdmin() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(defaultFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const { data: galleryItems = [], isLoading } = useQuery({
    queryKey: ["gallery-items-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as GalleryItem[];
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!imageFile && !editingId) {
        throw new Error("Please select an image");
      }

      setIsUploading(true);
      
      let imageUrl = editingId 
        ? galleryItems.find(item => item.id === editingId)?.image_url || ""
        : "";

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const tagsArray = formData.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const itemData = {
        title: formData.title,
        category: formData.category,
        date: formData.date,
        location: formData.location,
        description: formData.description,
        image_url: imageUrl,
        tags: tagsArray,
        display_order: editingId 
          ? galleryItems.find(item => item.id === editingId)?.display_order || 0
          : galleryItems.length,
      };

      if (editingId) {
        const { error } = await supabase
          .from("gallery_items")
          .update(itemData)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("gallery_items")
          .insert(itemData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery-items-admin"] });
      queryClient.invalidateQueries({ queryKey: ["gallery-items"] });
      toast({
        title: editingId ? "Item updated!" : "Item added!",
        description: editingId 
          ? "Gallery item has been updated successfully."
          : "New gallery item has been added successfully.",
      });
      resetForm();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("gallery_items")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery-items-admin"] });
      queryClient.invalidateQueries({ queryKey: ["gallery-items"] });
      toast({
        title: "Deleted!",
        description: "Gallery item has been removed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

  const handleEdit = (item: GalleryItem) => {
    setFormData({
      title: item.title,
      category: item.category,
      date: item.date,
      location: item.location,
      description: item.description,
      tags: item.tags.join(", "),
    });
    setImagePreview(item.image_url);
    setEditingId(item.id);
  };

  const handleSyncFromStorage = async () => {
    setIsSyncing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Error",
          description: "You must be logged in to sync.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('sync-gallery', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      toast({
        title: "Sync Complete!",
        description: `Added ${data.newly_added} new images from storage.`,
      });

      queryClient.invalidateQueries({ queryKey: ["gallery-items-admin"] });
      queryClient.invalidateQueries({ queryKey: ["gallery-items"] });
    } catch (error: any) {
      toast({
        title: "Sync Failed",
        description: error.message || "Failed to sync from storage.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const categories = ["Hackathon", "Project", "Team", "Achievement", "Learning", "Event"];

  return (
    <div className="space-y-8">
      {/* Add/Edit Form */}
      <Card className="bg-portfolio-surface border-portfolio-border">
        <CardHeader>
          <CardTitle className="text-portfolio-text flex items-center gap-2">
            {editingId ? <Edit2 className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            {editingId ? "Edit Gallery Item" : "Add New Gallery Item"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-portfolio-text">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., AI/ML Hackathon Winner"
                className="bg-portfolio-bg border-portfolio-border text-portfolio-text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-portfolio-text">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-10 px-3 rounded-md bg-portfolio-bg border border-portfolio-border text-portfolio-text"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-portfolio-text">Date/Year</Label>
              <Input
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="e.g., 2024"
                className="bg-portfolio-bg border-portfolio-border text-portfolio-text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-portfolio-text">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Tech Conference Delhi"
                className="bg-portfolio-bg border-portfolio-border text-portfolio-text"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-portfolio-text">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the moment..."
              className="bg-portfolio-bg border-portfolio-border text-portfolio-text"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-portfolio-text">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., AI, Machine Learning, Winner"
              className="bg-portfolio-bg border-portfolio-border text-portfolio-text"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-portfolio-text">Image</Label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 bg-portfolio-bg border border-portfolio-border rounded-md cursor-pointer hover:border-portfolio-accent transition-colors">
                <Upload className="h-4 w-4 text-portfolio-text-muted" />
                <span className="text-portfolio-text-muted text-sm">
                  {imageFile ? imageFile.name : "Choose image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  <button
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => createMutation.mutate()}
              disabled={isUploading || !formData.title || !formData.description}
              className="bg-portfolio-accent hover:bg-portfolio-accent/80 text-portfolio-bg"
            >
              {isUploading ? (
                "Uploading..."
              ) : editingId ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Item
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </>
              )}
            </Button>
            {editingId && (
              <Button
                onClick={resetForm}
                variant="outline"
                className="border-portfolio-border text-portfolio-text hover:bg-portfolio-surface"
              >
                Cancel Edit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Existing Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-portfolio-text">
            Gallery Items ({galleryItems.length})
          </h3>
          <Button
            onClick={handleSyncFromStorage}
            disabled={isSyncing}
            variant="outline"
            className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent/10"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync from Storage'}
          </Button>
        </div>
        
        {isLoading ? (
          <p className="text-portfolio-text-muted">Loading...</p>
        ) : galleryItems.length === 0 ? (
          <p className="text-portfolio-text-muted">No gallery items yet. Add your first one above!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <Card key={item.id} className="bg-portfolio-bg border-portfolio-border overflow-hidden">
                <div className="aspect-video bg-portfolio-surface">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-medium text-portfolio-text mb-1">{item.title}</h4>
                  <p className="text-sm text-portfolio-text-muted mb-2">{item.category}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      className="flex-1 border-portfolio-border text-portfolio-text hover:bg-portfolio-surface"
                    >
                      <Edit2 className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(item.id)}
                      className="flex-1"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
