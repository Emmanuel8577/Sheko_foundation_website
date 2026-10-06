"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      '"Hope has given my community the resources we needed to build a better future. Through their educational programs, my children now have opportunities I could only dream of. The difference in our lives is beyond words."',
    author: "Maria, Community Member",
    image: "/images/testimonials/maria.png",
  },
  {
    quote:
      '"Volunteering with Hope has been a life-changing experience. Seeing the direct impact of our work on people\'s lives is incredibly rewarding."',
    author: "John, Volunteer",
    image: "/images/testimonials/john.png",
  },
  {
    quote:
      '"As a corporate partner, collaborating with Hope has been incredibly fulfilling. Their transparency, dedication, and impactful programs make it easy to support their mission. We are proud to contribute to a cause that truly transforms lives."',
    author: "Sarah, Corporate Partner",
    image: "/images/testimonials/sarah.png",
  },
  {
    quote:
      '"Hope\'s micro-financing program has been a game-changer for our community. Small loans have allowed us to start businesses and improve our economic stability. We are now more self-reliant and optimistic about our future."',
    author: "Raj, Entrepreneur",
    image: "/images/testimonials/raj.png",
  },
  {
    quote:
      '"Hope\'s healthcare initiatives have transformed our community\'s well-being. Access to regular medical check-ups and health education has drastically improved our quality of life. We are healthier and more informed, thanks to their tireless efforts."',
    author: "David, Beneficiary",
    image: "/images/testimonials/david.png",
  },
  {
    quote:
      '"Participating in Hope\'s vocational training program has given me the skills and confidence to start my own business. I am now able to provide for my family and contribute to my community. Hope has truly changed my life."',
    author: "Amina, Program Participant",
    image: "/images/testimonials/amina.png",
  },
];

export default function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F1B2D] tracking-tight">
            Voices of Hope
          </h2>
        </motion.div>

        {/* 3-Column Testimonial Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[#F8F9FA] rounded-3xl p-8 sm:p-9 flex flex-col justify-between text-left transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div>
                {/* Avatar */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden mb-6 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.author}
                    fill
                    className="object-cover object-center"
                    sizes="64px"
                  />
                </div>

                {/* Quote Text */}
                <p className="text-gray-600 font-normal leading-relaxed text-sm sm:text-base mb-6">
                  {item.quote}
                </p>
              </div>

              {/* Author & Designation */}
              <h3 className="font-extrabold text-[#1F1B2D] text-base tracking-tight">
                {item.author}
              </h3>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}