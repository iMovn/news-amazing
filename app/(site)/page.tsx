import SliderSection from "./components/home/slider/SliderSection";
import Activities from "./components/home/Activities";
import Features from "./components/home/Features";
import Volunteer from "./components/home/Volunteer";
import PortfolioGrid from "./components/home/Portfolio";
import NewsPosts from "./components/home/NewsPost";

export default function SitePage() {
  return (
    <>
      <SliderSection />
      <Activities />
      <Features />
      <Volunteer />
      <PortfolioGrid />
      <NewsPosts />
      <div className="mb-96"></div>
    </>
  );
}
