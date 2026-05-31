import { getBlogs } from '@/lib/supabase/db';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

export default async function BlogPage() {
  const blogsData = await getBlogs();

  return (
    <main className="flex-1 pb-24">
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="text-sm font-mono uppercase tracking-widest text-primary font-semibold mb-4 block">
            Compliance Insights
          </span>
          <h1 className="apple-h1 leading-tight">
            Latest Mandates & Technical Updates
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Stay ahead of the curve with our expert analysis of the latest PEPPOL regulations from the UAE FTA and Oman OTA.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pt-16">
        <div className="grid md:grid-cols-2 gap-8">
          {blogsData.map((blog) => (
            <Link 
              key={blog.id} 
              href={`/blog/${blog.slug}`}
              className="group p-8 rounded-2xl bg-muted/5 border border-border hover:border-primary/50 transition-colors flex flex-col gap-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-1 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {blog.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  {blog.date}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  {blog.readTime}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{blog.title}</h3>
              <p className="text-muted-foreground leading-relaxed flex-1 text-sm">{blog.excerpt}</p>
              
              <div className="pt-4 mt-2 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-xs">
                    {blog.author.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{blog.author}</span>
                </div>
                <div className="inline-flex items-center text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  Read Article <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
