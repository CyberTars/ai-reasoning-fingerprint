"use client";

import React from "react";
import { Fingerprint, Cpu, GraduationCap, ShieldCheck, Heart } from "lucide-react";

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Fingerprint className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">AI Reasoning Fingerprint</span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A modern student cognitive assessment web application. Digitizes handwritten/typed exam papers and evaluates 
              English grammar, vocabulary, logical thinking, critical thinking, problem-solving approach, and mathematical rigor 
              to provide personalized university course recommendations.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> AI OCR Engine
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Drizzle ORM + PostgreSQL
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">App Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate("home")} className="hover:text-cyan-300 transition">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("upload")} className="hover:text-cyan-300 transition">
                  Upload & OCR Paper
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("analysis")} className="hover:text-cyan-300 transition">
                  AI Analysis Kernel
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("dashboard")} className="hover:text-cyan-300 transition">
                  Student Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("report")} className="hover:text-cyan-300 transition">
                  Detailed Skill Report
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("courses")} className="hover:text-cyan-300 transition">
                  University Major Recommendations
                </button>
              </li>
            </ul>
          </div>

          {/* Key Skill Dimensions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">7 Cognitive Vectors</h4>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>• English Grammar</li>
              <li>• Vocabulary & Terminology</li>
              <li>• Logical Thinking</li>
              <li>• Critical Thinking</li>
              <li>• Problem-Solving Approach</li>
              <li>• Mathematical Rigor</li>
              <li>• Subject Performance</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} AI Reasoning Fingerprint. Designed for College Project & Expo.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with Next.js App Router, Tailwind CSS & Drizzle ORM</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
