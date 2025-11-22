// src/pages/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import useAuthStore from "../store/AuthStore";

const API_BASE_URL = import.meta.env.VITE_NEST_BASE_URL;

export default function Login() {
  const navigate = useNavigate();

  // Auth store dan setRegistred ni olamiz (header va boshqa joylar uchun)
  const setRegistred = useAuthStore((state) => state.setRegistred);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password) {
      alert("Email va parolni to'ldiring!");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      };

      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        payload,
        { withCredentials: true } // agar backend httpOnly cookie bersa
      );

      const { access_token, refresh_token } = response.data.tokens;

      // Tokenlarni js-cookie orqali saqlaymiz
      Cookies.set("access_token", access_token, {
        expires: 14,
        path: "/",
        secure: true,
        sameSite: "lax",
      });

      localStorage.setItem("access_token", access_token);

      Cookies.set("refresh_token", refresh_token, {
        expires: 30,
        path: "/",
        secure: true,
        sameSite: "lax",
      });

      // Auth store ni yangilaymiz → header darhol o'zgaradi
      setRegistred(true);

      alert("Вы успешно вошли в аккаунт!");
      navigate("/"); // yoki "/dashboard"
    } catch (err: any) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        "Неверный email или пароль. Попробуйте снова.";
      alert(Array.isArray(msg) ? msg.join("\n") : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-10">
          <img
            src="/img/logo.svg"
            alt="Mazzami"
            className="mx-auto h-16 mb-6"
          />
          <h2 className="text-4xl font-extrabold text-gray-900">
            Добро пожаловать!
          </h2>
          <p className="mt-2 text-gray-600">Войдите в свой аккаунт</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="w-full px-5 py-4 border border-gray-300 rounded-full text-lg focus:outline-none focus:border-red-500 transition"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Пароль
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-5 py-4 border border-gray-300 rounded-full text-lg focus:outline-none focus:border-red-500 transition"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white font-bold text-xl py-5 rounded-full hover:bg-red-600 transition shadow-lg disabled:opacity-70"
          >
            {loading ? "Входим..." : "Войти"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Еще нет аккаунта?{" "}
            <Link
              to="/register"
              className="text-red-500 font-bold hover:underline"
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
