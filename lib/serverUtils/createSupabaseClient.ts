// lib/supabaseServerClient.ts
import env from "@/expose";
import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(env.supabaseUrl, env.supabaseKey);
