import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import ChapterList from '../components/chapters/ChapterList';
import { ncertClass10Chapters, subjects } from '../data/ncertClass10Chapters';

export default function ChaptersPage() {
  const [activeSubject, setActiveSubject] = useState(subjects[0].id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Class 10 NCERT Chapters</h1>
        <p className="text-muted-foreground">
          Browse all chapters organized by subject. Select a chapter to start learning.
        </p>
      </div>

      <Tabs value={activeSubject} onValueChange={setActiveSubject} className="w-full">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="inline-flex h-auto w-full md:w-auto">
            {subjects.map((subject) => (
              <TabsTrigger key={subject.id} value={subject.id} className="py-3 px-4">
                <span className="text-2xl mr-2">{subject.icon}</span>
                <span className="hidden sm:inline">{subject.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {subjects.map((subject) => (
          <TabsContent key={subject.id} value={subject.id} className="mt-6">
            <ChapterList subject={subject} chapters={ncertClass10Chapters[subject.id]} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
