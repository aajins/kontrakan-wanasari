"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppSticky() {
  return (
    <>
      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="p-4 bg-[#FAF7FF] border-t-2 border-black">
          <a
            href="https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20menyewa%20kontrakan%20di%20Wanasari%20Karawang"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#25D366] text-white font-black text-base rounded-xl border-2 border-black nb-shadow active:translate-y-0.5 active:shadow-none transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Hubungi via WhatsApp
          </a>
        </div>
      </div>

      {/* Desktop Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.4, type: "spring" }}
        className="fixed bottom-6 right-6 z-40 hidden md:block"
      >
        <a
          href="https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20menyewa%20kontrakan%20di%20Wanasari%20Karawang"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-5 py-3.5 bg-[#25D366] text-white font-black rounded-2xl border-2 border-black nb-shadow hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0A0A0A] transition-all duration-200"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <MessageCircle className="w-5 h-5" />
          </motion.div>
          <span>Chat WhatsApp</span>
        </a>
      </motion.div>
    </>
  );
}
