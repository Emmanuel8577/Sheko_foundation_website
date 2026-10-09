"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  campaignSlug: string;
  campaignTitle: string;
  createdAt: string;
};

export default function GallerySection() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaignGallery() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/campaigns/");
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API did not return JSON. Check if Django server is running and URL is correct.");
        }

        const data = await response.json();
        const campaigns = Array.isArray(data) ? data : data.results || [];
        
        let allItems: GalleryItem[] = [];

        campaigns.forEach((campaign: any) => {
          let campaignImages: GalleryItem[] = [];

          // 1. Gather gallery inline images
          if (campaign.gallery && Array.isArray(campaign.gallery)) {
            campaign.gallery.forEach((img: any) => {
              campaignImages.push({
                id: img.id,
                src: img.url,
                alt: img.caption || campaign.title,
                campaignSlug: campaign.slug,
                campaignTitle: campaign.title,
                createdAt: img.created_at || campaign.created_at,
              });
            });
          }

          // 2. Also consider the main campaign cover image
          if (campaign.image) {
            campaignImages.push({
              id: `${campaign.id}-cover`,
              src: campaign.image,
              alt: campaign.title,
              campaignSlug: campaign.slug,
              campaignTitle: campaign.title,
              createdAt: campaign.created_at,
            });
          }

          // Sort this campaign's images by recency (newest first) and take up to 2
          campaignImages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          
          allItems.push(...campaignImages.slice(0, 2));
        });

        // Sort all selected images globally by recency (newest first)
        allItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Limit to 6 items for the homepage preview grid
        setGalleryItems(allItems.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaignGallery();
  }, []);

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

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="aspect-[4/3] rounded-3xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : galleryItems.length === 0 ? (
          <p className="text-center text-gray-500 font-medium">No campaign gallery images uploaded yet.</p>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
            >
              {galleryItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/campaigns/${item.campaignSlug}`} className="block w-full h-full relative">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      unoptimized
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Hover Overlay with Campaign Title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-[11px] font-extrabold text-[#8B72DE] uppercase tracking-wider mb-1">
                        View Campaign
                      </span>
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold text-sm sm:text-base line-clamp-1">
                          {item.campaignTitle}
                        </h3>
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* View More Link / Button */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <Link
                href="/campaigns"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1F1B2D] text-white font-bold text-sm tracking-wide shadow-lg hover:bg-[#8B72DE] transition-all duration-300 group"
              >
                <span>View All Campaigns & Gallery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </>
        )}

      </div>
    </section>
  );
}