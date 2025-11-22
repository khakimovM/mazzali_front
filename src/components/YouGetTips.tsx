// src/components/YouGetTips.tsx

import { buildStrapiUrl } from "../services/utils";

interface TipInfo {
  id: string;
  title: string;
  subtitle: string;
}

interface YouGetTipsItem {
  id: string;
  title: string;
  info: TipInfo[];
  image: { url: string }[]; // Strapi’da array bo‘lib kelgan
}

interface YouGetTipsProps {
  item: YouGetTipsItem;
}

export default function YouGetTips({ item }: YouGetTipsProps) {
  if (!item) return null;

  return (
    <section data-aos="fade-up" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-yellow-100 rounded-xl flex flex-col md:flex-row items-center gap-8 px-10 shadow-lg">
          {/* Matn qismi */}
          <div className="flex flex-col gap-6 order-2 md:order-1">
            <h3 className="text-3xl font-bold text-gray-900">{item.title}</h3>

            <div className="flex flex-col gap-6">
              {item.info.map((info) => (
                <div key={info.id} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src="/img/check-mark.png"
                      alt="✓"
                      className="w-6 h-6 flex-shrink-0"
                    />
                    <span className="text-red-500 font-semibold text-lg">
                      {info.title}
                    </span>
                  </div>
                  <p className="text-gray-700 ml-9">{info.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rasm qismi */}
          <img
            src={buildStrapiUrl(item.image[0].url)} // array bo‘lgani uchun [0]
            alt={item.title}
            className="w-full max-w-md object-contain h-full order-1 md:order-2 rounded-lg"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
