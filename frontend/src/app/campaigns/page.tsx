"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Users, ArrowRight, Tag } from "lucide-react";
import Footer from "@/components/common/Footer";

interface Campaign {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  date: string;
  location: string;
  beneficiaries_count: number;
  goal: number;
  raised: number;
  image: string;
  short_description: string;
}

const categories = ["All", "Healthcare", "Education", "Economic Empowerment", "Relief Aid"];
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://shekokerjen-backend.onrender.com/api/v1";

export default function CampaignsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await fetch(`${API_BASE_URL}/campaigns/`, { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          setCampaigns(Array.isArray(data) ? data : data.results || []);
        }
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCampaigns();
  }, []);

  const filteredCampaigns =
    selectedCategory === "All"
      ? campaigns
      : campaigns.filter((item) => item.category === selectedCategory);

  return (
    <>
      <main className="min-h-screen bg-white pt-16">
        {/* Banner Section */}
        <section className="relative bg-[#18151E] text-white py-20 sm:py-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
              <span className="text-sm font-semibold text-[#8B72DE] uppercase tracking-widest block mb-3">Our Ongoing Initiatives & Impact</span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-6">
                Campaigns That <span className="text-[#8B72DE]">Transform Lives</span>
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl font-normal leading-relaxed">
                Explore our active and completed community outreach projects bringing direct healthcare, education, and economic empowerment to those in need.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 bg-[#F8F9FA] border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all whitespace-nowrap ${
                    selectedCategory === cat ? "bg-[#8B72DE] text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Campaigns Listing Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="text-center py-12 text-gray-500">Loading campaigns...</div>
            ) : filteredCampaigns.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No campaigns found in this category.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {filteredCampaigns.map((campaign, idx) => {
                  const goalNum = Number(campaign.goal) || 1;
                  const raisedNum = Number(campaign.raised) || 0;
                  const progressPercentage = Math.min(Math.round((raisedNum / goalNum) * 100), 100);

                  return (
                    <motion.div
                      key={campaign.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="bg-[#F8F9FA] border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                    >
                      {/* Image Header */}
                      <div className="relative aspect-[16/9] w-full bg-gray-200 overflow-hidden">
                        {campaign.image && (
                          <Image src={campaign.image} alt={campaign.title} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                        )}
                        <span className={`absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-md ${campaign.status === "Active" ? "bg-emerald-600" : "bg-gray-800"}`}>
                          {campaign.status}
                        </span>
                        <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#1F1B2D] px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-sm">
                          <Tag className="w-3 h-3 text-[#8B72DE]" />
                          <span>{campaign.category}</span>
                        </span>
                      </div>

                      {/* Content Details */}
                      <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4 text-xs font-semibold text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4 text-[#8B72DE]" />
                              <span>{campaign.date}</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center space-x-1">
                              <Users className="w-4 h-4 text-[#8B72DE]" />
                              <span>{campaign.beneficiaries_count}+ Beneficiaries</span>
                            </span>
                          </div>

                          <h2 className="text-2xl font-black text-[#1F1B2D] tracking-tight hover:text-[#8B72DE] transition-colors">
                            <Link href={`/campaigns/${campaign.slug}`}>{campaign.title}</Link>
                          </h2>

                          <p className="text-gray-600 text-sm leading-relaxed">{campaign.short_description}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2 pt-2 border-t border-gray-200/60">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-[#8B72DE]">₦{raisedNum.toLocaleString()} Raised</span>
                            <span className="text-gray-500">Goal: ₦{goalNum.toLocaleString()} ({progressPercentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-[#8B72DE] h-full rounded-full transition-all duration-1000" style={{ width: `${progressPercentage}%` }} />
                          </div>
                        </div>

                        {/* View Link */}
                        <div className="pt-2">
                          <Link href={`/campaigns/${campaign.slug}`} className="inline-flex items-center space-x-2 text-sm font-extrabold text-[#1F1B2D] group-hover:text-[#8B72DE] transition-colors">
                            <span>View Campaign Details</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}