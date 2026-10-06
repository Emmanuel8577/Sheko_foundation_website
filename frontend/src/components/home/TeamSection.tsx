"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Emma Johnson",
    role: "Founder & Executive Director",
    bio: "Emma Johnson founded Hope in 2023 and has over 20 years of nonprofit experience. Her passion for education and health drives Hope's mission, inspiring the team with her leadership and dedication to making a difference.",
    image: "/images/team/emma-johnson.png",
  },
  {
    name: "Michael Ramirez",
    role: "Director of Programs",
    bio: "Michael Ramirez, with a background in social work and public health, oversees all of Hope's initiatives. His strategic planning and compassionate approach ensure our programs effectively meet community needs.",
    image: "/images/team/michael-ramirez.png",
  },
  {
    name: "Sophia Lee",
    role: "Head of Education Initiatives",
    bio: "Sophia Lee designs and leads our education programs. With over a decade of teaching experience, she is committed to providing quality education and creating opportunities for children to thrive.",
    image: "/images/team/sophia-lee.png",
  },
  {
    name: "Dora Thompson",
    role: "Community Health Coordinator",
    bio: "Dora Thompson manages our health and wellness programs. With a background in nursing and public health, he focuses on improving health outcomes and promoting preventive care in underserved communities.",
    image: "/images/team/dora-thompson.png",
  },
];

export default function TeamSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-gray-50/60 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F1B2D] tracking-tight">
            Our team
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </motion.div>

        {/* 2x2 Team Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-3xl p-8 sm:p-10 text-center shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center"
            >
              {/* Circular Avatar */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-6 flex-shrink-0 shadow-inner">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 144px, 160px"
                />
              </div>

              {/* Role */}
              <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                {member.role}
              </span>

              {/* Name */}
              <h3 className="text-2xl sm:text-3xl font-black text-[#1F1B2D] tracking-tight mb-4">
                {member.name}
              </h3>

              {/* Bio */}
              <p className="text-gray-600 text-sm sm:text-base font-normal leading-relaxed max-w-md">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}