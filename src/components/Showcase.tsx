// src/components/Showcase.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildStrapiUrl } from "../services/utils";
import FreeTrialModal from "./FreeTrialModal"; // ← YANGI IMPORT
import useAuthStore from "../store/AuthStore";

interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  discount_text?: string | null;
  image: { url: string };
}

interface HeaderProps {
  hero: HeroSection;
}

export default function Showcase({ hero }: HeaderProps) {
  const navigate = useNavigate();
  const isRegistred = useAuthStore((state) => state.isRegistred);

  const [modalOpen, setModalOpen] = useState(false);

  if (!hero) return null;

  const handleTryFree = () => {
    if (isRegistred) {
      setModalOpen(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header
        data-aos="zoom-in"
        className="relative w-full bg-[url('/img/header-bg.jpg')] bg-cover bg-center pt-48 pb-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center flex flex-col items-center">
          <img
            src={buildStrapiUrl(hero.image.url)}
            alt="Mazzami Logo"
            className="max-w-md mb-12 drop-shadow-2xl"
            loading="lazy"
          />

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight drop-shadow-lg">
            {hero.title}
          </h1>

          <p className="text-xl lg:text-2xl max-w-4xl mb-12 text-gray-800 font-medium drop-shadow">
            {hero.subtitle}
          </p>

          <div className="flex flex-col items-center gap-6">
            <button
              onClick={handleTryFree}
              className="bg-red-500 text-white font-bold text-lg px-12 py-5 rounded-full shadow-2xl hover:bg-red-600 transform hover:scale-105 transition duration-300"
            >
              Попробовать бесплатно
            </button>

            {hero.discount_text && (
              <span className="text-xl lg:text-2xl font-semibold text-gray-700 bg-white/80 px-8 py-3 rounded-full backdrop-blur">
                {hero.discount_text}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Alohida componenta chiqarilgan modal */}
      <FreeTrialModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
