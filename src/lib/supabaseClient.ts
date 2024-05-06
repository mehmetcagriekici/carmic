import { createClient } from '@supabase/supabase-js'

export const supabaseURL = 'your supabase url'
export const key =
  'your supabase key'

///supabase url + anon key
const supabase = createClient(supabaseURL, key)

export default supabase
