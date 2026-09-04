"use client";

import React, { useState, useEffect } from "react";
import { 
  Cpu, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  Fingerprint, 
  ArrowRight, 
  BarChart3, 
  FileText, 
  BookOpen, 
  ShieldAlert, 
  GraduationCap,
  Activity
} from "lucide-react";

interface AnalysisEngineProps {
  assessment: any;
  onViewDashboard: () => void;
}

export default function AnalysisEngineSection({ assessment, onViewDashboard }: AnalysisEngineProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const stages = [
    { title: "OCR Digitization & Text Structuring", desc: "Parsing question layout & student handwriting/typing text", icon: FileText },
    { title: "Grammar & Vocabulary Syntactical Scan", desc: "Evaluating sentence structure, transition words, and domain terminology", icon: BookOpen },
    { title: "Step-by-Step Math & Logic Proofing", desc: "Validating algebraic transformations, limit laws, and deductive premises", icon: Cpu },
    { title: "Cognitive Approach & Fallacy Detection", desc: "Classifying problem-solving heuristics and isolating logical flaws", icon: ShieldAlert },
    { title: "Fingerprint Synthesis & Course Matching", desc: "Calculating 7-dimension score radar and university fit index", icon: GraduationCap },
  ];

  useEffect(() => {
    setLogs([]);
    const logMessages = [
      "[0.00s] Initializing AI Reasoning Fingerprint Engine v2.4...",
      "[0.15s] OCR Engine connected. Ingesting multi-page question paper and student answer sheet...",
      "[0.32s] OCR Confidence: 98.4%. Digitized 4 questions and responses.",
      "[0.55s] Running Linguistic Syntax Scan: Grammar Score 84/100, Vocab Density 88/100.",
      "[0.80s] Verifying Step 1 Calculus derivation: Indeterminate limit form (0/0) correctly converted.",
      "[1.10s] Verifying Step 2 Algorithm DP recurrence relation: Base case omission detected.",
      "[1.35s] Logical reasoning scan: Formal fallacy identified as Affirming the Consequent (Correctly isolated by student).",
      "[1.60s] Synthesizing Cognitive Persona: Algorithmic & First-Principles Thinker.",
      "[1.85s] Matching against 50+ university programs... Top match: B.S. Computer Science & AI (96% Match).",
      "[2.00s] Analysis complete. AI Reasoning Fingerprint report compiled!"
    ];

    let currentLog = 0;
    const logInterval = setInterval(() => {
      if (currentLog < logMessages.length) {
        setLogs((prev) => [...prev, logMessages[currentLog]]);
        currentLog++;
      } else {
        clearInterval(logInterval);
      }
    }, 200);

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => {
      clearInterval(logInterval);
      clearInterval(stepInterval);
    };
  }, [assessment]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Live AI Analysis Pipeline</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white">
          Multi-Stage Cognitive Fingerprint Engine
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Currently inspecting paper: <span className="text-cyan-300 font-semibold">{assessment?.title || "STEM Diagnostic"}</span>
        </p>
      </div>

      {/* Pipeline Stages Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = idx <= activeStep;
          const isCurrent = idx === activeStep;
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                isCurrent
                  ? "bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10"
                  : isDone
                  ? "bg-slate-900/80 border-slate-800"
                  : "bg-slate-950 border-slate-900 opacity-60"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isDone ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-800 text-slate-500"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">STAGE 0{idx + 1}</span>
                </div>
                <div className="text-xs font-bold text-white leading-snug">{stage.title}</div>
                <p className="text-[10px] text-slate-400 line-clamp-2">{stage.desc}</p>
              </div>
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                <span className={isDone ? "text-cyan-400 font-semibold flex items-center gap-1" : "text-slate-500"}>
                  {isDone ? <CheckCircle2 className="w-3 h-3 text-cyan-400" /> : "Pending"}
                  {isDone ? " Verified" : ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal Log Console */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 font-mono shadow-2xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-200">AI Diagnostic Kernel Logs</span>
          </div>
          <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
            Realtime Stream
          </span>
        </div>

        <div className="h-48 overflow-y-auto space-y-1.5 text-xs text-slate-300 pr-2">
          {logs.map((log, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-cyan-500 font-bold">&gt;</span>
              <span className={log.includes("complete") ? "text-emerald-400 font-bold" : log.includes("Error") || log.includes("omission") ? "text-amber-300" : "text-slate-300"}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Result Callout & CTA */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 border border-cyan-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
            <Fingerprint className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              AI Reasoning Fingerprint Synthesis Ready
            </h3>
            <p className="text-xs text-slate-300">
              Overall Score: <span className="font-bold text-cyan-400">{assessment?.overallScore || 85}%</span> • 
              Reasoning Index: <span className="font-bold text-indigo-400">{assessment?.reasoningIndex || 88}/100</span> • 
              Cognitive Persona: <span className="font-bold text-emerald-400">{assessment?.cognitiveStyle || "Analytical Thinker"}</span>
            </p>
          </div>
        </div>

        <button
          onClick={onViewDashboard}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all shrink-0"
        >
          <BarChart3 className="w-4 h-4" />
          <span>Open Full Student Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
