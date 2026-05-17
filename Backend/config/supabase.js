// backend/config/supabase.js
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.SUPABASE_KEY
);

console.log("Supabase Connected");

module.exports = supabase;