import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import ChaptersPage from './pages/ChaptersPage';
import ChapterDetailPage from './pages/ChapterDetailPage';
import LearningModesPage from './pages/LearningModesPage';
import LearningModeRunPage from './pages/LearningModeRunPage';
import SettingsPage from './pages/SettingsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const chaptersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chapters',
  component: ChaptersPage,
});

const chapterDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chapters/$subject/$chapterId',
  component: ChapterDetailPage,
});

const learningModesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learning-modes',
  component: LearningModesPage,
});

const learningModeRunRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learning-modes/$modeId',
  component: LearningModeRunPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  chaptersRoute,
  chapterDetailRoute,
  learningModesRoute,
  learningModeRunRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
