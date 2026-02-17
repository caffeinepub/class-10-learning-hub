import { useState, useEffect } from 'react';
import { settingsSchema, type Settings } from './settingsSchema';
import { applySettings } from './applySettings';

const STORAGE_KEY = 'class10-learning-hub-settings';

function getDefaultSettings(): Settings {
  const defaults: Settings = {};
  settingsSchema.categories.forEach((category) => {
    category.settings.forEach((setting) => {
      defaults[setting.key] = setting.defaultValue;
    });
  });
  return defaults;
}

function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...getDefaultSettings(), ...parsed };
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  return getDefaultSettings();
}

function saveSettings(settings: Settings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  useEffect(() => {
    applySettings(settings);
  }, [settings]);

  const updateSetting = (key: string, value: boolean | string | number) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };
      saveSettings(updated);
      return updated;
    });
  };

  const resetSettings = () => {
    const defaults = getDefaultSettings();
    setSettings(defaults);
    saveSettings(defaults);
  };

  return {
    settings,
    updateSetting,
    resetSettings,
  };
}
