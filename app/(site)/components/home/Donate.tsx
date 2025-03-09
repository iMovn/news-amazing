export default function Donate() {
  return (
    <section
      className="relative w-full bg-cover md:bg-left-bottom bg-left-top py-16 md:mt-20 mt-12"
      style={{ backgroundImage: "url('/images/bg-donate.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black md:bg-opacity-40 bg-opacity-10 z-0"></div>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-12 items-center">
        {/* Left Column */}
        <div className="text-white z-10">
          <h2 className="text-2xl font-extrabold mb-4">
            Our Company is An End-to-End Mid stream At
          </h2>
          <p className="mb-6 text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing varius diam ac
            ipsuelit ut Nulla convallis neque
          </p>
          <button className="text-base mt-3 px-6 py-2 border-[1px] border-white font-semibold rounded-sm hover:bg-white hover:text-gray-600 transition">
            Get a Quote
          </button>
        </div>

        {/* Right Column - Form */}
        <div className="bg-white md:p-10 p-5 rounded-md shadow-md z-10">
          <h3 className="text-2xl font-extrabold text-gray-700 mb-2">
            Make A Donation
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            vestibulum us in cursus rutrum. Ut vitae sagittis felis.
          </p>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Họ và tên..."
                className="border p-2 text-sm rounded-md outline-none w-full"
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                className="border p-2 text-sm rounded-md outline-none w-full"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Địa chỉ email..."
                className="border p-2 text-sm rounded-md outline-none w-full"
              />
              <input
                type="text"
                placeholder="Website..."
                className="border p-2 text-sm rounded-md outline-none w-full"
              />
            </div>
            <input
              type="text"
              placeholder="Tiêu đề..."
              className="border p-2 text-sm rounded-md outline-none w-full"
            />
            <select className="border p-2 text-sm rounded-md outline-none w-full">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
              <option>Option 5</option>
            </select>
            <button
              type="submit"
              className="text-sm bg-primary_layout hover:bg-lime-600 text-white px-6 py-2 rounded-sm font-medium focus-visible:none"
            >
              Donate now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
