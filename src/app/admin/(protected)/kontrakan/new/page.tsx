import KontrakForm from "@/components/admin/KontrakForm";

export const metadata = {
  title: "Tambah Kontrakan – Admin Kontrakan Wanasari",
};

export default function NewKontrakPage() {
  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="font-black text-black text-xl mb-1">Tambah Kontrakan Baru</h2>
          <p className="text-gray-500 text-sm">
            Isi semua informasi kontrakan dengan lengkap dan benar.
          </p>
        </div>
        <KontrakForm mode="new" />
      </div>
    </div>
  );
}
