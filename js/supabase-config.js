// Supabase configuration for MBOOBEN AUTO'S
// 1. Create project at https://supabase.com
// 2. Paste your Project URL and anon key below
// 3. Run supabase/schema.sql in the SQL Editor

window.SUPABASE_URL = '';       // e.g. 'https://xxxxx.supabase.co'
window.SUPABASE_ANON_KEY = '';  // e.g. 'eyJhbGciOi...'

window.supabaseReady = function () {
  return !!(window.SUPABASE_URL && window.SUPABASE_ANON_KEY && window.supabase);
};
