"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Footer from "@/components/common/Footer";

const contactDetails = [
  {
    icon: Phone,
    title: "Phone Number",
    detail: "+234 813 220 6123",
    subDetail: "Mon-Fri from 8am to 5pm",
    href: "tel:+2348132206123",
  },
  {
    icon: Mail,
    title: "Email Address",
    detail: "Sheko4kerjenfoundation@gmail.com",
    subDetail: "We typically respond within 24 hours",
    href: "mailto:Sheko4kerjenfoundation@gmail.com",
    isEmail: true, // Marker to apply special text breaking if needed
  },
  {
    icon: MapPin,
    title: "Main Office",
    detail: "No. 19, Gideon Dogo Street",
    subDetail: "Karu, Nasarawa State, Nigeria",
    href: "#",
  },
  {
    icon: Clock,
    title: "Operating Hours",
    detail: "Monday - Friday",
    subDetail: "8:00 AM - 5:00 PM (WAT)",
    href: "#",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setErrorMessage("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  try {
    const response = await fetch(
      `${API_URL}/api/v1/contact-messages/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to send message. Please try again later.");
    }

    setSubmitted(true);
  } catch (error: any) {
    setErrorMessage(error.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <main className="min-h-screen bg-white pt-16">
        {/* Header Banner */}
        <section className="relative bg-[#18151E] text-white py-20 sm:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8B72DE_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <span className="text-sm font-semibold text-[#8B72DE] uppercase tracking-widest block mb-3">
                Get In Touch
              </span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-6">
                We&apos;d Love to{" "}
                <span className="text-[#8B72DE]">Hear From You</span>
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl font-normal leading-relaxed">
                Have questions about our foundation, want to partner with us, or
                looking to volunteer? Reach out to our team today.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-16 bg-[#F8F9FA] border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactDetails.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.a
                    key={idx}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-12 h-12 bg-[#8B72DE]/10 text-[#8B72DE] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#8B72DE] group-hover:text-white transition-colors duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        {item.title}
                      </span>
                      <h3
                        className={`font-bold text-[#1F1B2D] mb-1 ${item.isEmail ? "text-xs sm:text-sm break-all" : "text-base sm:text-lg"}`}
                      >
                        {item.detail}
                      </h3>
                      <p className="text-xs text-gray-500 font-normal">
                        {item.subDetail}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Form and Map Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 bg-[#F8F9FA] p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm"
              >
                <span className="text-sm font-semibold text-[#8B72DE] uppercase tracking-widest block mb-2">
                  Send a Message
                </span>
                <h2 className="text-3xl font-black text-[#1F1B2D] tracking-tight mb-8">
                  How Can We Help You?
                </h2>

                {submitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-2xl text-center space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h3 className="text-xl font-bold">
                      Thank you for contacting us!
                    </h3>
                    <p className="text-sm text-emerald-700 leading-relaxed">
                      Your message has been received and sent to the admin
                      dashboard. A member of our foundation will get back to you
                      shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      className="mt-4 inline-block text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMessage && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-sm flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-bold text-gray-700 mb-2"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#1F1B2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B72DE] focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-bold text-gray-700 mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#1F1B2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B72DE] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-bold text-gray-700 mb-2"
                      >
                        Subject / Inquiry Type
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#1F1B2D] focus:outline-none focus:ring-2 focus:ring-[#8B72DE] focus:border-transparent transition-all"
                      >
                        <option value="">Select inquiry topic...</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Partnerships & Sponsorships">
                          Partnerships & Sponsorships
                        </option>
                        <option value="Volunteering Opportunities">
                          Volunteering Opportunities
                        </option>
                        <option value="Donations & Grants">
                          Donations & Grants
                        </option>
                        <option value="Media & Press">Media & Press</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-bold text-gray-700 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message here..."
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#1F1B2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B72DE] focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#8B72DE] hover:bg-[#785ec8] text-white font-extrabold py-4 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <span>{loading ? "Sending..." : "Send Message"}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </motion.div>

              {/* Sidebar Info & Embedded Map */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 space-y-8"
              >
                <div className="bg-[#18151E] text-white p-8 sm:p-10 rounded-3xl space-y-6">
                  <h3 className="text-2xl font-black tracking-tight">
                    Frequently Asked Questions
                  </h3>

                  <div className="space-y-4 text-sm text-gray-300">
                    <div>
                      <h4 className="font-bold text-white mb-1">
                        How can I request support for my community?
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Select &quot;General Inquiry&quot; in the form or send a
                        message directly to Sheko4kerjenfoundation@gmail.com
                        with details about your community needs.
                      </p>
                    </div>

                    <div className="border-t border-gray-800 pt-4">
                      <h4 className="font-bold text-white mb-1">
                        Are donations tax-deductible?
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Yes, Sheko Kerjen Foundation is a registered non-profit
                        organization. Receipts are provided for all monetary
                        contributions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Preview Frame */}
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-md border border-gray-100 bg-gray-100 relative">
                  <iframe
                    title="Foundation Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.992837372076!2d7.6012!3d8.9804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTgnNDkuNCJOIDcuwrAzNicwNC4zIkU!5e0!3m2!1sen!2sng!4v1710000000000!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
