import { useParams, useSearch, Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ArrowLeft, BookOpen, AlertCircle } from 'lucide-react';
import { learningModes } from '../data/learningModes';
import { ncertClass10Chapters, subjects } from '../data/ncertClass10Chapters';
import LearningModeIcon from '../components/learning-modes/LearningModeIcon';

export default function LearningModeRunPage() {
  const params = useParams({ strict: false });
  const search = useSearch({ strict: false }) as { subject?: string; chapterId?: string };
  
  const modeId = params.modeId || '';
  const mode = learningModes.find((m) => m.id === modeId);
  const subjectData = search.subject ? subjects.find((s) => s.id === search.subject) : undefined;
  const chapter = search.subject && search.chapterId 
    ? ncertClass10Chapters[search.subject]?.find((c) => c.id === search.chapterId)
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
          {chapter && subjectData && (
            <div className="flex items-center gap-2 mt-4">
              <Badge variant="secondary" className="gap-1">
                <BookOpen className="h-3 w-3" />
                {subjectData.name} - Chapter {chapter.number}: {chapter.title}
              </Badge>
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learning Content</CardTitle>
          <CardDescription>
            {chapter 
              ? `Practice ${mode.name.toLowerCase()} for ${chapter.title}`
              : `Start practicing with ${mode.name.toLowerCase()}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <LearningModeIcon modeId={mode.id} className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold">Ready to Learn!</h3>
            <p className="text-muted-foreground">
              This learning mode is ready for you. Content and interactive exercises will be displayed here.
              {!chapter && ' Select a chapter from the Chapters page to start with specific content.'}
            </p>
            {!chapter && (
              <Link to="/chapters">
                <Button className="mt-4">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Choose a Chapter
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
