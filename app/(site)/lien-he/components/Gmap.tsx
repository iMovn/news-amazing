"use client";

import React from "react";

const Gmap = () => {
  return (
    <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-md">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1959.6781515875527!2d106.681703!3d10.783999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f47f373dd4f%3A0x8422892abf0d750a!2zUXXhu7kgBuG6o28gduG7hyBtw7RpIHRyxrDhu51uZyBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2sus!4v1741751236441!5m2!1svi!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Gmap;
