"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Hapus",
  cancelLabel = "Batal",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  const colors = {
    danger: {
      icon: "bg-red-100 border-red-500",
      iconColor: "text-red-500",
      confirm: "bg-red-500 hover:bg-red-600 text-white",
      shadow: "8px 8px 0px #EF4444",
    },
    warning: {
      icon: "bg-yellow-100 border-yellow-500",
      iconColor: "text-yellow-600",
      confirm: "bg-yellow-500 hover:bg-yellow-600 text-white",
      shadow: "8px 8px 0px #F59E0B",
    },
  }[variant];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && !loading && onCancel()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white border-2 border-black rounded-2xl p-6 max-w-sm w-full"
            style={{ boxShadow: colors.shadow }}
          >
            {/* Icon */}
            <div
              className={`w-14 h-14 ${colors.icon} border-2 rounded-2xl flex items-center justify-center mx-auto mb-4`}
            >
              <AlertTriangle className={`w-7 h-7 ${colors.iconColor}`} />
            </div>

            <h3 className="font-black text-xl text-black text-center mb-2">{title}</h3>
            <p className="text-gray-500 text-sm text-center leading-relaxed mb-6">
              {description}
            </p>

            <div className="flex gap-3">
              <button
                onClick={onCancel}
                disabled={loading}
                className="flex-1 py-3 bg-[#F6F3FF] text-black font-bold rounded-xl border-2 border-black hover:-translate-y-0.5 transition-all disabled:opacity-50"
              >
                {cancelLabel}
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className={`flex-1 py-3 ${colors.confirm} font-black rounded-xl border-2 border-black hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
