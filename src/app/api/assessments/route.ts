import { NextResponse } from "next/server";
import { db } from "@/db";
import { students, assessments, questionAnalyses, courseRecommendations } from "@/db/schema";
import { analyzeStudentPaper } from "@/lib/reasoningEngine";
import { seedDatabase } from "@/db/seed";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    // Ensure DB is seeded on first request if empty
    await seedDatabase();

    const list = await db
      .select({
        id: assessments.id,
        title: assessments.title,
        subject: assessments.subject,
        paperType: assessments.paperType,
        overallScore: assessments.overallScore,
        reasoningIndex: assessments.reasoningIndex,
        grammarScore: assessments.grammarScore,
        vocabularyScore: assessments.vocabularyScore,
        logicalThinkingScore: assessments.logicalThinkingScore,
        criticalThinkingScore: assessments.criticalThinkingScore,
        problemSolvingScore: assessments.problemSolvingScore,
        mathAbilityScore: assessments.mathAbilityScore,
        cognitiveStyle: assessments.cognitiveStyle,
        createdAt: assessments.createdAt,
        studentName: students.name,
        studentEmail: students.email,
        studentGrade: students.gradeLevel,
      })
      .from(assessments)
      .leftJoin(students, eq(assessments.studentId, students.id))
      .orderBy(desc(assessments.createdAt));

    return NextResponse.json({ success: true, assessments: list });
  } catch (error: any) {
    console.error("GET /api/assessments error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      studentName = "Student Candidate",
      studentEmail = "student@example.com",
      gradeLevel = "Grade 12 Senior",
      title = "Diagnostic Assessment Scan",
      subject = "STEM & General Aptitude",
      rawQuestionText = "",
      rawAnswerText = "",
    } = body;

    // Run AI Reasoning Analysis
    const analysis = analyzeStudentPaper(title, subject, rawQuestionText, rawAnswerText);
    const fp = analysis.fingerprint;

    // 1. Create or Find Student
    let [student] = await db
      .select()
      .from(students)
      .where(eq(students.email, studentEmail))
      .limit(1);

    if (!student) {
      [student] = await db
        .insert(students)
        .values({
          name: studentName,
          email: studentEmail,
          gradeLevel,
          targetMajor: subject,
        })
        .returning();
    }

    // 2. Save Assessment
    const [newAssessment] = await db
      .insert(assessments)
      .values({
        studentId: student.id,
        title: analysis.title,
        subject: analysis.subject,
        paperType: analysis.paperType,
        ocrConfidence: fp.ocrConfidence,
        overallScore: fp.overallScore,
        reasoningIndex: fp.reasoningIndex,
        grammarScore: fp.grammarScore,
        vocabularyScore: fp.vocabularyScore,
        logicalThinkingScore: fp.logicalThinkingScore,
        criticalThinkingScore: fp.criticalThinkingScore,
        problemSolvingScore: fp.problemSolvingScore,
        mathAbilityScore: fp.mathAbilityScore,
        cognitiveStyle: fp.cognitiveStyle,
        strengths: fp.strengths,
        weaknesses: fp.weaknesses,
        improvementAreas: fp.improvementAreas,
        rawQuestionText: analysis.rawQuestionText,
        rawAnswerText: analysis.rawAnswerText,
      })
      .returning();

    // 3. Save Question Breakdown
    for (const q of analysis.questions) {
      await db.insert(questionAnalyses).values({
        assessmentId: newAssessment.id,
        questionNum: q.questionNum,
        questionText: q.questionText,
        studentAnswer: q.studentAnswer,
        maxMarks: q.maxMarks,
        obtainedMarks: q.obtainedMarks,
        skillCategory: q.skillCategory,
        verdict: q.verdict,
        aiFeedback: q.aiFeedback,
        detectedErrors: q.detectedErrors,
        idealApproach: q.idealApproach,
      });
    }

    // 4. Save Course Recommendations
    for (const rec of analysis.recommendations) {
      await db.insert(courseRecommendations).values({
        assessmentId: newAssessment.id,
        courseName: rec.courseName,
        field: rec.field,
        matchPercentage: rec.matchPercentage,
        suitabilityReason: rec.suitabilityReason,
        keyRequiredSkills: rec.keyRequiredSkills,
        skillsToImprove: rec.skillsToImprove,
        careerPaths: rec.careerPaths,
        topUniversities: rec.topUniversities,
      });
    }

    return NextResponse.json({
      success: true,
      assessmentId: newAssessment.id,
      analysis,
    });
  } catch (error: any) {
    console.error("POST /api/assessments error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
