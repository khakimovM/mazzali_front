// src/components/YouGetSection.tsx

import { buildStrapiUrl } from "../services/utils";

interface YouGetItem {
  id: string;
  title: string;
  subtitle: string;
  image: { url: string };
  // backgroundImage qo‘shish shart emas – public/img dan olamiz
}

interface YouGetSectionProps {
  items: YouGetItem[];
}

export default function YouGetSection({ items }: YouGetSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section data-aos="fade-up" className="py-32">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
          Что вы получите?
        </h2>

        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {items.map((item, index) => (
            <div
              key={item.id}
              data-aos={
                index === 0
                  ? "fade-right"
                  : index === 1
                  ? "fade-up"
                  : "fade-left"
              }
              data-aos-delay={index * 100}
              className="bg-cover rounded-xl p-8 flex flex-col text-gray-800 items-center text-center  shadow-2xl"
              style={{
                backgroundImage: `url(/img/youget-item-${index + 1}-bg.jpg)`,
              }}
            >
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="leading-relaxed">{item.subtitle}</p>
              <img
                src={buildStrapiUrl(item.image.url)}
                alt={item.title}
                className="mt-6 w-32 h-32 object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
