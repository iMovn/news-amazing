import { Facebook, Mail, MapPin, PhoneCall, Send, Youtube } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  return (
    <div className="bg-primary_layout text-white py-2">
      <div className="container mx-auto flex md:justify-between justify-center items-center px-4 md:text-sm text-xs">
        <h3 className="capitalize font-medium">
          Sở tài nguyên và môi trường thành phố Hồ Chí Minh
        </h3>
        <div className="md:flex hidden space-x-4">
          <Link
            href="https://maps.app.goo.gl/hMviSLvoW26xicze8"
            target="_blank"
            rel="nofollow"
            className="flex gap-x-1 items-center hover:text-secondary_layout"
          >
            <MapPin size="16px" /> HEPF - TP. Hồ Chí Minh
          </Link>
          <Link
            href="tel:84839151980"
            target="_blank"
            rel="nofollow"
            className="flex gap-x-1 items-center hover:text-secondary_layout"
          >
            <PhoneCall size="16px" /> 84-8-39151980
          </Link>
          <Link
            href="mailto:info@hepfu.vn"
            target="_blank"
            rel="nofollow"
            className="flex gap-x-1 items-center hover:text-secondary_layout"
          >
            <Mail size="16px" /> info@hepfu.vn
          </Link>
          <div className="flex items-center gap-x-1">
            <Link href="#" className="hover:text-secondary_layout">
              <Facebook size="16px" />
            </Link>
            <Link href="#" className="hover:text-secondary_layout">
              <Youtube size="16px" />
            </Link>
            <Link href="#" className="hover:text-secondary_layout">
              <Send size="16px" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
