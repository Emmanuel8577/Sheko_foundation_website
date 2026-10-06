"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

type GalleryItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
};

const galleryItems: GalleryItem[] = [
  {
    type: "image",
    src: "/images/gallery/gallery-1.png",
    alt: "Children in local community market",
  },
  {
    type: "image",
    src: "/images/gallery/gallery-2.png",
    alt: "Volunteers joining hands in unity",
  },
  {
    type: "image",
    src: "/images/gallery/gallery-3.png",
    alt: "Families and community members gathered",
  },
  {
    type: "video",
    src: "/videos/gallery/campaign-overview.mp4",
    poster: "/images/gallery/gallery-4.png",
    alt: "Happy children smiling in community program",
  },
  {
    type: "image",
    src: "/images/gallery/gallery-5.png",
    alt: "Volunteers sorting clothing and donation boxes",
  },
  {
    type: "image",
    src: "/images/gallery/gallery-6.png",
    alt: "Team organizing relief distribution supplies",
  },
];

export default function GallerySection() {
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
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
          <span className="text-sm font-semibold text-[#8B72DE] uppercase tracking-widest block mb-2">
            Our Gallery
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F1B2D] tracking-tight">
            Moments of Impact
          </h2>
        </motion.div>

        {/* 3x2 Grid for Desktop, 2x3 for Tablet, 1 column for Mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="relative w-full h-full">
                  <video
                    poster={item.poster}
                    controls
                    preload="none"
                    className="w-full h-full object-cover"
                  >
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Play Icon Badge Overlay */}
                  <div className="pointer-events-none absolute top-4 right-4 bg-[#8B72DE] text-white p-2.5 rounded-full shadow-md flex items-center justify-center">
                    <Play className="w-4 h-4 fill-white" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}