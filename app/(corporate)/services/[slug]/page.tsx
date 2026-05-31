import { getServiceBySlug, getServices } from '@/lib/supabase/db';
import { notFound } from 'next/navigation';
import { ServiceDetailContent } from './service-detail-content';

export const revalidate = 60; // Revalidate every minute

export async function generateStaticParams() {
  const allServices = await getServices();
  return allServices.map((service) => ({
    slug: service.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="flex-1 pb-24">
      <ServiceDetailContent service={service} />
    </main>
  );
}
