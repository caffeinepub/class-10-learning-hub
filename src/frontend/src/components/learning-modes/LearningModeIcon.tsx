interface LearningModeIconProps {
  modeId: string;
  className?: string;
}

const iconPositions: Record<string, { x: number; y: number }> = {
  'flashcards': { x: 0, y: 0 },
  'quiz': { x: 1, y: 0 },
  'practice': { x: 2, y: 0 },
  'summary': { x: 3, y: 0 },
  'mindmap': { x: 0, y: 1 },
  'notes': { x: 1, y: 1 },
  'video': { x: 2, y: 1 },
  'audio': { x: 3, y: 1 },
  'diagrams': { x: 0, y: 2 },
  'timeline': { x: 1, y: 2 },
  'compare': { x: 2, y: 2 },
  'mcq': { x: 3, y: 2 },
  'fill-blanks': { x: 0, y: 3 },
  'match': { x: 1, y: 3 },
  'true-false': { x: 2, y: 3 },
  'essay': { x: 3, y: 3 },
  'revision': { x: 0, y: 4 },
  'exam-prep': { x: 1, y: 4 },
  'speed-test': { x: 2, y: 4 },
  'challenge': { x: 3, y: 4 },
};

export default function LearningModeIcon({ modeId, className = 'h-8 w-8' }: LearningModeIconProps) {
  const position = iconPositions[modeId] || { x: 0, y: 0 };
  const spriteSize = 2048;
  const iconSize = spriteSize / 4;
  const xPercent = (position.x * iconSize / spriteSize) * 100;
  const yPercent = (position.y * iconSize / spriteSize) * 100;

  return (
    <div
      className={`${className} bg-primary/10 rounded-lg overflow-hidden flex-shrink-0`}
      style={{
        backgroundImage: 'url(/assets/generated/learning-mode-icons-sprite.dim_2048x2048.png)',
        backgroundSize: '400%',
        backgroundPosition: `${xPercent}% ${yPercent}%`,
      }}
    />
  );
}
