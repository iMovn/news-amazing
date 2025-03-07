import SliderSection from "./components/home/slider/SliderSection";
import Activities from "./components/home/Activities";
import Features from "./components/home/Features";

export default function SitePage() {
  return (
    <>
      <SliderSection />
      <Activities />
      <Features />

      <div className="mb-96"></div>
    </>
  );
}
