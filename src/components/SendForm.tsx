// src/components/SendForm.tsx
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import SuccessModal from "./SuccessModal";

const API_BASE_URL = import.meta.env.VITE_NEST_BASE_URL;

export default function SendForm() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const getAccessToken = () => Cookies.get("access_token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone.trim()) {
      alert("Телефон рақамини киритинг!");
      return;
    }
    if (!message.trim()) {
      alert("Хабарни киритинг!");
      return;
    }

    const token = getAccessToken() || localStorage.getItem("access_token");
    console.log(token);

    if (!token) {
      alert("Авторизация талаб қилинади!");
      return;
    }

    setLoading(true);

    try {
      // 1. /me dan userId ni olish
      const meResponse = await axios.get(`${API_BASE_URL}/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userId = meResponse.data.user.id; // { message: 'success', user: { id, ... } }

      // 2. /leads ga POST so'rov
      await axios.post(
        `${API_BASE_URL}/leads`,
        {
          phone: phone.replace(/\D/g, ""), // faqat raqamlar
          message: message.trim(),
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Muvaffaqiyatli bo'lsa — modal ko'rsatamiz
      setShowSuccess(true);
      setPhone("");
      setMessage("");
    } catch (err: any) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message || "Хатолик юз берди. Қайта уриниб кўринг.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        data-aos="fade-up"
        className="py-24 bg-[url('/img/how-bg.jpg')] bg-cover bg-center flex justify-center items-center"
      >
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full">
          <h2 className="text-2xl font-extrabold text-gray-800 text-center mb-6">
            Оставьте заявку <br /> и мы с вами свяжемся
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Номер телефона *"
              className="w-full px-5 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              required
              disabled={loading}
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ваше сообщение *"
              rows={4}
              className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none transition"
              required
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-red-500 text-white font-bold text-xl py-5 rounded-full shadow-md hover:bg-red-600 transition disabled:opacity-70"
            >
              {loading ? "Юбориляпти..." : "Отправить"}
            </button>
          </form>
        </div>
      </section>

      {/* Muvaffaqiyat modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
}
