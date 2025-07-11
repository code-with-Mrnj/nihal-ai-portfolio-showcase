import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "My Journey into AI and Machine Learning",
    excerpt: "Reflecting on my path from curiosity to expertise in artificial intelligence, the challenges faced, and the exciting projects that shaped my understanding of this transformative field.",
    category: "Career Journey",
    date: "2024-12-15",
    readTime: "5 min read",
    featured: true,
    tags: ["AI", "Career", "Learning"],
    status: "published"
  },
  {
    id: 2,
    title: "Lessons from Building 17+ Data Science Projects",
    excerpt: "Key insights and practical lessons learned while developing diverse projects ranging from cryptocurrency prediction to sign language detection systems.",
    category: "Technical Insights",
    date: "2024-12-10",
    readTime: "8 min read",
    featured: true,
    tags: ["Data Science", "Projects", "Experience"],
    status: "draft"
  },
  {
    id: 3,
    title: "The Future of Cross-Lingual NLP Systems",
    excerpt: "Exploring the challenges and opportunities in building NLP systems that work across multiple languages, based on my recent project experience.",
    category: "Technology Trends",
    date: "2024-12-05",
    readTime: "6 min read",
    featured: false,
    tags: ["NLP", "Technology", "Innovation"],
    status: "draft"
  }
];

export function Blog() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

  return (
    <section id="blog" className="py-20 bg-portfolio-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-portfolio-text mb-4 text-center">
            <span className="text-portfolio-accent">Blog</span> & Insights
          </h2>
          <p className="text-lg text-portfolio-text-muted text-center mb-12 max-w-3xl mx-auto">
            Sharing my thoughts, experiences, and insights from my journey in AI, data science, 
            and software development. Stay tuned for more content!
          </p>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-portfolio-text mb-8">Featured Posts</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="bg-portfolio-surface border-portfolio-border hover:border-portfolio-accent transition-all duration-300 hover:shadow-glow group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-portfolio-accent text-portfolio-bg">
                          {post.category}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`border-portfolio-border ${
                            post.status === 'published' 
                              ? 'text-green-400 border-green-400' 
                              : 'text-yellow-400 border-yellow-400'
                          }`}
                        >
                          {post.status}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-bold text-portfolio-text mb-3 group-hover:text-portfolio-accent transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-portfolio-text-muted mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center text-portfolio-text-muted text-sm mb-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="border-portfolio-border text-portfolio-text-muted">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                        disabled={post.status === 'draft'}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        {post.status === 'published' ? 'Read Post' : 'Coming Soon'}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Other Posts */}
          {otherPosts.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-portfolio-text mb-8">More Articles</h3>
              <div className="space-y-4">
                {otherPosts.map((post) => (
                  <Card key={post.id} className="bg-portfolio-surface border-portfolio-border hover:border-portfolio-accent transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <Badge className="bg-portfolio-accent text-portfolio-bg mr-3">
                              {post.category}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`border-portfolio-border ${
                                post.status === 'published' 
                                  ? 'text-green-400 border-green-400' 
                                  : 'text-yellow-400 border-yellow-400'
                              }`}
                            >
                              {post.status}
                            </Badge>
                          </div>
                          <h4 className="text-lg font-semibold text-portfolio-text mb-2">{post.title}</h4>
                          <p className="text-portfolio-text-muted text-sm mb-2">{post.excerpt}</p>
                          <div className="flex items-center text-portfolio-text-muted text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-portfolio-bg"
                            disabled={post.status === 'draft'}
                          >
                            {post.status === 'published' ? 'Read' : 'Soon'}
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-portfolio-surface border border-portfolio-border rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-portfolio-text mb-4">Stay Updated</h3>
              <p className="text-portfolio-text-muted mb-6 max-w-2xl mx-auto">
                More articles coming soon! I'll be sharing insights about my latest projects, 
                learning experiences, and thoughts on the evolving landscape of AI and data science.
              </p>
              <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <BookOpen className="h-4 w-4 mr-2" />
                Subscribe for Updates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
