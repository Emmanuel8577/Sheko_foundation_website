"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const aboutCards = [
  {
    title: "Our Mission",
    description:
      "Our mission is to empower individuals and communities by providing the tools and support they need to overcome challenges and achieve their fullest potential through collaborative efforts.",
  },
  {
    title: "Our Vision",
    description:
      "Our vision is a world where every individual, regardless of their background or circumstances, has the opportunity to thrive. We envision communities that are resilient, self-reliant, and full of promise.",
  },
  {
    title: "Global Movement",
    description:
      "We envision a global movement where compassion and empathy drive action, where the barriers of inequality and injustice are dismantled, and where hope is not just a fleeting sentiment but a tangible reality.",
  },
];

export default function AboutUsSection() {
  // Container stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Item fade-up animation
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
      duration: 0.6,
      },
    },
  };

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <span className="text-sm font-semibold text-[#8B72DE] tracking-wide block mb-2">
            About us
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F1B2D] leading-tight tracking-tight">
            A Future Filled with Hope
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-medium">
            At Hope, we are dedicated to uplifting communities through a range of targeted initiatives
          </p>
        </motion.div>

        {/* Featured Image Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full h-[280px] sm:h-[400px] lg:h-[480px] rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden mb-12 lg:mb-16 shadow-lg"
        >
          <Image
            src="/images/about-us.png"
            alt="Hands reaching together - A Future Filled with Hope"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </motion.div>

        {/* 3-Column Grid: Mission, Vision, Movement */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {aboutCards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-left space-y-3"
            >
              <h3 className="text-2xl font-black text-[#1F1B2D] tracking-tight">
                {card.title}
              </h3>
              <p className="text-gray-600 font-normal leading-relaxed text-sm sm:text-base">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}