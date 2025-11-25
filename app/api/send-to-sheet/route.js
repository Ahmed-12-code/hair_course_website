// app/api/send-to-sheet/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    // URL الخاص بالـ Google Apps Script
    const scriptURL = "https://script.google.com/macros/s/AKfycbwBM4e2Op2kfW4CDxeWpqmLjgIIGeEYIySCR_JF5WSkWotTAwER3GxM5tlded1fzBLgtg/exec";

    // إرسال البيانات للـ Google Sheet
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.text(); // Google Apps Script غالبًا بيرجع نص
    console.log("Sending to sheet:", data);
    return NextResponse.json({ success: true, message: result });
  } catch (error) {
    console.error("Error sending data to Google Sheet:", error);
    return NextResponse.json({ success: false, error: error.message });
  }

  

}
