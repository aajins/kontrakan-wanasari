import Link from "next/link";
import { Building2, MapPin, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white border-t-4 border-[#7C3AED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#7C3AED] border-2 border-[#8B5CF6] rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-black text-lg leading-tight">Kontrakan Wanasari</div>
                <div className="text-xs text-gray-400 font-medium">Hunian Strategis Karawang</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              Platform informasi kontrakan terpercaya di Desa Wanasari, Kecamatan Telukjambe Barat, Karawang.
              Memudahkan Anda menemukan hunian yang strategis dan nyaman.
            </p>
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-[#8B5CF6] mt-0.5 flex-shrink-0" />
              <span>Desa Wanasari, Kec. Telukjambe Barat, Karawang, Jawa Barat</span>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="font-black text-white mb-5 text-sm uppercase tracking-widest">Navigasi</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Beranda" },
                { href: "/#kontrakan", label: "Daftar Kontrakan" },
                { href: "/#faq", label: "FAQ" },
                { href: "/#kontak", label: "Kontak" },
                { href: "/admin", label: "Dashboard Admin" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#8B5CF6] text-sm transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div id="kontak">
            <h3 className="font-black text-white mb-5 text-sm uppercase tracking-widest">Hubungi Kami</h3>
            <div className="space-y-4">
              <a
                href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20menanyakan%20kontrakan%20di%20Wanasari"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-[#25D366] rounded-xl border-2 border-[#25D366] hover:border-white transition-all group"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <div>
                  <div className="text-white font-bold text-sm">WhatsApp</div>
                  <div className="text-green-100 text-xs">+62 812-3456-7890</div>
                </div>
              </a>
              <a
                href="tel:+6281234567890"
                className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] rounded-xl border-2 border-gray-700 hover:border-[#7C3AED] transition-all"
              >
                <Phone className="w-5 h-5 text-[#8B5CF6]" />
                <div>
                  <div className="text-white font-bold text-sm">Telepon</div>
                  <div className="text-gray-400 text-xs">+62 812-3456-7890</div>
                </div>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-500 text-xs mb-3">Jam Operasional</p>
              <p className="text-gray-300 text-sm font-medium">Senin – Sabtu: 08.00 – 20.00</p>
              <p className="text-gray-300 text-sm font-medium">Minggu: 09.00 – 17.00</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t-2 border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2025 Kontrakan Wanasari. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-xs">Dibuat dengan</span>
            <span className="text-[#8B5CF6] font-bold text-xs">♥</span>
            <span className="text-gray-600 text-xs">untuk masyarakat Karawang</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
