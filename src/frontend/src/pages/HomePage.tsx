import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Lightbulb, Settings, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden">
        <img
          src="/assets/generated/home-banner.dim_1600x600.png"
          alt="Class 10 Learning Hub"
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/60 flex items-center">
          <div className="px-8 md:px-12 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Master Class 10 NCERT
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Complete coverage of all subjects with 20 interactive learning modes and customizable settings
            </p>
            <Link to="/chapters">
              <Button size="lg" className="gap-2">
                Start Learning <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Browse Chapters</CardTitle>
            <CardDescription>
              Access all Class 10 NCERT chapters organized by subject
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/chapters">
              <Button variant="outline" className="w-full gap-2">
                View Chapters <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Lightbulb className="h-6 w-6 text-accent-foreground" />
            </div>
            <CardTitle>Learning Modes</CardTitle>
            <CardDescription>
              Choose from 20 different ways to study and practice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/learning-modes">
              <Button variant="outline" className="w-full gap-2">
                Explore Modes <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
              <Settings className="h-6 w-6 text-secondary-foreground" />
            </div>
            <CardTitle>Customize Settings</CardTitle>
            <CardDescription>
              Personalize your learning experience with 30+ options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/settings">
              <Button variant="outline" className="w-full gap-2">
                Open Settings <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Features Overview */}
      <section className="bg-card rounded-2xl p-8 border border-border">
        <h2 className="text-2xl font-bold mb-6">Why Choose Our Learning Hub?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Complete NCERT Coverage</h3>
              <p className="text-sm text-muted-foreground">
                All chapters from Mathematics, Science, Social Science, English, and Hindi
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">20 Learning Modes</h3>
              <p className="text-sm text-muted-foreground">
                From flashcards to quizzes, find the perfect way to study
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Fully Customizable</h3>
              <p className="text-sm text-muted-foreground">
                30+ settings to personalize your learning experience
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Offline Ready</h3>
              <p className="text-sm text-muted-foreground">
                Access chapters and modes without internet connection
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
