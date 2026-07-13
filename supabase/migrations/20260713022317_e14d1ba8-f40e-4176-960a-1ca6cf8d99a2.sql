
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ TIMESTAMPS TRIGGER ============
CREATE OR REPLACE FUNCTION public.tg_set_updated_at() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- ============ BLOG ============
CREATE TYPE public.post_kind AS ENUM ('news','article','report');
CREATE TYPE public.post_status AS ENUM ('draft','published');

CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind post_kind NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL DEFAULT '',
  excerpt_ar TEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  body_ar TEXT DEFAULT '',
  body_en TEXT DEFAULT '',
  cover_url TEXT,
  pdf_url TEXT,
  status post_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  views INT NOT NULL DEFAULT 0,
  likes INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published posts" ON public.posts FOR SELECT USING (status = 'published');
CREATE POLICY "Admins read all posts" ON public.posts FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins write posts" ON public.posts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_posts_updated BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
CREATE INDEX idx_posts_kind_status_published ON public.posts (kind, status, published_at DESC);

CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  body TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.comments TO anon, authenticated;
GRANT UPDATE, DELETE ON public.comments TO authenticated;
GRANT ALL ON public.comments TO service_role;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads approved comments" ON public.comments FOR SELECT USING (approved = true);
CREATE POLICY "Admins read all comments" ON public.comments FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Anyone submits comment" ON public.comments FOR INSERT WITH CHECK (approved = false);
CREATE POLICY "Admins moderate comments" ON public.comments FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete comments" ON public.comments FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_comments_post ON public.comments (post_id, approved);

-- ============ DASHBOARD ============
CREATE TABLE public.states (
  code TEXT PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  maturity SMALLINT NOT NULL DEFAULT 0,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.states TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.states TO authenticated;
GRANT ALL ON public.states TO service_role;
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads states" ON public.states FOR SELECT USING (true);
CREATE POLICY "Admins write states" ON public.states FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.state_indicators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_code TEXT NOT NULL REFERENCES public.states(code) ON DELETE CASCADE,
  category TEXT NOT NULL,
  label_ar TEXT NOT NULL,
  label_en TEXT NOT NULL,
  value_ar TEXT,
  value_en TEXT,
  pdf_url TEXT,
  sort_order INT NOT NULL DEFAULT 0
);
GRANT SELECT ON public.state_indicators TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.state_indicators TO authenticated;
GRANT ALL ON public.state_indicators TO service_role;
ALTER TABLE public.state_indicators ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads indicators" ON public.state_indicators FOR SELECT USING (true);
CREATE POLICY "Admins write indicators" ON public.state_indicators FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.roadmap_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_index INT NOT NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ar TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'planned',
  start_date DATE,
  end_date DATE
);
GRANT SELECT ON public.roadmap_stages TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.roadmap_stages TO authenticated;
GRANT ALL ON public.roadmap_stages TO service_role;
ALTER TABLE public.roadmap_stages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads stages" ON public.roadmap_stages FOR SELECT USING (true);
CREATE POLICY "Admins write stages" ON public.roadmap_stages FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stage_id UUID REFERENCES public.roadmap_stages(id) ON DELETE SET NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  owner TEXT,
  status TEXT NOT NULL DEFAULT 'todo',
  due_at DATE
);
GRANT SELECT ON public.tasks TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.tasks TO authenticated;
GRANT ALL ON public.tasks TO service_role;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads tasks" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Admins write tasks" ON public.tasks FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.funding (
  wp_code TEXT PRIMARY KEY,
  label_ar TEXT NOT NULL,
  label_en TEXT NOT NULL,
  allocated_usd NUMERIC NOT NULL DEFAULT 0,
  received_usd NUMERIC NOT NULL DEFAULT 0,
  source TEXT
);
GRANT SELECT ON public.funding TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.funding TO authenticated;
GRANT ALL ON public.funding TO service_role;
ALTER TABLE public.funding ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads funding" ON public.funding FOR SELECT USING (true);
CREATE POLICY "Admins write funding" ON public.funding FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wp_code TEXT REFERENCES public.funding(wp_code) ON DELETE SET NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  due_at DATE,
  status TEXT NOT NULL DEFAULT 'pending'
);
GRANT SELECT ON public.milestones TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.milestones TO authenticated;
GRANT ALL ON public.milestones TO service_role;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads milestones" ON public.milestones FOR SELECT USING (true);
CREATE POLICY "Admins write milestones" ON public.milestones FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.global_indices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  rank INT,
  total INT,
  year INT,
  score NUMERIC,
  blurb_ar TEXT,
  blurb_en TEXT,
  source_url TEXT,
  sort_order INT NOT NULL DEFAULT 0
);
GRANT SELECT ON public.global_indices TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.global_indices TO authenticated;
GRANT ALL ON public.global_indices TO service_role;
ALTER TABLE public.global_indices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads indices" ON public.global_indices FOR SELECT USING (true);
CREATE POLICY "Admins write indices" ON public.global_indices FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ============ SITE CONTENT ============
CREATE TABLE public.pages (
  slug TEXT PRIMARY KEY,
  title_ar TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pages TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.pages TO authenticated;
GRANT ALL ON public.pages TO service_role;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads pages" ON public.pages FOR SELECT USING (true);
CREATE POLICY "Admins write pages" ON public.pages FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_pages_updated BEFORE UPDATE ON public.pages FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE public.site_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  org_name_ar TEXT DEFAULT '',
  org_name_en TEXT DEFAULT '',
  phone TEXT,
  email TEXT,
  banner_url TEXT,
  socials JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins write settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
INSERT INTO public.site_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  role_ar TEXT,
  role_en TEXT,
  bio_ar TEXT,
  bio_en TEXT,
  avatar_url TEXT,
  sort_order INT NOT NULL DEFAULT 0
);
GRANT SELECT ON public.team_members TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads team" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Admins write team" ON public.team_members FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ============ METRICS RPC (spam-safe view increment) ============
CREATE OR REPLACE FUNCTION public.increment_post_views(_slug TEXT)
RETURNS VOID LANGUAGE SQL SECURITY DEFINER SET search_path = public
AS $$ UPDATE public.posts SET views = views + 1 WHERE slug = _slug AND status = 'published' $$;
GRANT EXECUTE ON FUNCTION public.increment_post_views(TEXT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.toggle_post_like(_slug TEXT, _delta INT)
RETURNS INT LANGUAGE SQL SECURITY DEFINER SET search_path = public
AS $$ UPDATE public.posts SET likes = GREATEST(0, likes + _delta) WHERE slug = _slug AND status = 'published' RETURNING likes $$;
GRANT EXECUTE ON FUNCTION public.toggle_post_like(TEXT, INT) TO anon, authenticated;
