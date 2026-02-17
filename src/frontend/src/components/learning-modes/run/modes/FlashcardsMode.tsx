import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashcardContent {
  cards: Array<{
    front: string;
    back: string;
  }>;
}

interface FlashcardsModeProps {
  content: FlashcardContent;
}

export default function FlashcardsMode({ content }: FlashcardsModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = content.cards[currentIndex];
  const totalCards = content.cards.length;

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">
          Card {currentIndex + 1} of {totalCards}
        </Badge>
        <Button variant="outline" size="sm" onClick={() => setIsFlipped(false)}>
          <RotateCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <Card className="min-h-[300px] cursor-pointer hover:shadow-lg transition-shadow" onClick={handleFlip}>
        <CardContent className="flex items-center justify-center min-h-[300px] p-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              {isFlipped ? 'Answer' : 'Question'}
            </p>
            <p className="text-2xl font-semibold">
              {isFlipped ? currentCard.back : currentCard.front}
            </p>
            <p className="text-sm text-muted-foreground">
              Click to {isFlipped ? 'see question' : 'reveal answer'}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex === totalCards - 1}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
