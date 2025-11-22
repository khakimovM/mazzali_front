// src/pages/Register.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import useAuthStore from "../store/AuthStore";

const API_BASE_URL = import.meta.env.VITE_NEST_BASE_URL;

export default function Register() {
  const navigate = useNavigate();

  const setRegistred = useAuthStore((state) => state.setRegistred);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    if (!form.email.trim()) {
      alert("Email обязательно!");
      return;
    }

    setLoading(true);

    try {
      const payload: any = {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      };

      if (form.firstName.trim()) payload.firstName = form.firstName.trim();
      if (form.lastName.trim()) payload.lastName = form.lastName.trim();

      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        payload,
        { withCredentials: true }
      );

      const { access_token, refresh_token } = response.data.tokens;

      // Cookie larni saqlaymiz
      Cookies.set("access_token", access_token, {
        expires: 14,
        path: "/",
        secure: true,
        sameSite: "lax",
      });

      localStorage.setItem("access_token", access_token);

      Cookies.set("refresh_token", refresh_token, {
        expires: 30,
        secure: true,
        path: "/",
        sameSite: "lax",
      });

      // <<< BU YERDA MUHIM >>>
      // Store ni yangilaymiz – header darhol "Войти" ni olib tashlaydi
      setRegistred(true);

      alert("Вы успешно зарегистрированы!");
      navigate("/");
    } catch (err: any) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        "Ошибка при регистрации. Попробуйте позже.";
      alert(Array.isArray(msg) ? msg.join("\n") : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <img
            src="/img/logo.svg"
            alt="Mazzami"
            className="mx-auto h-16 mb-6"
          />
          <h2 className="text-4xl font-extrabold text-gray-900">Регистрация</h2>
          <p className="mt-2 text-gray-600">
            Создайте аккаунт для начала работы
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Имя (необязательно)"
            className="w-full px-5 py-4 border border-gray-300 rounded-full text-lg focus:outline-none focus:border-red-500"
            disabled={loading}
          />

          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Фамилия (необязательно)"
            className="w-full px-5 py-4 border border-gray-300 rounded-full text-lg focus:outline-none focus:border-red-500"
            disabled={loading}
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email *"
            className="w-full px-5 py-4 border border-gray-300 rounded-full text-lg focus:outline-none focus:border-red-500"
            required
            disabled={loading}
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Придумайте пароль *"
            className="w-full px-5 py-4 border border-gray-300 rounded-full text-lg focus:outline-none focus:border-red-500"
            required
            disabled={loading}
          />

          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Повторите пароль *"
            className="w-full px-5 py-4 border border-gray-300 rounded-full text-lg focus:outline-none focus:border-red-500"
            required
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white font-bold text-xl py-5 rounded-full hover:bg-red-600 transition shadow-lg mt-8 disabled:opacity-70"
          >
            {loading ? "Подождите..." : "Зарегистрироваться"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Уже есть аккаунт?{" "}
            <Link
              to="/login"
              className="text-red-500 font-bold hover:underline"
            >
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
