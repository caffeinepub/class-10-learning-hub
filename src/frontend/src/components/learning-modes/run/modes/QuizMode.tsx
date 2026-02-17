import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

interface QuizContent {
  questions: Array<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
}

interface QuizModeProps {
  content: QuizContent;
}

export default function QuizMode({ content }: QuizModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = content.questions[currentIndex];
  const totalQuestions = content.questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleOptionSelect = (index: number) => {
    if (!showResult) {
      setSelectedOption(index);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption !== null) {
      setShowResult(true);
      if (selectedOption === currentQuestion.correctIndex) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const isCorrect = selectedOption === currentQuestion.correctIndex;

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
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectOption = index === currentQuestion.correctIndex;
            const showCorrect = showResult && isCorrectOption;
            const showIncorrect = showResult && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected && !showResult
                    ? 'border-primary bg-primary/5'
                    : showCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-950'
                    : showIncorrect
                    ? 'border-red-500 bg-red-50 dark:bg-red-950'
                    : 'border-border hover:border-primary/50'
                } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                  {showIncorrect && <XCircle className="h-5 w-5 text-red-600" />}
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {showResult && (
        <Alert className={isCorrect ? 'border-green-500' : 'border-red-500'}>
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between">
        {!showResult ? (
          <Button
            onClick={handleCheckAnswer}
            disabled={selectedOption === null}
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
            <p className="font-semibold">Quiz Complete!</p>
            <p className="text-sm">
              Your final score: {score} out of {totalQuestions} ({Math.round((score / totalQuestions) * 100)}%)
            </p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
