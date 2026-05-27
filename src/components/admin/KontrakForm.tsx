"use client";

import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, Save, ArrowLeft, Loader2,
  AlertCircle, CheckCircle2, XCircle, GripVertical,
  ImageIcon, MapPin, Phone, User, FileText, SquareStack
} from "lucide-react";
import { toast } from "sonner";
import { kontrakSchema, KontrakSchemaType } from "@/lib/validations";
import { Kontrakan, KontrakFormValues } from "@/types";
import { useAdminData } from "@/contexts/AdminDataContext";
import FacilitySelector from "./FacilitySelector";

interface KontrakFormProps {
  mode: "new" | "edit";
  defaultData?: Kontrakan;
}

// ── Helpers ──────────────────────────────────────────────

/** Safely extract error message from react-hook-form FieldError */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errMsg(err: any): string | undefined {
  if (!err || typeof err !== "object") return undefined;
  if (typeof err.message === "string") return err.message;
  return undefined;
}

const defaultUnit = (): KontrakSchemaType["units"][0] => ({
  id: `u-${Date.now()}`,
  type: "",
  price: 700_000,
  available: true,
  facilities: [],
  size: "",
  maxOccupants: undefined,
  description: "",
});

function InputField({
  label,
  error,
  required,
  children,
  hint,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-black text-black mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-gray-400 font-medium">{hint}</p>}
      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError?: boolean) =>
  `w-full px-4 py-3 bg-[#FAF7FF] border-2 rounded-xl font-semibold text-black placeholder:text-gray-400 focus:outline-none transition-all ${
    hasError ? "border-red-500 focus:border-red-500" : "border-black focus:border-[#7C3AED]"
  }`;

// ── Main Component ──────────────────────────────────────

export default function KontrakForm({ mode, defaultData }: KontrakFormProps) {
  const router = useRouter();
  const { addKontrakan, updateKontrakan, facilities, addFacility } = useAdminData();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<KontrakSchemaType>({
    resolver: zodResolver(kontrakSchema),
    defaultValues: defaultData
      ? {
          title: defaultData.title,
          location: defaultData.location,
          address: defaultData.address,
          whatsapp: defaultData.whatsapp,
          ownerName: defaultData.ownerName,
          description: defaultData.description,
          images: defaultData.images,
          units: defaultData.units.map((u) => ({
            ...u,
            maxOccupants: u.maxOccupants,
          })),
          nearbyPlaces: defaultData.nearbyPlaces || [],
          featured: defaultData.featured || false,
          slug: defaultData.slug,
        }
      : {
          title: "",
          location: "Wanasari, Telukjambe Barat",
          address: "",
          whatsapp: "",
          ownerName: "",
          description: "",
          images: [""],
          units: [defaultUnit()],
          nearbyPlaces: [],
          featured: false,
        },
  });

  // ── Units field array ──
  const {
    fields: unitFields,
    append: appendUnit,
    remove: removeUnit,
  } = useFieldArray({ control, name: "units" });

  // ── Images field array ──
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({ control, name: "images" as never });

  // ── Nearby places field array ──
  const {
    fields: nearbyFields,
    append: appendNearby,
    remove: removeNearby,
  } = useFieldArray({ control, name: "nearbyPlaces" as never });

  // ── Submit ──
  const onSubmit: SubmitHandler<KontrakSchemaType> = async (data) => {
    try {
      const formValues: KontrakFormValues = {
        ...data,
        nearbyPlaces: data.nearbyPlaces || [],
        featured: data.featured || false,
      };

      if (mode === "new") {
        await addKontrakan(formValues);
        toast.success("Kontrakan berhasil ditambahkan! 🎉");
      } else if (defaultData) {
        await updateKontrakan(defaultData.id, formValues);
        toast.success("Kontrakan berhasil diperbarui! ✅");
      }

      router.push("/admin/kontrakan");
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const watchedImages = watch("images");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ── BASIC INFO ─────────────────────────────────── */}
      <Section title="Informasi Dasar" icon={<FileText className="w-5 h-5" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField label="Nama Kontrakan" required error={errors.title?.message}>
            <input
              {...register("title")}
              type="text"
              placeholder="Kontrakan Wanasari Indah"
              className={inputClass(!!errors.title)}
            />
          </InputField>

          <InputField label="Nama Pemilik" required error={errors.ownerName?.message}>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register("ownerName")}
                type="text"
                placeholder="Pak Hendra"
                className={`${inputClass(!!errors.ownerName)} pl-10`}
              />
            </div>
          </InputField>

          <InputField
            label="Nomor WhatsApp"
            required
            error={errors.whatsapp?.message}
            hint="Format: 628xxxx (dimulai dengan 62)"
          >
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register("whatsapp")}
                type="text"
                placeholder="628123456789"
                className={`${inputClass(!!errors.whatsapp)} pl-10`}
              />
            </div>
          </InputField>

          <InputField label="Lokasi" required error={errors.location?.message}>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register("location")}
                type="text"
                className={`${inputClass(!!errors.location)} pl-10`}
              />
            </div>
          </InputField>

          <div className="sm:col-span-2">
            <InputField label="Alamat Lengkap" required error={errors.address?.message}>
              <input
                {...register("address")}
                type="text"
                placeholder="Jl. Wanasari No. 12, Desa Wanasari..."
                className={inputClass(!!errors.address)}
              />
            </InputField>
          </div>

          <div className="sm:col-span-2">
            <InputField label="Deskripsi" required error={errors.description?.message}>
              <textarea
                {...register("description")}
                rows={3}
                placeholder="Deskripsi singkat kontrakan yang menarik..."
                className={`${inputClass(!!errors.description)} resize-none`}
              />
            </InputField>
          </div>

          <div className="sm:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  {...register("featured")}
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-5 h-5 border-2 border-black rounded-lg bg-[#FAF7FF] peer-checked:bg-[#7C3AED] peer-checked:border-[#7C3AED] transition-all flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 absolute" />
                </div>
              </div>
              <span className="font-bold text-black text-sm group-hover:text-[#7C3AED] transition-colors">
                Tandai sebagai Kontrakan Unggulan ✨
              </span>
            </label>
          </div>
        </div>
      </Section>

      {/* ── IMAGES ─────────────────────────────────────── */}
      <Section title="Foto Kontrakan" icon={<ImageIcon className="w-5 h-5" />}>
        {errors.images && (
          <ErrorBanner message={typeof errors.images?.message === "string" ? errors.images.message : "Minimal 1 foto diperlukan"} />
        )}
        <div className="space-y-3">
          {imageFields.map((field, idx) => (
            <div key={field.id} className="flex gap-2">
              <div className="flex-1 relative">
                <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register(`images.${idx}`)}
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className={`${inputClass(!!(errors.images?.[idx]))} pl-10`}
                />
              </div>
              {/* Preview */}
              {watchedImages?.[idx] && (
                <div className="w-12 h-12 rounded-xl border-2 border-black overflow-hidden flex-shrink-0 nb-shadow">
                  <img
                    src={watchedImages[idx]}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              )}
              {imageFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="w-12 h-12 flex items-center justify-center border-2 border-red-300 rounded-xl text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendImage("" as never)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-[#7C3AED] border-2 border-dashed border-[#7C3AED] rounded-xl hover:bg-[#F6F3FF] transition-all"
          >
            <Plus className="w-4 h-4" />
            Tambah Foto
          </button>
        </div>
      </Section>

      {/* ── UNITS ──────────────────────────────────────── */}
      <Section title="Tipe Unit" icon={<SquareStack className="w-5 h-5" />}>
        {errors.units && !Array.isArray(errors.units) && (
          <ErrorBanner message={errors.units.message || "Minimal 1 tipe unit diperlukan"} />
        )}

        <div className="space-y-5">
          <AnimatePresence initial={false}>
            {unitFields.map((field, idx) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-[#F6F3FF] border-2 border-black rounded-2xl p-5 relative"
                style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}
              >
                {/* Unit Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#7C3AED] rounded-lg flex items-center justify-center">
                      <span className="text-white font-black text-xs">{idx + 1}</span>
                    </div>
                    <span className="font-black text-black">Unit {idx + 1}</span>
                  </div>
                  {unitFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeUnit(idx)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-red-500 text-xs font-bold border-2 border-red-300 rounded-xl hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Hapus
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Unit Type */}
                  <InputField
                    label="Nama Tipe"
                    required
                    error={errMsg(errors.units?.[idx]?.type)}
                  >
                    <input
                      {...register(`units.${idx}.type`)}
                      type="text"
                      placeholder="Contoh: 2 Petak, 3 Petak"
                      className={inputClass(!!errors.units?.[idx]?.type)}
                    />
                  </InputField>

                  {/* Price */}
                  <InputField
                    label="Harga/bulan (Rp)"
                    required
                    error={errMsg(errors.units?.[idx]?.price)}
                  >
                    <input
                      {...register(`units.${idx}.price`, { valueAsNumber: true })}
                      type="number"
                      min={100000}
                      step={50000}
                      placeholder="700000"
                      className={inputClass(!!errors.units?.[idx]?.price)}
                    />
                  </InputField>

                  {/* Size */}
                  <InputField label="Luas (opsional)" error={errMsg(errors.units?.[idx]?.size)}>
                    <input
                      {...register(`units.${idx}.size`)}
                      type="text"
                      placeholder="30 m²"
                      className={inputClass(!!errors.units?.[idx]?.size)}
                    />
                  </InputField>

                  {/* Max Occupants */}
                  <InputField
                    label="Kapasitas (opsional)"
                    error={errMsg(errors.units?.[idx]?.maxOccupants)}
                  >
                    <input
                      {...register(`units.${idx}.maxOccupants`, { valueAsNumber: true })}
                      type="number"
                      min={1}
                      placeholder="2"
                      className={inputClass(!!errors.units?.[idx]?.maxOccupants)}
                    />
                  </InputField>

                  {/* Available Toggle */}
                  <div className="sm:col-span-2">
                    <Controller
                      control={control}
                      name={`units.${idx}.available`}
                      render={({ field }) => (
                        <div className="flex items-center gap-4">
                          <span className="font-black text-black text-sm">Status Unit:</span>
                          <button
                            type="button"
                            onClick={() => field.onChange(!field.value)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm border-2 transition-all ${
                              field.value
                                ? "bg-green-50 border-[#25D366] text-green-700"
                                : "bg-red-50 border-red-400 text-red-600"
                            }`}
                          >
                            {field.value ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                Tersedia
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4" />
                                Penuh / Tidak Tersedia
                              </>
                            )}
                          </button>
                          <span className="text-xs text-gray-400">klik untuk toggle</span>
                        </div>
                      )}
                    />
                  </div>

                  {/* Facilities */}
                  <div className="sm:col-span-2">
                    <Controller
                      control={control}
                      name={`units.${idx}.facilities`}
                      render={({ field }) => (
                        <FacilitySelector
                          value={field.value}
                          onChange={field.onChange}
                          masterFacilities={facilities}
                          onAddFacility={addFacility}
                          error={errMsg(errors.units?.[idx]?.facilities)}
                          label="Fasilitas Unit *"
                        />
                      )}
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <InputField
                      label="Deskripsi Unit (opsional)"
                      error={errMsg(errors.units?.[idx]?.description)}
                    >
                      <textarea
                        {...register(`units.${idx}.description`)}
                        rows={2}
                        placeholder="Deskripsi singkat tipe unit ini..."
                        className={`${inputClass(!!errors.units?.[idx]?.description)} resize-none`}
                      />
                    </InputField>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => appendUnit(defaultUnit())}
            className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#7C3AED] border-2 border-dashed border-[#7C3AED] rounded-xl hover:bg-[#F6F3FF] transition-all w-full justify-center"
          >
            <Plus className="w-4 h-4" />
            Tambah Tipe Unit
          </button>
        </div>
      </Section>

      {/* ── NEARBY PLACES ──────────────────────────────── */}
      <Section title="Lokasi Terdekat" icon={<MapPin className="w-5 h-5" />}>
        <div className="space-y-3">
          {nearbyFields.map((field, idx) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...register(`nearbyPlaces.${idx}`)}
                type="text"
                placeholder="Contoh: 3 km dari Stasiun Whoosh Karawang"
                className={`flex-1 ${inputClass(false)}`}
              />
              <button
                type="button"
                onClick={() => removeNearby(idx)}
                className="w-12 h-12 flex items-center justify-center border-2 border-red-300 rounded-xl text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendNearby("" as never)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-600 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all"
          >
            <Plus className="w-4 h-4" />
            Tambah Lokasi Terdekat
          </button>
        </div>
      </Section>

      {/* ── ACTIONS ────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push("/admin/kontrakan")}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#F6F3FF] text-black font-bold rounded-xl border-2 border-black nb-shadow hover:-translate-y-0.5 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Batal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#7C3AED] text-white font-black rounded-xl border-2 border-black disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-all"
          style={{ boxShadow: "4px 4px 0px #0A0A0A" }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {mode === "new" ? "Tambah Kontrakan" : "Simpan Perubahan"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ── Sub-components ────────────────────────────────────────────

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border-2 border-black rounded-2xl overflow-hidden nb-shadow">
      <div className="flex items-center gap-3 p-5 border-b-2 border-black bg-[#FAF7FF]">
        {icon && (
          <div className="w-8 h-8 bg-[#7C3AED] rounded-xl flex items-center justify-center text-white flex-shrink-0">
            {icon}
          </div>
        )}
        <h2 className="font-black text-black text-base">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="mb-4 flex items-start gap-2.5 px-4 py-3 bg-red-50 border-2 border-red-400 rounded-xl">
      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
      <span className="text-red-600 text-sm font-semibold">{message}</span>
    </div>
  );
}
