// src/components/ForSection.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { buildStrapiUrl } from "../services/utils";

interface ForSectionItem {
  id: string;
  title: string;
  subtitle: string;
  image: { url: string };
}

interface ForSectionProps {
  items: ForSectionItem[];
}

export default function ForSection({ items }: ForSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section data-aos="fade-up" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-12 lg:mb-20">
          Для кого наш сервис?
        </h2>

        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            type: "progressbar", // <-- uzunchoq pagination!
          }}
          spaceBetween={40}
          slidesPerView={1}
          loop={items.length > 1}
          className="rounded-3xl overflow-hidden shadow-2xl"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col md:flex-row h-[500px] lg:h-[600px] bg-white">
                {/* Matn qismi – chapda */}
                <div className="w-full md:w-1/2 flex flex-col justify-center p-10 lg:p-16 bg-gradient-to-br from-gray-50 to-gray-100">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl">
                    {item.subtitle}
                  </p>
                </div>

                {/* Rasm qismi – o'ngda, to'liq 50% */}
                <div className="relative w-full md:w-1/2 bg-gray-100">
                  <img
                    src={buildStrapiUrl(item.image.url)}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom uzunchoq pagination – gray aktiv */}
      <style>{`
        :global(.swiper-pagination-progressbar) {
          background: #e5e7eb; /* gray-300 */
          height: 6px;
          top: auto !important;
          bottom: 0 !important;
          border-radius: 9999px;
        }
        :global(
            .swiper-pagination-progressbar .swiper-pagination-progressbar-fill
          ) {
          background: #6b7280; /* gray-500 – aktiv rang */
          border-radius: 9999px;
        }
      `}</style>
    </section>
  );
}
