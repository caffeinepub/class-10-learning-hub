export interface ChapterContext {
  subjectName: string;
  chapterNumber: number;
  chapterTitle: string;
}

export interface ActivityConfig {
  modeId: string;
  type: 'flashcard' | 'mcq' | 'fill-blanks' | 'match' | 'true-false' | 'timer-challenge' | 'notes-summary' | 'practice-problems';
  getContent: (chapterContext?: ChapterContext) => any;
}

// Sample content generators for each mode
const activityConfigs: Record<string, ActivityConfig> = {
  flashcards: {
    modeId: 'flashcards',
    type: 'flashcard',
    getContent: (ctx) => ({
      cards: [
        {
          front: ctx ? `Key concept from ${ctx.chapterTitle}` : 'What is a polynomial?',
          back: ctx ? `Important definition or formula related to Chapter ${ctx.chapterNumber}` : 'An algebraic expression with variables and coefficients',
        },
        {
          front: ctx ? `Formula from ${ctx.chapterTitle}` : 'What is the quadratic formula?',
          back: ctx ? `Key formula: ax² + bx + c = 0` : 'x = (-b ± √(b²-4ac)) / 2a',
        },
        {
          front: ctx ? `Important term in ${ctx.subjectName}` : 'Define real numbers',
          back: ctx ? `Definition related to ${ctx.chapterTitle}` : 'Numbers that can be found on the number line, including rational and irrational numbers',
        },
      ],
    }),
  },
  quiz: {
    modeId: 'quiz',
    type: 'mcq',
    getContent: (ctx) => ({
      questions: [
        {
          question: ctx ? `Question about ${ctx.chapterTitle}` : 'What is the value of π (pi)?',
          options: ['3.14', '2.71', '1.41', '1.73'],
          correctIndex: 0,
          explanation: ctx ? `This relates to concepts in Chapter ${ctx.chapterNumber}` : 'π (pi) is approximately 3.14159...',
        },
        {
          question: ctx ? `Another question from ${ctx.subjectName}` : 'Which of these is a prime number?',
          options: ['4', '6', '7', '9'],
          correctIndex: 2,
          explanation: ctx ? `Based on ${ctx.chapterTitle} principles` : '7 is only divisible by 1 and itself',
        },
      ],
    }),
  },
  mcq: {
    modeId: 'mcq',
    type: 'mcq',
    getContent: (ctx) => ({
      questions: [
        {
          question: ctx ? `MCQ from ${ctx.chapterTitle}` : 'What is the square root of 144?',
          options: ['10', '11', '12', '13'],
          correctIndex: 2,
          explanation: ctx ? `Covered in ${ctx.subjectName} - Chapter ${ctx.chapterNumber}` : '12 × 12 = 144',
        },
        {
          question: ctx ? `Practice question for ${ctx.chapterTitle}` : 'Which element has atomic number 1?',
          options: ['Helium', 'Hydrogen', 'Oxygen', 'Carbon'],
          correctIndex: 1,
          explanation: ctx ? `From your ${ctx.subjectName} syllabus` : 'Hydrogen is the first element in the periodic table',
        },
      ],
    }),
  },
  'fill-blanks': {
    modeId: 'fill-blanks',
    type: 'fill-blanks',
    getContent: (ctx) => ({
      questions: [
        {
          text: ctx ? `The main concept of ${ctx.chapterTitle} is _____.` : 'The capital of India is _____.',
          answer: ctx ? 'understanding' : 'New Delhi',
          hint: ctx ? `Think about Chapter ${ctx.chapterNumber}` : 'It starts with N',
        },
        {
          text: ctx ? `In ${ctx.subjectName}, we learn that _____ is important.` : 'Water boils at _____ degrees Celsius.',
          answer: ctx ? 'practice' : '100',
          hint: ctx ? 'Key takeaway from this chapter' : 'A round number',
        },
      ],
    }),
  },
  match: {
    modeId: 'match',
    type: 'match',
    getContent: (ctx) => ({
      pairs: [
        {
          left: ctx ? `Term from ${ctx.chapterTitle}` : 'Photosynthesis',
          right: ctx ? `Definition (Chapter ${ctx.chapterNumber})` : 'Process by which plants make food',
        },
        {
          left: ctx ? `Concept in ${ctx.subjectName}` : 'Democracy',
          right: ctx ? 'Related to your chapter' : 'Government by the people',
        },
        {
          left: ctx ? 'Key formula' : 'Pythagorean theorem',
          right: ctx ? `From ${ctx.chapterTitle}` : 'a² + b² = c²',
        },
      ],
    }),
  },
  'true-false': {
    modeId: 'true-false',
    type: 'true-false',
    getContent: (ctx) => ({
      statements: [
        {
          statement: ctx ? `${ctx.chapterTitle} covers important concepts.` : 'The Earth is flat.',
          answer: ctx ? true : false,
          explanation: ctx ? `Yes, Chapter ${ctx.chapterNumber} is fundamental` : 'The Earth is spherical',
        },
        {
          statement: ctx ? `${ctx.subjectName} is not important for exams.` : 'Water is composed of H2O.',
          answer: ctx ? false : true,
          explanation: ctx ? `${ctx.subjectName} is crucial for your studies` : 'Water molecules contain 2 hydrogen and 1 oxygen atom',
        },
      ],
    }),
  },
  practice: {
    modeId: 'practice',
    type: 'practice-problems',
    getContent: (ctx) => ({
      problems: [
        {
          problem: ctx ? `Solve this problem from ${ctx.chapterTitle}:\n\nApply the concepts you learned in Chapter ${ctx.chapterNumber}.` : 'Solve: 2x + 5 = 15',
          solution: ctx ? `Step 1: Review the chapter concepts\nStep 2: Apply the formula\nStep 3: Calculate the result\n\nAnswer: Based on ${ctx.chapterTitle} principles` : 'Step 1: Subtract 5 from both sides\n2x = 10\n\nStep 2: Divide by 2\nx = 5',
        },
      ],
    }),
  },
  summary: {
    modeId: 'summary',
    type: 'notes-summary',
    getContent: (ctx) => ({
      sections: [
        {
          title: ctx ? `Overview of ${ctx.chapterTitle}` : 'Key Concepts',
          content: ctx ? `This chapter (${ctx.chapterNumber}) in ${ctx.subjectName} covers fundamental topics that are essential for your understanding.` : 'Important points to remember for your exams.',
          points: [
            ctx ? `Main concept from ${ctx.chapterTitle}` : 'First key point',
            ctx ? `Important formula or definition` : 'Second key point',
            ctx ? `Application and examples` : 'Third key point',
          ],
        },
        {
          title: ctx ? 'Important Formulas' : 'Additional Notes',
          content: ctx ? `Key formulas and equations from Chapter ${ctx.chapterNumber}` : 'Extra information to help you succeed.',
          points: [
            ctx ? 'Formula 1' : 'Note 1',
            ctx ? 'Formula 2' : 'Note 2',
          ],
        },
      ],
    }),
  },
  notes: {
    modeId: 'notes',
    type: 'notes-summary',
    getContent: (ctx) => ({
      sections: [
        {
          title: ctx ? `Notes: ${ctx.chapterTitle}` : 'Study Notes',
          content: ctx ? `Organized notes for ${ctx.subjectName} - Chapter ${ctx.chapterNumber}` : 'Your comprehensive study guide.',
          points: [
            ctx ? `Key point from ${ctx.chapterTitle}` : 'Important concept 1',
            ctx ? 'Definitions and terms' : 'Important concept 2',
            ctx ? 'Examples and applications' : 'Important concept 3',
          ],
        },
      ],
    }),
  },
  revision: {
    modeId: 'revision',
    type: 'notes-summary',
    getContent: (ctx) => ({
      sections: [
        {
          title: ctx ? `Quick Revision: ${ctx.chapterTitle}` : 'Quick Revision Points',
          content: ctx ? `Fast review of Chapter ${ctx.chapterNumber} in ${ctx.subjectName}` : 'Rapid review of key topics.',
          points: [
            ctx ? `Must-know from ${ctx.chapterTitle}` : 'Critical point 1',
            ctx ? 'Important formulas' : 'Critical point 2',
            ctx ? 'Common mistakes to avoid' : 'Critical point 3',
            ctx ? 'Exam tips' : 'Critical point 4',
          ],
        },
      ],
    }),
  },
  'speed-test': {
    modeId: 'speed-test',
    type: 'timer-challenge',
    getContent: (ctx) => ({
      duration: 300, // 5 minutes
      title: ctx ? `Speed Test: ${ctx.chapterTitle}` : 'Speed Test Challenge',
      description: ctx ? `Answer questions from Chapter ${ctx.chapterNumber} as quickly as possible!` : 'Answer as many questions as you can in 5 minutes!',
      questions: [
        {
          question: ctx ? `Quick question from ${ctx.chapterTitle}` : 'What is 7 × 8?',
          answer: ctx ? 'answer' : '56',
        },
        {
          question: ctx ? `Another from ${ctx.subjectName}` : 'What is the capital of France?',
          answer: ctx ? 'answer' : 'Paris',
        },
      ],
    }),
  },
  'exam-prep': {
    modeId: 'exam-prep',
    type: 'timer-challenge',
    getContent: (ctx) => ({
      duration: 1800, // 30 minutes
      title: ctx ? `Exam Prep: ${ctx.chapterTitle}` : 'Exam Preparation Mode',
      description: ctx ? `Simulate exam conditions for ${ctx.subjectName} - Chapter ${ctx.chapterNumber}` : 'Practice under real exam conditions.',
      questions: [
        {
          question: ctx ? `Exam-style question from ${ctx.chapterTitle}` : 'Solve the equation: x² - 5x + 6 = 0',
          answer: ctx ? 'solution' : 'x = 2 or x = 3',
        },
      ],
    }),
  },
  challenge: {
    modeId: 'challenge',
    type: 'timer-challenge',
    getContent: (ctx) => ({
      duration: 600, // 10 minutes
      title: ctx ? `Daily Challenge: ${ctx.chapterTitle}` : 'Daily Challenge',
      description: ctx ? `Today's challenge focuses on ${ctx.subjectName}!` : 'Complete today\'s challenge to earn points!',
      questions: [
        {
          question: ctx ? `Challenge question from Chapter ${ctx.chapterNumber}` : 'What is the largest planet in our solar system?',
          answer: ctx ? 'answer' : 'Jupiter',
        },
      ],
    }),
  },
  mindmap: {
    modeId: 'mindmap',
    type: 'notes-summary',
    getContent: (ctx) => ({
      sections: [
        {
          title: ctx ? `Mind Map: ${ctx.chapterTitle}` : 'Concept Mind Map',
          content: ctx ? `Visual representation of concepts in Chapter ${ctx.chapterNumber}` : 'Visualize how concepts connect.',
          points: [
            ctx ? `Central concept: ${ctx.chapterTitle}` : 'Main topic',
            ctx ? 'Branch 1: Key subtopic' : 'Subtopic 1',
            ctx ? 'Branch 2: Related concepts' : 'Subtopic 2',
            ctx ? 'Branch 3: Applications' : 'Subtopic 3',
          ],
        },
      ],
    }),
  },
  video: {
    modeId: 'video',
    type: 'notes-summary',
    getContent: (ctx) => ({
      sections: [
        {
          title: ctx ? `Video Lessons: ${ctx.chapterTitle}` : 'Video Learning',
          content: ctx ? `Watch animated explanations for ${ctx.subjectName} - Chapter ${ctx.chapterNumber}` : 'Video content will be available here.',
          points: [
            ctx ? `Introduction to ${ctx.chapterTitle}` : 'Video 1: Introduction',
            ctx ? 'Detailed explanation with examples' : 'Video 2: Core concepts',
            ctx ? 'Practice problems walkthrough' : 'Video 3: Practice',
          ],
        },
      ],
    }),
  },
  audio: {
    modeId: 'audio',
    type: 'notes-summary',
    getContent: (ctx) => ({
      sections: [
        {
          title: ctx ? `Audio Learning: ${ctx.chapterTitle}` : 'Audio Lessons',
          content: ctx ? `Listen to ${ctx.subjectName} - Chapter ${ctx.chapterNumber} on the go` : 'Audio content for learning anywhere.',
          points: [
            ctx ? `Audio summary of ${ctx.chapterTitle}` : 'Audio track 1',
            ctx ? 'Key concepts explained' : 'Audio track 2',
            ctx ? 'Important formulas and definitions' : 'Audio track 3',
          ],
        },
      ],
    }),
  },
  diagrams: {
    modeId: 'diagrams',
    type: 'notes-summary',
    getContent: (ctx) => ({
      sections: [
        {
          title: ctx ? `Diagrams: ${ctx.chapterTitle}` : 'Interactive Diagrams',
          content: ctx ? `Visual diagrams for ${ctx.subjectName} - Chapter ${ctx.chapterNumber}` : 'Explore labeled diagrams and visuals.',
          points: [
            ctx ? `Diagram 1: Main concept from ${ctx.chapterTitle}` : 'Diagram 1',
            ctx ? 'Diagram 2: Process flow' : 'Diagram 2',
            ctx ? 'Diagram 3: Relationships' : 'Diagram 3',
          ],
        },
      ],
    }),
  },
  timeline: {
    modeId: 'timeline',
    type: 'notes-summary',
    getContent: (ctx) => ({
      sections: [
        {
          title: ctx ? `Timeline: ${ctx.chapterTitle}` : 'Timeline View',
          content: ctx ? `Chronological view of events in ${ctx.subjectName} - Chapter ${ctx.chapterNumber}` : 'Understand events in chronological order.',
          points: [
            ctx ? `Event 1 from ${ctx.chapterTitle}` : 'Event 1: Beginning',
            ctx ? 'Event 2: Development' : 'Event 2: Middle',
            ctx ? 'Event 3: Conclusion' : 'Event 3: End',
          ],
        },
      ],
    }),
  },
  compare: {
    modeId: 'compare',
    type: 'notes-summary',
    getContent: (ctx) => ({
      sections: [
        {
          title: ctx ? `Compare & Contrast: ${ctx.chapterTitle}` : 'Comparison View',
          content: ctx ? `Side-by-side comparison of concepts in Chapter ${ctx.chapterNumber}` : 'Compare similar concepts.',
          points: [
            ctx ? `Concept A from ${ctx.chapterTitle}` : 'Concept A',
            ctx ? `Concept B from ${ctx.chapterTitle}` : 'Concept B',
            ctx ? 'Key differences and similarities' : 'Similarities and differences',
          ],
        },
      ],
    }),
  },
  essay: {
    modeId: 'essay',
    type: 'practice-problems',
    getContent: (ctx) => ({
      problems: [
        {
          problem: ctx ? `Essay Question: Discuss the main concepts covered in ${ctx.chapterTitle} (${ctx.subjectName} - Chapter ${ctx.chapterNumber}).\n\nWrite a detailed answer covering all key points.` : 'Write an essay on the importance of education in modern society.',
          solution: ctx ? `Sample Answer:\n\nIntroduction: ${ctx.chapterTitle} is a crucial chapter in ${ctx.subjectName}...\n\nBody: The main concepts include...\n\nConclusion: Understanding these concepts is essential for...` : 'Sample Answer:\n\nEducation plays a vital role in shaping individuals and society...',
        },
      ],
    }),
  },
};

export function getActivityConfig(modeId: string): ActivityConfig | undefined {
  return activityConfigs[modeId];
}

export function getActivityContent(modeId: string, chapterContext?: ChapterContext): any {
  const config = activityConfigs[modeId];
  if (!config) return null;
  return config.getContent(chapterContext);
}
