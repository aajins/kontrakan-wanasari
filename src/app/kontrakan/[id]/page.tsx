import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";
import { Kontrakan } from "@/types";
import KontrakDetailClient from "./KontrakDetailClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppSticky from "@/components/layout/WhatsAppSticky";

// Revalidate so edits in admin panel appear within 60 s
export const revalidate = 60;

interface Props {
  params: Promise<{ id: string }>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): Kontrakan {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    location: row.location,
    address: row.address,
    whatsapp: row.whatsapp,
    ownerName: row.owner_name,
    description: row.description,
    images: row.images ?? [],
    units: row.units ?? [],
    coordinates: row.coordinates ?? undefined,
    nearbyPlaces: row.nearby_places ?? [],
    rating: row.rating ?? undefined,
    reviewCount: row.review_count ?? undefined,
    featured: row.featured ?? false,
    createdAt: row.created_at,
  };
}

async function getKontrakan(id: string): Promise<Kontrakan | null> {
  try {
    const db = getSupabaseAdmin();
    const { data, error } = await db
      .from("kontrakans")
      .select("*")
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    if (error || !data) return null;
    return mapRow(data);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const kontrakan = await getKontrakan(id);
  if (!kontrakan) return {};
  return {
    title: `${kontrakan.title} – Kontrakan Wanasari`,
    description: kontrakan.description,
  };
}

export default async function KontrakDetailPage({ params }: Props) {
  const { id } = await params;
  const kontrakan = await getKontrakan(id);

  if (!kontrakan) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pb-24 md:pb-0">
        <KontrakDetailClient kontrakan={kontrakan} />
      </main>
      <Footer />
      <WhatsAppSticky />
    </>
  );
}
