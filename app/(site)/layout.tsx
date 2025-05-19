import NextTopLoader from "nextjs-toploader";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <NextTopLoader
        color="linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))"
        height={1}
        easing="ease"
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      />
      <Header />
      <main className="flex-grow overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}
