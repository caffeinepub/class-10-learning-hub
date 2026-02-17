import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

interface TrueFalseContent {
  statements: Array<{
    statement: string;
    answer: boolean;
    explanation: string;
  }>;
}

interface TrueFalseModeProps {
  content: TrueFalseContent;
}

export default function TrueFalseMode({ content }: TrueFalseModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentStatement = content.statements[currentIndex];
  const totalStatements = content.statements.length;
  const isLastStatement = currentIndex === totalStatements - 1;

  const handleAnswerSelect = (answer: boolean) => {
    if (!showResult) {
      setSelectedAnswer(answer);
      setShowResult(true);
      if (answer === currentStatement.answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < totalStatements - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const isCorrect = selectedAnswer === currentStatement.answer;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">
          Statement {currentIndex + 1} of {totalStatements}
        </Badge>
        <Badge variant="outline">
          Score: {score}/{totalStatements}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">True or False?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg leading-relaxed p-4 bg-muted/50 rounded-lg">
            {currentStatement.statement}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Button
              size="lg"
              variant={selectedAnswer === true && showResult ? (isCorrect ? 'default' : 'destructive') : 'outline'}
              onClick={() => handleAnswerSelect(true)}
              disabled={showResult}
              className="h-20 text-lg"
            >
              <div className="flex items-center gap-2">
                {showResult && selectedAnswer === true && (
                  isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />
                )}
                True
              </div>
            </Button>
            <Button
              size="lg"
              variant={selectedAnswer === false && showResult ? (isCorrect ? 'default' : 'destructive') : 'outline'}
              onClick={() => handleAnswerSelect(false)}
              disabled={showResult}
              className="h-20 text-lg"
            >
              <div className="flex items-center gap-2">
                {showResult && selectedAnswer === false && (
                  isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />
                )}
                False
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {showResult && (
        <Alert className={isCorrect ? 'border-green-500' : 'border-red-500'}>
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p className="text-sm">
                The correct answer is: <strong>{currentStatement.answer ? 'True' : 'False'}</strong>
              </p>
              <p className="text-sm">{currentStatement.explanation}</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {showResult && (
        <div className="flex justify-end">
          <Button
            onClick={handleNext}
            disabled={isLastStatement}
          >
            {isLastStatement ? 'Finish' : 'Next Statement'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}

      {isLastStatement && showResult && (
        <Alert>
          <AlertDescription>
            <p className="font-semibold">Exercise Complete!</p>
            <p className="text-sm">
              Your final score: {score} out of {totalStatements} ({Math.round((score / totalStatements) * 100)}%)
            </p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
