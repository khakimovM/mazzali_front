// src/components/HowItWorks.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { buildStrapiUrl } from "../services/utils";

interface HowItWorkItem {
  id: string;
  title: string; // masalan "#1"
  subtitle: string; // matn
  image: { url: string };
}

interface HowItWorksProps {
  items: HowItWorkItem[];
}

export default function HowItWorks({ items }: HowItWorksProps) {
  if (!items || items.length === 0) return null;

  return (
    <section
      data-aos="fade-up"
      className="py-24 bg-[url('/img/how-bg.jpg')] bg-cover bg-center"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
          Как это работает?
        </h2>

        {/* Desktop: 3 ta karta yonma-yon */}
        <div className="hidden md:flex justify-center gap-12 flex-wrap">
          {items.map((item, index) => (
            <div
              key={item.id}
              data-aos="zoom-in"
              data-aos-delay={(index + 1) * 200}
              className="bg-white rounded-xl p-10 flex flex-col items-center max-w-xs shadow-2xl"
            >
              <img
                src={buildStrapiUrl(item.image.url)}
                alt={item.title}
                className="w-40 mb-6 object-contain"
                loading="lazy"
              />
              <span className="text-5xl text-red-500 font-bold mb-4">
                {item.title}
              </span>
              <p className="text-lg font-semibold text-center leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: Swiper slider */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true, dynamicBullets: true }}
            spaceBetween={30}
            slidesPerView={1}
            className="pb-12"
          >
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white rounded-xl p-10 flex flex-col items-center mx-4 shadow-2xl">
                  <img
                    src={buildStrapiUrl(item.image.url)}
                    alt={item.title}
                    className="w-40 mb-6 object-contain"
                    loading="lazy"
                  />
                  <span className="text-5xl text-red-500 font-bold mb-4">
                    {item.title}
                  </span>
                  <p className="text-lg font-semibold text-center leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Swiper pagination chiroyli qilish */}
      <style>{`
        :global(.swiper-pagination-bullet) {
          background: rgba(255, 255, 255, 0.8);
          opacity: 0.7;
        }
        :global(.swiper-pagination-bullet-active) {
          background: #ef4444;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
