// src/components/FreeTrialModal.tsx
import { useState } from "react";

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FreeTrialModal({
  isOpen,
  onClose,
}: FreeTrialModalProps) {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      alert("Телефон рақамини киритинг!");
      return;
    }

    setLoading(true);
    console.log("Заявка:", {
      phone: phone.replace(/\D/g, ""),
      message: message.trim() || null,
    });

    alert("Ариза қабул қилинди! Тез орада боғланамиз 🚀");
    setPhone("");
    setMessage("");
    setLoading(false);
    onClose();
  };

  return (
    <>
      {/* YANGI: Blur + qorong‘i overlay – orqa fon ko‘rinib turadi */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Blur fon */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300"
          onClick={onClose} // tashqariga bosilganda yopiladi
        />

        {/* Modal o'zi */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 animate-in fade-in zoom-in duration-300">
          {/* Yopish tugmasi */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-light z-10"
            aria-label="Yopish"
          >
            ×
          </button>

          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Бепул синовдан ўтиш
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Телефон рақамиңиз *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 __ ___ __ __"
                className="w-full px-5 py-4 border border-gray-300 rounded-full text-lg focus:outline-none focus:border-red-500 transition"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Қўшимча хабар (иxtiyoriy)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Сизга қандай ёрдам бера оламиз?"
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl text-lg focus:outline-none focus:border-red-500 resize-none transition"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 text-white font-bold text-xl py-5 rounded-full hover:bg-red-600 transition shadow-lg disabled:opacity-70"
            >
              {loading ? "Юбориляпти..." : "Ариза юбориш"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
