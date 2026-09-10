import { NextResponse } from "next/server";
import { saveLeadToNotion } from "@/lib/notion";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, industry, message } = body;

    if (!fullName || (!email && !phone)) {
      return NextResponse.json(
        { error: "Lütfen adınızı ve en az bir iletişim bilginizi (e-posta veya telefon) giriniz." },
        { status: 400 }
      );
    }

    const saveResult = await saveLeadToNotion({
      fullName,
      email: email || "",
      phone: phone || "",
      industry: industry || "Genel",
      message: message || "",
    });

    return NextResponse.json({
      success: true,
      message: "Talebiniz başarıyla alındı. Ekibimiz 24 saat içinde sizinle iletişime geçecektir.",
      meta: saveResult,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Talep iletilirken bir hata oluştu.", details: error.message },
      { status: 500 }
    );
  }
}
