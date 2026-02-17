import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SettingsCategorySection from '../components/settings/SettingsCategorySection';
import PremiumSettingsCard from '../components/settings/PremiumSettingsCard';
import { useSettings } from '../settings/useSettings';
import { settingsSchema } from '../settings/settingsSchema';

export default function SettingsPage() {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Customize your learning experience with over 30 adjustable options
        </p>
      </div>

      <div className="space-y-6">
        <PremiumSettingsCard />

        {settingsSchema.categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                {category.name}
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsCategorySection
                category={category}
                settings={settings}
                onUpdate={updateSetting}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
