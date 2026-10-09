"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const focusAreas = [
  {
    title: "Education Empowerment",
    description:
      "Providing resources and support to ensure every child has access to quality education.",
  },
  {
    title: "Health and Wellness",
    description:
      "Delivering healthcare services and promoting healthy living in underserved areas.",
  },
  {
    title: "Economic Development",
    description:
      "Creating opportunities for sustainable income and self-sufficiency through vocational training and micro-financing.",
  },
  {
    title: "Environmental Stewardship",
    description:
      "Protecting our planet by promoting sustainable practices and fostering environmental awareness.",
  },
];

const WhatWeDo = () => {
  // Animation variants for the container (stagger effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger children for smoother ripple
      },
    },
  };

  // Animation variants for individual list items
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
      duration: 0.6,
      },
    },
  };

  return (
    <section className="bg-white py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header (Centered on all screens) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <span className="text-sm font-semibold text-[#8B72DE] uppercase tracking-widest block mb-3">
            What we do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1F1B2D] leading-tight tracking-tight drop-shadow-sm">
            Making a Difference, <br/>
            One Life at a Time.
          </h2>
          <p className="mt-8 text-lg sm:text-xl text-gray-600 font-medium leading-relaxed px-2 md:px-0">
            At Hope, we are dedicated to uplifting communities through a range of targeted initiatives. Our focus areas include
          </p>
        </motion.div>

        {/* Content Grid (Stacks on mobile, stacks 'Image FIRST') */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* 1. Image Column (First in stacked order, Right in grid order) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full order-1 md:order-2" 
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-xl border-4 border-white max-w-lg mx-auto md:max-w-none">
                <Image
                src="/images/what-we-do.png" // Update with your actual image path
                alt="Diverse hands holding together in unity"
                fill
                className="object-cover"
                sizes="(max-w-768px) 100vw, 50vw"
                />
            </div>
          </motion.div>

          {/* 2. Focus Areas Column (Second in stacked order, Left in grid order) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full space-y-10 order-2 md:order-1 px-2 md:px-0"
          >
            {focusAreas.map((area, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex flex-col items-start text-left" // Reverted to standard left flex
              >
                {/* Number Icon in same alignment with title */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100">
                      <span className="text-base font-bold text-[#8B72DE]">
                          {index + 1}
                      </span>
                  </div>
                  
                  {/* Left-aligned Title */}
                  <h3 className="text-2xl font-extrabold text-[#1F1B2D] group-hover:text-[#8B72DE] transition-colors leading-tight">
                    {area.title}
                  </h3>
                </div>

                {/* Left-aligned Description */}
                <p className="text-gray-600 leading-relaxed font-normal ml-14">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;