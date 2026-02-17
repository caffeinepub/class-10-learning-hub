import { useParams, useSearch, Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ArrowLeft, BookOpen, AlertCircle, Info } from 'lucide-react';
import { learningModes } from '../data/learningModes';
import { ncertClass10Chapters, subjects } from '../data/ncertClass10Chapters';
import LearningModeIcon from '../components/learning-modes/LearningModeIcon';
import LearningModeActivityRenderer from '../components/learning-modes/run/LearningModeActivityRenderer';
import type { ChapterContext } from '../data/learningModeActivities';

export default function LearningModeRunPage() {
  const params = useParams({ strict: false });
  const search = useSearch({ strict: false }) as { subject?: string; chapterId?: string };
  
  const modeId = params.modeId || '';
  const mode = learningModes.find((m) => m.id === modeId);
  
  // Validate chapter context
  const subjectData = search.subject ? subjects.find((s) => s.id === search.subject) : undefined;
  const chapter = search.subject && search.chapterId 
    ? ncertClass10Chapters[search.subject]?.find((c) => c.id === search.chapterId)
    : undefined;

  // Only consider chapter context valid if both subject and chapter are resolved
  const hasValidChapterContext = !!(subjectData && chapter);

  const chapterContext: ChapterContext | undefined = hasValidChapterContext
    ? {
        subjectName: subjectData.name,
        chapterNumber: chapter.number,
        chapterTitle: chapter.title,
      }
    : undefined;

  if (!mode) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Learning Mode Not Found</AlertTitle>
          <AlertDescription>
            The learning mode you're looking for doesn't exist or the link is invalid.
          </AlertDescription>
        </Alert>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Learning mode not found</h2>
          <Link to="/learning-modes">
            <Button>Back to Learning Modes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/learning-modes">Learning Modes</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{mode.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-start gap-4">
        <Link to="/learning-modes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <LearningModeIcon modeId={mode.id} className="h-12 w-12" />
            <div>
              <h1 className="text-3xl font-bold">{mode.name}</h1>
              <p className="text-muted-foreground">{mode.description}</p>
            </div>
          </div>
          {chapterContext && (
            <div className="flex items-center gap-2 mt-4">
              <Badge variant="secondary" className="gap-1">
                <BookOpen className="h-3 w-3" />
                {chapterContext.subjectName} - Chapter {chapterContext.chapterNumber}: {chapterContext.chapterTitle}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {!chapterContext && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Practice Mode</AlertTitle>
          <AlertDescription>
            You're practicing in general mode. For chapter-specific content, select a chapter from the Chapters page and launch this learning mode from there.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Learning Content</CardTitle>
          <CardDescription>
            {chapterContext 
              ? `Practice ${mode.name.toLowerCase()} for ${chapterContext.chapterTitle}`
              : `Start practicing with ${mode.name.toLowerCase()}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[400px]">
          <LearningModeActivityRenderer modeId={modeId} chapterContext={chapterContext} />
        </CardContent>
      </Card>

      {!chapterContext && (
        <div className="text-center py-6">
          <Link to="/chapters">
            <Button size="lg">
              <BookOpen className="h-4 w-4 mr-2" />
              Choose a Chapter for Specific Practice
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
