import AOS from "aos";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FreeTrialModal from "./FreeTrialModal";
import useAuthStore from "../store/AuthStore";

interface TarifItem {
  id: string;
  price: string;
  description: string;
  special: string | null;
}

interface TariffProps {
  items: TarifItem[];
}

export default function Tariff({ items }: TariffProps) {
  const navigate = useNavigate();
  const isRegistred = useAuthStore((state) => state.isRegistred);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    AOS.refresh();
  }, []);

  if (!items || items.length === 0) return null;

  const specialItem = items.find((item) => item.special !== null);
  const regularItems = items.filter((item) => item.special === null);

  // Tugma bosilganda — xuddi Showcase dagi logika
  const handleTryFree = () => {
    if (isRegistred) {
      setModalOpen(true); // Modal ochiladi
    } else {
      navigate("/login"); // Login sahifasiga yo‘naltiradi
    }
  };

  return (
    <>
      <section
        data-aos="fade-up"
        className="py-32 bg-[url('/img/tariff.jpg')] bg-cover bg-center relative"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold text-red-500 mb-16">Тарифы</h2>

          {/* Tariff cards */}
          <div className="flex flex-wrap justify-center gap-10">
            {regularItems.map((item, index) => (
              <div
                key={item.id}
                data-aos="zoom-in"
                data-aos-delay={(index + 1) * 200}
                className="bg-white rounded-xl p-10 max-w-md shadow-2xl"
              >
                <span className="text-5xl font-bold mb-4 block text-gray-900">
                  {item.price}
                </span>
                <p className="text-lg font-semibold text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}

            {specialItem && (
              <div
                data-aos="zoom-in"
                data-aos-delay="400"
                className="bg-white rounded-xl p-10 flex flex-col md:flex-row justify-between items-center gap-6 max-w-3xl shadow-2xl border-4 border-red-500 relative overflow-hidden"
              >
                <div className="absolute -top-1 -right-1 bg-red-500 text-white px-8 py-2 rotate-12 text-xl font-bold shadow-lg">
                  Акция!
                </div>

                <div className="flex flex-col gap-4 text-left z-10">
                  <span className="text-3xl font-extrabold text-red-500">
                    {specialItem.special}
                  </span>
                  <p className="text-lg text-gray-700">
                    {specialItem.description}
                  </p>
                </div>
                <span className="text-4xl font-bold text-gray-900 whitespace-nowrap">
                  {specialItem.price}
                </span>
              </div>
            )}
          </div>

          {/* CTA button — ENDI MODAL OCHADI */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <button
              onClick={handleTryFree}
              className="bg-red-500 text-white font-bold text-xl px-16 py-5 rounded-full shadow-2xl hover:bg-red-600 transform hover:scale-105 transition duration-300"
            >
              Попробовать бесплатно
            </button>
            <span className="text-gray-700 text-lg font-medium bg-white/80 px-6 py-2 rounded-full backdrop-blur">
              Бесплатный пробный период 1 месяц
            </span>
          </div>
        </div>
      </section>

      {/* Bir xil modal — endi bu yerda ham ishlaydi */}
      <FreeTrialModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
