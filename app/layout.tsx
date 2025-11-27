import type React from "react"
import type { Metadata } from "next"
import { Tajawal } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

// استخدام خط تاجوال للغة العربية
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "hair-course-website",
  description:
    "عرض خاص على كورس صدمة لعلاج الشعر - خصم 46% لفترة محدودة. نظام طبيعي شامل يعالج الشعر من الجذور ويعيد له القوة والكثافة والطول",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/logo.jpg", media: "(prefers-color-scheme: light)" },
      { url: "/logo.jpg", media: "(prefers-color-scheme: dark)" },
      { url: "/logo.jpg", type: "image/jpeg" },
    ],
    apple: "/logo.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head />
      <body className={`${tajawal.className} antialiased`}>
        {/* Facebook Pixel */}
        <Script id="fb-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1786207608710297');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1786207608710297&ev=PageView&noscript=1"
          />
        </noscript>

        {children}
        <Analytics />
      </body>
    </html>
  )
}
