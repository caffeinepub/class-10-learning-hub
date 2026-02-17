import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Crown, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsCurrentUserPremium, useUpgradeToPremium } from '../../hooks/useQueries';
import { toast } from 'sonner';

export default function PremiumSettingsCard() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: isPremium, isLoading: isPremiumLoading } = useIsCurrentUserPremium();
  const upgradeMutation = useUpgradeToPremium();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleUpgrade = async () => {
    if (!isAuthenticated) {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        toast.error('Failed to log in. Please try again.');
      }
      return;
    }

    try {
      await upgradeMutation.mutateAsync();
      toast.success('Successfully upgraded to Premium! 🎉');
    } catch (error: any) {
      console.error('Upgrade error:', error);
      toast.error('Failed to upgrade. Please try again.');
    }
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-primary" />
            <CardTitle>Premium</CardTitle>
          </div>
          {isPremium && (
            <Badge variant="default" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Active
            </Badge>
          )}
        </div>
        <CardDescription>
          Unlock all learning modes and advanced features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isAuthenticated && (
          <Alert>
            <AlertDescription>
              Please log in with Internet Identity to manage your Premium subscription.
            </AlertDescription>
          </Alert>
        )}

        {isPremiumLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : isPremium ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-primary/10 p-4 space-y-2">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Sparkles className="h-5 w-5" />
                <span>You have Premium access!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Enjoy unlimited access to all 20 learning modes and premium features.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Premium Benefits:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Access to all 20 learning modes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Unlimited practice sessions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Advanced progress tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Priority support
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Upgrade to Premium and get:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Access to all 20 learning modes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Unlimited practice sessions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Advanced progress tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Priority support
                </li>
              </ul>
            </div>
            <Button
              onClick={handleUpgrade}
              disabled={isLoggingIn || upgradeMutation.isPending}
              className="w-full gap-2"
              size="lg"
            >
              {isLoggingIn || upgradeMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isLoggingIn ? 'Logging in...' : 'Upgrading...'}
                </>
              ) : (
                <>
                  <Crown className="h-4 w-4" />
                  {isAuthenticated ? 'Upgrade to Premium' : 'Log in to Upgrade'}
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
