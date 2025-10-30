import { useState } from 'react';
import {
  DefaultSplitExample,
  SolidColorSplitExample,
  CustomGradientSplitExample,
  BackgroundImageSplitExample,
  MeshGradientSplitExample,
  DarkGradientSplitExample,
  CustomContentSplitExample,
  AnimatedGradientSplitExample,
  MinimalLightSplitExample,
  MultiColorGradientSplitExample,
} from './components/auth-split';

const examples = [
  {
    id: 'default',
    name: 'Default Split',
    description: 'Built-in primary gradient with dot pattern',
    component: DefaultSplitExample,
  },
  {
    id: 'solid',
    name: 'Solid Color',
    description: 'Simple solid color background',
    component: SolidColorSplitExample,
  },
  {
    id: 'gradient',
    name: 'Custom Gradient',
    description: 'Purple to pink gradient',
    component: CustomGradientSplitExample,
  },
  {
    id: 'image',
    name: 'Background Image',
    description: 'Local SVG gradient image',
    component: BackgroundImageSplitExample,
  },
  {
    id: 'mesh',
    name: 'Mesh Gradient',
    description: 'Multi-color mesh gradient',
    component: MeshGradientSplitExample,
  },
  {
    id: 'dark',
    name: 'Dark Gradient',
    description: 'Dark theme with purple gradient',
    component: DarkGradientSplitExample,
  },
  {
    id: 'custom',
    name: 'Custom Content',
    description: 'Full JSX control with features list',
    component: CustomContentSplitExample,
  },
  {
    id: 'animated',
    name: 'Animated Gradient',
    description: 'Animated gradient background',
    component: AnimatedGradientSplitExample,
  },
  {
    id: 'minimal',
    name: 'Minimal Light',
    description: 'Clean minimal design',
    component: MinimalLightSplitExample,
  },
  {
    id: 'multicolor',
    name: 'Multi-Color',
    description: 'Rainbow conic gradient',
    component: MultiColorGradientSplitExample,
  },
];

function App() {
  const [selectedExample, setSelectedExample] = useState(examples[0]);
  const [showNav, setShowNav] = useState(true);

  const SelectedComponent = selectedExample.component;

  return (
    <div className="relative min-h-screen">
      {/* Navigation Toggle Button */}
      <button
        onClick={() => setShowNav(!showNav)}
        className="fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title={showNav ? 'Hide navigation' : 'Show navigation'}
      >
        {showNav ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Sidebar Navigation */}
      {showNav && (
        <div className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 overflow-y-auto shadow-xl">
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                UIKit Examples
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AuthLayout Split Scheme Variations
              </p>
            </div>

            <nav className="space-y-2">
              {examples.map((example) => (
                <button
                  key={example.id}
                  onClick={() => setSelectedExample(example)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedExample.id === example.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="font-medium">{example.name}</div>
                  <div
                    className={`text-xs mt-1 ${
                      selectedExample.id === example.id
                        ? 'text-blue-100'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {example.description}
                  </div>
                </button>
              ))}
            </nav>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">
                💡 Quick Tip
              </h3>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Hide this navigation panel to see the full layout. Click the menu button to toggle.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`transition-all duration-300 ${showNav ? 'ml-80' : 'ml-0'}`}>
        <SelectedComponent />
      </div>

      {/* Example Info Overlay */}
      <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 max-w-sm z-30">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
          {selectedExample.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {selectedExample.description}
        </p>
      </div>
    </div>
  );
}

export default App;
