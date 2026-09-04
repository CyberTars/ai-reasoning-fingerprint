"use client";

import React, { useState } from "react";
import { 
  Fingerprint, 
  Upload, 
  BarChart3, 
  FileCheck, 
  GraduationCap, 
  Cpu, 
  Sparkles,
  Menu,
  X,
  User,
  ChevronDown
} from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  assessments: any[];
  selectedAssessmentId: number | null;
  onSelectAssessment: (id: number) => void;
  onUploadClick: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  assessments,
  selectedAssessmentId,
  onSelectAssessment,
  onUploadClick,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Sparkles },
    { id: "upload", label: "Upload Paper", icon: Upload },
    { id: "analysis", label: "AI Analysis", icon: Cpu },
    { id: "dashboard", label: "Student Dashboard", icon: BarChart3 },
    { id: "report", label: "Skill Report", icon: FileCheck },
    { id: "courses", label: "Course Match", icon: GraduationCap },
  ];

  const currentAssessment = assessments.find((a) => a.id === selectedAssessmentId);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Branding */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab("home")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Fingerprint className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  AI Reasoning
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
                  v2.4 Pro
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                STUDENT ASSESSMENT & COGNITIVE FINGERPRINT
              </p>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Profile Selector & New Scan CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Student Scan Dropdown */}
            {assessments.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 hover:border-slate-600 transition"
                >
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="max-w-[130px] truncate font-medium">
                    {currentAssessment ? currentAssessment.studentName : "Select Candidate"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      Loaded Student Profiles
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {assessments.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            onSelectAssessment(item.id);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs flex flex-col gap-0.5 hover:bg-slate-800 transition ${
                            item.id === selectedAssessmentId ? "bg-cyan-500/10 text-cyan-300 font-semibold" : "text-slate-300"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{item.studentName}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                              Score: {item.overallScore}%
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 truncate">{item.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Upload CTA */}
            <button
              onClick={onUploadClick}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Scan New Paper</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                  isActive ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon className="w-5 h-5 text-cyan-400" />
                {item.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                onUploadClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm shadow-md"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Question & Answer Paper</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
