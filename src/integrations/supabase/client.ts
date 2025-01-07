import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://csdazyjhinkjplewkpmo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZGF6eWpoaW5ranBsZXdrcG1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1ODMyMDAsImV4cCI6MjA1MTE1OTIwMH0.1FXdsMdAw2lGJ3xQQEiXhtivv2hk0uJ7Gjib2DWvYEk";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);