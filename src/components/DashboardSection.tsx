"use client";

import React from "react";
import { 
  BarChart3, 
  BrainCircuit, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Award, 
  FileCheck, 
  Sparkles, 
  GraduationCap, 
  Layers,
  ArrowUpRight,
  BookOpen,
  Zap,
  Target
} from "lucide-react";

interface DashboardSectionProps {
  assessment: any;
  onNavigateToReport: () => void;
  onNavigateToCourses: () => void;
}

export default function DashboardSection({
  assessment,
  onNavigateToReport,
  onNavigateToCourses,
}: DashboardSectionProps) {
  if (!assessment) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-slate-400">
        <p>No assessment selected. Please select a profile or scan a new paper.</p>
      </div>
    );
  }

  // Core Skill Scores
  const skills = [
    { label: "Logical Thinking & Deductions", score: assessment.logicalThinkingScore ?? 90, desc: "Formal logic, implication validity, and deduction consistency.", color: "from-cyan-500 to-blue-600" },
    { label: "Problem-Solving Approach", score: assessment.problemSolvingScore ?? 88, desc: "Decomposition into modular sub-tasks and systematic heuristics.", color: "from-indigo-500 to-purple-600" },
    { label: "Mathematical Ability", score: assessment.mathAbilityScore ?? 92, desc: "Formulaic manipulation, algebraic accuracy, and limits/proofs.", color: "from-purple-500 to-pink-600" },
    { label: "Critical Thinking", score: assessment.criticalThinkingScore ?? 86, desc: "Evaluation of nuance, counter-arguments, and hidden assumptions.", color: "from-sky-500 to-cyan-600" },
    { label: "Vocabulary & Terminology", score: assessment.vocabularyScore ?? 82, desc: "Domain-specific vocabulary precision and academic phrasing.", color: "from-teal-500 to-emerald-600" },
    { label: "English Grammar & Syntax", score: assessment.grammarScore ?? 80, desc: "Sentence structure, punctuation, tense continuity, and transitions.", color: "from-emerald-500 to-green-600" },
  ];

  const strengths = assessment.strengths || [
    "High accuracy in complex calculus and formal proof steps",
    "Systematic problem breakdown into modular sub-problems",
    "Rich academic vocabulary and precise technical terminology"
  ];

  const weaknesses = assessment.weaknesses || [
    "Occasional omission of explicit edge-case boundary validations",
    "Minor grammatical transitions in longer descriptive essays"
  ];

  const improvementAreas = assessment.improvementAreas || [
    "Practice writing explicit real-world context constraints in math proofs",
    "Enhance essay cohesion using clear discourse markers and transition words"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Student Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wide">
                Active Assessment Profile
              </span>
              <span className="text-xs text-slate-400">
                Uploaded: {new Date(assessment.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {assessment.studentName || "Alex Chen"}&apos;s Reasoning Fingerprint
            </h1>
            
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">{assessment.title}</span> • Subject: <span className="text-cyan-300 font-medium">{assessment.subject}</span>
            </p>
          </div>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToReport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            >
              <FileCheck className="w-4 h-4 text-cyan-400" />
              <span>Itemized Skill Report</span>
            </button>

            <button
              onClick={onNavigateToCourses}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition"
            >
              <GraduationCap className="w-4 h-4" />
              <span>View College Major Matches</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Key Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Overall Fingerprint Score */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 relative overflow-hidden group hover:border-cyan-500/40 transition">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Score</span>
            <Award className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{assessment.overallScore}%</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> High Proficiency
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Aggregate performance across all test questions</p>
        </div>

        {/* Metric 2: AI Reasoning Index */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 relative overflow-hidden group hover:border-indigo-500/40 transition">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Reasoning Index</span>
            <BrainCircuit className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-300">{assessment.reasoningIndex}</span>
            <span className="text-xs text-slate-400 font-medium">/ 100</span>
          </div>
          <p className="text-[11px] text-slate-400">Deductive logic & analytical depth metric</p>
        </div>

        {/* Metric 3: Cognitive Persona */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 relative overflow-hidden group hover:border-purple-500/40 transition">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Cognitive Persona</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-sm font-bold text-white truncate pt-1">
            {assessment.cognitiveStyle || "Analytical Thinker"}
          </div>
          <p className="text-[11px] text-slate-400">Primary problem-solving cognitive orientation</p>
        </div>

        {/* Metric 4: OCR Accuracy */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 relative overflow-hidden group hover:border-emerald-500/40 transition">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">OCR Scan Quality</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400">{assessment.ocrConfidence}%</span>
            <span className="text-xs text-emerald-300">Verified</span>
          </div>
          <p className="text-[11px] text-slate-400">Handwritten & typed character extraction precision</p>
        </div>

      </div>

      {/* Main Section: Skill Fingerprint Radar & Bar Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: 6 Core Skill Gauges (8 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                7-Dimensional Skill Fingerprint Breakdown
              </h3>
              <p className="text-xs text-slate-400">Multi-vector cognitive & subject proficiency matrix</p>
            </div>
            <span className="text-xs font-semibold text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
              AI Evaluated
            </span>
          </div>

          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {skill.label}
                  </div>
                  <div className="font-extrabold text-cyan-300 text-sm">
                    {skill.score} / 100
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>

                <div className="text-[11px] text-slate-400">
                  {skill.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual Skill Spider Web/Radar Simulation & Quick Insights (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Custom SVG Radar/Polygon Visualization */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 text-center">
            <h3 className="text-sm font-bold text-white flex items-center justify-center gap-2">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
              Cognitive Balance Radar Chart
            </h3>

            {/* Polygon Visual */}
            <div className="relative w-full aspect-square max-w-[280px] mx-auto flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Background Concentric Circles */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="20" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />

                {/* Axis Lines */}
                <line x1="100" y1="20" x2="100" y2="180" stroke="#334155" strokeWidth="1" />
                <line x1="30" y1="60" x2="170" y2="140" stroke="#334155" strokeWidth="1" />
                <line x1="30" y1="140" x2="170" y2="60" stroke="#334155" strokeWidth="1" />

                {/* Dynamic Polygon plot based on scores */}
                {/* 6 points: Logic(Top), ProbSolv(TopRight), Math(BotRight), Critical(Bot), Vocab(BotLeft), Grammar(TopLeft) */}
                <polygon
                  points={`
                    100,${100 - (skills[0].score / 100) * 75}
                    ${100 + (skills[1].score / 100) * 65},${100 - (skills[1].score / 100) * 35}
                    ${100 + (skills[2].score / 100) * 65},${100 + (skills[2].score / 100) * 35}
                    100,${100 + (skills[3].score / 100) * 75}
                    ${100 - (skills[4].score / 100) * 65},${100 + (skills[4].score / 100) * 35}
                    ${100 - (skills[5].score / 100) * 65},${100 - (skills[5].score / 100) * 35}
                  `}
                  fill="rgba(6, 182, 212, 0.25)"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                />

                {/* Category Labels */}
                <text x="100" y="12" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">LOGIC</text>
                <text x="175" y="55" fill="#818cf8" fontSize="8" textAnchor="start" fontWeight="bold">PROBLEM SOLV</text>
                <text x="175" y="150" fill="#a855f7" fontSize="8" textAnchor="start" fontWeight="bold">MATH</text>
                <text x="100" y="195" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">CRITICAL</text>
                <text x="25" y="150" fill="#2dd4bf" fontSize="8" textAnchor="end" fontWeight="bold">VOCAB</text>
                <text x="25" y="55" fill="#34d399" fontSize="8" textAnchor="end" fontWeight="bold">GRAMMAR</text>
              </svg>
            </div>

            <p className="text-[11px] text-slate-400">
              Balanced polygon shape indicates well-rounded cognitive distribution with distinct STEM dominance.
            </p>
          </div>

          {/* Top College Match Box */}
          <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                Primary University Course Match
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                96% Fit
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-white">
                B.S. Computer Science & Artificial Intelligence
              </h4>
              <p className="text-xs text-slate-300 mt-1 line-clamp-3">
                Your logical thinking (96) and problem-solving (88) scores demonstrate prime alignment for algorithm design, computational theory, and artificial intelligence.
              </p>
            </div>

            <button
              onClick={onNavigateToCourses}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
            >
              <span>Explore All Matched Majors</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Grid: Strengths, Weaknesses & Improvement Roadmaps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Strengths Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Key Cognitive Strengths</h3>
              <p className="text-[11px] text-slate-400">Areas of natural proficiency & high mastery</p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {strengths.map((str: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses / Risk Areas Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Identified Slips & Weaknesses</h3>
              <p className="text-[11px] text-slate-400">Execution errors detected by AI scanner</p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {weaknesses.map((weak: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>{weak}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actionable Improvement Roadmap */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Priority Improvement Plan</h3>
              <p className="text-[11px] text-slate-400">Actionable steps to reach top performance</p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {improvementAreas.map((area: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}
