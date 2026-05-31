-- Initial schema for UAE & Oman Compliance SaaS

-- Create generic content table
CREATE TABLE compliance_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  country_code varchar(2) NOT NULL, -- 'ae' or 'om'
  section_key varchar(50) NOT NULL,
  title text NOT NULL,
  content jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create modules table
CREATE TABLE modules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  country_code varchar(2) NOT NULL,
  slug varchar(100) NOT NULL,
  title varchar(200) NOT NULL,
  description text,
  icon varchar(50),
  color varchar(50),
  is_interactive boolean DEFAULT false,
  order_index integer NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Create xml_samples table
CREATE TABLE xml_samples (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  country_code varchar(2) NOT NULL,
  type varchar(50) NOT NULL, -- 'tax-invoice', 'credit-note', etc.
  content text NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create business_rules table
CREATE TABLE business_rules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  country_code varchar(2) NOT NULL,
  rule_id varchar(50) NOT NULL,
  description text NOT NULL,
  severity varchar(20) NOT NULL, -- 'FATAL', 'WARNING'
  xpath text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create glossary terms table
CREATE TABLE glossary_terms (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  term varchar(100) NOT NULL,
  definition text NOT NULL,
  category varchar(50),
  country_code varchar(2), -- NULL means applies to both
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE compliance_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE xml_samples ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE glossary_terms ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access on compliance_content" ON compliance_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access on modules" ON modules FOR SELECT USING (true);
CREATE POLICY "Allow public read access on xml_samples" ON xml_samples FOR SELECT USING (true);
CREATE POLICY "Allow public read access on business_rules" ON business_rules FOR SELECT USING (true);
CREATE POLICY "Allow public read access on glossary_terms" ON glossary_terms FOR SELECT USING (true);
