import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import LocationCarousel from "@/components/sections/LocationCarousel";
import KontrakSection from "@/components/sections/KontrakSection";
import FAQSection from "@/components/sections/FAQSection";
import WhatsAppSticky from "@/components/layout/WhatsAppSticky";
import { getSupabaseAdmin } from "@/lib/supabase";
import { Kontrakan } from "@/types";
import { kontrakans as seedKontrakans } from "@/data/kontrakan";

// Revalidate every 60 seconds so new admin changes are visible soon
export const revalidate = 60;

async function fetchKontrakans(): Promise<Kontrakan[]> {
  try {
    const db = getSupabaseAdmin();
    const { data, error } = await db
      .from("kontrakans")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) throw error;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((row: any): Kontrakan => ({
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
    }));
  } catch {
    // Fallback to static seed data if DB isn't reachable (e.g. missing env vars locally)
    return seedKontrakans;
  }
}

export default async function Home() {
  const kontrakans = await fetchKontrakans();

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        <HeroSection />
        <LocationCarousel />
        <KontrakSection initialKontrakans={kontrakans} />
        <FAQSection />
      </main>
      <Footer />
      <WhatsAppSticky />
    </>
  );
}
