"use client";

export default function ShapeDivider() {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 1000 98"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full md:h-28 transform rotate-180"
      >
        <path
          className="fill-current text-[#2D2B29]"
          d="M1000 100H0L0 96H480.929C482.255 96 483.527 95.4732 484.464 94.5355L497.879 81.1213C499.05 79.9497 500.95 79.9497 502.121 81.1213L515.536 94.5355C516.473 95.4732 517.745 96 519.071 96H1000V100Z"
        />
      </svg>
    </div>
  );
}
