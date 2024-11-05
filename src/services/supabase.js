import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://stowzyvtjrpextrhiuxy.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0b3d6eXZ0anJwZXh0cmhpdXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5NzYyODksImV4cCI6MjAzNTU1MjI4OX0.RF4vl63BEMICzI4wcree3PrW4LzweiaaQFUabgGsBlU";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;