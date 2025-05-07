"use client";
import { Facebook, Mail, MapPin, PhoneCall, Send, Youtube } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SettingsData } from "../types/setting";
import { fetchSiteSettings } from "../api/settings";

export default function TopBar() {
  // start get api settings
  const [settings, setSettings] = useState<SettingsData | null>(null);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchSiteSettings();
      setSettings(data);
    };
    getData();
  }, []);
  // end get api settings

  return (
    <div className="bg-primary_layout text-white py-2">
      <div className="container mx-auto flex md:justify-between justify-center items-center px-4 md:text-sm text-xs">
        <h3 className="capitalize font-medium">
          {settings?.company.name || ""}
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
            href={`tel:${settings?.company.phone}`}
            target="_blank"
            rel="nofollow"
            className="flex gap-x-1 items-center hover:text-secondary_layout"
          >
            <PhoneCall size="16px" /> {settings?.company.phone || ""}
          </Link>
          <Link
            href={`mailto:${settings?.company.email}`}
            target="_blank"
            rel="nofollow"
            className="flex gap-x-1 items-center hover:text-secondary_layout"
          >
            <Mail size="16px" /> {settings?.company.email || ""}
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
