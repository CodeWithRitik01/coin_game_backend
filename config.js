import { createClient } from "@supabase/supabase-js";
 
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const  supabase = createClient(supabaseUrl, supabaseKey);


export const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
}


export default supabase;