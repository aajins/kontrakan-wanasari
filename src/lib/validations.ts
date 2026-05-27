import { z } from "zod";

const facilitySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

const unitSchema = z.object({
  id: z.string(),
  type: z.string().min(1, "Tipe unit wajib diisi"),
  price: z
    .number({ invalid_type_error: "Harga harus berupa angka" })
    .positive("Harga harus lebih dari 0")
    .min(100_000, "Harga minimal Rp 100.000"),
  available: z.boolean(),
  facilities: z
    .array(facilitySchema)
    .min(1, "Minimal 1 fasilitas harus dipilih untuk unit ini"),
  size: z.string().optional(),
  maxOccupants: z
    .number({ invalid_type_error: "Kapasitas harus berupa angka" })
    .positive("Kapasitas harus lebih dari 0")
    .optional()
    .or(z.nan().transform(() => undefined)),
  description: z.string().optional(),
});

export const kontrakSchema = z.object({
  title: z
    .string()
    .min(3, "Nama kontrakan minimal 3 karakter")
    .max(100, "Nama kontrakan terlalu panjang"),
  location: z.string().min(3, "Lokasi wajib diisi"),
  address: z
    .string()
    .min(10, "Alamat lengkap minimal 10 karakter")
    .max(300, "Alamat terlalu panjang"),
  whatsapp: z
    .string()
    .regex(
      /^62\d{9,12}$/,
      "Format WhatsApp harus dimulai dengan 62, contoh: 628123456789"
    ),
  ownerName: z.string().min(2, "Nama pemilik minimal 2 karakter"),
  description: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter")
    .max(1000, "Deskripsi terlalu panjang"),
  images: z
    .array(z.string().min(1, "URL foto tidak boleh kosong"))
    .min(1, "Minimal 1 URL foto diperlukan"),
  units: z.array(unitSchema).min(1, "Minimal 1 tipe unit diperlukan"),
  nearbyPlaces: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  slug: z.string().optional(),
});

export type KontrakSchemaType = z.infer<typeof kontrakSchema>;

// ─── Login ────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
