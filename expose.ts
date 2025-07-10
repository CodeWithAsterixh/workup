const env = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_URI: process.env.MONGODB_URI,
  supabaseUrl: process.env.SUPABASE_URL||"",
  supabaseKey: process.env.SUPABASE_ANON||"",
};

export default env;
