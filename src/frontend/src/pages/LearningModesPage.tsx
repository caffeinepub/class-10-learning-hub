import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { learningModes } from '../data/learningModes';
import LearningModeIcon from '../components/learning-modes/LearningModeIcon';

export default function LearningModesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Learning Modes</h1>
        <p className="text-muted-foreground">
          Choose from 20 different ways to study and master your subjects
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {learningModes.map((mode) => (
          <Card key={mode.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <LearningModeIcon modeId={mode.id} className="h-10 w-10" />
                <CardTitle className="text-lg">{mode.name}</CardTitle>
              </div>
              <CardDescription className="line-clamp-2">{mode.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/learning-modes/$modeId" params={{ modeId: mode.id }}>
                <Button className="w-full gap-2">
                  <Play className="h-4 w-4" />
                  Start
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
