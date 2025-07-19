import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface BlogPost {
  title: string;
  date: string;
  url: string;
  excerpt: string;
  image?: string;
}

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000 })]);

  useEffect(() => {
    fetch('/data/blog-posts.json')
      .then(response => response.json())
      .then(data => {
        // Add default images to blog posts
        const postsWithImages = data.map((post: BlogPost, index: number) => ({
          ...post,
          image: post.image || `/placeholder.svg?height=200&width=400&text=Blog+${index + 1}`
        }));
        setBlogPosts(postsWithImages);
      })
      .catch(error => console.error('Error loading blog posts:', error));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="blog" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Latest Updates
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Stay informed about NEAR Infrastructure Committee developments, RFPs, and ecosystem updates.
          </p>
          <Button
            asChild
            variant="outline"
            className="border-near-200 text-near-700 hover:bg-near-50"
          >
            <a
              href="https://www.near.org/blog/category/Infrastructure%20Committee"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              View all articles
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>

        {/* Blog Posts Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {blogPosts.map((post, index) => (
              <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4">
                <Card 
                  className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                  onClick={() => window.open(post.url, '_blank')}
                >
                  {/* Blog Image */}
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-near-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;