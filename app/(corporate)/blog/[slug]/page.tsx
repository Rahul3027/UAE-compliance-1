import { getBlogBySlug, getBlogs } from '@/lib/supabase/db';
import { notFound } from 'next/navigation';
import { BlogArticleContent } from './blog-article-content';

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
  const allBlogs = await getBlogs();

  if (!blog) {
    notFound();
  }

  return (
    <main className="flex-1">
      <BlogArticleContent blog={blog} allBlogs={allBlogs} />
    </main>
  );
}
