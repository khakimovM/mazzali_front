// src/services/types.ts  (yoki qayerda bo‘lsa)

export interface Image {
  name: string;
  width: number;
  height: number;
  url: string;
  mime: string;
}

export interface Tarif {
  id: string;
  price: string;
  description: string;
  special: string | null; // JSON da null bo‘lishi mumkin
}

export interface Partner {
  id: string;
  companyName: string;
  image: Image;
}

// Har bir repeatable bo‘lim uchun umumiy tip
interface SectionCard {
  id: string;
  title: string;
  subtitle: string;
  image: Image;
}

// To‘g‘ri HomePageData – array bo‘lgan joylarni [] qo‘shdim!
export interface HomePageData {
  documentId: string;

  heroSection: {
    id: string;
    title: string;
    subtitle: string;
    discount_text?: string;
    image: Image;
  };

  // ARRAYLAR
  forSection: SectionCard[];
  youGet: SectionCard[];
  howItWork: SectionCard[];

  // BITTA OBYEKT
  youGetMenu: SectionCard;
  getDesign: SectionCard;
  offerOne: SectionCard;
  offerTwo: SectionCard;

  // getTips alohida
  getTips: {
    id: string;
    title: string;
    image: Image[]; // sizda array bo‘lib kelgan!
    info: {
      id: string;
      title: string;
      subtitle: string;
    }[];
  };

  tarif: Tarif[];
  download: {
    id: string;
    title: string;
    url: string;
    image: Image;
  };
  partners: Partner[];
}

export type GraphQLResponse = {
  homePage: HomePageData;
  errors?: Array<{ message: string }>;
};
