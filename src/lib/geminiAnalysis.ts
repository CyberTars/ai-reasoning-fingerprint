type GeminiAnalysis = {
  overallScore: number;
  skills: {
    grammar: number;
    vocabulary: number;
    logicalThinking: number;
    criticalThinking: number;
    problemSolving: number;
    mathematicalAbility: number;
    subjectKnowledge: number;
  };
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  courseRecommendations: {
    course: string;
    matchPercentage: number;
    reason: string;
  }[];
  answerFeedback: {
    question: string;
    answer: string;
    correctness: string;
    reasoning: string;
    feedback: string;
  }[];
};

export async function analyzeWithGemini(
  questionText: string,
  answerText: string,
  subject: string
): Promise<GeminiAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const prompt = `
You are an educational assessment AI for a project called "AI Reasoning Fingerprint".

Analyze a student's answers based ONLY on the question paper and answers provided below.

IMPORTANT:
- Do not claim that you can literally read the student's mind or know their thoughts.
- Infer observable reasoning abilities from their written answers.
- Be fair and educational.
- Do not judge personality.
- Give scores from 0 to 100.
- Return ONLY valid JSON.
- Do not use markdown.
- Do not add explanations outside the JSON.

SUBJECT:
${subject}

QUESTION PAPER:
${questionText}

STUDENT ANSWERS:
${answerText}

Analyze these seven areas:

1. English grammar
2. Vocabulary
3. Logical thinking
4. Critical thinking
5. Problem solving
6. Mathematical ability
7. Subject knowledge

Also identify:
- strengths
- weaknesses
- specific improvements
- suitable college courses

For course recommendations, recommend courses based on the student's demonstrated skills. Give a match percentage and a short reason.

For each answer, provide:
- the question
- the student's answer
- correctness
- reasoning quality
- useful feedback

Return JSON using exactly this structure:

{
  "overallScore": 0,
  "skills": {
    "grammar": 0,
    "vocabulary": 0,
    "logicalThinking": 0,
    "criticalThinking": 0,
    "problemSolving": 0,
    "mathematicalAbility": 0,
    "subjectKnowledge": 0
  },
  "strengths": [],
  "weaknesses": [],
  "improvements": [],
  "courseRecommendations": [
    {
      "course": "",
      "matchPercentage": 0,
      "reason": ""
    }
  ],
  "answerFeedback": [
    {
      "question": "",
      "answer": "",
      "correctness": "",
      "reasoning": "",
      "feedback": ""
    }
  ]
}
`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  const generatedText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!generatedText) {
    throw new Error("Gemini returned an empty response");
  }

  try {
    return JSON.parse(generatedText) as GeminiAnalysis;
  } catch {
    throw new Error("Gemini returned invalid JSON");
  }
}
