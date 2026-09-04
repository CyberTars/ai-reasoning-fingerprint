"use client";

import React from "react";
import { 
  Fingerprint, 
  Sparkles, 
  ArrowRight, 
  BrainCircuit, 
  CheckCircle2, 
  BookOpen, 
  LineChart, 
  Award, 
  Scan,
  ShieldAlert,
  GraduationCap
} from "lucide-react";

interface HeroSectionProps {
  onStartUpload: () => void;
  onExploreDemo: () => void;
}

export default function HeroSection({ onStartUpload, onExploreDemo }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-slate-950 py-16 sm:py-24 border-b border-slate-800">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Next-Gen Student Cognitive Assessment & Major Guidance</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Decode Student Potential with{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                AI Reasoning Fingerprints
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Upload exam papers and handwritten/typed student answers. Our AI OCR diagnostic engine analyzes 
              <span className="text-cyan-300 font-medium"> English Grammar, Vocabulary, Logic, Critical Thinking, Mathematical Rigor</span>, and problem-solving strategies to map precise college course recommendations.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                { label: "OCR Handwriting Engine", icon: Scan },
                { label: "Grammar & Vocab Analyzer", icon: BookOpen },
                { label: "Mathematical Rigor Scan", icon: LineChart },
                { label: "Cognitive Style Index", icon: BrainCircuit },
                { label: "Detected Errors & Hints", icon: ShieldAlert },
                { label: "College Major Fit Engine", icon: GraduationCap },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium hover:border-slate-700 transition"
                  >
                    <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onStartUpload}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Fingerprint className="w-5 h-5" />
                <span>Upload Paper & Scan Fingerprint</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreDemo}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition"
              >
                <span>Explore Live Candidate Dashboard</span>
              </button>
            </div>

            {/* Social Proof Stats */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <div className="text-2xl font-bold text-white">7+</div>
                <div className="text-xs text-slate-400">Diagnostic Dimensions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">98.4%</div>
                <div className="text-xs text-slate-400">OCR Text Extraction Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-400">50+</div>
                <div className="text-xs text-slate-400">College Major Match Pathways</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Fingerprint Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/40">
                    <Fingerprint className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">AI Diagnostic Fingerprint</h3>
                    <p className="text-[11px] text-slate-400">Sample Candidate: Alex Chen</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  91 / 100 Score
                </span>
              </div>

              {/* Skill Bars Preview */}
              <div className="space-y-3.5">
                {[
                  { label: "Logical Thinking & Deductions", score: 96, color: "bg-cyan-500" },
                  { label: "Problem Solving Methodology", score: 95, color: "bg-indigo-500" },
                  { label: "Mathematical & Algorithmic Rigor", score: 94, color: "bg-purple-500" },
                  { label: "Critical Thinking & Nuance", score: 92, color: "bg-sky-500" },
                  { label: "Vocabulary & Precision", score: 88, color: "bg-teal-500" },
                  { label: "English Grammar & Structure", score: 84, color: "bg-emerald-500" },
                ].map((skill, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">{skill.label}</span>
                      <span className="text-slate-200 font-bold">{skill.score}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden p-0.5">
                      <div 
                        className={`h-full rounded-full ${skill.color} transition-all duration-1000`} 
                        style={{ width: `${skill.score}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Cognitive Badge */}
              <div className="mt-6 p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/60 to-indigo-950/60 border border-cyan-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <BrainCircuit className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Cognitive Persona</div>
                    <div className="text-xs font-bold text-white">Algorithmic & First-Principles Thinker</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-medium">Top Major Fit</div>
                  <div className="text-xs font-bold text-cyan-300">B.S. CS & AI (96%)</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
