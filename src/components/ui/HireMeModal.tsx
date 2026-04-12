"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CTAButton from "./CTAButton";
import { Input } from "./FormFields";
import { useForm } from "@formspree/react";

interface HireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HireMeModal = ({ isOpen, onClose }: HireMeModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    location: "",
    salaryOffer: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, formspreeSubmit] = useForm("mgorwvzw");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Required";
    if (!formData.company.trim()) newErrors.company = "Required";
    if (!formData.location.trim()) newErrors.location = "Required";
    if (!formData.salaryOffer.trim()) newErrors.salaryOffer = "Required";
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await formspreeSubmit(e);
    }
  };

  // Prevent background scrolling when open
  if (typeof window !== "undefined") {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-md bg-white rounded-[32px] p-8 md:p-10 shadow-2xl z-10"
          >
            {/* Close Button - Red on hover */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-gray-500 hover:text-red-500 hover:bg-red-50 hover:border-red-200 hover:cursor-pointer transition-all duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Hire Me</h2>
              <p className="text-gray-500 text-sm">Let&apos;s discuss opportunities and expectations.</p>
            </div>

            {state.succeeded ? (
              <div className="py-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Proposal Sent!</h3>
                <p className="text-gray-500 text-sm max-w-sm mx-auto">
                  Thank you for the offer. I'll review it and get back to you shortly.
                </p>
                <div className="pt-6">
                  <CTAButton variant="primary" onClick={() => window.location.reload()} icon="none">
                    Close
                  </CTAButton>
                </div>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <Input
                label="Full Name"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />
              
              <Input
                label="Company"
                id="company"
                name="company"
                placeholder="Tech Innovators Inc."
                value={formData.company}
                onChange={handleChange}
                error={errors.company}
              />
              
              <Input
                label="Location"
                id="location"
                name="location"
                placeholder="City/Street"
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
              />

              <Input
                label="Salary Offer"
                id="salaryOffer"
                name="salaryOffer"
                placeholder="e.g. 00000 / year"
                value={formData.salaryOffer}
                onChange={handleChange}
                error={errors.salaryOffer}
              />

              <div className="pt-2 w-full">
                <CTAButton variant="primary" icon="arrow" textColor="white" type="submit" disabled={state.submitting}>
                  {state.submitting ? "Sending..." : "Send Proposal"}
                </CTAButton>
              </div>
            </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HireMeModal;
