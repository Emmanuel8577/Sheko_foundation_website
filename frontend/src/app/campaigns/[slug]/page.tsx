import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar, MapPin, Users, Heart, ArrowLeft, CheckCircle2,
  Image as ImageIcon, ExternalLink, Video
} from "lucide-react";
import Footer from "@/components/common/Footer";

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api/v1";

export default async function SingleCampaignPage({ params }: Props) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug;

  if (!rawSlug) {
    notFound();
  }

  let campaign = null;

  try {
    const res = await fetch(`${API_BASE_URL}/campaigns/${encodeURIComponent(rawSlug)}/`, {
      cache: "no-store",
    });
    if (res.ok) {
      campaign = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch campaign details:", error);
  }

  if (!campaign) {
    notFound();
  }

  const goalNum = Number(campaign.goal) || 1;
  const raisedNum = Number(campaign.raised) || 0;
  const progressPercentage = Math.min(Math.round((raisedNum / goalNum) * 100), 100);

  return (
    <>
      <main className="min-h-screen bg-white pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <Link href="/campaigns" className="inline-flex items-center space-x-2 text-sm font-bold text-gray-500 hover:text-[#8B72DE] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all campaigns</span>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Main Content */}
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center space-x-3">
                <span className="bg-[#8B72DE]/10 text-[#8B72DE] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {campaign.category}
                </span>
                <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white ${campaign.status === "Active" ? "bg-emerald-600" : "bg-gray-800"}`}>
                  {campaign.status}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-[#1F1B2D] tracking-tight leading-tight">
                {campaign.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 py-4 border-y border-gray-100 text-sm font-semibold text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#8B72DE]" />
                  <span>{campaign.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#8B72DE]" />
                  <span>{campaign.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#8B72DE]" />
                  <span>{campaign.beneficiaries_count}+ Beneficiaries</span>
                </div>
              </div>

              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg bg-gray-100">
                {campaign.image && (
                  <Image src={campaign.image} alt={campaign.title} fill unoptimized className="object-cover" priority sizes="(max-width: 1024px) 100vw, 66vw" />
                )}
              </div>

              <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
                <h2 className="text-2xl font-black text-[#1F1B2D]">Overview & Impact Story</h2>
                <p>{campaign.full_story}</p>

                {campaign.key_objectives && campaign.key_objectives.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold text-[#1F1B2D] pt-4">Key Objectives:</h3>
                    <ul className="space-y-3">
                      {campaign.key_objectives.map((objective: string, i: number) => (
                        <li key={i} className="flex items-start space-x-3">
                          <CheckCircle2 className="w-5 h-5 text-[#8B72DE] mt-1 shrink-0" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* Social Video Callout */}
              <div className="bg-gradient-to-r from-[#18151E] to-[#2B233D] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg border border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-[#8B72DE]/20 text-[#8B72DE] rounded-2xl">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Watch Video Documentaries</h3>
                    <p className="text-xs text-gray-300">
                      Follow our official social media channels to watch field interviews, video highlights, and live outreach updates.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {campaign.social_links?.youtube && (
                    <a href={campaign.social_links.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-all">
                      <YoutubeIcon />
                      <span>YouTube Channel</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                  {campaign.social_links?.instagram && (
                    <a href={campaign.social_links.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white px-4 py-2 rounded-full text-xs font-bold transition-all hover:opacity-90">
                      <InstagramIcon />
                      <span>Instagram Handles</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                  {campaign.social_links?.facebook && (
                    <a href={campaign.social_links.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-all">
                      <FacebookIcon />
                      <span>Facebook Page</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>

              {/* Photo Gallery Section */}
              {campaign.gallery && campaign.gallery.length > 0 && (
                <div className="pt-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-black text-[#1F1B2D]">Campaign Photo Gallery</h2>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {campaign.gallery.length} Photos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {campaign.gallery.map((item: any, index: number) => (
                      <div key={index} className="group relative bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-200">
                          <Image src={item.url} alt={item.caption || `Photo ${index + 1}`} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                          <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md flex items-center gap-1 z-10 shadow-sm">
                            <ImageIcon className="w-3.5 h-3.5" /> Photo
                          </span>
                        </div>
                        {item.caption && (
                          <div className="p-3.5 bg-white border-t border-gray-100">
                            <p className="text-xs font-semibold text-gray-700 leading-snug">{item.caption}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-[#F8F9FA] border border-gray-100 rounded-3xl p-8 space-y-6 shadow-sm">
                <h3 className="text-xl font-black text-[#1F1B2D]">Campaign Funding Status</h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-[#8B72DE]">₦{raisedNum.toLocaleString()} Raised</span>
                    <span className="text-gray-500">Goal: ₦{goalNum.toLocaleString()}</span>
                  </div>

                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div className="bg-[#8B72DE] h-full rounded-full" style={{ width: `${progressPercentage}%` }} />
                  </div>

                  <p className="text-xs font-semibold text-gray-500 text-right">
                    {progressPercentage}% of total target funded
                  </p>
                </div>

                <Link href="/get-involved" className="w-full bg-[#8B72DE] hover:bg-[#785ec8] text-white font-black py-4 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 text-center block">
                  <Heart className="w-5 h-5 fill-current" />
                  <span>Support This Cause</span>
                </Link>

                <div className="border-t border-gray-200 pt-6 space-y-3 text-xs text-gray-500">
                  <p className="font-bold text-gray-700">100% Direct Impact Allocation</p>
                  <p>All monetary contributions directly fund operational supplies, medical tools, and equipment for beneficiaries.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}