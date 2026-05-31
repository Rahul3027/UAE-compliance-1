import { supabase } from '@/lib/supabase/client';
import { modulesMeta, uaeMandateTimeline } from '@/data/compliance-content';
import { xmlSamples } from '@/data/xml-samples';

// Force next.js to cache these responses aggressively (SSG behavior)
// In Next.js 14, fetch automatically caches, but since we use Supabase client,
// we wrap it in a stable server-side function.

export async function getServerComplianceModules() {
  try {
    const { data, error } = await supabase
      .from('compliance_modules')
      .select('*')
      .order('id', { ascending: true });
      
    if (error || !data || data.length === 0) {
      console.warn('Falling back to local modules data on server.');
      return modulesMeta;
    }
    return data;
  } catch (err) {
    return modulesMeta;
  }
}

export async function getServerComplianceContent() {
  try {
    const { data, error } = await supabase
      .from('compliance_content')
      .select('*');
      
    if (error || !data || data.length === 0) {
      return uaeMandateTimeline;
    }
    return data;
  } catch (err) {
    return uaeMandateTimeline;
  }
}

export async function getServerXmlSamples() {
  try {
    const { data, error } = await supabase
      .from('xml_samples')
      .select('*');
      
    if (error || !data || data.length === 0) {
      // @ts-ignore - type bypass for local fallback matching
      return xmlSamples;
    }
    return data;
  } catch (err) {
    // @ts-ignore
    return xmlSamples;
  }
}
