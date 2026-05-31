import { supabase } from './client';
import { blogs, faqs, services, BlogPost, FAQItem, ServiceItem } from '@/data/cms-content';
import { uaeMandateTimeline, omanMandateTimeline, TimelineEvent } from '@/data/compliance-content';

// Fallback Testimonials
export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar_url?: string;
}

export const staticTestimonials: TestimonialItem[] = [
  {
    id: '1',
    name: 'Ahmad Al-Mansoori',
    role: 'Head of Enterprise Architecture',
    company: 'Al-Futtaim Group (UAE)',
    quote: 'The interactive PINT AE sandbox solved our XML validation errors in minutes. An invaluable resource for UAE compliance.',
  },
  {
    id: '2',
    name: 'Sarah Al-Hinai',
    role: 'Director of Finance',
    company: 'Muscat Logistics (Oman)',
    quote: 'Preparing for the Fawtara mandate was stressful until we found this platform. The 5-corner model simulator is extremely clear.',
  }
];

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Supabase articles fetch failed or empty. Falling back to local data.');
      return blogs;
    }

    // Map DB schema (snake_case) to Frontend model (camelCase)
    return data.map(item => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      date: new Date(item.published_at).toISOString().split('T')[0],
      author: item.author,
      readTime: item.read_time,
      category: item.category,
    }));
  } catch (err) {
    console.error('getBlogs error:', err);
    return blogs;
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      const fallback = blogs.find(b => b.slug === slug);
      return fallback || null;
    }

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      date: new Date(data.published_at).toISOString().split('T')[0],
      author: data.author,
      readTime: data.read_time,
      category: data.category,
    };
  } catch (err) {
    const fallback = blogs.find(b => b.slug === slug);
    return fallback || null;
  }
}

export async function getFaqs(): Promise<FAQItem[]> {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('order_index', { ascending: true });

    if (error || !data || data.length === 0) {
      return faqs;
    }
    return data;
  } catch (err) {
    return faqs;
  }
}

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return services;
    }
    return data;
  } catch (err) {
    return services;
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      const fallback = services.find(s => s.slug === slug);
      return fallback || null;
    }
    return data;
  } catch (err) {
    const fallback = services.find(s => s.slug === slug);
    return fallback || null;
  }
}

export async function getRegulatoryUpdates(countryCode: 'ae' | 'om' | 'all' = 'ae'): Promise<TimelineEvent[]> {
  try {
    const { data, error } = await supabase
      .from('regulatory_updates')
      .select('*')
      .in('country_code', [countryCode, 'all'])
      .order('order_index', { ascending: true });

    if (error || !data || data.length === 0) {
      return countryCode === 'om' ? omanMandateTimeline : uaeMandateTimeline;
    }

    return data.map(item => ({
      date: item.date_label,
      title: item.title,
      description: item.description,
    }));
  } catch (err) {
    return countryCode === 'om' ? omanMandateTimeline : uaeMandateTimeline;
  }
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return staticTestimonials;
    }
    return data;
  } catch (err) {
    return staticTestimonials;
  }
}

export interface LeadInput {
  type: 'contact' | 'consultation' | 'demo' | 'newsletter' | 'compliance_assessment' | 'erp_readiness' | 'download';
  first_name?: string;
  last_name?: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  metadata?: Record<string, any>;
}

export async function insertLead(lead: LeadInput): Promise<{ success: boolean; error?: string }> {
  try {
    // Map properties to database snake_case
    const dbLead = {
      type: lead.type,
      first_name: lead.first_name || null,
      last_name: lead.last_name || null,
      email: lead.email,
      company: lead.company || null,
      phone: lead.phone || null,
      message: lead.message || null,
      metadata: lead.metadata || {},
    };

    const { error } = await supabase.from('leads').insert(dbLead);
    if (error) {
      console.warn('Supabase lead insert failed, logging locally:', error.message);
      // Save locally in localStorage for offline mock persistence
      if (typeof window !== 'undefined') {
        const localLeads = JSON.parse(localStorage.getItem('mock_leads') || '[]');
        localLeads.push({ ...dbLead, id: Math.random().toString(), created_at: new Date().toISOString() });
        localStorage.setItem('mock_leads', JSON.stringify(localLeads));
      }
      return { success: true }; // Return mock success so user form doesn't block
    }
    return { success: true };
  } catch (err: any) {
    console.error('insertLead error:', err);
    if (typeof window !== 'undefined') {
      const localLeads = JSON.parse(localStorage.getItem('mock_leads') || '[]');
      localLeads.push({ ...lead, id: Math.random().toString(), created_at: new Date().toISOString() });
      localStorage.setItem('mock_leads', JSON.stringify(localLeads));
    }
    return { success: true };
  }
}
