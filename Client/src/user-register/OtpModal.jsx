import React, { useState, useRef } from "react";

const OtpModal = ({ isOpen, onClose }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  if (!isOpen) return null;

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow numbers
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Take only the last character if they paste or type quickly
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if there's a value
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("Verifying OTP:", otpCode);
    // Add your API verification logic here
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 transition-opacity">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button (Optional) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Verify your account
          </h2>
          <p className="text-slate-500 text-sm">
            We've sent a 4-digit verification code to your email address.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3 sm:gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-semibold text-slate-800 
                           bg-white border border-slate-200 rounded-xl shadow-sm
                           focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20 focus:outline-none 
                           transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFC107] hover:bg-[#FFB300] text-slate-900 rounded-lg py-3.5 
                       font-bold transition-colors shadow-sm mt-4 flex items-center justify-center gap-2"
          >
            Verify & Continue <span aria-hidden="true">&rarr;</span>
          </button>
        </form>

        {/* Resend Logic */}
        <div className="mt-8 text-center text-sm">
          <span className="text-slate-500">Didn't receive the code? </span>
          <button
            type="button"
            className="font-bold text-[#FFC107] hover:text-[#FFB300] transition-colors"
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
