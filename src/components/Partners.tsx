// src/components/Partners.tsx

import { buildStrapiUrl } from "../services/utils";

interface PartnerItem {
  id: string;
  companyName: string;
  image: {
    url: string;
  };
}

interface PartnersProps {
  items: PartnerItem[];
}

export default function Partners({ items }: PartnersProps) {
  if (!items || items.length === 0) return null;

  return (
    <section data-aos="fade-up" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
          С нами уже работают:
        </h2>

        <div className="flex flex-wrap justify-center gap-12">
          {items.map((partner) => (
            <div
              key={partner.id}
              data-aos="zoom-in"
              data-aos-delay="100"
              className="flex flex-col items-center gap-4 w-48 bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={buildStrapiUrl(partner.image.url)}
                alt={partner.companyName}
                className="w-32 h-32 object-contain"
                loading="lazy"
              />
              <h3 className="text-lg font-medium text-gray-800">
                {partner.companyName}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
