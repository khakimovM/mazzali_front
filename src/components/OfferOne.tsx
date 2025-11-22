// src/components/OfferOne.tsx

import { buildStrapiUrl } from "../services/utils";

interface OfferOneItem {
  id: string;
  title: string;
  subtitle: string;
  image: {
    url: string;
  };
}

interface OfferOneProps {
  item: OfferOneItem;
}

export default function OfferOne({ item }: OfferOneProps) {
  if (!item) return null;

  return (
    <section data-aos="fade-up" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-[#FFEED6] rounded-xl overflow-hidden flex flex-col md:flex-row items-center shadow-xl">
          {/* Matn qismi – chapda */}
          <div className="flex flex-col gap-6 p-12 md:w-1/2">
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
              {item.title}
            </h2>
            <p className="text-lg leading-relaxed text-gray-800">
              {item.subtitle}
            </p>
          </div>

          {/* Rasm qismi – o'ngda */}
          <div className="md:w-1/2">
            <img
              src={buildStrapiUrl(item.image.url)}
              alt={item.title}
              className="w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
