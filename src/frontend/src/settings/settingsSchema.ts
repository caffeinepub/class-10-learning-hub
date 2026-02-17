export interface SettingOption {
  value: string;
  label: string;
}

export interface SettingDefinition {
  key: string;
  label: string;
  description?: string;
  type: 'toggle' | 'select' | 'slider';
  defaultValue: boolean | string | number;
  options?: SettingOption[];
  min?: number;
  max?: number;
  step?: number;
}

export interface SettingsCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  settings: SettingDefinition[];
}

export interface Settings {
  [key: string]: boolean | string | number;
}

export const settingsSchema: { categories: SettingsCategory[] } = {
  categories: [
    {
      id: 'learning',
      name: 'Learning Preferences',
      icon: '📚',
      description: 'Customize how you learn and interact with content',
      settings: [
        {
          key: 'autoPlayAudio',
          label: 'Auto-play Audio',
          description: 'Automatically play audio explanations when available',
          type: 'toggle',
          defaultValue: false,
        },
        {
          key: 'showHints',
          label: 'Show Hints',
          description: 'Display helpful hints during practice sessions',
          type: 'toggle',
          defaultValue: true,
        },
        {
          key: 'learningPace',
          label: 'Learning Pace',
          description: 'Adjust the speed of content delivery',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { value: 'slow', label: 'Slow' },
            { value: 'medium', label: 'Medium' },
            { value: 'fast', label: 'Fast' },
          ],
        },
        {
          key: 'studyReminders',
          label: 'Study Reminders',
          description: 'Enable local reminders for study sessions',
          type: 'toggle',
          defaultValue: true,
        },
        {
          key: 'bookmarkSync',
          label: 'Bookmark Sync',
          description: 'Save bookmarks and progress locally',
          type: 'toggle',
          defaultValue: true,
        },
      ],
    },
    {
      id: 'practice',
      name: 'Practice & Quiz',
      icon: '✏️',
      description: 'Configure quiz and practice session behavior',
      settings: [
        {
          key: 'instantFeedback',
          label: 'Instant Feedback',
          description: 'Show correct answers immediately after each question',
          type: 'toggle',
          defaultValue: true,
        },
        {
          key: 'showExplanations',
          label: 'Show Explanations',
          description: 'Display detailed explanations for answers',
          type: 'toggle',
          defaultValue: true,
        },
        {
          key: 'shuffleQuestions',
          label: 'Shuffle Questions',
          description: 'Randomize question order in quizzes',
          type: 'toggle',
          defaultValue: false,
        },
        {
          key: 'timerEnabled',
          label: 'Enable Timer',
          description: 'Show countdown timer during practice sessions',
          type: 'toggle',
          defaultValue: false,
        },
        {
          key: 'questionsPerSession',
          label: 'Questions per Session',
          description: 'Number of questions in each practice session',
          type: 'slider',
          defaultValue: 10,
          min: 5,
          max: 50,
          step: 5,
        },
        {
          key: 'difficultyLevel',
          label: 'Difficulty Level',
          description: 'Set the default difficulty for practice questions',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { value: 'easy', label: 'Easy' },
            { value: 'medium', label: 'Medium' },
            { value: 'hard', label: 'Hard' },
            { value: 'mixed', label: 'Mixed' },
          ],
        },
      ],
    },
    {
      id: 'display',
      name: 'Content Display',
      icon: '🎨',
      description: 'Adjust visual appearance and content presentation',
      settings: [
        {
          key: 'darkMode',
          label: 'Dark Mode',
          description: 'Use dark theme for reduced eye strain',
          type: 'toggle',
          defaultValue: false,
        },
        {
          key: 'fontSize',
          label: 'Font Size',
          description: 'Adjust text size for comfortable reading',
          type: 'slider',
          defaultValue: 16,
          min: 12,
          max: 24,
          step: 1,
        },
        {
          key: 'lineSpacing',
          label: 'Line Spacing',
          description: 'Adjust spacing between lines of text',
          type: 'select',
          defaultValue: 'normal',
          options: [
            { value: 'compact', label: 'Compact' },
            { value: 'normal', label: 'Normal' },
            { value: 'relaxed', label: 'Relaxed' },
          ],
        },
        {
          key: 'showImages',
          label: 'Show Images',
          description: 'Display images and diagrams in content',
          type: 'toggle',
          defaultValue: true,
        },
        {
          key: 'highlightKeyTerms',
          label: 'Highlight Key Terms',
          description: 'Automatically highlight important terms',
          type: 'toggle',
          defaultValue: true,
        },
        {
          key: 'compactMode',
          label: 'Compact Mode',
          description: 'Use condensed layout to show more content',
          type: 'toggle',
          defaultValue: false,
        },
      ],
    },
    {
      id: 'accessibility',
      name: 'Accessibility',
      icon: '♿',
      description: 'Features to improve accessibility and usability',
      settings: [
        {
          key: 'highContrast',
          label: 'High Contrast',
          description: 'Increase contrast for better visibility',
          type: 'toggle',
          defaultValue: false,
        },
        {
          key: 'reducedMotion',
          label: 'Reduced Motion',
          description: 'Minimize animations and transitions',
          type: 'toggle',
          defaultValue: false,
        },
        {
          key: 'screenReaderMode',
          label: 'Screen Reader Mode',
          description: 'Optimize for screen reader compatibility',
          type: 'toggle',
          defaultValue: false,
        },
        {
          key: 'keyboardNavigation',
          label: 'Enhanced Keyboard Navigation',
          description: 'Enable advanced keyboard shortcuts',
          type: 'toggle',
          defaultValue: true,
        },
        {
          key: 'focusIndicators',
          label: 'Focus Indicators',
          description: 'Show clear focus outlines for navigation',
          type: 'toggle',
          defaultValue: true,
        },
      ],
    },
    {
      id: 'notifications',
      name: 'Notifications & Reminders',
      icon: '🔔',
      description: 'Manage local notifications and study reminders',
      settings: [
        {
          key: 'dailyGoalReminder',
          label: 'Daily Goal Reminder',
          description: 'Remind me to complete daily study goals',
          type: 'toggle',
          defaultValue: true,
        },
        {
          key: 'achievementNotifications',
          label: 'Achievement Notifications',
          description: 'Show notifications when you earn achievements',
          type: 'toggle',
          defaultValue: true,
        },
        {
          key: 'reminderTime',
          label: 'Reminder Time',
          description: 'Preferred time for study reminders',
          type: 'select',
          defaultValue: '18:00',
          options: [
            { value: '08:00', label: '8:00 AM' },
            { value: '12:00', label: '12:00 PM' },
            { value: '16:00', label: '4:00 PM' },
            { value: '18:00', label: '6:00 PM' },
            { value: '20:00', label: '8:00 PM' },
          ],
        },
        {
          key: 'soundEffects',
          label: 'Sound Effects',
          description: 'Play sounds for actions and notifications',
          type: 'toggle',
          defaultValue: true,
        },
      ],
    },
    {
      id: 'privacy',
      name: 'Privacy & Data',
      icon: '🔒',
      description: 'Control your data and privacy preferences',
      settings: [
        {
          key: 'saveProgress',
          label: 'Save Progress Locally',
          description: 'Store your learning progress on this device',
          type: 'toggle',
          defaultValue: true,
        },
        {
          key: 'analyticsEnabled',
          label: 'Usage Analytics',
          description: 'Help improve the app by sharing anonymous usage data',
          type: 'toggle',
          defaultValue: false,
        },
        {
          key: 'cacheContent',
          label: 'Cache Content',
          description: 'Store content locally for offline access',
          type: 'toggle',
          defaultValue: true,
        },
        {
          key: 'autoSave',
          label: 'Auto-save',
          description: 'Automatically save your work and notes',
          type: 'toggle',
          defaultValue: true,
        },
        {
          key: 'dataRetention',
          label: 'Data Retention',
          description: 'How long to keep your study history',
          type: 'select',
          defaultValue: '90days',
          options: [
            { value: '30days', label: '30 Days' },
            { value: '90days', label: '90 Days' },
            { value: '1year', label: '1 Year' },
            { value: 'forever', label: 'Forever' },
          ],
        },
      ],
    },
  ],
};
