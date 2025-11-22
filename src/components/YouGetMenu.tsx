// src/components/YouGetMenu.tsx

import { buildStrapiUrl } from "../services/utils";

interface YouGetMenuItem {
  id: string;
  title: string;
  subtitle: string;
  image: {
    url: string;
  };
}

interface YouGetMenuProps {
  item: YouGetMenuItem;
}

export default function YouGetMenu({ item }: YouGetMenuProps) {
  if (!item) return null;

  return (
    <section data-aos="fade-up" className="">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gray-100 rounded-xl flex flex-col md:flex-row items-center gap-8 px-10 shadow-lg">
          {/* Rasm chapda (mobil uchun yuqorida) */}
          <img
            src={buildStrapiUrl(item.image.url)}
            alt={item.title}
            className="w-full max-w-md h-full object-contain rounded-lg"
            loading="lazy"
          />

          {/* Matn o'ngda */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <h3 className="text-3xl font-bold text-gray-900 leading-tight">
              {item.title}
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              {item.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
