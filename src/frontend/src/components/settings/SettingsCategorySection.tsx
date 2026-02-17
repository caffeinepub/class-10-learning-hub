import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import type { SettingsCategory, SettingDefinition, Settings } from '../../settings/settingsSchema';

interface SettingsCategorySectionProps {
  category: SettingsCategory;
  settings: Settings;
  onUpdate: (key: string, value: boolean | string | number) => void;
}

export default function SettingsCategorySection({
  category,
  settings,
  onUpdate,
}: SettingsCategorySectionProps) {
  const renderSetting = (setting: SettingDefinition, index: number) => {
    const value = settings[setting.key as keyof Settings];

    return (
      <div key={setting.key}>
        {index > 0 && <Separator className="my-4" />}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label htmlFor={setting.key} className="text-base font-medium">
                {setting.label}
              </Label>
              {setting.description && (
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              )}
            </div>
            <div className="flex-shrink-0">
              {setting.type === 'toggle' && (
                <Switch
                  id={setting.key}
                  checked={value as boolean}
                  onCheckedChange={(checked) => onUpdate(setting.key, checked)}
                />
              )}
              {setting.type === 'select' && setting.options && (
                <Select
                  value={value as string}
                  onValueChange={(newValue) => onUpdate(setting.key, newValue)}
                >
                  <SelectTrigger id={setting.key} className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {setting.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          {setting.type === 'slider' && setting.min !== undefined && setting.max !== undefined && (
            <div className="pt-2">
              <Slider
                id={setting.key}
                min={setting.min}
                max={setting.max}
                step={setting.step || 1}
                value={[value as number]}
                onValueChange={(values) => onUpdate(setting.key, values[0])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{setting.min}</span>
                <span className="font-medium text-foreground">{value}</span>
                <span>{setting.max}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {category.settings.map((setting, index) => renderSetting(setting, index))}
    </div>
  );
}
