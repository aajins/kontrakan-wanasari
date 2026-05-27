"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Building2, Eye, EyeOff, Lock, User, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { loginSchema, LoginSchemaType } from "@/lib/validations";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setServerError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error || "Login gagal");
        return;
      }
      toast.success("Login berhasil! Selamat datang, Admin. 👋");
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setServerError("Terjadi kesalahan koneksi. Coba lagi.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7FF] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#0A0A0A,#0A0A0A 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#0A0A0A,#0A0A0A 1px,transparent 1px,transparent 40px)",
          }}
        />
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-20 h-20 bg-[#7C3AED] border-2 border-black rounded-2xl nb-shadow opacity-20"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-24 left-16 w-14 h-14 bg-[#9333EA] border-2 border-black rounded-xl opacity-15"
        />
        <div className="absolute top-40 left-10 w-8 h-8 bg-[#7C3AED] border-2 border-black rounded-lg opacity-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div
          className="bg-white border-2 border-black rounded-2xl p-8"
          style={{ boxShadow: "8px 8px 0px #7C3AED" }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#7C3AED] border-2 border-black rounded-2xl nb-shadow mx-auto mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-black text-2xl text-black">Admin Panel</h1>
            <p className="text-gray-500 text-sm mt-1 font-medium">Kontrakan Wanasari</p>
          </div>

          {/* Server Error */}
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-4 py-3 bg-red-50 border-2 border-red-500 rounded-xl flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-red-600 text-sm font-semibold">{serverError}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Username */}
            <div>
              <label className="block text-sm font-black text-black mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("username")}
                  type="text"
                  placeholder="Masukkan username"
                  autoComplete="username"
                  className={`w-full pl-10 pr-4 py-3 bg-[#FAF7FF] border-2 rounded-xl font-semibold text-black placeholder:text-gray-400 focus:outline-none transition-all ${
                    errors.username
                      ? "border-red-500 focus:border-red-500"
                      : "border-black focus:border-[#7C3AED]"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-black text-black mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  className={`w-full pl-10 pr-12 py-3 bg-[#FAF7FF] border-2 rounded-xl font-semibold text-black placeholder:text-gray-400 focus:outline-none transition-all ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-black focus:border-[#7C3AED]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-[#7C3AED] text-white font-black rounded-xl border-2 border-black disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 transition-all"
              style={{ boxShadow: "4px 4px 0px #0A0A0A" }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Masuk ke Dashboard
                </>
              )}
            </button>
          </form>

          {/* Back link */}
          <div className="mt-6 pt-6 border-t-2 border-black/10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#7C3AED] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Website
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4 font-medium">
          Akses terbatas untuk admin Kontrakan Wanasari
        </p>
      </motion.div>
    </div>
  );
}
