"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Heart, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  ArrowRight,
  X,
  Copy,
  Check,
  Building2,
  CheckCircle2
} from "lucide-react";
import Footer from "@/components/common/Footer";

export default function DonatePage() {
  const [amount, setAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");

  // Donor Details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success State Modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<{
    reference: string;
    amount: number;
    donorName: string;
    email: string;
    date: string;
  } | null>(null);

  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedBankAcc, setCopiedBankAcc] = useState(false);

  const numAmount = Number(amount) || 0;
  const bankAccountNumber = "2226201779"; // Replace with real account number

  // Handle Paystack Payment Trigger
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!numAmount || numAmount < 100) {
      alert("Please enter a valid donation amount (Minimum ₦100).");
      return;
    }

    if (!email || !fullName) {
      alert("Please fill in your name and email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Dynamically import Paystack on the client side only
      const PaystackPopModule = (await import("@paystack/inline-js")).default;
      const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

      if (!paystackPublicKey) {
        console.warn("Paystack public key is missing. Ensure NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is set in your .env.local");
      }

      const paystack = new PaystackPopModule();
      paystack.newTransaction({
        key: paystackPublicKey,
        email: email,
        amount: numAmount * 100, // Paystack operates in kobo (NGN * 100)
        currency: "NGN",
        ref: `DONATE_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        metadata: {
          custom_fields: [
            {
              display_name: "Donor Name",
              variable_name: "donor_name",
              value: fullName,
            },
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: phone || "N/A",
            },
            {
              display_name: "Frequency",
              variable_name: "frequency",
              value: frequency,
            },
          ],
        },
        onSuccess: (transaction: { reference: string }) => {
          // 1. Set transaction details for thank you modal directly
          setTransactionDetails({
            reference: transaction.reference,
            amount: numAmount,
            donorName: fullName,
            email: email,
            date: new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          });

          // 2. Open Thank You Modal
          setIsSuccessModalOpen(true);

          // 3. Clear Form Fields & Reset Submitting State
          setFullName("");
          setEmail("");
          setPhone("");
          setAmount("");
          setIsSubmitting(false);
        },
        onCancel: () => {
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      console.error("Paystack initialization error:", error);
      setIsSubmitting(false);
      alert("Failed to initialize payment gateway. Please try again.");
    }
  };

  const handleCopyReference = () => {
    if (transactionDetails?.reference) {
      navigator.clipboard.writeText(transactionDetails.reference);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankAccountNumber);
    setCopiedBankAcc(true);
    setTimeout(() => setCopiedBankAcc(false), 2000);
  };

  return (
    <>
      <main className="min-h-screen bg-[#F8F9FC] pt-16 pb-20 font-sans text-slate-800">
        
        {/* Page Header */}
        <section className="text-center max-w-3xl mx-auto pt-12 pb-10 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-[#8C76E5] text-xs font-semibold mb-4 border border-purple-100/80 shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-current text-[#8C76E5]" />
            <span>Make a Lasting Impact</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-serif">
            Support Our Cause
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Your generous gift directly empowers underserved communities by funding essential education, healthcare, and sustainable development initiatives.
          </p>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Custom Donation Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 space-y-8">
              
              {/* Frequency Toggle */}
              <div className="bg-slate-100/80 p-1.5 rounded-2xl flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setFrequency("one-time")}
                  className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                    frequency === "one-time"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Give One-Time
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency("monthly")}
                  className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                    frequency === "monthly"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Give Monthly
                </button>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                
                {/* Custom Amount Entry */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Enter Donation Amount (NGN)
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-slate-900 font-extrabold text-xl sm:text-2xl select-none">
                      ₦
                    </span>
                    <input
                      type="number"
                      min="100"
                      step="any"
                      required
                      placeholder="e.g. 10000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-4 rounded-2xl text-xl sm:text-2xl font-bold text-slate-900 outline-none focus:bg-white focus:border-[#8C76E5] focus:ring-4 focus:ring-purple-100 transition-all placeholder:text-slate-300 placeholder:font-normal"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Give any amount you desire. Minimum donation is ₦100.
                  </p>
                </div>

                {/* Donor Details */}
                <div className="space-y-4 pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Your Information
                  </label>
                  
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl text-sm outline-none focus:bg-white focus:border-[#8C76E5] focus:ring-4 focus:ring-purple-100 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl text-sm outline-none focus:bg-white focus:border-[#8C76E5] focus:ring-4 focus:ring-purple-100 transition-all"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number (Optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl text-sm outline-none focus:bg-white focus:border-[#8C76E5] focus:ring-4 focus:ring-purple-100 transition-all"
                    />
                  </div>
                </div>

                {/* Paystack Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#8C76E5] hover:bg-[#7B63DC] text-white font-bold text-base py-4 px-6 rounded-2xl transition-all shadow-md shadow-purple-200 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>
                      {isSubmitting
                        ? "Processing..."
                        : numAmount > 0
                        ? `Donate ₦${numAmount.toLocaleString()} Now`
                        : "Donate Now"}
                    </span>
                  </button>
                </div>

                {/* Trust Badge */}
                <div className="flex items-center justify-center space-x-2 text-slate-400 text-xs pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Secured by Paystack • 256-bit Encryption</span>
                </div>
              </form>
            </div>

            {/* Right Column: Impact Highlights & Direct Bank Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100">
                  <Image
                    src="/images/gallery/gallery-1.png"
                    alt="Impact and donation outreach"
                    fill
                    loading="eager"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 font-serif">
                    Where Your Gift Goes
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Empowers local education & youth development programs",
                      "Provides essential healthcare resources to rural families",
                      "Complete financial transparency with detailed impact reports",
                      "Instant email notification & receipt verification",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-[#8C76E5] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Bank Transfer Details */}
              <div className="bg-purple-50/60 rounded-3xl p-6 border border-purple-100/80 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#8C76E5] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Direct Bank Transfer</h4>
                    <p className="text-xs text-slate-500">Prefer transferring directly from your bank app?</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-purple-100/60 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="text-slate-400">Bank Name</span>
                    <span className="font-semibold text-slate-800">United Bank for Africa (UBA)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="text-slate-400">Account Name</span>
                    <span className="font-semibold text-slate-800">Waziri jennifer shekowagami </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 pt-2 border-t border-slate-100">
                    <span className="text-slate-400">Account Number</span>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="flex items-center gap-1.5 font-mono font-bold text-[#8C76E5] hover:text-[#7B63DC] transition-colors"
                    >
                      <span>{bankAccountNumber}</span>
                      {copiedBankAcc ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed text-center">
                  Please use your full name as the transfer narrative so we can acknowledge your gift.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Thank You Success Modal */}
      {isSuccessModalOpen && transactionDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative text-center space-y-6 animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsSuccessModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 text-emerald-500 flex items-center justify-center shadow-inner">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            {/* Header Content */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                Thank You, {transactionDetails.donorName}!
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                Your contribution of <strong className="text-slate-900">₦{transactionDetails.amount.toLocaleString()}</strong> has been successfully received. We are deeply grateful for your support!
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-4 text-left space-y-3 text-xs sm:text-sm border border-slate-100">
              <div className="flex justify-between items-center text-slate-500">
                <span>Date</span>
                <span className="font-semibold text-slate-800">{transactionDetails.date}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Donor Email</span>
                <span className="font-semibold text-slate-800">{transactionDetails.email}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500 pt-2 border-t border-slate-200">
                <span>Transaction Ref</span>
                <button
                  type="button"
                  onClick={handleCopyReference}
                  className="flex items-center gap-1 font-mono text-xs text-[#8C76E5] hover:underline"
                >
                  {copiedRef ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <span>{transactionDetails.reference.slice(0, 16)}...</span>
                      <Copy className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full bg-[#8C76E5] hover:bg-[#7B63DC] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md shadow-purple-200 flex items-center justify-center space-x-2"
              >
                <span>Return to Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </>
  );
}