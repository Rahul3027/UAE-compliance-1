import { getBlogBySlug, getBlogs } from '@/lib/supabase/db';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every minute

export async function generateStaticParams() {
  const allBlogs = await getBlogs();
  return allBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="flex-1 pb-24">
      <article className="max-w-3xl mx-auto px-6 pt-24">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to all insights
        </Link>
        
        <header className="space-y-6 mb-12">
          <div className="flex items-center gap-3">
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
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-3 pt-6 border-t border-border/50">
            <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center font-bold">
              {blog.author.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-foreground">{blog.author}</p>
              <p className="text-xs text-muted-foreground">Compliance Intelligence Team</p>
            </div>
          </div>
        </header>

        <div className="prose prose-invert prose-primary max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {blog.excerpt}
          </p>
          <div className="text-muted-foreground leading-loose text-sm space-y-4">
            {/* In a real CMS, this would be parsed markdown or rich text */}
            {blog.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
