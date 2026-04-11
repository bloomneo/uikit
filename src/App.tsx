import React from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { ThemeProvider, useTheme } from './themes';

const UIKitShowcase: React.FC = () => {
  const { theme, mode, setTheme, setMode, availableThemes, toggleMode } = useTheme();

  const themeDescriptions = {
    base: 'Clean default configuration showcasing the base system with Inter typography (default)',
    elegant: 'Fresh sky blue theme with clean design',
    metro: 'Dark teal theme with bright yellow accents',
    studio: 'Sophisticated neutral theme with golden accents',
    vivid: 'Premium cursive theme with sophisticated typography for luxury brands'
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border p-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold text-sm">
              UI
            </div>
            <div>
              <h3 className="voila-brand-logo text-xl font-bold">@voilajsx/uikit</h3>
              <p className="text-xs text-muted-foreground">Professional React UI Components</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-background border border-input rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {availableThemes.map(themeId => (
                <option key={themeId} value={themeId}>
                  {themeId.charAt(0).toUpperCase() + themeId.slice(1)}
                </option>
              ))}
            </select>
            
            <Button onClick={toggleMode} variant="outline" size="sm">
              {mode === 'dark' ? '☀️' : '🌙'}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* Hero */}
        <section className="text-center py-8">
          <div className="space-y-4">
            <h1 className="voila-heading text-gradient-primary mb-3">
              Beautiful UI Components
            </h1>
            <p className="voila-subheading text-accent mb-6">
              {availableThemes.length} themes • {mode} mode • Professional React components
            </p>
            <div className="text-sm text-muted-foreground bg-muted px-4 py-2 rounded inline-block">
              {themeDescriptions[theme as keyof typeof themeDescriptions]}
            </div>
          </div>
        </section>

        {/* Colors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-primary text-primary-foreground p-4 rounded-lg text-center">
            <div className="text-sm font-medium">Primary</div>
          </div>
          <div className="bg-secondary text-secondary-foreground p-4 rounded-lg text-center">
            <div className="text-sm font-medium">Secondary</div>
          </div>
          <div className="bg-accent text-accent-foreground p-4 rounded-lg text-center">
            <div className="text-sm font-medium">Accent</div>
          </div>
          <div className="bg-muted text-muted-foreground p-4 rounded-lg text-center">
            <div className="text-sm font-medium">Muted</div>
          </div>
        </div>

        {/* Components */}
        <div className="space-y-6">
          
          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button size="lg">Primary</Button>
                <Button variant="secondary" size="lg">Secondary</Button>
                <Button variant="outline" size="lg">Outline</Button>
                <Button variant="ghost" size="lg">Ghost</Button>
                <Button variant="destructive" size="lg">Delete</Button>
              </div>
            </CardContent>
          </Card>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Feature Card</CardTitle>
                <CardDescription>Standard card component</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Perfect for content areas</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Interactive</CardTitle>
                <CardDescription>With actions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" className="w-full">Action</Button>
              </CardContent>
            </Card>
            
            <div className="bg-primary text-primary-foreground p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Primary Card</h4>
              <p className="text-sm opacity-90">Custom background</p>
            </div>
          </div>

          {/* Form Elements */}
          <Card>
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Text input"
                  className="p-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <select className="p-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Select option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
              
              <textarea 
                placeholder="Textarea"
                rows={3}
                className="w-full p-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </CardContent>
          </Card>

          {/* Chart Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Chart Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-3">
                <div className="text-center">
                  <div className="w-full h-12 rounded mb-2 bg-chart1" />
                  <div className="text-xs text-muted-foreground">chart1</div>
                </div>
                <div className="text-center">
                  <div className="w-full h-12 rounded mb-2 bg-chart2" />
                  <div className="text-xs text-muted-foreground">chart2</div>
                </div>
                <div className="text-center">
                  <div className="w-full h-12 rounded mb-2 bg-chart3" />
                  <div className="text-xs text-muted-foreground">chart3</div>
                </div>
                <div className="text-center">
                  <div className="w-full h-12 rounded mb-2 bg-chart4" />
                  <div className="text-xs text-muted-foreground">chart4</div>
                </div>
                <div className="text-center">
                  <div className="w-full h-12 rounded mb-2 bg-chart5" />
                  <div className="text-xs text-muted-foreground">chart5</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Typography Scale */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <h1 className="text-3xl font-bold">Heading 1</h1>
            <h2 className="text-2xl font-bold">Heading 2</h2>
            <h3 className="text-xl font-bold">Heading 3</h3>
            <p className="text-base">Body text - Lorem ipsum dolor sit amet consectetur.</p>
            <p className="text-sm text-muted-foreground">Small text for captions and metadata.</p>
            <code className="text-sm bg-muted px-2 py-1 rounded">Code snippet</code>
          </CardContent>
        </Card>

      </main>

      {/* Footer */}
      <footer className="border-t border-border p-6 mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            @voilajsx/uikit • {theme.charAt(0).toUpperCase() + theme.slice(1)} theme • {mode.charAt(0).toUpperCase() + mode.slice(1)} mode
          </p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider theme="base" mode="light" forceConfig={true}>
      <UIKitShowcase />
    </ThemeProvider>
  );
}

export default App;