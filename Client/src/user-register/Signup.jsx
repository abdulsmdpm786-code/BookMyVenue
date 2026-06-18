import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function Signup() {
  return (
    <AuthLayout
      imageSrc="https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200&auto=format&fit=crop"
      title="Reduce friction, prevent bad seats and protect customer joy"
      subtitle="Use Book My Venue to discover unique event spaces, compare venue options, manage reservations, and create memorable experiences—all in one place."
    >
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        See Book My Venue In Action
      </h1>
      <p className="text-slate-500 mb-8">
        See how Book My Venue can help you discover perfect spaces.
      </p>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              First name
            </label>
            <input
              type="text"
              placeholder="First name"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-ticket-orange focus:ring-2 focus:ring-ticket-orange/20 transition-all outline-none text-slate-700 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Last name
            </label>
            <input
              type="text"
              placeholder="Last name"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-ticket-orange focus:ring-2 focus:ring-ticket-orange/20 transition-all outline-none text-slate-700 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email address
          </label>
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-ticket-orange focus:ring-2 focus:ring-ticket-orange/20 transition-all outline-none text-slate-700 font-medium"
          />
        </div>

        <button className="w-full bg-ticket-yellow hover:bg-ticket-yellow/90 text-slate-900 py-3.5 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(255,193,7,0.2)] hover:shadow-[0_0_20px_rgba(255,193,7,0.4)] mt-4 active:scale-[0.98]">
          Continue →
        </button>
      </form>

      <p className="mt-8 text-center text-slate-500 font-medium text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-ticket-orange hover:underline font-bold"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
