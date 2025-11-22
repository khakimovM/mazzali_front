// src/components/OfferTwo.tsx

import { buildStrapiUrl } from "../services/utils";

interface OfferTwoItem {
  id: string;
  title: string;
  subtitle: string;
  image: {
    url: string;
  };
}

interface OfferTwoProps {
  item: OfferTwoItem;
}

export default function OfferTwo({ item }: OfferTwoProps) {
  if (!item) return null;

  return (
    <section data-aos="fade-up" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gray-100 rounded-xl overflow-hidden flex flex-col md:flex-row items-center gap-8 p-12 shadow-xl">
          {/* Rasm – chapda */}
          <div className="md:w-1/2">
            <img
              src={buildStrapiUrl(item.image.url)}
              alt={item.title}
              className="w-full object-contain rounded-lg"
              loading="lazy"
            />
          </div>

          {/* Matn – o'ngda */}
          <div className="flex flex-col gap-6 md:w-1/2">
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
              {item.title}
            </h2>
            <p className="text-lg leading-relaxed text-gray-800">
              {item.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
