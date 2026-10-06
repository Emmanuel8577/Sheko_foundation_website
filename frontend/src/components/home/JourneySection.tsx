"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function JourneySection() {
  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Display Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-14 lg:mb-20 text-left"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#8B72DE] tracking-tight leading-[1.05]">
            Friends. Family. <br />
            Communities
          </h1>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Story Paragraphs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6 text-left order-2 md:order-1"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-[#1F1B2D] tracking-tight">
              The Journey of Hope
            </h2>

            <div className="space-y-5 text-gray-600 font-normal text-base sm:text-lg leading-relaxed">
              <p>
                Hope was born out of a deep-seated belief that every life holds immense value and potential. Founded in 2024, our organization began with a small group of passionate individuals determined to make a difference. From humble beginnings, we have grown into a network of dedicated volunteers, supporters, and partners, all united by a common goal: to bring hope to those who need it most.
              </p>

              <p>
                Our journey has been marked by countless stories of transformation and triumph. From a child who received a scholarship and became the first in their family to attend college, to communities that have blossomed through our sustainable farming programs – these successes fuel our commitment to continue our work with unwavering dedication. We invite you to be a part of our story.
              </p>

              <p>
                Together, we can turn the tide and create a world where hope is a reality for everyone.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Square Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full order-1 md:order-2"
          >
            <div className="relative aspect-square rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white max-w-lg mx-auto md:max-w-none">
              <Image
                src="/images/journey-of-hope.png"
                alt="Hands cupping sunburst - The Journey of Hope"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}