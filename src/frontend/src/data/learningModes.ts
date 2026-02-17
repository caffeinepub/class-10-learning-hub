export interface LearningMode {
  id: string;
  name: string;
  description: string;
}

export const learningModes: LearningMode[] = [
  {
    id: 'flashcards',
    name: 'Flashcards',
    description: 'Quick review with digital flashcards for key concepts and definitions',
  },
  {
    id: 'quiz',
    name: 'Quiz Mode',
    description: 'Test your knowledge with interactive quizzes and instant feedback',
  },
  {
    id: 'practice',
    name: 'Practice Problems',
    description: 'Solve practice problems with step-by-step solutions',
  },
  {
    id: 'summary',
    name: 'Chapter Summary',
    description: 'Read concise summaries of key points from each chapter',
  },
  {
    id: 'mindmap',
    name: 'Mind Maps',
    description: 'Visualize concepts and their relationships with interactive mind maps',
  },
  {
    id: 'notes',
    name: 'Smart Notes',
    description: 'Create and review organized notes with highlighting and bookmarks',
  },
  {
    id: 'video',
    name: 'Video Lessons',
    description: 'Watch animated explanations and video tutorials',
  },
  {
    id: 'audio',
    name: 'Audio Learning',
    description: 'Listen to chapter content and explanations on the go',
  },
  {
    id: 'diagrams',
    name: 'Interactive Diagrams',
    description: 'Explore labeled diagrams and visual representations',
  },
  {
    id: 'timeline',
    name: 'Timeline View',
    description: 'Understand historical events and processes in chronological order',
  },
  {
    id: 'compare',
    name: 'Compare & Contrast',
    description: 'Side-by-side comparison of similar concepts and topics',
  },
  {
    id: 'mcq',
    name: 'MCQ Practice',
    description: 'Multiple choice questions with detailed explanations',
  },
  {
    id: 'fill-blanks',
    name: 'Fill in the Blanks',
    description: 'Complete sentences and paragraphs to test recall',
  },
  {
    id: 'match',
    name: 'Match the Following',
    description: 'Connect related terms, definitions, and concepts',
  },
  {
    id: 'true-false',
    name: 'True or False',
    description: 'Quick assessment with true/false statements',
  },
  {
    id: 'essay',
    name: 'Essay Practice',
    description: 'Practice writing detailed answers to long-form questions',
  },
  {
    id: 'revision',
    name: 'Quick Revision',
    description: 'Fast-paced review of all important topics before exams',
  },
  {
    id: 'exam-prep',
    name: 'Exam Preparation',
    description: 'Simulate real exam conditions with timed tests',
  },
  {
    id: 'speed-test',
    name: 'Speed Test',
    description: 'Improve accuracy and speed with rapid-fire questions',
  },
  {
    id: 'challenge',
    name: 'Daily Challenge',
    description: 'Take on daily challenges to earn points and track progress',
  },
];
