import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, ChevronRight, Lightbulb } from 'lucide-react';

interface FillBlanksContent {
  questions: Array<{
    text: string;
    answer: string;
    hint: string;
  }>;
}

interface FillBlanksModeProps {
  content: FillBlanksContent;
}

export default function FillBlanksMode({ content }: FillBlanksModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = content.questions[currentIndex];
  const totalQuestions = content.questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleCheckAnswer = () => {
    setShowResult(true);
    const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setShowResult(false);
      setShowHint(false);
    }
  };

  const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">
          Question {currentIndex + 1} of {totalQuestions}
        </Badge>
        <Badge variant="outline">
          Score: {score}/{totalQuestions}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Fill in the Blank</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed">
            {currentQuestion.text}
          </p>

          <div className="space-y-2">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              disabled={showResult}
              className="text-lg"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !showResult && userAnswer.trim()) {
                  handleCheckAnswer();
                }
              }}
            />
            {!showResult && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHint(!showHint)}
                className="text-muted-foreground"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </Button>
            )}
            {showHint && !showResult && (
              <p className="text-sm text-muted-foreground italic">
                Hint: {currentQuestion.hint}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {showResult && (
        <Alert className={isCorrect ? 'border-green-500' : 'border-red-500'}>
          <AlertDescription>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <p className="font-semibold">Correct!</p>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-600" />
                    <p className="font-semibold">Incorrect</p>
                  </>
                )}
              </div>
              {!isCorrect && (
                <p className="text-sm">
                  The correct answer is: <strong>{currentQuestion.answer}</strong>
                </p>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between">
        {!showResult ? (
          <Button
            onClick={handleCheckAnswer}
            disabled={!userAnswer.trim()}
            className="ml-auto"
          >
            Check Answer
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={isLastQuestion}
            className="ml-auto"
          >
            {isLastQuestion ? 'Finish' : 'Next Question'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>

      {isLastQuestion && showResult && (
        <Alert>
          <AlertDescription>
            <p className="font-semibold">Exercise Complete!</p>
            <p className="text-sm">
              Your final score: {score} out of {totalQuestions} ({Math.round((score / totalQuestions) * 100)}%)
            </p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
