import { pgTable, serial, text, integer, timestamp, real, jsonb } from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  gradeLevel: text("grade_level").notNull().default("Grade 12"),
  targetMajor: text("target_major"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => students.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  subject: text("subject").notNull(),
  status: text("status").notNull().default("completed"), // 'processing' | 'completed' | 'failed'
  paperType: text("paper_type").default("Mixed Exam"),
  ocrConfidence: real("ocr_confidence").default(96.4),
  overallScore: integer("overall_score").notNull().default(85),
  reasoningIndex: integer("reasoning_index").notNull().default(88),
  
  // Core Skill Scores (0-100)
  grammarScore: integer("grammar_score").notNull().default(80),
  vocabularyScore: integer("vocabulary_score").notNull().default(82),
  logicalThinkingScore: integer("logical_thinking_score").notNull().default(90),
  criticalThinkingScore: integer("critical_thinking_score").notNull().default(86),
  problemSolvingScore: integer("problem_solving_score").notNull().default(88),
  mathAbilityScore: integer("math_ability_score").notNull().default(92),

  cognitiveStyle: text("cognitive_style").default("Systematic Analytical Thinker"),
  strengths: jsonb("strengths").$type<string[]>().default([]),
  weaknesses: jsonb("weaknesses").$type<string[]>().default([]),
  improvementAreas: jsonb("improvement_areas").$type<string[]>().default([]),
  
  rawQuestionText: text("raw_question_text"),
  rawAnswerText: text("raw_answer_text"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const questionAnalyses = pgTable("question_analyses", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").references(() => assessments.id, { onDelete: "cascade" }),
  questionNum: integer("question_num").notNull(),
  questionText: text("question_text").notNull(),
  studentAnswer: text("student_answer").notNull(),
  maxMarks: integer("max_marks").notNull().default(10),
  obtainedMarks: integer("obtained_marks").notNull().default(8),
  skillCategory: text("skill_category").notNull(), // 'Mathematics', 'Logical Reasoning', 'English & Grammar', 'Critical Thinking', 'Problem Solving'
  verdict: text("verdict").notNull().default("correct"), // 'correct', 'partial', 'incorrect'
  aiFeedback: text("ai_feedback").notNull(),
  detectedErrors: jsonb("detected_errors").$type<string[]>().default([]),
  idealApproach: text("ideal_approach"),
});

export const courseRecommendations = pgTable("course_recommendations", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").references(() => assessments.id, { onDelete: "cascade" }),
  courseName: text("course_name").notNull(),
  field: text("field").notNull(), // 'STEM', 'Business', 'Humanities & Social Sciences', 'Medicine & Health', 'Design & Tech'
  matchPercentage: integer("match_percentage").notNull(),
  suitabilityReason: text("suitability_reason").notNull(),
  keyRequiredSkills: jsonb("key_required_skills").$type<string[]>().default([]),
  skillsToImprove: jsonb("skills_to_improve").$type<string[]>().default([]),
  careerPaths: jsonb("career_paths").$type<string[]>().default([]),
  topUniversities: jsonb("top_universities").$type<string[]>().default([]),
});
