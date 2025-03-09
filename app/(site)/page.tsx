import SliderSection from "./components/home/slider/SliderSection";
import Activities from "./components/home/Activities";
import Features from "./components/home/Features";
import Volunteer from "./components/home/Volunteer";
import PortfolioGrid from "./components/home/Portfolio";
import NewsPosts from "./components/home/NewsPost";
import EventSection from "./components/home/Event";
import Donate from "./components/home/Donate";
import Footer from "./components/layouts/Footer";

export default function SitePage() {
  return (
    <>
      <SliderSection />
      <Activities />
      <Features />
      <Volunteer />
      <PortfolioGrid />
      <NewsPosts />
      <EventSection />
      <Donate />
      <Footer />
    </>
  );
}
