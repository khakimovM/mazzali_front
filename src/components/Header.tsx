// src/components/Header.tsx yoki src/layout/Header.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Sizning storingizdan faqat shu ikkitasini olamiz
  const isRegistred = useAuthStore((state) => state.isRegistred);
  const setRegistred = useAuthStore((state) => state.setRegistred);

  const handleLogout = () => {
    setRegistred(false);
    // Agar cookie larni ham tozalamoqchi bo'lsangiz (tavsiya etiladi):
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    document.cookie =
      "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
  };

  return (
    <header
      data-aos="fade-down"
      className="sticky top-0 left-0 w-full bg-white px-10 py-5 flex items-center justify-between shadow-md z-50"
    >
      {/* Logo */}
      <a href="#!" className="flex items-center">
        <img src="/img/logo.svg" alt="Logo" className="h-10" />
      </a>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-12 text-gray-800 text-[20px] font-semibold">
        <li>
          <a href="#!" className="hover:text-red-500">
            Преимущества
          </a>
        </li>
        <li>
          <a href="#!" className="hover:text-red-500">
            Для кого
          </a>
        </li>
        <li>
          <a href="#!" className="hover:text-red-500">
            Контакты
          </a>
        </li>

        {/* Agar kirgan bo'lsa — Войти yo'qoladi */}
        {!isRegistred && (
          <li>
            <Link to="/login" className="hover:text-red-500">
              Войти
            </Link>
          </li>
        )}

        {/* Agar kirgan bo'lsa — Выйти chiqadi (ixtiyoriy) */}
        {isRegistred && (
          <li>
            <button
              onClick={handleLogout}
              className="text-red-500 font-bold hover:underline"
            >
              Выйти
            </button>
          </li>
        )}

        <li>
          <a href="#!" className="hover:text-red-500">
            RU
          </a>
        </li>
      </ul>

      {/* Burger */}
      <div
        className="md:hidden flex flex-col justify-between w-6 h-5 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="block h-0.5 bg-black"></span>
        <span className="block h-0.5 bg-black"></span>
        <span className="block h-0.5 bg-black"></span>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-70 flex items-center justify-center">
          <ul className="flex flex-col gap-6 text-white text-xl font-semibold">
            <li>
              <a href="#!" onClick={() => setOpen(false)}>
                Преимущества
              </a>
            </li>
            <li>
              <a href="#!" onClick={() => setOpen(false)}>
                Для кого
              </a>
            </li>
            <li>
              <a href="#!" onClick={() => setOpen(false)}>
                Контакты
              </a>
            </li>

            {/* Mobile da ham bir xil shart */}
            {!isRegistred ? (
              <li>
                <Link to="/login" onClick={() => setOpen(false)}>
                  Войти
                </Link>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                >
                  Выйти
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
