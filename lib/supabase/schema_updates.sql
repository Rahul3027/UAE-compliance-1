-- Schema Updates for CMS and Lead Generation

-- 1. Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type varchar(50) NOT NULL, -- 'contact', 'consultation', 'demo', 'newsletter', 'compliance_assessment', 'erp_readiness', 'download'
  first_name text,
  last_name text,
  email text NOT NULL,
  company text,
  phone text,
  message text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Create articles (blog posts) table
CREATE TABLE IF NOT EXISTS articles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug varchar(150) UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category varchar(50) NOT NULL DEFAULT 'Updates', -- 'Updates', 'Technical', 'Compliance'
  author varchar(100) NOT NULL DEFAULT 'Compliance Team',
  read_time varchar(50) NOT NULL DEFAULT '5 min read',
  status varchar(20) NOT NULL DEFAULT 'published', -- 'draft', 'published'
  published_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 3. Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL,
  category varchar(50) NOT NULL DEFAULT 'General', -- 'General', 'Technical', 'Pricing'
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- 4. Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug varchar(100) UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  icon varchar(50) NOT NULL DEFAULT 'Layers',
  created_at timestamp with time zone DEFAULT now()
);

-- 5. Create regulatory_updates table
CREATE TABLE IF NOT EXISTS regulatory_updates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date_label varchar(50) NOT NULL, -- e.g., 'Q2 2026'
  title text NOT NULL,
  description text NOT NULL,
  country_code varchar(2) NOT NULL DEFAULT 'ae', -- 'ae', 'om', or 'all'
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- 6. Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  quote text NOT NULL,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE regulatory_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- 7. Policies for Leads
-- Allow public to insert leads
CREATE POLICY "Allow public insert on leads" ON leads FOR INSERT WITH CHECK (true);
-- Only authenticated users (admins) can view leads
CREATE POLICY "Allow authenticated read on leads" ON leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated CRUD on leads" ON leads FOR ALL TO authenticated USING (true);

-- 8. Policies for Articles
-- Public read access
CREATE POLICY "Allow public read on articles" ON articles FOR SELECT USING (status = 'published');
-- Authenticated full access for admins
CREATE POLICY "Allow authenticated CRUD on articles" ON articles FOR ALL TO authenticated USING (true);

-- 9. Policies for FAQs
CREATE POLICY "Allow public read on faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Allow authenticated CRUD on faqs" ON faqs FOR ALL TO authenticated USING (true);

-- 10. Policies for Services
CREATE POLICY "Allow public read on services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow authenticated CRUD on services" ON services FOR ALL TO authenticated USING (true);

-- 11. Policies for Regulatory Updates
CREATE POLICY "Allow public read on regulatory_updates" ON regulatory_updates FOR SELECT USING (true);
CREATE POLICY "Allow authenticated CRUD on regulatory_updates" ON regulatory_updates FOR ALL TO authenticated USING (true);

-- 12. Policies for Testimonials
CREATE POLICY "Allow public read on testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow authenticated CRUD on testimonials" ON testimonials FOR ALL TO authenticated USING (true);
