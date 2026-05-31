import { getBlogs } from '@/lib/supabase/db';
import { BlogList } from './blog-list';
import { BookOpen } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

export default async function BlogPage() {
  const blogsData = await getBlogs();

  return (
    <main className="flex-1 pb-24 overflow-hidden">
      {/* Premium Hero Header Section */}
      <section className="relative py-20 md:py-28 overflow-hidden border-b border-border bg-muted/5">
        {/* Dynamic ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 blur-[80px] rounded-[100%]" />
        </div>
        
        <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:32px_32px] pointer-events-none mask-image-radial" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
            <BookOpen className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Technical Insights
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/60 leading-tight">
            Latest Mandates & Technical Updates
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Stay ahead of the curve with our expert analysis of the latest PEPPOL regulations, UBL schemas, and mapping requirements from the UAE FTA and Oman OTA.
          </p>
        </div>
      </section>

      {/* Blog list area */}
      <section className="max-w-5xl mx-auto px-6 pt-16 relative z-10">
        <BlogList blogs={blogsData} />
      </section>
    </main>
  );
}
