"use client";

import React, { useState } from "react";
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Target, 
  Building2, 
  Briefcase, 
  ArrowRight,
  Filter,
  BrainCircuit,
  Compass
} from "lucide-react";

interface CourseRecommendationsProps {
  assessment: any;
  recommendations: any[];
}

export default function CourseRecommendationsSection({
  assessment,
  recommendations = [],
}: CourseRecommendationsProps) {
  const [selectedField, setSelectedField] = useState<string>("all");

  const fields = ["all", "STEM", "Business", "Humanities & Social Sciences"];

  const filteredRecs = recommendations.filter((rec) => {
    if (selectedField === "all") return true;
    return rec.field?.toLowerCase().includes(selectedField.toLowerCase());
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>Personalized College Major & Career Guidance</span>
        </div>

        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Matched University Majors for {assessment?.studentName || "Alex Chen"}
        </h2>

        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Based on your <span className="text-cyan-300 font-semibold">{assessment?.cognitiveStyle || "Algorithmic Thinker"}</span> profile, 
          our AI evaluation engine mapped your 7 reasoning skill dimensions against requirements from top global university programs.
        </p>
      </div>

      {/* Field Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Filter Academic Field:</span>
        </div>

        <div className="flex items-center gap-2">
          {fields.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedField(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                selectedField === f
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              {f === 'all' ? 'All Domains' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="space-y-6">
        {filteredRecs.length === 0 ? (
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm">
            No course recommendations found for this filter.
          </div>
        ) : (
          filteredRecs.map((course, idx) => {
            const matchScore = course.matchPercentage || 90;

            return (
              <div
                key={course.id || idx}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 sm:p-8 space-y-6 transition shadow-xl relative overflow-hidden"
              >
                
                {/* Card Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
                        {course.field || "STEM Domain"}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">Match Rank #{idx + 1}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white">
                      {course.courseName}
                    </h3>
                  </div>

                  {/* Match Gauge Pill */}
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Suitability Match</div>
                      <div className="text-xs font-bold text-emerald-400">High Academic Compatibility</div>
                    </div>
                    
                    <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 text-cyan-300 font-black text-lg shadow-lg">
                      {matchScore}% Match
                    </div>
                  </div>
                </div>

                {/* Why This Course is Suitable */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-cyan-400" />
                    Why This Course Suits Your Reasoning Fingerprint:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {course.suitabilityReason}
                  </p>
                </div>

                {/* Two Column Skills Breakdown: Required vs Skills to Improve */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Required Foundational Skills */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Key Required Foundational Skills:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(course.keyRequiredSkills || ["Algorithmic Design", "Discrete Mathematics", "Formal Logic"]).map((sk: string, sIdx: number) => (
                        <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills to Improve to Pursue Course */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-cyan-400" />
                      Skills You Should Improve for this Major:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(course.skillsToImprove || ["Technical Writing & Documentation"]).map((sk: string, sIdx: number) => (
                        <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-cyan-950/40 text-cyan-300 text-xs font-medium border border-cyan-500/30">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Universities & Careers Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-800/80">
                  
                  {/* Top Target Universities */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-indigo-400" />
                      Top Recommended Universities:
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                      {(course.topUniversities || ["MIT", "Stanford", "CMU", "UC Berkeley"]).map((uni: string, uIdx: number) => (
                        <span key={uIdx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-indigo-200">
                          {uni}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Potential Career Pathways */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                      Potential Career Paths:
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                      {(course.careerPaths || ["AI Scientist", "ML Architect", "Algorithms Engineer"]).map((car: string, cIdx: number) => (
                        <span key={cIdx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-emerald-200">
                          {car}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
