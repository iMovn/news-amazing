"use client";

import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "George Hamilton",
    avatar: "/team/team1.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit estibu luma nunc dui.",
    socials: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      email: "mailto:george@example.com",
    },
  },
  {
    name: "Julia Martyn",
    avatar: "/team/team2.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit estibu luma nunc dui.",
    socials: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      email: "mailto:julia@example.com",
    },
  },
  {
    name: "Stewart Johnny",
    avatar: "/team/team3.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit estibu luma nunc dui.",
    socials: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      email: "mailto:stewart@example.com",
    },
  },
  {
    name: "Anna Williams",
    avatar: "/team/team4.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit estibu luma nunc dui.",
    socials: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      email: "mailto:anna@example.com",
    },
  },
];

export default function TeamWork() {
  return (
    <section className="container my-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.5,
            duration: 0.5,
          },
        }}
        viewport={{ once: false }}
      >
        <h2 className="md:text-3xl text-xl font-extrabold mb-2 text-center uppercase">
          ĐỘI NGŨ <span className="text-primary_layout">HEPF</span>
        </h2>
        <div className="relative flex justify-center mb-9">
          <Image
            src={"/images/divide.jpg"}
            alt="divi"
            width={506}
            height={506}
            loading="lazy"
            quality={100}
            className="md:max-w-[90px] md:max-h-[90px] max-w-[80px] max-h-[80px]"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.5,
            duration: 0.5,
          },
        }}
        viewport={{ once: false }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group flex flex-col items-center border rounded-lg shadow-md overflow-hidden bg-white"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={member.avatar}
                alt={member.name}
                width={500}
                height={500}
                quality={100}
                loading="lazy"
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary_layout bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
              <div className="flex justify-center gap-4 mt-4 text-gray-600">
                <a
                  href={member.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-5 h-5 hover:text-blue-600" />
                </a>
                <a
                  href={member.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-5 h-5 hover:text-pink-500" />
                </a>
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-5 h-5 hover:text-blue-400" />
                </a>
                <a href={member.socials.email}>
                  <Mail className="w-5 h-5 hover:text-black" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
