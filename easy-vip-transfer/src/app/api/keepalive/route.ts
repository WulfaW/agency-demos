import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Bu endpoint Vercel Cron tarafından her 3 günde bir çağrılır.
// Supabase free tier 7 gün aktivite olmayınca pause oluyor, bunu engeller.
export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Basit bir ping sorgusu
    const { error } = await supabase.from('drivers').select('id').limit(1);

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = tablo boş, sorun değil. Diğer hatalar raporlanır.
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, ping: new Date().toISOString() });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
