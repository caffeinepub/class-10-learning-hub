import { getActivityConfig, ChapterContext } from '@/data/learningModeActivities';
import FlashcardsMode from './modes/FlashcardsMode';
import QuizMode from './modes/QuizMode';
import FillBlanksMode from './modes/FillBlanksMode';
import MatchFollowingMode from './modes/MatchFollowingMode';
import TrueFalseMode from './modes/TrueFalseMode';
import TimerChallengeMode from './modes/TimerChallengeMode';
import NotesSummaryMode from './modes/NotesSummaryMode';
import PracticeProblemsMode from './modes/PracticeProblemsMode';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface LearningModeActivityRendererProps {
  modeId: string;
  chapterContext?: ChapterContext;
}

export default function LearningModeActivityRenderer({
  modeId,
  chapterContext,
}: LearningModeActivityRendererProps) {
  const config = getActivityConfig(modeId);

  if (!config) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Configuration Error</AlertTitle>
        <AlertDescription>
          No activity configuration found for this learning mode.
        </AlertDescription>
      </Alert>
    );
  }

  const content = config.getContent(chapterContext);

  switch (config.type) {
    case 'flashcard':
      return <FlashcardsMode content={content} />;
    case 'mcq':
      return <QuizMode content={content} />;
    case 'fill-blanks':
      return <FillBlanksMode content={content} />;
    case 'match':
      return <MatchFollowingMode content={content} />;
    case 'true-false':
      return <TrueFalseMode content={content} />;
    case 'timer-challenge':
      return <TimerChallengeMode content={content} />;
    case 'notes-summary':
      return <NotesSummaryMode content={content} />;
    case 'practice-problems':
      return <PracticeProblemsMode content={content} />;
    default:
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Unknown Activity Type</AlertTitle>
          <AlertDescription>
            The activity type "{config.type}" is not supported.
          </AlertDescription>
        </Alert>
      );
  }
}
