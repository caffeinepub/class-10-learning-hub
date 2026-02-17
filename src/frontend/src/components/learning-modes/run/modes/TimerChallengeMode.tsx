import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Play, Pause, RotateCw, Clock } from 'lucide-react';

interface TimerChallengeContent {
  duration: number;
  title: string;
  description: string;
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

interface TimerChallengeModeProps {
  content: TimerChallengeContent;
}

export default function TimerChallengeMode({ content }: TimerChallengeModeProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(content.duration);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(content.duration);
    setCurrentQuestionIndex(0);
    setAnsweredCount(0);
  };

  const handleAnswer = () => {
    setAnsweredCount(answeredCount + 1);
    if (currentQuestionIndex < content.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((content.duration - timeRemaining) / content.duration) * 100;
  const isComplete = timeRemaining === 0;
  const currentQuestion = content.questions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{content.title}</span>
            <Badge variant={isRunning ? 'default' : 'secondary'} className="gap-1">
              <Clock className="h-3 w-3" />
              {formatTime(timeRemaining)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{content.description}</p>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {!isRunning && timeRemaining === content.duration && (
        <Alert>
          <AlertDescription>
            <p className="font-semibold mb-2">Ready to start?</p>
            <p className="text-sm mb-4">
              You have {Math.floor(content.duration / 60)} minutes to answer as many questions as possible.
            </p>
            <Button onClick={handleStart}>
              <Play className="h-4 w-4 mr-2" />
              Start Challenge
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {(isRunning || (timeRemaining < content.duration && timeRemaining > 0)) && !isComplete && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Question {currentQuestionIndex + 1} of {content.questions.length}
              </CardTitle>
              <Badge variant="outline">Answered: {answeredCount}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">{currentQuestion.question}</p>
            <div className="flex gap-2">
              <Button onClick={handleAnswer} disabled={!isRunning}>
                Mark as Answered
              </Button>
              <Button variant="outline" onClick={handlePause} disabled={!isRunning}>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              {!isRunning && timeRemaining > 0 && (
                <Button variant="outline" onClick={handleStart}>
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {isComplete && (
        <Alert className="border-green-500">
          <AlertDescription>
            <p className="font-semibold mb-2">Time's Up!</p>
            <p className="text-sm mb-4">
              You answered {answeredCount} out of {content.questions.length} questions.
            </p>
            <Button onClick={handleReset}>
              <RotateCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {timeRemaining < content.duration && timeRemaining > 0 && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleReset}>
            <RotateCw className="h-4 w-4 mr-2" />
            Reset Challenge
          </Button>
        </div>
      )}
    </div>
  );
}
