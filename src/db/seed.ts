import { db } from "./index";
import { students, assessments, questionAnalyses, courseRecommendations } from "./schema";
import { eq } from "drizzle-orm";

export async function seedDatabase() {
  try {
    const existingStudents = await db.select().from(students).limit(1);
    if (existingStudents.length > 0) {
      console.log("Database already seeded.");
      return;
    }

    console.log("Seeding AI Reasoning Fingerprint DB...");

    // 1. Create Sample Students
    const [student1] = await db
      .insert(students)
      .values({
        name: "Alex Chen",
        email: "alex.chen@university.edu",
        gradeLevel: "Grade 12 (High School Senior)",
        targetMajor: "Computer Science & Artificial Intelligence",
      })
      .returning();

    const [student2] = await db
      .insert(students)
      .values({
        name: "Sophia Rivera",
        email: "sophia.rivera@prep.edu",
        gradeLevel: "Undergraduate Prep (Year 1)",
        targetMajor: "Economics & Philosophy",
      })
      .returning();

    const [student3] = await db
      .insert(students)
      .values({
        name: "Marcus Vance",
        email: "marcus.v@academy.edu",
        gradeLevel: "Grade 12",
        targetMajor: "Robotics & Electrical Engineering",
      })
      .returning();

    // 2. Create Assessment 1: STEM Math & Algorithm Logic Scan for Alex Chen
    const [assess1] = await db
      .insert(assessments)
      .values({
        studentId: student1.id,
        title: "Calculus, Logic & Algorithm Diagnostic Paper",
        subject: "Mathematics & Computer Science",
        paperType: "Combined Math & Logic Mock Exam",
        ocrConfidence: 98.2,
        overallScore: 91,
        reasoningIndex: 94,
        grammarScore: 84,
        vocabularyScore: 88,
        logicalThinkingScore: 96,
        criticalThinkingScore: 92,
        problemSolvingScore: 95,
        mathAbilityScore: 94,
        cognitiveStyle: "Algorithmic & First-Principles Thinker",
        strengths: [
          "Exceptional formal logic derivation and inductive proofs",
          "High accuracy in complex calculus and algebraic manipulation",
          "Systematic problem breakdown into modular sub-problems",
          "Strong precision in technical vocabulary and notation usage"
        ],
        weaknesses: [
          "Minor grammatical omissions in descriptive essay transitions",
          "Tendency to skip intermediate variable boundary validation steps",
          "Slightly dense written explanation style"
        ],
        improvementAreas: [
          "Practice writing explicit real-world context constraints in math proofs",
          "Enhance essay cohesion using clear discourse markers and transition words",
          "Double-check edge-case scenarios in algorithmic complexity problems"
        ],
        rawQuestionText: `Q1. Evaluate the limit as x approaches 0 of (sin 3x) / x. Show step-by-step logic.
Q2. Design a dynamic programming logic for the 0/1 Knapsack problem. Explain why greedy fails.
Q3. Analyze the argument: 'All autonomous systems require sensor fusion; System X has sensor fusion; therefore System X is autonomous.' Identify any logical fallacies.
Q4. Write a brief technical synthesis explaining how gradient descent minimizes loss functions.`,
        rawAnswerText: `A1: Using L'Hopital's Rule, derivative of sin(3x) is 3cos(3x), derivative of x is 1. Limit is 3(cos 0)/1 = 3. Alternatively, sin(3x)/x = 3 * (sin 3x)/(3x) -> 3 * 1 = 3.
A2: Greedy fails because local optimal density ratio does not guarantee global optimal packing when items cannot be fractional. DP state is DP[i][w] = max(DP[i-1][w], val[i-1] + DP[i-1][w-wt[i-1]]).
A3: Fallacy of Affirming the Consequent. P -> Q does not imply Q -> P. Just because autonomous systems need sensor fusion doesn't mean anything with sensor fusion is autonomous.
A4: Gradient descent updates parameters theta in direction of negative gradient -alpha * grad L(theta). It iteratively converges to local minimum by taking steepest slope steps down the hyper-dimensional surface.`,
      })
      .returning();

    // Question Analyses for Alex
    await db.insert(questionAnalyses).values([
      {
        assessmentId: assess1.id,
        questionNum: 1,
        questionText: "Evaluate the limit as x approaches 0 of (sin 3x) / x. Show step-by-step logic.",
        studentAnswer: "Using L'Hopital's Rule, derivative of sin(3x) is 3cos(3x), derivative of x is 1. Limit is 3(cos 0)/1 = 3.",
        maxMarks: 10,
        obtainedMarks: 10,
        skillCategory: "Mathematics",
        verdict: "correct",
        aiFeedback: "Flawless mathematical execution. Provided both L'Hopital method and standard trigonometric limit transformation.",
        detectedErrors: [],
        idealApproach: "Verified indeterminate form 0/0 first, then applied L'Hopital's rule or limit standard identity (sin u / u -> 1)."
      },
      {
        assessmentId: assess1.id,
        questionNum: 2,
        questionText: "Design dynamic programming logic for 0/1 Knapsack. Explain why greedy fails.",
        studentAnswer: "Greedy fails because local optimal density ratio does not guarantee global optimal packing when items cannot be fractional. DP state is DP[i][w] = max(DP[i-1][w], val[i-1] + DP[i-1][w-wt[i-1]]).",
        maxMarks: 10,
        obtainedMarks: 9,
        skillCategory: "Problem Solving",
        verdict: "correct",
        aiFeedback: "Excellent algorithmic intuition and state recurrence formulation. Missing explicit base case initialization (DP[0][w] = 0).",
        detectedErrors: ["Omitted base-case boundary definition"],
        idealApproach: "State recursive transition, state base cases explicitly, and state time/space complexity O(N*W)."
      },
      {
        assessmentId: assess1.id,
        questionNum: 3,
        questionText: "Identify fallacies in: 'All autonomous systems require sensor fusion; System X has sensor fusion; therefore System X is autonomous.'",
        studentAnswer: "Fallacy of Affirming the Consequent. P -> Q does not imply Q -> P. Just because autonomous systems need sensor fusion doesn't mean anything with sensor fusion is autonomous.",
        maxMarks: 10,
        obtainedMarks: 10,
        skillCategory: "Logical Reasoning",
        verdict: "correct",
        aiFeedback: "Superb formal logic identification. Correctly framed symbolic implication P -> Q.",
        detectedErrors: [],
        idealApproach: "Formalized premise 1 (A -> S) and premise 2 (S(x)), pointed out converse error."
      },
      {
        assessmentId: assess1.id,
        questionNum: 4,
        questionText: "Write a brief technical synthesis explaining how gradient descent minimizes loss functions.",
        studentAnswer: "Gradient descent updates parameters theta in direction of negative gradient -alpha * grad L(theta). It iteratively converges to local minimum by taking steepest slope steps down the hyper-dimensional surface.",
        maxMarks: 10,
        obtainedMarks: 8,
        skillCategory: "English & Grammar",
        verdict: "partial",
        aiFeedback: "Strong technical vocabulary. Sentence 2 uses slightly informal phrasing 'steepest slope steps down the hyper-dimensional surface'. Could benefit from passive academic structure.",
        detectedErrors: ["Minor style informal tone", "Missing convex vs non-convex distinction"],
        idealApproach: "Define objective loss, learning rate alpha, gradient computation, and discuss convergence properties."
      }
    ]);

    // Course Recommendations for Alex
    await db.insert(courseRecommendations).values([
      {
        assessmentId: assess1.id,
        courseName: "B.S. Computer Science & Artificial Intelligence",
        field: "STEM",
        matchPercentage: 96,
        suitabilityReason: "Your outstanding scores in Logical Thinking (96) and Mathematics (94) demonstrate an ideal profile for theoretical computing, machine learning, and algorithm design.",
        keyRequiredSkills: ["Algorithmic Design", "Discrete Mathematics", "Formal Proofs", "Linear Algebra"],
        skillsToImprove: ["Academic Writing & Synthesis", "Software Documentation Structure"],
        careerPaths: ["AI Research Scientist", "Machine Learning Engineer", "Algorithms Architect", "Robotics System Lead"],
        topUniversities: ["MIT", "Stanford University", "Carnegie Mellon University", "UC Berkeley"]
      },
      {
        assessmentId: assess1.id,
        courseName: "B.S. Data Science & Quantitative Finance",
        field: "STEM / Business",
        matchPercentage: 92,
        suitabilityReason: "High mathematical rigor and logical reasoning allow you to excel in stochastic modeling, statistical inference, and financial optimization.",
        keyRequiredSkills: ["Statistical Calculus", "Probability Theory", "Data Optimization"],
        skillsToImprove: ["Macroeconomic Contextual Analysis", "Visual Storytelling with Data"],
        careerPaths: ["Quantitative Strategist", "Data Engineer", "Risk Modeling Analyst"],
        topUniversities: ["Columbia University", "NYU Courant", "Oxford University", "ETH Zurich"]
      },
      {
        assessmentId: assess1.id,
        courseName: "B.S. Electrical Engineering & Robotics",
        field: "STEM",
        matchPercentage: 88,
        suitabilityReason: "Strong problem-solving methodology fits hardware-software co-design, control systems, and autonomous navigation.",
        keyRequiredSkills: ["Differential Equations", "Signal Processing", "Control Theory"],
        skillsToImprove: ["Physical Systems Laboratory Experiments", "Circuit Theory"],
        careerPaths: ["Autonomous Vehicles Systems Lead", "Embedded Systems Engineer"],
        topUniversities: ["Georgia Tech", "Caltech", "Imperial College London"]
      }
    ]);

    // 2. Create Assessment 2: Sophia Rivera - Humanities & Critical Writing
    const [assess2] = await db
      .insert(assessments)
      .values({
        studentId: student2.id,
        title: "Analytical Essay & Logic Evaluation Scan",
        subject: "Humanities & Philosophy",
        paperType: "Critical Essay & Logic Assessment",
        ocrConfidence: 97.5,
        overallScore: 89,
        reasoningIndex: 90,
        grammarScore: 95,
        vocabularyScore: 96,
        logicalThinkingScore: 88,
        criticalThinkingScore: 94,
        problemSolvingScore: 82,
        mathAbilityScore: 78,
        cognitiveStyle: "Verbal-Analytical & Argumentative Synthesis",
        strengths: [
          "Exceptional English grammar, syntactic variety, and rich vocabulary",
          "Deep critical evaluation of nuance and counter-arguments",
          "Persuasive rhetorical structure and articulate exposition"
        ],
        weaknesses: [
          "Slightly slower numerical computation speed in data-driven prompts",
          "Occasional overuse of complex passive voice clauses"
        ],
        improvementAreas: [
          "Incorporate quantitative evidence graphs to solidify qualitative arguments",
          "Simplify sentence structures for maximum executive clarity"
        ],
        rawQuestionText: "Q1. Analyze the socio-economic implications of universal basic income. Evaluate opposing philosophical viewpoints.",
        rawAnswerText: "The debate surrounding Universal Basic Income (UBI) hinges upon opposing interpretations of human agency and distributive justice. Utilitarian proponents argue that guaranteed security minimizes extreme poverty and fosters creative entrepreneurship. Conversely, deontological skeptics maintain that decoupling compensation from labor disincentivizes productivity and overburdens fiscal structures.",
      })
      .returning();

    await db.insert(questionAnalyses).values([
      {
        assessmentId: assess2.id,
        questionNum: 1,
        questionText: "Analyze the socio-economic implications of universal basic income. Evaluate opposing philosophical viewpoints.",
        studentAnswer: "The debate surrounding Universal Basic Income (UBI) hinges upon opposing interpretations of human agency and distributive justice. Utilitarian proponents argue that guaranteed security minimizes extreme poverty...",
        maxMarks: 20,
        obtainedMarks: 19,
        skillCategory: "Critical Thinking",
        verdict: "correct",
        aiFeedback: "Masterful argumentative depth and exceptional vocabulary range (deontological, utilitarian, distributive justice).",
        detectedErrors: [],
        idealApproach: "Examine economic feasibility, moral philosophies (Rawls vs Nozick), and provide empirical policy trial references."
      }
    ]);

    await db.insert(courseRecommendations).values([
      {
        assessmentId: assess2.id,
        courseName: "B.A. Philosophy, Politics & Economics (PPE)",
        field: "Humanities & Social Sciences",
        matchPercentage: 97,
        suitabilityReason: "Your 96 Vocabulary score, 95 Grammar score, and 94 Critical Thinking rank in the top percentile, making you ideally suited for interdisciplinary political economy and ethics.",
        keyRequiredSkills: ["Expository Writing", "Ethical Theory Analysis", "Policy Evaluation"],
        skillsToImprove: ["Quantitative Econometrics", "Statistical Regression Analysis"],
        careerPaths: ["Policy Analyst", "International Diplomat", "Management Consultant", "Constitutional Law Specialist"],
        topUniversities: ["Oxford University", "LSE", "Harvard University", "Yale University"]
      },
      {
        assessmentId: assess2.id,
        courseName: "Juris Doctor / Pre-Law & Public Policy",
        field: "Humanities & Social Sciences",
        matchPercentage: 94,
        suitabilityReason: "High critical reasoning and precise language syntax allow you to parse complex statutory text and build airtight legal briefs.",
        keyRequiredSkills: ["Statutory Interpretation", "Rhetorical Argumentation", "Logical Deductions"],
        skillsToImprove: ["Formal Symbolic Logic Notation"],
        careerPaths: ["Corporate Attorney", "Supreme Court Clerk", "Regulatory Advisor"],
        topUniversities: ["Georgetown Law", "Stanford Law", "Cambridge University"]
      }
    ]);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
