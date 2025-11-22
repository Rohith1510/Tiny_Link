const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables. Make sure .env.local exists.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  console.log('🔍 Testing Supabase Connection...');

  // 1. Try to create a test link
  const testCode = 'test_' + Math.random().toString(36).substring(7);
  console.log(`\n1. Attempting to create test link: ${testCode}`);
  
  const { data: insertData, error: insertError } = await supabase
    .from('links')
    .insert({
      code: testCode,
      target_url: 'https://example.com',
      clicks: 0
    })
    .select()
    .single();

  if (insertError) {
    console.error('❌ Insert Failed:', insertError.message);
    return;
  }
  console.log('✅ Insert Successful!');

  // 2. Try to update the link (Simulate a click)
  console.log(`\n2. Attempting to update click count for: ${testCode}`);
  
  const { error: updateError } = await supabase
    .from('links')
    .update({
      clicks: 1,
      last_clicked: new Date().toISOString()
    })
    .eq('code', testCode);

  if (updateError) {
    console.error('❌ Update Failed:', updateError.message);
    console.log('\n⚠️  DIAGNOSIS: This confirms Row Level Security (RLS) is blocking updates.');
    console.log('👉 SOLUTION: Run "ALTER TABLE links DISABLE ROW LEVEL SECURITY;" in your Supabase SQL Editor.');
  } else {
    console.log('✅ Update Successful!');
    console.log('\n🎉 DIAGNOSIS: Database permissions are correct. Clicks should be counting.');
  }

  // 3. Cleanup
  console.log(`\n3. Cleaning up test link...`);
  await supabase.from('links').delete().eq('code', testCode);
}

testDatabase();
