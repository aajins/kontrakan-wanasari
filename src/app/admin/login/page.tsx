import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login Admin – Kontrakan Wanasari",
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7FF]" />}>
      <LoginForm />
    </Suspense>
  );
}
