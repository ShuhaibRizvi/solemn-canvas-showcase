-- Add restrictive RLS policies for products table to prevent unauthorized modifications
-- Only authenticated admins should be able to modify products

-- Create app_role enum if it doesn't exist
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table for role management
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles: only admins can view roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policy for user_roles: only admins can manage roles
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add restrictive policies to products table for INSERT, UPDATE, DELETE
-- Only admins can insert products
CREATE POLICY "Only admins can insert products"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update products
CREATE POLICY "Only admins can update products"
ON public.products
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete products
CREATE POLICY "Only admins can delete products"
ON public.products
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));