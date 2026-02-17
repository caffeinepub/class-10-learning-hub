import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, RotateCw } from 'lucide-react';

interface MatchContent {
  pairs: Array<{
    left: string;
    right: string;
  }>;
}

interface MatchFollowingModeProps {
  content: MatchContent;
}

export default function MatchFollowingMode({ content }: MatchFollowingModeProps) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [shuffledRight] = useState(() => {
    const indices = content.pairs.map((_, i) => i);
    return indices.sort(() => Math.random() - 0.5);
  });

  const handleLeftClick = (index: number) => {
    if (matches[index] !== undefined) return;
    setSelectedLeft(index);
  };

  const handleRightClick = (rightIndex: number) => {
    if (selectedLeft === null) return;
    if (Object.values(matches).includes(rightIndex)) return;

    setMatches({ ...matches, [selectedLeft]: rightIndex });
    setSelectedLeft(null);
  };

  const handleReset = () => {
    setMatches({});
    setSelectedLeft(null);
  };

  const isComplete = Object.keys(matches).length === content.pairs.length;
  const correctMatches = Object.entries(matches).filter(
    ([left, right]) => parseInt(left) === right
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">
          Matched: {Object.keys(matches).length} of {content.pairs.length}
        </Badge>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Match the Following</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Click on a term from the left, then click on its matching definition on the right.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Terms</p>
              {content.pairs.map((pair, index) => {
                const isMatched = matches[index] !== undefined;
                const isSelected = selectedLeft === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleLeftClick(index)}
                    disabled={isMatched}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : isMatched
                        ? 'border-green-500 bg-green-50 dark:bg-green-950 cursor-default'
                        : 'border-border hover:border-primary/50 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{pair.left}</span>
                      {isMatched && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Definitions</p>
              {shuffledRight.map((originalIndex, displayIndex) => {
                const pair = content.pairs[originalIndex];
                const isMatched = Object.values(matches).includes(originalIndex);
                return (
                  <button
                    key={displayIndex}
                    onClick={() => handleRightClick(originalIndex)}
                    disabled={isMatched || selectedLeft === null}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      isMatched
                        ? 'border-green-500 bg-green-50 dark:bg-green-950 cursor-default'
                        : selectedLeft !== null
                        ? 'border-border hover:border-primary/50 cursor-pointer'
                        : 'border-border cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{pair.right}</span>
                      {isMatched && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {isComplete && (
        <Alert className="border-green-500">
          <AlertDescription>
            <p className="font-semibold">Complete!</p>
            <p className="text-sm">
              You matched {correctMatches} out of {content.pairs.length} correctly.
              {correctMatches === content.pairs.length && ' Perfect score! 🎉'}
            </p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
