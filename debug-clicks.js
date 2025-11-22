const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugClicks() {
  console.log('🐞 Debugging Click Counting...');

  // 1. Create a test link
  const testCode = 'debug_' + Math.floor(Math.random() * 1000);
  console.log(`\n1. Creating link: ${testCode}`);
  
  const { data: link, error: createError } = await supabase
    .from('links')
    .insert({ code: testCode, target_url: 'https://example.com' })
    .select()
    .single();

  if (createError) {
    console.error('❌ Create failed:', createError.message);
    return;
  }
  console.log('✅ Link created. Initial clicks:', link.clicks);

  // 2. Simulate First Click
  console.log('\n2. Simulating Click #1...');
  const { error: updateError1 } = await supabase
    .from('links')
    .update({ 
      clicks: link.clicks + 1,
      last_clicked: new Date().toISOString()
    })
    .eq('code', testCode);

  if (updateError1) {
    console.error('❌ Click #1 Failed:', updateError1.message);
    console.log('👉 CAUSE: Row Level Security (RLS) is ON.');
    console.log('👉 FIX: Run "ALTER TABLE links DISABLE ROW LEVEL SECURITY;" in Supabase.');
    return;
  }
  console.log('✅ Click #1 Update sent.');

  // 3. Verify Click #1
  const { data: verify1 } = await supabase
    .from('links')
    .select('clicks')
    .eq('code', testCode)
    .single();
    
  console.log('   Current DB Value:', verify1.clicks);

  // 4. Simulate Second Click
  console.log('\n3. Simulating Click #2...');
  const { error: updateError2 } = await supabase
    .from('links')
    .update({ 
      clicks: verify1.clicks + 1,
      last_clicked: new Date().toISOString()
    })
    .eq('code', testCode);

  if (updateError2) {
    console.error('❌ Click #2 Failed:', updateError2.message);
  } else {
    console.log('✅ Click #2 Update sent.');
  }

  // 5. Verify Click #2
  const { data: verify2 } = await supabase
    .from('links')
    .select('clicks')
    .eq('code', testCode)
    .single();
    
  console.log('   Current DB Value:', verify2.clicks);

  // Cleanup
  await supabase.from('links').delete().eq('code', testCode);
}

debugClicks();
