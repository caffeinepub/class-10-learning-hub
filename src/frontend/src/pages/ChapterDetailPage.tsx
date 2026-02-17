import { useParams, Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { ncertClass10Chapters, subjects } from '../data/ncertClass10Chapters';
import { learningModes } from '../data/learningModes';
import LearningModeIcon from '../components/learning-modes/LearningModeIcon';

export default function ChapterDetailPage() {
  const params = useParams({ strict: false });
  
  const subject = params.subject || '';
  const chapterId = params.chapterId || '';
  
  const subjectData = subjects.find((s) => s.id === subject);
  const chapters = subject ? ncertClass10Chapters[subject] : [];
  const chapter = chapters?.find((c) => c.id === chapterId);

  if (!subjectData || !chapter) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Chapter Not Found</AlertTitle>
          <AlertDescription>
            The chapter you're looking for doesn't exist or the link is invalid.
          </AlertDescription>
        </Alert>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Chapter not found</h2>
          <Link to="/chapters">
            <Button>Back to Chapters</Button>
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
              <Link to="/chapters">Chapters</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/chapters">{subjectData.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Chapter {chapter.number}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-start gap-4">
        <Link to="/chapters">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {subjectData.icon} {subjectData.name}
            </Badge>
            <Badge variant="outline" className="text-lg px-3 py-1">
              Chapter {chapter.number}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">{chapter.title}</h1>
          <p className="text-muted-foreground">
            Choose a learning mode below to start studying this chapter
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Start Learning</CardTitle>
          <CardDescription>
            Select any learning mode to begin studying this chapter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {learningModes.map((mode) => (
              <Link
                key={mode.id}
                to="/learning-modes/$modeId"
                params={{ modeId: mode.id }}
                search={{ subject, chapterId }}
              >
                <Button
                  variant="outline"
                  className="w-full h-auto py-3 px-4 flex items-center gap-3 justify-start hover:bg-accent"
                >
                  <LearningModeIcon modeId={mode.id} className="h-6 w-6 flex-shrink-0" />
                  <span className="text-left text-sm font-medium">{mode.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
