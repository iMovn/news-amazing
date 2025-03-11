import ImageSlider from "./ImageSlider";

export default function SliderSection() {
  return (
    <section className="relative w-full">
      {/* Nội dung section */}
      <div className="mx-auto text-center relative z-10">
        <ImageSlider />
      </div>
    </section>
  );
}
