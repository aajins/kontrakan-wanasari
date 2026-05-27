import { Kontrakan, FAQItem, Facility } from "@/types";

// ─────────────────────────────────────────────
// Facility shortcuts for seed data
// ─────────────────────────────────────────────

const f = (id: string, name: string): Facility => ({ id, name });

const FACILITIES = {
  kmDalam: f("f1", "Kamar Mandi Dalam"),
  kmLuar: f("f2", "Kamar Mandi Luar"),
  listrik900: f("f3", "Listrik PLN 900W"),
  listrik1300: f("f4", "Listrik PLN 1300W"),
  parkirMotor: f("f5", "Parkir Motor"),
  parkirAll: f("f6", "Parkir Motor & Mobil"),
  airSumur: f("f7", "Air Sumur"),
  airPDAM: f("f8", "Air PDAM"),
  dapur: f("f9", "Dapur"),
  dapurBersama: f("f10", "Dapur Bersama"),
  teras: f("f13", "Teras"),
} as const;

// ─────────────────────────────────────────────
// Seed Data
// ─────────────────────────────────────────────

export const kontrakans: Kontrakan[] = [
  {
    id: "1",
    title: "Kontrakan Wanasari Indah",
    slug: "wanasari-indah",
    location: "Wanasari, Telukjambe Barat",
    address: "Jl. Wanasari No. 12, Desa Wanasari, Kec. Telukjambe Barat, Karawang",
    whatsapp: "6281234567890",
    ownerName: "Pak Hendra",
    description:
      "Kontrakan strategis di area Wanasari dengan akses mudah ke kawasan industri Karawang. Lingkungan aman, bersih, dan nyaman untuk keluarga maupun karyawan industri.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    units: [
      {
        id: "1a",
        type: "2 Petak",
        price: 700_000,
        available: true,
        facilities: [FACILITIES.kmDalam, FACILITIES.listrik900, FACILITIES.parkirMotor, FACILITIES.airSumur],
        description: "Unit 2 petak ideal untuk pasangan atau karyawan single. Ruang tamu dan kamar tidur terpisah.",
        size: "30 m²",
        maxOccupants: 2,
      },
      {
        id: "1b",
        type: "3 Petak",
        price: 1_000_000,
        available: true,
        facilities: [FACILITIES.kmDalam, FACILITIES.listrik1300, FACILITIES.parkirAll, FACILITIES.airSumur, FACILITIES.dapur],
        description: "Unit 3 petak cocok untuk keluarga kecil. Dilengkapi dapur dan ruang keluarga yang luas.",
        size: "45 m²",
        maxOccupants: 4,
      },
    ],
    coordinates: { lat: -6.3244, lng: 107.3063 },
    nearbyPlaces: [
      "3 km dari Stasiun Whoosh Karawang",
      "5 km dari Grand Outlet Karawang",
      "2 km dari KIM Karawang",
    ],
    rating: 4.8,
    reviewCount: 24,
    featured: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Kontrakan Mawar Asri",
    slug: "mawar-asri",
    location: "Wanasari, Telukjambe Barat",
    address: "Gg. Mawar No. 5, Desa Wanasari, Kec. Telukjambe Barat, Karawang",
    whatsapp: "6289876543210",
    ownerName: "Bu Sari",
    description:
      "Hunian nyaman dengan desain sederhana namun fungsional. Lokasi dekat akses tol Karawang Barat, cocok untuk karyawan yang mobilitas tinggi.",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    units: [
      {
        id: "2a",
        type: "2 Petak",
        price: 650_000,
        available: false,
        facilities: [FACILITIES.kmLuar, FACILITIES.listrik900, FACILITIES.parkirMotor],
        description: "Unit standar 2 petak dengan harga terjangkau.",
        size: "28 m²",
        maxOccupants: 2,
      },
      {
        id: "2b",
        type: "3 Petak",
        price: 950_000,
        available: true,
        facilities: [FACILITIES.kmDalam, FACILITIES.listrik1300, FACILITIES.parkirMotor, FACILITIES.dapurBersama],
        description: "Unit luas dengan akses dapur bersama yang bersih.",
        size: "42 m²",
        maxOccupants: 4,
      },
    ],
    coordinates: { lat: -6.318, lng: 107.301 },
    nearbyPlaces: [
      "4 km dari Stasiun Whoosh Karawang",
      "6 km dari Grand Outlet Karawang",
      "1.5 km dari KIIC Karawang",
    ],
    rating: 4.5,
    reviewCount: 18,
    featured: true,
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    title: "Kontrakan Sejahtera Jaya",
    slug: "sejahtera-jaya",
    location: "Wanasari, Telukjambe Barat",
    address: "Jl. Sejahtera Blok C No. 8, Desa Wanasari, Kec. Telukjambe Barat, Karawang",
    whatsapp: "6281122334455",
    ownerName: "Pak Budi",
    description:
      "Kontrakan baru renovasi dengan fasilitas lengkap. Keamanan 24 jam dan lingkungan yang tenang jauh dari kebisingan jalan besar.",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    ],
    units: [
      {
        id: "3a",
        type: "2 Petak",
        price: 750_000,
        available: true,
        facilities: [FACILITIES.kmDalam, FACILITIES.listrik900, FACILITIES.parkirMotor, FACILITIES.airPDAM],
        description: "Unit 2 petak baru renovasi dengan cat fresh dan kondisi terawat.",
        size: "32 m²",
        maxOccupants: 2,
      },
      {
        id: "3b",
        type: "3 Petak",
        price: 1_100_000,
        available: true,
        facilities: [FACILITIES.kmDalam, FACILITIES.listrik1300, FACILITIES.parkirAll, FACILITIES.airPDAM, FACILITIES.dapur, FACILITIES.teras],
        description: "Unit premium dengan teras pribadi dan fasilitas lengkap.",
        size: "50 m²",
        maxOccupants: 5,
      },
    ],
    coordinates: { lat: -6.33, lng: 107.31 },
    nearbyPlaces: [
      "3.5 km dari Stasiun Whoosh Karawang",
      "4 km dari Grand Outlet Karawang",
      "2.5 km dari GIIC Karawang",
    ],
    rating: 4.9,
    reviewCount: 31,
    featured: false,
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    title: "Kontrakan Melati Permai",
    slug: "melati-permai",
    location: "Wanasari, Telukjambe Barat",
    address: "Jl. Melati RT 03 No. 22, Desa Wanasari, Kec. Telukjambe Barat, Karawang",
    whatsapp: "6285566778899",
    ownerName: "Pak Agus",
    description:
      "Kontrakan dengan konsep bersih dan rapi. Tersedia dalam dua tipe dengan harga kompetitif. Lingkungan keluarga yang ramah dan aman.",
    images: [
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    ],
    units: [
      {
        id: "4a",
        type: "2 Petak",
        price: 680_000,
        available: true,
        facilities: [FACILITIES.kmLuar, FACILITIES.listrik900, FACILITIES.parkirMotor, FACILITIES.airSumur],
        description: "Unit ekonomis dengan kondisi terawat baik.",
        size: "28 m²",
        maxOccupants: 2,
      },
      {
        id: "4b",
        type: "3 Petak",
        price: 980_000,
        available: false,
        facilities: [FACILITIES.kmDalam, FACILITIES.listrik1300, FACILITIES.parkirMotor, FACILITIES.airSumur, FACILITIES.dapur],
        description: "Unit keluarga dengan ruang yang cukup luas.",
        size: "44 m²",
        maxOccupants: 4,
      },
    ],
    coordinates: { lat: -6.326, lng: 107.308 },
    nearbyPlaces: [
      "4 km dari Stasiun Whoosh Karawang",
      "5.5 km dari Grand Outlet Karawang",
      "3 km dari KIM Karawang",
    ],
    rating: 4.6,
    reviewCount: 15,
    featured: false,
    createdAt: "2024-04-05",
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "Apakah bisa bayar sewa secara bulanan?",
    answer:
      "Ya, pembayaran sewa dapat dilakukan secara bulanan. Beberapa kontrakan juga menawarkan diskon untuk pembayaran 3 bulan atau 6 bulan di muka. Silakan tanyakan langsung ke pemilik kontrakan melalui WhatsApp.",
  },
  {
    question: "Apakah tersedia parkir kendaraan?",
    answer:
      "Setiap kontrakan memiliki kebijakan parkir yang berbeda. Sebagian besar unit menyediakan parkir motor, dan beberapa unit tipe 3 petak juga menyediakan parkir mobil. Informasi lengkap tersedia di halaman detail masing-masing kontrakan.",
  },
  {
    question: "Apakah listrik sudah termasuk dalam sewa?",
    answer:
      "Listrik umumnya belum termasuk dalam harga sewa dan dibayar terpisah berdasarkan pemakaian. Kontrakan menggunakan meteran listrik PLN. Namun beberapa kontrakan mungkin memiliki skema berbeda, silakan konfirmasi ke pemilik.",
  },
  {
    question: "Bagaimana cara survey lokasi kontrakan?",
    answer:
      "Anda bisa langsung menghubungi pemilik kontrakan melalui tombol WhatsApp yang tersedia di halaman kontrakan. Pemilik akan mengatur jadwal survey sesuai kesepakatan. Survey bisa dilakukan pada hari kerja maupun akhir pekan.",
  },
  {
    question: "Apakah ada deposit atau uang muka?",
    answer:
      "Umumnya diperlukan deposit sebesar 1-2 bulan sewa sebagai jaminan. Deposit akan dikembalikan saat kontrak berakhir jika tidak ada kerusakan. Detail deposit dapat dikonfirmasi langsung ke masing-masing pemilik.",
  },
  {
    question: "Berapa lama kontrak minimal sewa?",
    answer:
      "Minimal kontrak sewa biasanya 1 bulan. Namun untuk mendapatkan harga terbaik, banyak pemilik menawarkan kontrak 6 bulan atau 1 tahun dengan harga lebih menarik.",
  },
  {
    question: "Apakah boleh membawa hewan peliharaan?",
    answer:
      "Kebijakan mengenai hewan peliharaan berbeda-beda tiap kontrakan. Silakan tanyakan langsung ke pemilik melalui WhatsApp sebelum menyewa.",
  },
  {
    question: "Seberapa dekat dengan kawasan industri Karawang?",
    answer:
      "Kontrakan di Wanasari sangat strategis, berjarak sekitar 1-5 km dari berbagai kawasan industri seperti KIM (Karawang Industrial Management), KIIC, dan GIIC. Sangat cocok untuk karyawan yang bekerja di kawasan industri tersebut.",
  },
];

// ─────────────────────────────────────────────
// Utility Helpers
// ─────────────────────────────────────────────

export function getKontrakansWithFilter(
  status: string = "all",
  unitType: string = "all"
): Kontrakan[] {
  return kontrakans.filter((k) => {
    if (status === "available" && !k.units.some((u) => u.available)) return false;
    if (status === "full" && !k.units.every((u) => !u.available)) return false;
    if (unitType !== "all" && !k.units.some((u) => u.type === unitType)) return false;
    return true;
  });
}

export function getKontrakById(id: string): Kontrakan | undefined {
  return kontrakans.find((k) => k.id === id || k.slug === id);
}
