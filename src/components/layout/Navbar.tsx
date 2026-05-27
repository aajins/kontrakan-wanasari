"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Home, Building2, HelpCircle, Phone, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/#kontrakan", label: "Daftar Kontrakan", icon: Building2 },
  { href: "/#faq", label: "FAQ", icon: HelpCircle },
  { href: "/#kontak", label: "Kontak", icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#FAF7FF] border-b-2 border-black shadow-[0_4px_0px_#0A0A0A]"
          : "bg-[#FAF7FF] border-b-2 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#7C3AED] border-2 border-black rounded-lg nb-shadow flex items-center justify-center transition-transform group-hover:-translate-y-0.5">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm leading-tight text-black tracking-tight">
                Kontrakan
              </span>
              <span className="font-black text-sm leading-tight text-[#7C3AED] tracking-tight">
                Wanasari
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-black hover:bg-[#F6F3FF] hover:text-[#7C3AED] transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/#kontrakan"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] text-white font-bold text-sm rounded-xl border-2 border-black nb-shadow hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#0A0A0A] transition-all duration-150"
            >
              <Search className="w-4 h-4" />
              Cari Kontrakan
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center border-2 border-black rounded-xl bg-[#F6F3FF] nb-shadow hover:-translate-y-0.5 transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t-2 border-black bg-[#FAF7FF] overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-black hover:bg-[#F6F3FF] hover:text-[#7C3AED] border-2 border-transparent hover:border-black transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2 border-t-2 border-black">
                <Link
                  href="/#kontrakan"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#7C3AED] text-white font-bold rounded-xl border-2 border-black nb-shadow"
                >
                  <Search className="w-4 h-4" />
                  Cari Kontrakan
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
