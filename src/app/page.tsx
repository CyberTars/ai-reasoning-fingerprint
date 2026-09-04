"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import AnalysisEngineSection from "@/components/AnalysisEngineSection";
import DashboardSection from "@/components/DashboardSection";
import SkillReportSection from "@/components/SkillReportSection";
import CourseRecommendationsSection from "@/components/CourseRecommendationsSection";
import ExportReportModal from "@/components/ExportReportModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [assessments, setAssessments] = useState<any[]>([]);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<number | null>(null);
  
  const [currentAssessmentData, setCurrentAssessmentData] = useState<{
    assessment: any;
    questions: any[];
    recommendations: any[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Fetch initial list of assessments
  const fetchAssessments = async (preferredId?: number) => {
    try {
      const res = await fetch("/api/assessments");
      const data = await res.json();
      if (data.success && data.assessments?.length > 0) {
        setAssessments(data.assessments);
        const targetId = preferredId || data.assessments[0].id;
        setSelectedAssessmentId(targetId);
        fetchAssessmentDetail(targetId);
      }
    } catch (error) {
      console.error("Failed to fetch assessments:", error);
    }
  };

  // Fetch single assessment details
  const fetchAssessmentDetail = async (id: number) => {
    try {
      const res = await fetch(`/api/assessments/${id}`);
      const data = await res.json();
      if (data.success) {
        setCurrentAssessmentData({
          assessment: data.assessment,
          questions: data.questions,
          recommendations: data.recommendations,
        });
      }
    } catch (error) {
      console.error("Failed to fetch assessment detail:", error);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  // Handle switching candidate profile
  const handleSelectAssessment = (id: number) => {
    setSelectedAssessmentId(id);
    fetchAssessmentDetail(id);
  };

  // Handle new paper submission
  const handleStartAnalysis = async (payload: {
    studentName: string;
    studentEmail: string;
    gradeLevel: string;
    title: string;
    subject: string;
    rawQuestionText: string;
    rawAnswerText: string;
  }) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        await fetchAssessments(data.assessmentId);
        setActiveTab("analysis");
      }
    } catch (error) {
      console.error("Analysis submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Sticky Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        assessments={assessments}
        selectedAssessmentId={selectedAssessmentId}
        onSelectAssessment={handleSelectAssessment}
        onUploadClick={() => setActiveTab("upload")}
      />

      {/* Main View Area */}
      <main className="flex-1">
        
        {activeTab === "home" && (
          <div className="space-y-12">
            <HeroSection
              onStartUpload={() => setActiveTab("upload")}
              onExploreDemo={() => setActiveTab("dashboard")}
            />
            
            {/* Quick Teaser Preview of Active Assessment */}
            {currentAssessmentData?.assessment && (
              <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="text-center mb-6">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Loaded Demo Profile</span>
                  <h3 className="text-2xl font-extrabold text-white">Active Candidate Assessment Preview</h3>
                </div>
                <DashboardSection
                  assessment={currentAssessmentData.assessment}
                  onNavigateToReport={() => setActiveTab("report")}
                  onNavigateToCourses={() => setActiveTab("courses")}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === "upload" && (
          <UploadSection
            onStartAnalysis={handleStartAnalysis}
            isLoading={isLoading}
          />
        )}

        {activeTab === "analysis" && (
          <AnalysisEngineSection
            assessment={currentAssessmentData?.assessment}
            onViewDashboard={() => setActiveTab("dashboard")}
          />
        )}

        {activeTab === "dashboard" && (
          <DashboardSection
            assessment={currentAssessmentData?.assessment}
            onNavigateToReport={() => setActiveTab("report")}
            onNavigateToCourses={() => setActiveTab("courses")}
          />
        )}

        {activeTab === "report" && (
          <SkillReportSection
            assessment={currentAssessmentData?.assessment}
            questions={currentAssessmentData?.questions || []}
            onOpenExportModal={() => setIsExportModalOpen(true)}
          />
        )}

        {activeTab === "courses" && (
          <CourseRecommendationsSection
            assessment={currentAssessmentData?.assessment}
            recommendations={currentAssessmentData?.recommendations || []}
          />
        )}

      </main>

      {/* Printable Scorecard Modal */}
      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        assessment={currentAssessmentData?.assessment}
        questions={currentAssessmentData?.questions || []}
        recommendations={currentAssessmentData?.recommendations || []}
      />

      {/* Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />

    </div>
  );
}
