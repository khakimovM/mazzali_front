import { useEffect } from "react";
import AOS from "aos";
import { useHomePage } from "../services/hooks";
import Showcase from "../components/Showcase";
import ForSection from "../components/ForSection";
import YouGetSection from "../components/YouGetSection";
import YouGetMenu from "../components/YouGetMenu";
import YouGetTips from "../components/YouGetTips";
import YouGetDesign from "../components/YouGetDesign";
import HowItWorks from "../components/HowItWorks";
import OfferOne from "../components/OfferOne";
import OfferTwo from "../components/OfferTwo";
import Tariff from "../components/Tariff";
import Download from "../components/Download";
import Partners from "../components/Partners";
import SendForm from "../components/SendForm";

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
      mirror: true,
      anchorPlacement: "top-bottom",
    });
    AOS.refresh();
  }, []);

  const { data, error, loading } = useHomePage();
  const homePage = data?.homePage;

  console.log(homePage?.forSection);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (!homePage) return null;

  return (
    <main className="font-raleway text-gray-800">
      <Showcase hero={homePage.heroSection} />
      <ForSection items={homePage.forSection} />
      <YouGetSection items={homePage.youGet} />
      <YouGetMenu item={homePage.youGetMenu} />
      <YouGetTips item={homePage.getTips} />
      <YouGetDesign item={homePage.getDesign} />
      <HowItWorks items={homePage.howItWork} />
      <OfferOne item={homePage.offerOne} />
      <OfferTwo item={homePage.offerTwo} />
      <Tariff items={homePage.tarif} />
      <Download item={homePage.download} />
      <Partners items={homePage.partners} />
      <SendForm />
    </main>
  );
};

export default HomePage;
