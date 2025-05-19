"use client";
import { Facebook, Mail, MapPin, PhoneCall, Send, Youtube } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SettingsData } from "../types/setting";
import { fetchSiteSettings } from "../api/settings";
import { motion } from "framer-motion";

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
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.2,
              duration: 0.5,
            },
          }}
          viewport={{ once: true }}
          className="capitalize font-medium"
        >
          {settings?.company.name || ""}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.2,
              duration: 0.5,
            },
          }}
          viewport={{ once: true }}
          className="md:flex hidden space-x-4"
        >
          <Link
            href={`${settings?.company.link_map || ""}`}
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
            <Link
              href={`${settings?.company.fanpage}`}
              className="hover:text-secondary_layout"
              target="_blank"
              rel="nofollow"
            >
              <Facebook size="16px" />
            </Link>
            <Link href="#" className="hover:text-secondary_layout">
              <Youtube size="16px" />
            </Link>
            <Link href="#" className="hover:text-secondary_layout">
              <Send size="16px" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
