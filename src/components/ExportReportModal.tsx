"use client";

import React from "react";
import { 
  X, 
  Printer, 
  Download, 
  Fingerprint, 
  Award, 
  CheckCircle, 
  GraduationCap,
  ShieldAlert,
  BrainCircuit
} from "lucide-react";

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: any;
  questions: any[];
  recommendations: any[];
}

export default function ExportReportModal({
  isOpen,
  onClose,
  assessment,
  questions = [],
  recommendations = [],
}: ExportReportModalProps) {
  if (!isOpen || !assessment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Fingerprint className="w-5 h-5 text-cyan-400" />
            <span>Official AI Reasoning Fingerprint Report</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Scorecard Content */}
        <div id="printable-report" className="p-8 space-y-6 text-slate-100 bg-slate-900 print:bg-white print:text-slate-900">
          
          {/* Header Banner */}
          <div className="flex items-center justify-between border-b border-slate-800 print:border-slate-300 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center print:bg-slate-100 print:border-slate-300">
                <Fingerprint className="w-7 h-7 text-cyan-400 print:text-slate-800" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">AI Reasoning Fingerprint Report</h1>
                <p className="text-xs text-slate-400 print:text-slate-600">Cognitive Skill & University Major Alignment Certificate</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold text-cyan-400 print:text-slate-800">SCORE: {assessment.overallScore}%</div>
              <div className="text-[10px] text-slate-400 print:text-slate-600">
                Date: {new Date(assessment.createdAt || Date.now()).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Student Profile Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 print:text-slate-600 block uppercase font-bold">Candidate Name</span>
              <span className="font-bold text-white print:text-slate-900">{assessment.studentName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 print:text-slate-600 block uppercase font-bold">Email Address</span>
              <span className="font-semibold text-slate-300 print:text-slate-800">{assessment.studentEmail}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 print:text-slate-600 block uppercase font-bold">Exam Title</span>
              <span className="font-semibold text-slate-300 print:text-slate-800 truncate block">{assessment.title}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 print:text-slate-600 block uppercase font-bold">Cognitive Persona</span>
              <span className="font-bold text-cyan-300 print:text-slate-900">{assessment.cognitiveStyle}</span>
            </div>
          </div>

          {/* 7-Dimension Score Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 print:text-slate-800">
              7-Dimension Reasoning & Skill Fingerprint Metrics
            </h3>
            
            <table className="w-full text-xs text-left border border-slate-800 print:border-slate-300 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 print:bg-slate-200 text-slate-400 print:text-slate-800 uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Dimension</th>
                  <th className="p-2.5">Metric Evaluation Focus</th>
                  <th className="p-2.5 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-slate-300 text-slate-300 print:text-slate-800">
                <tr>
                  <td className="p-2.5 font-bold text-white print:text-slate-900">Logical Thinking</td>
                  <td className="p-2.5">Formal implications, deduction consistency, premise validity</td>
                  <td className="p-2.5 text-right font-extrabold text-cyan-400 print:text-slate-900">{assessment.logicalThinkingScore}/100</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white print:text-slate-900">Problem Solving</td>
                  <td className="p-2.5">Modular decomposition, heuristic design, edge-case coverage</td>
                  <td className="p-2.5 text-right font-extrabold text-indigo-400 print:text-slate-900">{assessment.problemSolvingScore}/100</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white print:text-slate-900">Mathematical Rigor</td>
                  <td className="p-2.5">Formula derivation accuracy, algebraic steps, calculus limit laws</td>
                  <td className="p-2.5 text-right font-extrabold text-purple-400 print:text-slate-900">{assessment.mathAbilityScore}/100</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white print:text-slate-900">Critical Thinking</td>
                  <td className="p-2.5">Counter-argument synthesis, assumption critique, analytical depth</td>
                  <td className="p-2.5 text-right font-extrabold text-sky-400 print:text-slate-900">{assessment.criticalThinkingScore}/100</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white print:text-slate-900">Vocabulary Precision</td>
                  <td className="p-2.5">Domain-specific academic terminology, phrasing variety</td>
                  <td className="p-2.5 text-right font-extrabold text-teal-400 print:text-slate-900">{assessment.vocabularyScore}/100</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white print:text-slate-900">English Grammar</td>
                  <td className="p-2.5">Syntax consistency, transitional markers, punctuation accuracy</td>
                  <td className="p-2.5 text-right font-extrabold text-emerald-400 print:text-slate-900">{assessment.grammarScore}/100</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Top College Course Fit */}
          {recommendations.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-950 print:bg-slate-100 border border-slate-800 print:border-slate-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 print:text-slate-900 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  Primary Recommended University Major
                </span>
                <span className="text-xs font-extrabold text-emerald-400 print:text-emerald-700">
                  {recommendations[0].matchPercentage}% Match
                </span>
              </div>
              <div className="text-sm font-bold text-white print:text-slate-900">{recommendations[0].courseName}</div>
              <p className="text-xs text-slate-300 print:text-slate-700">{recommendations[0].suitabilityReason}</p>
            </div>
          )}

          {/* Official Verification Footer */}
          <div className="pt-4 border-t border-slate-800 print:border-slate-300 flex justify-between items-center text-[10px] text-slate-400 print:text-slate-600">
            <div>AI Reasoning Fingerprint System • Certified Academic Evaluation</div>
            <div>Document ID: AIR-2026-{(assessment.id || 101).toString().padStart(5, '0')}</div>
          </div>

        </div>

      </div>
    </div>
  );
}
