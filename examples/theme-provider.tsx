import { Button, ThemeProvider, useTheme } from '@bloomneo/uikit';
import '@bloomneo/uikit/styles';

// REMEMBER: also drop the FOUC inline script in your <head> so the theme
// is applied before React mounts. See @bloomneo/uikit/fouc.

function ThemeSwitcher() {
  const { theme, mode, availableThemes, setTheme, toggleMode } = useTheme();
  return (
    <div className="flex items-center gap-2">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="rounded border border-input bg-background px-2 py-1 text-sm"
      >
        {availableThemes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <Button variant="outline" size="sm" onClick={toggleMode}>
        {mode === 'dark' ? '☀️' : '🌙'}
      </Button>
    </div>
  );
}

export default function ThemeProviderExample() {
  return (
    <ThemeProvider theme="base" mode="light">
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
