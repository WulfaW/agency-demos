import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, from, to, date, price, vehicle } = body;

    // 1. Insert into Supabase
    const supabase = await createClient();
    const { data: booking, error: dbError } = await supabase
      .from('vip_bookings')
      .insert([
        { name, phone, route_from: from, route_to: to, travel_date: date, estimated_price: price, vehicle }
      ])
      .select()
      .single();

    if (dbError) throw new Error(dbError.message);

    // 2. Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'VIP Transfer <onboarding@resend.dev>', // Replace with your domain
        to: ['trexgiganotosaurus@gmail.com'], // The agency email
        subject: `Yeni VIP Rezervasyon Talebi: ${name}`,
        html: `<p>Yeni bir transfer talebi aldınız.</p>
               <ul>
                 <li><b>Müşteri:</b> ${name}</li>
                 <li><b>Telefon:</b> ${phone}</li>
                 <li><b>Rota:</b> ${from} -> ${to}</li>
                 <li><b>Tarih:</b> ${date}</li>
                 <li><b>Araç:</b> ${vehicle}</li>
                 <li><b>Fiyat:</b> €${price}</li>
               </ul>`
      });
    }

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    console.error('Booking Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


