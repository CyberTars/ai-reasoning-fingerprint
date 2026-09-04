import { NextResponse } from "next/server";
import { db } from "@/db";
import { students, assessments, questionAnalyses, courseRecommendations } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const assessmentId = parseInt(id, 10);

    if (isNaN(assessmentId)) {
      return NextResponse.json({ success: false, error: "Invalid Assessment ID" }, { status: 400 });
    }

    const [assessmentRecord] = await db
      .select({
        id: assessments.id,
        studentId: assessments.studentId,
        title: assessments.title,
        subject: assessments.subject,
        paperType: assessments.paperType,
        ocrConfidence: assessments.ocrConfidence,
        overallScore: assessments.overallScore,
        reasoningIndex: assessments.reasoningIndex,
        grammarScore: assessments.grammarScore,
        vocabularyScore: assessments.vocabularyScore,
        logicalThinkingScore: assessments.logicalThinkingScore,
        criticalThinkingScore: assessments.criticalThinkingScore,
        problemSolvingScore: assessments.problemSolvingScore,
        mathAbilityScore: assessments.mathAbilityScore,
        cognitiveStyle: assessments.cognitiveStyle,
        strengths: assessments.strengths,
        weaknesses: assessments.weaknesses,
        improvementAreas: assessments.improvementAreas,
        rawQuestionText: assessments.rawQuestionText,
        rawAnswerText: assessments.rawAnswerText,
        createdAt: assessments.createdAt,
        studentName: students.name,
        studentEmail: students.email,
        studentGrade: students.gradeLevel,
        targetMajor: students.targetMajor,
      })
      .from(assessments)
      .leftJoin(students, eq(assessments.studentId, students.id))
      .where(eq(assessments.id, assessmentId));

    if (!assessmentRecord) {
      return NextResponse.json({ success: false, error: "Assessment not found" }, { status: 404 });
    }

    const qList = await db
      .select()
      .from(questionAnalyses)
      .where(eq(questionAnalyses.assessmentId, assessmentId))
      .orderBy(questionAnalyses.questionNum);

    const recList = await db
      .select()
      .from(courseRecommendations)
      .where(eq(courseRecommendations.assessmentId, assessmentId));

    return NextResponse.json({
      success: true,
      assessment: assessmentRecord,
      questions: qList,
      recommendations: recList,
    });
  } catch (error: any) {
    console.error("GET /api/assessments/[id] error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const assessmentId = parseInt(id, 10);

    if (isNaN(assessmentId)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
    }

    await db.delete(assessments).where(eq(assessments.id, assessmentId));
    return NextResponse.json({ success: true, message: "Assessment deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
