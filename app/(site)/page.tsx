import SliderSection from "./components/home/slider/SliderSection";
import Activities from "./components/home/Activities";
import Features from "./components/home/Features";
import Volunteer from "./components/home/Volunteer";

export default function SitePage() {
  return (
    <>
      <SliderSection />
      <Activities />
      <Features />
      <Volunteer />

      <div className="mb-96"></div>
    </>
  );
}
