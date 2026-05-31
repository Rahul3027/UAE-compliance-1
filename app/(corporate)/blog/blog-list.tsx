'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import { BlogPost } from '@/data/cms-content';

interface BlogListProps {
  blogs: BlogPost[];
}

export function BlogList({ blogs }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Updates' | 'Technical' | 'Compliance'>('All');

  // Filter articles based on search and category
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      const matchesSearch = 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [blogs, searchQuery, selectedCategory]);

  // Spotlight / Featured article is the first one in the list (or fallback)
  const featuredBlog = blogs[0];
  // Other blogs for the grid (excluding featured if search is empty, otherwise show all matching in grid)
  const gridBlogs = useMemo(() => {
    if (searchQuery || selectedCategory !== 'All') {
      return filteredBlogs;
    }
    return filteredBlogs.slice(1);
  }, [filteredBlogs, searchQuery, selectedCategory]);

  const categories = ['All', 'Updates', 'Technical', 'Compliance'] as const;

  return (
    <div className="space-y-12">
      {/* 1. Featured Spotlight Article (Only visible when no search query/filters are active) */}
      {!searchQuery && selectedCategory === 'All' && featuredBlog && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group relative rounded-3xl border border-border bg-card/60 overflow-hidden hover:border-primary/50 transition-all shadow-xl"
        >
          {/* Decorative ambient backdrop */}
          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none group-hover:bg-accent/10 transition-colors" />

          <Link href={`/blog/${featuredBlog.slug}`} className="block p-8 md:p-10">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              {/* Image simulation / Visual decoration */}
              <div className="md:col-span-5 h-56 md:h-64 rounded-2xl bg-gradient-to-br from-[#0d1117] to-muted/30 border border-border/60 p-6 flex flex-col justify-between relative overflow-hidden group-hover:border-primary/30 transition-all">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary to-accent" />
                <span className="text-[9px] font-mono text-accent uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded-full w-max">
                  Featured Guide
                </span>
                
                <div className="space-y-2">
                  <div className="w-12 h-1.5 rounded-full bg-muted/40" />
                  <div className="w-24 h-1.5 rounded-full bg-muted/20" />
                  <div className="w-16 h-1.5 rounded-full bg-muted/30" />
                </div>
                
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-4 border-t border-border/40">
                  <span>PINT AE COMPLIANT</span>
                  <span>VERSION 1.0.2</span>
                </div>
              </div>

              {/* Featured metadata & description */}
              <div className="md:col-span-7 space-y-4 flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    {featuredBlog.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredBlog.date}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredBlog.readTime}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight group-hover:text-primary transition-colors leading-tight">
                  {featuredBlog.title}
                </h2>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {featuredBlog.excerpt}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-border/45 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-xs">
                      {featuredBlog.author.charAt(0)}
                    </div>
                    <span className="text-xs font-semibold text-foreground">{featuredBlog.author}</span>
                  </div>
                  <span className="inline-flex items-center text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    Read Article <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* 2. Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-muted/10 p-4 border border-border/80 rounded-2xl">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles & authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border/85 rounded-full pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all shrink-0 focus:outline-none ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-border/85 text-muted-foreground hover:text-foreground hover:border-border-light-hover'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Blog List Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {gridBlogs.length > 0 ? (
            gridBlogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                layout="position"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative rounded-3xl border border-border bg-card/45 hover:border-primary/50 transition-all flex flex-col justify-between overflow-hidden shadow-sm"
              >
                <Link href={`/blog/${blog.slug}`} className="block p-6 md:p-8 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/15">
                        {blog.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                        <Calendar className="w-3 h-3" />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                        <Clock className="w-3 h-3" />
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                      {blog.title}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-border/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-[10px]">
                        {blog.author.charAt(0)}
                      </div>
                      <span className="text-xs font-semibold text-foreground">{blog.author}</span>
                    </div>
                    <span className="inline-flex items-center text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                      Read <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 py-16 border border-dashed border-border rounded-3xl text-center space-y-2">
              <span className="text-lg">🔍</span>
              <h4 className="text-sm font-bold">No articles found</h4>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                No compliance articles match "{searchQuery}" under category "{selectedCategory}".
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
