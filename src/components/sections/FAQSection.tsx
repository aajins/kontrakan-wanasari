"use client";

import { motion } from "framer-motion";
import { HelpCircle, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/kontrakan";

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FAF7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F6F3FF] border-2 border-black rounded-full mb-6 nb-shadow">
              <HelpCircle className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-sm font-bold text-[#7C3AED]">FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
              Ada Pertanyaan?{" "}
              <span className="text-[#7C3AED]">Kami Jawab</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Berikut pertanyaan yang sering ditanyakan calon penyewa. Tidak menemukan jawaban yang Anda cari?
            </p>

            {/* Contact Card */}
            <div className="bg-[#7C3AED] rounded-2xl p-6 border-2 border-black nb-shadow-purple-lg text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-black">Tanya Langsung</div>
                  <div className="text-purple-200 text-sm">Via WhatsApp, respon cepat!</div>
                </div>
              </div>
              <p className="text-purple-200 text-sm mb-5">
                Tim kami siap membantu menjawab semua pertanyaan Anda tentang kontrakan yang tersedia.
              </p>
              <a
                href="https://wa.me/6281234567890?text=Halo,%20saya%20punya%20pertanyaan%20tentang%20kontrakan%20Wanasari"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-white text-[#7C3AED] font-black rounded-xl border-2 border-black hover:-translate-y-0.5 transition-all"
                style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.3)" }}
              >
                <MessageCircle className="w-4 h-4" />
                Chat WhatsApp Sekarang
              </a>
            </div>
          </motion.div>

          {/* Right: Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Accordion className="space-y-3">
              {faqItems.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={idx}
                  className="bg-white border-2 border-black rounded-2xl px-5 nb-shadow hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#7C3AED] transition-all duration-150"
                >
                  <AccordionTrigger className="text-left font-bold text-black py-4 text-sm md:text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
