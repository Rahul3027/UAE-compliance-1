import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
// Temporary fallback imports for graceful migration
import { modulesMeta, uaeMandateTimeline } from '@/data/compliance-content';
import { xmlSamples } from '@/data/xml-samples';

// This hook simulates a data fetch that will eventually hit Supabase
// For now, it falls back to local data if Supabase fails (e.g. no valid URL/Key)
export function useComplianceData(country: 'ae' | 'om', type: 'modules' | 'content' | 'xml') {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Attempt Supabase fetch
        let result;
        if (type === 'modules') {
          const { data: dbData, error: dbError } = await supabase
            .from('modules')
            .select('*')
            .eq('country_code', country)
            .order('order_index', { ascending: true });
          
          if (dbError) throw dbError;
          result = dbData;
        } 
        
        if (!result || result.length === 0) {
          // Fallback to local data
          console.warn('Falling back to local data for', type);
          if (type === 'modules') result = modulesMeta;
          if (type === 'content') result = uaeMandateTimeline; // using something generic
          if (type === 'xml') result = xmlSamples;
        }

        setData(result);
      } catch (err) {
        console.error('Data fetch error:', err);
        setError(err as Error);
        
        // Final fallback on hard error
        if (type === 'modules') setData(modulesMeta);
        if (type === 'content') setData(uaeMandateTimeline);
        if (type === 'xml') setData(xmlSamples);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [country, type]);

  return { data, loading, error };
}
