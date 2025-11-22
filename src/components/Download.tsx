// src/components/Download.tsx

import { buildStrapiUrl } from "../services/utils";

interface DownloadItem {
  id: string;
  title: string; // "Скачайте презентацию сервиса Mazzami с подробной информацией"
  url: string; // PDF link (Strapi’da Media yoki URL bo‘lishi mumkin)
  image: {
    url: string;
  };
}

interface DownloadProps {
  item: DownloadItem;
}

export default function Download({ item }: DownloadProps) {
  if (!item) return null;

  return (
    <section data-aos="fade-up" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gray-100 rounded-xl flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-xl">
          {/* Matn va tugma – chapda */}
          <div className="flex flex-col gap-6 p-12 md:w-1/2">
            <p className="text-3xl font-extrabold text-gray-900 leading-snug">
              {item.title
                .replace(/<br\s*\/?>/gi, "\n")
                .split("\n")
                .map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
            </p>

            {/* Tugma – Strapi’da URL bo‘lsa shu ishlaydi */}
            <a
              href={item.url || "#!"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-500 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-red-600 transition w-fit transform hover:scale-105"
            >
              Скачать
            </a>
          </div>

          {/* Rasm – o'ngda */}
          <div className="md:w-1/2">
            <img
              src={buildStrapiUrl(item.image.url)}
              alt="Презентация Mazzami"
              className="w-full object-contain rounded-b-xl md:rounded-none"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
