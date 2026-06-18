import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Login() {
  return (
    <AuthLayout 
      imageSrc="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=1200&auto=format&fit=crop"
      title="Access your premium spaces instantly"
      subtitle="Log in to manage your bookings, explore premium venues, and plan your next event with ease.."
    >
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
      <p className="text-slate-500 mb-8">Enter your credentials to access your account.</p>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
          <input 
            type="email" 
            placeholder="john@example.com" 
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-ticket-orange focus:ring-2 focus:ring-ticket-orange/20 transition-all outline-none text-slate-700 font-medium"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-ticket-orange focus:ring-2 focus:ring-ticket-orange/20 transition-all outline-none text-slate-700 font-medium"
          />
          <div className="flex justify-end mt-2">
            <a href="#" className="text-sm font-semibold text-ticket-orange hover:text-ticket-orange/80 transition-colors">Forgot password?</a>
          </div>
        </div>

        <button className="w-full bg-ticket-yellow hover:bg-ticket-yellow/90 text-slate-900 py-3.5 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(255,193,7,0.2)] hover:shadow-[0_0_20px_rgba(255,193,7,0.4)] mt-4 active:scale-[0.98]">
          Log In
        </button>
      </form>

      <p className="mt-8 text-center text-slate-500 font-medium text-sm">
        Don't have an account? <Link to="/signup" className="text-ticket-orange hover:underline font-bold">Sign up</Link>
      </p>
    </AuthLayout>
  );
}
