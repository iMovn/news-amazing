"use client";

import { useEffect, useState } from "react";
import { SettingsData } from "../../components/types/setting";
import { fetchSiteSettings } from "../../components/api/settings";

const Gmap = () => {
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
    <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-md">
      <div dangerouslySetInnerHTML={{ __html: settings?.company.map || "" }} />
    </div>
  );
};

export default Gmap;
