"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import CTAButton from "@/components/ui/CTAButton";
import { Input, TextArea, Select } from "@/components/ui/FormFields";
import { useForm } from "@formspree/react";

const countries = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au" },
  { label: "Nepal", value: "np" },
  { label: "India", value: "in" },
  { label: "Germany", value: "de" },
  { label: "Japan", value: "jp" },
  { label: "Other", value: "other" },
];

const currencies = [
  { label: "USD ($)", value: "usd" },
  { label: "EUR (€)", value: "eur" },
  { label: "GBP (£)", value: "gbp" },
  { label: "AUD (A$)", value: "aud" },
  { label: "NPR (रु)", value: "npr" },
  { label: "INR (₹)", value: "inr" },
];

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for the "Let's Chat" text
  const chatY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const chatOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    currency: "npr",
    budget: "",
    timeline: "",
    details: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, formspreeSubmit] = useForm("myklgzjv");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.country) newErrors.country = "Required";
    if (!formData.currency) newErrors.currency = "Required";
    if (!formData.budget.trim()) newErrors.budget = "Required";
    if (!formData.timeline.trim()) newErrors.timeline = "Required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await formspreeSubmit(e);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="min-h-screen bg-black text-white pt-16 sm:pt-24 pb-20 sm:pb-32 px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-white tracking-tight">
            Book a Free Consultation
          </h2>
        </motion.div>

        {/* Parallax Chat Text */}
        <motion.p
          style={{ y: chatY, opacity: chatOpacity }}
          className="text-center text-gray-400 text-base sm:text-lg md:text-xl mb-10 sm:mb-16 md:mb-24 max-w-lg mx-auto"
        >
          Let&apos;s Chat About Your Idea
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-24 w-full max-w-6xl mx-auto">

          {/* Left Column: Important Note */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-[40%] flex flex-col justify-center"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-2xl">
              <p className="text-white font-semibold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Important Note
              </p>
              <p className="text-gray-300 text-sm md:text-[15px] leading-relaxed">
                This session is for serious inquiries only. To ensure we make the most of our time, please provide clear details about your project in the booking form. Bookings with incomplete information or random text will be automatically canceled.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:w-[60%] flex flex-col justify-center"
          >
            {state.succeeded ? (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-12 rounded-3xl text-center flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Message Sent!</h3>
                <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto">
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible to discuss your project.
                </p>
                <div className="pt-4">
                  <button onClick={() => window.location.reload()} className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input
                    label="Full Name"
                    id="name"
                    name="name"
                    placeholder="Bijay Rai"
                    darkTheme
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <Input
                    label="Email Address"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    darkTheme
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                </div>

                <Select
                  label="Country"
                  id="country"
                  name="country"
                  darkTheme
                  options={countries}
                  value={formData.country}
                  onChange={handleChange}
                  error={errors.country}
                />

                {/* Currency + Budget side by side */}
                <div className="grid grid-cols-[140px_1fr] gap-4">
                  <Select
                    label="Currency"
                    id="currency"
                    name="currency"
                    darkTheme
                    options={currencies}
                    value={formData.currency}
                    onChange={handleChange}
                    error={errors.currency}
                  />
                  <Input
                    label="Project Budget"
                    id="budget"
                    name="budget"
                    placeholder="e.g. 5,000"
                    darkTheme
                    value={formData.budget}
                    onChange={handleChange}
                    error={errors.budget}
                  />
                </div>

                <Input
                  label="Timeline / Deadline"
                  id="timeline"
                  name="timeline"
                  placeholder="e.g. 3 Months, Q4 2026..."
                  darkTheme
                  value={formData.timeline}
                  onChange={handleChange}
                  error={errors.timeline}
                />

                <TextArea
                  label="Project Details"
                  id="details"
                  name="details"
                  placeholder="Tell me about your objectives, scale, and requirements..."
                  darkTheme
                  rows={4}
                  value={formData.details}
                  onChange={handleChange}
                  error={errors.details}
                />

                <div className="flex justify-end pt-4">
                  <CTAButton variant="secondary" icon="arrow" textColor="white" type="submit" disabled={state.submitting}>
                    {state.submitting ? "Sending..." : "Submit Inquiry"}
                  </CTAButton>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;