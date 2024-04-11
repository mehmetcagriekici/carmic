import { createClient } from '@supabase/supabase-js'

export const supabaseURL = 'https://tocmsjmuyjfxsxpwjznd.supabase.co'
export const key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvY21zam11eWpmeHN4cHdqem5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1MjQ3MDYsImV4cCI6MjAyNzEwMDcwNn0.O8tW2uHYDrXU-Gj693dUni1DMkh9kXishw1joftkxGY'

///supabase url + anon key
const supabase = createClient(supabaseURL, key)

export default supabase
