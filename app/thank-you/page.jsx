"use client";

import { motion } from "framer-motion";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-white to-primary/10 p-6">
      
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/60 shadow-2xl rounded-3xl px-10 py-14 text-center max-w-2xl border border-white/40"
      >
        
        {/* عنوان */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl font-extrabold text-primary drop-shadow-sm"
        >
          شكرًا لثقتك 💛
        </motion.h1>

        {/* نص مقدمة */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg text-gray-700 mt-4 leading-relaxed"
        >
          تم استلام طلبك بنجاح، ونسعد بخدمتك دائمًا!
        </motion.p>

        {/* بطاقة المعلومات */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-10 text-gray-800 bg-white/70 border border-primary/20 px-6 py-8 rounded-2xl shadow-inner"
        >
          <p className="text-lg leading-loose">
            لتحويل المبلغ، الرجاء التحويل عبر  
            <span className="font-bold text-primary"> فــــوراً </span>
            على هذا الرقم:
            <br />
            <span className="text-3xl font-extrabold text-primary tracking-wide mt-2 block">
              55678780
            </span>
            <span className="text-md block mt-1">باسم: شيخة الخليفي</span>
            <br />
            بعد التحويل، الرجاء إرسال  
            <span className="font-bold text-primary"> إيصال الدفع + اسم المحوّل </span>
            إلى واتساب:
            <br />
            <span className="text-3xl font-extrabold text-primary tracking-wide mt-2 block">
              50383570
            </span>
          </p>
        </motion.div>

        {/* زر واتساب */}
        <motion.a
          href="https://wa.me/97450383570"
          target="_blank"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8, type: "spring" }}
          className="inline-block mt-10 px-12 py-4 bg-primary text-primary-foreground text-xl font-bold rounded-full shadow-xl hover:scale-110 transition-all duration-500 animate-pulse"
        >
          إرسال على واتساب
        </motion.a>

      </motion.div>
    </div>
  );
}
