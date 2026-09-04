"use client";

import React, { useState } from "react";
import { 
  FileCheck, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  BookOpen, 
  Printer, 
  Download, 
  Sparkles, 
  Filter, 
  Lightbulb, 
  MessageSquare,
  Award
} from "lucide-react";

interface SkillReportProps {
  assessment: any;
  questions: any[];
  onOpenExportModal: () => void;
}

export default function SkillReportSection({
  assessment,
  questions = [],
  onOpenExportModal,
}: SkillReportProps) {
  const [filter, setFilter] = useState<'all' | 'correct' | 'partial' | 'incorrect'>('all');

  const filteredQuestions = questions.filter((q) => {
    if (filter === 'all') return true;
    return q.verdict === filter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Granular Question Breakdown</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Itemized Assessment Skill Report
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Exam: <span className="text-white font-medium">{assessment?.title}</span> • Candidate: <span className="text-cyan-300 font-medium">{assessment?.studentName}</span>
          </p>
        </div>

        {/* Action Button: Export PDF */}
        <button
          onClick={onOpenExportModal}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Export Official PDF Report</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Filter Questions:</span>
        </div>

        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: `All (${questions.length})` },
            { id: 'correct', label: `Correct (${questions.filter(q => q.verdict === 'correct').length})` },
            { id: 'partial', label: `Partial (${questions.filter(q => q.verdict === 'partial').length})` },
            { id: 'incorrect', label: `Incorrect (${questions.filter(q => q.verdict === 'incorrect').length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === tab.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm">
            No questions match the selected filter.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isCorrect = q.verdict === 'correct';
            const isPartial = q.verdict === 'partial';

            return (
              <div
                key={q.id || idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition"
              >
                
                {/* Question Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-800 text-cyan-400 font-extrabold text-sm flex items-center justify-center border border-slate-700">
                      Q{q.questionNum}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Category: {q.skillCategory}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-extrabold text-slate-300">
                      Score: <span className="text-cyan-400">{q.obtainedMarks}</span> / {q.maxMarks}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                        isCorrect
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : isPartial
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : isPartial ? (
                        <AlertCircle className="w-3.5 h-3.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                      <span className="capitalize">{q.verdict}</span>
                    </span>
                  </div>
                </div>

                {/* Question Text */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Question Statement</div>
                  <p className="text-sm font-semibold text-white bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                    {q.questionText}
                  </p>
                </div>

                {/* Student Response */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Student Handwritten / Typed Answer
                  </div>
                  <div className="text-xs text-slate-300 font-mono bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 whitespace-pre-wrap">
                    {q.studentAnswer}
                  </div>
                </div>

                {/* Detected Errors Pill (if any) */}
                {q.detectedErrors && q.detectedErrors.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1">
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      Isolated Flaws / Omissions:
                    </div>
                    <ul className="list-disc list-inside text-xs text-amber-200 space-y-0.5 pl-1">
                      {q.detectedErrors.map((err: string, errIdx: number) => (
                        <li key={errIdx}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* AI Feedback & Ideal Approach */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  
                  {/* AI Feedback */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                      AI Evaluator Feedback:
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {q.aiFeedback}
                    </p>
                  </div>

                  {/* Ideal Solution Approach */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
                      Recommended Solution Methodology:
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {q.idealApproach || "Verify base assumptions, derive step-by-step logic, and check edge cases."}
                    </p>
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
