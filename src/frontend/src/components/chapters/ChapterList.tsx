import { Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import type { Subject, Chapter } from '../../data/ncertClass10Chapters';

interface ChapterListProps {
  subject: Subject;
  chapters: Chapter[];
}

export default function ChapterList({ subject, chapters }: ChapterListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{subject.icon}</span>
        <div>
          <h2 className="text-2xl font-bold">{subject.name}</h2>
          <p className="text-muted-foreground">{chapters.length} chapters</p>
        </div>
      </div>

      <div className="grid gap-3">
        {chapters.map((chapter) => (
          <Card key={chapter.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <Link
                to="/chapters/$subject/$chapterId"
                params={{ subject: subject.id, chapterId: chapter.id }}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-primary">{chapter.number}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">Chapter {chapter.number}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
