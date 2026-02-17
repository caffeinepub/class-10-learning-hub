import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, ChevronRight } from 'lucide-react';

interface PracticeProblemsContent {
  problems: Array<{
    problem: string;
    solution: string;
  }>;
}

interface PracticeProblemsModeProps {
  content: PracticeProblemsContent;
}

export default function PracticeProblemsMode({ content }: PracticeProblemsModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSolution, setUserSolution] = useState('');
  const [showSolution, setShowSolution] = useState(false);

  const currentProblem = content.problems[currentIndex];
  const totalProblems = content.problems.length;
  const isLastProblem = currentIndex === totalProblems - 1;

  const handleNext = () => {
    if (currentIndex < totalProblems - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserSolution('');
      setShowSolution(false);
    }
  };

  const handleToggleSolution = () => {
    setShowSolution(!showSolution);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">
          Problem {currentIndex + 1} of {totalProblems}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Problem Statement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">
              {currentProblem.problem}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Solution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={userSolution}
            onChange={(e) => setUserSolution(e.target.value)}
            placeholder="Write your solution here... (This is for your practice; it won't be graded)"
            className="min-h-[150px] font-mono"
          />
          <Button
            variant="outline"
            onClick={handleToggleSolution}
            className="w-full"
          >
            {showSolution ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Solution
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Step-by-Step Solution
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {showSolution && (
        <Alert>
          <AlertDescription>
            <p className="font-semibold mb-3">Step-by-Step Solution:</p>
            <div className="prose dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-muted p-4 rounded-lg">
                {currentProblem.solution}
              </pre>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={isLastProblem}
        >
          {isLastProblem ? 'Finish' : 'Next Problem'}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {isLastProblem && (
        <Alert>
          <AlertDescription>
            <p className="text-sm">
              This is the last problem. Review your solutions and practice more to improve!
            </p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
