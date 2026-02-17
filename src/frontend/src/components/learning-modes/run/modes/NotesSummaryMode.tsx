import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2 } from 'lucide-react';

interface NotesSummaryContent {
  sections: Array<{
    title: string;
    content: string;
    points: string[];
  }>;
}

interface NotesSummaryModeProps {
  content: NotesSummaryContent;
}

export default function NotesSummaryMode({ content }: NotesSummaryModeProps) {
  const [checkedPoints, setCheckedPoints] = useState<Set<string>>(new Set());

  const totalPoints = content.sections.reduce((sum, section) => sum + section.points.length, 0);
  const checkedCount = checkedPoints.size;
  const progress = totalPoints > 0 ? Math.round((checkedCount / totalPoints) * 100) : 0;

  const handleTogglePoint = (sectionIndex: number, pointIndex: number) => {
    const key = `${sectionIndex}-${pointIndex}`;
    const newChecked = new Set(checkedPoints);
    if (newChecked.has(key)) {
      newChecked.delete(key);
    } else {
      newChecked.add(key);
    }
    setCheckedPoints(newChecked);
  };

  const isPointChecked = (sectionIndex: number, pointIndex: number) => {
    return checkedPoints.has(`${sectionIndex}-${pointIndex}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">
          Progress: {checkedCount}/{totalPoints} points reviewed
        </Badge>
        <Badge variant="outline">{progress}% Complete</Badge>
      </div>

      <Accordion type="multiple" defaultValue={content.sections.map((_, i) => `section-${i}`)} className="space-y-4">
        {content.sections.map((section, sectionIndex) => (
          <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`} className="border rounded-lg">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <CardTitle className="text-lg text-left">{section.title}</CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="space-y-4 pt-0">
                  <p className="text-muted-foreground">{section.content}</p>
                  <div className="space-y-3">
                    {section.points.map((point, pointIndex) => {
                      const isChecked = isPointChecked(sectionIndex, pointIndex);
                      return (
                        <div
                          key={pointIndex}
                          className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                            isChecked ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' : 'bg-muted/30'
                          }`}
                        >
                          <Checkbox
                            id={`point-${sectionIndex}-${pointIndex}`}
                            checked={isChecked}
                            onCheckedChange={() => handleTogglePoint(sectionIndex, pointIndex)}
                            className="mt-1"
                          />
                          <label
                            htmlFor={`point-${sectionIndex}-${pointIndex}`}
                            className={`flex-1 cursor-pointer ${isChecked ? 'line-through text-muted-foreground' : ''}`}
                          >
                            {point}
                          </label>
                          {isChecked && <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>

      {progress === 100 && (
        <Card className="border-green-500">
          <CardContent className="py-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <p className="font-semibold text-lg">All Points Reviewed! 🎉</p>
            <p className="text-sm text-muted-foreground">
              You've completed reviewing all the key points.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
