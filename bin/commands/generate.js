/**
 * @fileoverview UIKit Generate Command - Frontend feature scaffolding
 * @description Generates new frontend features using FBCA pattern with UIKit components
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate a new frontend feature using TypeScript templates
 */
export async function generateFeature(type, name, options) {
  const theme = options && options.theme || 'base';
  console.log(`🎨 Generating ${type}: "${name}" with ${theme} theme...\n`);

  try {
    // Handle theme generation separately (doesn't need features directory)
    if (type === 'theme') {
      await generateThemeFeature(name, options);
      console.log(`✅ Generated ${type} "${name}" successfully!`);
      return;
    }

    // Validate feature name (allow forward slashes for nested paths)
    if (!name || !/^[a-zA-Z0-9-_/]+$/.test(name)) {
      console.error('❌ Invalid feature name. Use only letters, numbers, hyphens, underscores, and forward slashes.');
      process.exit(1);
    }

    // Check if we're in a project directory
    const currentDir = process.cwd();
    const packageJsonPath = path.join(currentDir, 'package.json');

    try {
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
      if (!packageJson.dependencies || !packageJson.dependencies['@bloomneo/uikit']) {
        console.error('❌ Not in a UIKit project directory. Run this from project root.');
        process.exit(1);
      }
    } catch {
      console.error('❌ No package.json found. Run this from project root.');
      process.exit(1);
    }

    // Check if we're in FBCA structure (src/web/features or src/features)
    let featuresPath = path.join(currentDir, 'src/web/features');
    let isFBCA = true;

    try {
      await fs.access(featuresPath);
    } catch {
      // Try alternative path
      featuresPath = path.join(currentDir, 'src/features');
      try {
        await fs.access(featuresPath);
      } catch {
        // Create features directory in preferred location
        featuresPath = path.join(currentDir, 'src/web/features');
        await fs.mkdir(featuresPath, { recursive: true });
        console.log(`📁 Created features directory: ${featuresPath}`);
      }
    }

    // Check if feature already exists
    const featurePath = path.join(featuresPath, name);
    try {
      await fs.access(featurePath);
      console.error(`❌ Feature "${name}" already exists.`);
      process.exit(1);
    } catch {
      // Feature doesn't exist, good to proceed
    }

    // Generate feature based on type
    if (type === 'page') {
      await generatePageFeature(featuresPath, name, options);
    } else if (type === 'component') {
      await generateComponentFeature(featuresPath, name, options);
    } else if (type === 'hook') {
      await generateHookFeature(featuresPath, name, options);
    } else if (type === 'feature') {
      await generateFullFeature(featuresPath, name, options);
    } else {
      console.error(`❌ Unknown type "${type}". Use: page, component, hook, feature, or theme`);
      process.exit(1);
    }

    console.log(`✅ Generated ${type} "${name}" successfully!`);

  } catch (error) {
    console.error('❌ Failed to generate feature:', error.message);
    process.exit(1);
  }
}

/**
 * Generate a page component following FBCA convention with nested path support
 */
async function generatePageFeature(featuresPath, name, options) {
  // Parse feature name and nested path
  // Examples: "dashboard" → feature: dashboard, path: index.tsx
  //          "dashboard/new" → feature: dashboard, path: new.tsx
  //          "dashboard/new/apple" → feature: dashboard, path: new/apple.tsx

  const pathParts = name.split('/');
  const featureName = pathParts[0];
  const nestedPath = pathParts.slice(1);

  let targetDir;

  if (nestedPath.length === 0) {
    // Simple page goes to main feature - don't create the original feature directory
    targetDir = path.join(featuresPath, 'main', 'pages');
  } else {
    // Nested path creates its own feature
    const featurePath = path.join(featuresPath, featureName);
    const pagesPath = path.join(featurePath, 'pages');

    // Create the full nested directory structure
    targetDir = pagesPath;
    if (nestedPath.length > 1) {
      // Create nested directories for deep paths like "new/apple"
      const nestedDirs = nestedPath.slice(0, -1).join('/');
      targetDir = path.join(pagesPath, nestedDirs);
    }
  }

  await fs.mkdir(targetDir, { recursive: true });

  const templatesPath = path.join(__dirname, '../templates/generate/page');

  try {
    // Determine the page file name
    let pageFileName;
    if (nestedPath.length === 0) {
      // Simple feature name like "dashboard" → goes to main/pages/dashboard.tsx
      pageFileName = `${featureName}.tsx`;
    } else {
      // Nested path like "dashboard/new" → new.tsx or "dashboard/new/apple" → apple.tsx
      pageFileName = `${nestedPath[nestedPath.length - 1]}.tsx`;
    }

    // Generate the page component
    await generateFromTemplate(templatesPath, 'page.tsx.template', targetDir, pageFileName, featureName, options);

    const relativePath = nestedPath.length === 0
      ? `main/pages/${featureName}.tsx`
      : `${featureName}/pages/${nestedPath.join('/')}.tsx`;

    console.log(`📁 Created: src/web/features/${relativePath}`);
  } catch (error) {
    console.error(`❌ Failed to generate page: ${error.message}`);
    throw error;
  }
}

/**
 * Generate a reusable component with shared/feature logic
 */
async function generateComponentFeature(featuresPath, name, options) {
  // Parse component name and feature path
  // Examples: "button" → shared/components/Button.tsx
  //          "blog/post-card" → blog/components/PostCard.tsx

  const pathParts = name.split('/');
  const isFeatureSpecific = pathParts.length > 1;

  let targetDir;
  let componentName;
  let relativePath;

  if (isFeatureSpecific) {
    // Feature-specific component like "blog/post-card"
    const featureName = pathParts[0];
    const componentBaseName = pathParts[pathParts.length - 1];
    componentName = componentBaseName.split('-').map(part =>
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');

    const featurePath = path.join(featuresPath, featureName);
    targetDir = path.join(featurePath, 'components');
    relativePath = `${featureName}/components/${componentName}.tsx`;
  } else {
    // Shared component like "button"
    componentName = name.split('-').map(part =>
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');

    // Go up from features to web, then to shared/components
    const webPath = path.dirname(featuresPath);
    targetDir = path.join(webPath, 'shared', 'components');
    relativePath = `shared/components/${componentName}.tsx`;
  }

  await fs.mkdir(targetDir, { recursive: true });

  const templatesPath = path.join(__dirname, '../templates/generate/component');

  try {
    // Generate component only - pass componentName as the feature name for template replacement
    const templateOptions = { ...options, componentName: componentName };
    await generateComponentFromTemplate(templatesPath, 'component.tsx.template', targetDir, `${componentName}.tsx`, componentName, templateOptions);

    const displayPath = isFeatureSpecific
      ? `src/web/features/${relativePath}`
      : `src/web/${relativePath}`;

    console.log(`📁 Created: ${displayPath}`);
  } catch (error) {
    console.error(`❌ Failed to generate component: ${error.message}`);
    throw error;
  }
}

/**
 * Generate a custom hook with shared/feature logic
 */
async function generateHookFeature(featuresPath, name, options) {
  // Parse hook name and feature path
  // Examples: "sample" → shared/hooks/useSharedSample.ts
  //          "greeting/welcome" → greeting/hooks/useWelcome.ts

  const pathParts = name.split('/');
  const isFeatureSpecific = pathParts.length > 1;

  let targetDir;
  let hookName;
  let relativePath;

  if (isFeatureSpecific) {
    // Feature-specific hook like "greeting/welcome"
    const featureName = pathParts[0];
    const hookBaseName = pathParts[pathParts.length - 1];
    hookName = 'use' + hookBaseName.split('-').map(part =>
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');

    const featurePath = path.join(featuresPath, featureName);
    targetDir = path.join(featurePath, 'hooks');
    relativePath = `${featureName}/hooks/${hookName}.ts`;
  } else {
    // Shared hook like "sample"
    hookName = 'useShared' + name.split('-').map(part =>
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');

    // Go up from features to web, then to shared/hooks
    const webPath = path.dirname(featuresPath);
    targetDir = path.join(webPath, 'shared', 'hooks');
    relativePath = `shared/hooks/${hookName}.ts`;
  }

  await fs.mkdir(targetDir, { recursive: true });

  const templatesPath = path.join(__dirname, '../templates/generate/hook');

  try {
    // Generate hook only - pass hookName for template replacement
    const templateOptions = { ...options, hookName: hookName };
    await generateHookFromTemplate(templatesPath, 'hook.ts.template', targetDir, `${hookName}.ts`, hookName, templateOptions);

    const displayPath = isFeatureSpecific
      ? `src/web/features/${relativePath}`
      : `src/web/${relativePath}`;

    console.log(`📁 Created: ${displayPath}`);
  } catch (error) {
    console.error(`❌ Failed to generate hook: ${error.message}`);
    throw error;
  }
}

/**
 * Generate a complete feature with hook, component, and page
 */
async function generateFullFeature(featuresPath, name, options) {
  const featurePath = path.join(featuresPath, name);
  await fs.mkdir(featurePath, { recursive: true });

  try {
    // Create directory structure
    const pagesPath = path.join(featurePath, 'pages');
    const componentsPath = path.join(featurePath, 'components');
    const hooksPath = path.join(featurePath, 'hooks');

    await fs.mkdir(pagesPath, { recursive: true });
    await fs.mkdir(componentsPath, { recursive: true });
    await fs.mkdir(hooksPath, { recursive: true });

    // Component and hook names
    const componentName = name.charAt(0).toUpperCase() + name.slice(1);
    const hookName = `use${componentName}`;

    // Generate hook
    const hookTemplatesPath = path.join(__dirname, '../templates/generate/hook');
    const hookOptions = { ...options, hookName: hookName };
    await generateHookFromTemplate(hookTemplatesPath, 'hook.ts.template', hooksPath, `${hookName}.ts`, hookName, hookOptions);

    // Generate component
    const componentTemplatesPath = path.join(__dirname, '../templates/generate/component');
    const componentOptions = { ...options, componentName: componentName };
    await generateComponentFromTemplate(componentTemplatesPath, 'component.tsx.template', componentsPath, `${componentName}.tsx`, componentName, componentOptions);

    // Generate page (index page for the feature)
    const pageTemplatesPath = path.join(__dirname, '../templates/generate/page');
    await generateFromTemplate(pageTemplatesPath, 'page.tsx.template', pagesPath, 'index.tsx', name, options);

    console.log(`📁 Created: src/web/features/${name}/hooks/${hookName}.ts`);
    console.log(`📁 Created: src/web/features/${name}/components/${componentName}.tsx`);
    console.log(`📁 Created: src/web/features/${name}/pages/index.tsx`);
  } catch (error) {
    console.error(`❌ Failed to generate feature: ${error.message}`);
    throw error;
  }
}

/**
 * Generate component file from template with proper variable replacement
 */
async function generateComponentFromTemplate(templatesPath, templateFile, outputPath, outputFile, componentName, options) {
  try {
    // Read template file
    const templatePath = path.join(templatesPath, templateFile);
    const templateContent = await fs.readFile(templatePath, 'utf8');

    // Get project name from package.json
    const currentDir = process.cwd();
    const packageJsonPath = path.join(currentDir, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
    const projectName = packageJson.name || 'my-uikit-project';

    // Determine theme
    const theme = options && options.theme || 'base';

    // Convert component name for different cases
    const componentBaseName = componentName.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase();

    // Replace template variables
    const processedContent = templateContent
      .replace(/\{\{componentName\}\}/g, componentBaseName)
      .replace(/\{\{ComponentName\}\}/g, componentName)
      .replace(/\{\{projectName\}\}/g, projectName)
      .replace(/\{\{theme\}\}/g, theme);

    // Write output file
    const outputFilePath = path.join(outputPath, outputFile);
    await fs.writeFile(outputFilePath, processedContent, 'utf8');
  } catch (error) {
    console.error(`❌ Failed to generate ${outputFile} from template ${templateFile}:`, error.message);
    throw error;
  }
}

/**
 * Generate hook file from template with proper variable replacement
 */
async function generateHookFromTemplate(templatesPath, templateFile, outputPath, outputFile, hookName, options) {
  try {
    // Read template file
    const templatePath = path.join(templatesPath, templateFile);
    const templateContent = await fs.readFile(templatePath, 'utf8');

    // Get project name from package.json
    const currentDir = process.cwd();
    const packageJsonPath = path.join(currentDir, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
    const projectName = packageJson.name || 'my-uikit-project';

    // Determine theme
    const theme = options && options.theme || 'base';

    // Replace template variables
    const processedContent = templateContent
      .replace(/\{\{hookName\}\}/g, hookName)
      .replace(/\{\{projectName\}\}/g, projectName)
      .replace(/\{\{theme\}\}/g, theme);

    // Write output file
    const outputFilePath = path.join(outputPath, outputFile);
    await fs.writeFile(outputFilePath, processedContent, 'utf8');
  } catch (error) {
    console.error(`❌ Failed to generate ${outputFile} from template ${templateFile}:`, error.message);
    throw error;
  }
}

/**
 * Generate file from template with variable replacement
 */
async function generateFromTemplate(templatesPath, templateFile, outputPath, outputFile, featureName, options) {
  try {
    // Read template file
    const templatePath = path.join(templatesPath, templateFile);
    const templateContent = await fs.readFile(templatePath, 'utf8');

    // Get project name from package.json
    const currentDir = process.cwd();
    const packageJsonPath = path.join(currentDir, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
    const projectName = packageJson.name || 'my-uikit-project';

    // Determine theme
    const theme = options && options.theme || 'base';

    // Replace template variables
    const processedContent = templateContent
      .replace(/\{\{featureName\}\}/g, featureName)
      .replace(/\{\{FeatureName\}\}/g, featureName.charAt(0).toUpperCase() + featureName.slice(1))
      .replace(/\{\{FEATURE_NAME\}\}/g, featureName.toUpperCase())
      .replace(/\{\{componentName\}\}/g, featureName)
      .replace(/\{\{ComponentName\}\}/g, featureName.charAt(0).toUpperCase() + featureName.slice(1))
      .replace(/\{\{projectName\}\}/g, projectName)
      .replace(/\{\{theme\}\}/g, theme);

    // Write output file
    const outputFilePath = path.join(outputPath, outputFile);
    await fs.writeFile(outputFilePath, processedContent, 'utf8');
  } catch (error) {
    console.error(`❌ Failed to generate ${outputFile} from template ${templateFile}:`, error.message);
    throw error;
  }
}
/**
 * Generate a custom theme file
 */
async function generateThemeFeature(name, options) {
  // Validate theme name
  if (!name || !/^[a-zA-Z0-9-_]+$/.test(name)) {
    console.error('❌ Invalid theme name. Use only letters, numbers, hyphens, and underscores.');
    process.exit(1);
  }

  // Check if we're in a project directory
  const currentDir = process.cwd();
  const packageJsonPath = path.join(currentDir, 'package.json');

  try {
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
    if (!packageJson.dependencies || !packageJson.dependencies['@bloomneo/uikit']) {
      console.error('❌ Not in a UIKit project directory. Run this from project root.');
      process.exit(1);
    }
  } catch {
    console.error('❌ No package.json found. Run this from project root.');
    process.exit(1);
  }

  // Determine theme directory based on project structure
  let themesPath;
  const isWebStructure = await fs.access(path.join(currentDir, 'src/web')).then(() => true).catch(() => false);

  if (isWebStructure) {
    // FBCA structure - check for existing themes in web directory
    const possiblePaths = [
      'src/web/themes/presets',
      'src/web/assets/themes/presets',
    ];

    // Try to find existing themes directory
    for (const possiblePath of possiblePaths) {
      const fullPath = path.join(currentDir, possiblePath);
      try {
        await fs.access(fullPath);
        themesPath = fullPath;
        break;
      } catch {
        // Directory doesn't exist, continue searching
      }
    }

    // If no existing themes directory, create the preferred one for FBCA
    if (!themesPath) {
      themesPath = path.join(currentDir, 'src/web/themes/presets');
      await fs.mkdir(themesPath, { recursive: true });
      console.log(`📁 Created themes directory: ${themesPath}`);
    }
  } else {
    // SPA/Multi structure - check for existing themes in src directory
    const possiblePaths = [
      'src/themes/presets',
      'themes/presets',
    ];

    // Try to find existing themes directory
    for (const possiblePath of possiblePaths) {
      const fullPath = path.join(currentDir, possiblePath);
      try {
        await fs.access(fullPath);
        themesPath = fullPath;
        break;
      } catch {
        // Directory doesn't exist, continue searching
      }
    }

    // If no existing themes directory, create the preferred one for SPA/Multi
    if (!themesPath) {
      themesPath = path.join(currentDir, 'src/themes/presets');
      await fs.mkdir(themesPath, { recursive: true });
      console.log(`📁 Created themes directory: ${themesPath}`);
    }
  }

  // Check if theme already exists
  const themeFileName = `theme-${name}.js`;
  const themeFilePath = path.join(themesPath, themeFileName);

  try {
    await fs.access(themeFilePath);
    console.error(`❌ Theme "${name}" already exists at ${themeFilePath}`);
    process.exit(1);
  } catch {
    // Theme doesn't exist, good to proceed
  }

  try {
    // Generate theme from template
    const templatesPath = path.join(__dirname, '../templates/generate/theme');
    await generateThemeFromTemplate(templatesPath, 'theme.js.template', themesPath, themeFileName, name, options);

    // Get relative path for display
    const relativePath = path.relative(currentDir, themeFilePath);
    console.log(`📁 Created: ${relativePath}`);

    // Auto-update main.tsx with CSS import and theme setting
    // Use the same project structure detection from above
    let stylesGlobalPath, mainTsxPath;

    if (isWebStructure) {
      // FBCA structure
      stylesGlobalPath = path.join(currentDir, 'src/web/styles/globals.css');
      mainTsxPath = path.join(currentDir, 'src/web/main.tsx');
    } else {
      // SPA/Multi structure
      stylesGlobalPath = path.join(currentDir, 'src/styles/globals.css');
      mainTsxPath = path.join(currentDir, 'src/main.tsx');
    }

    const hasStylesGlobal = await fs.access(stylesGlobalPath).then(() => true).catch(() => false);

    try {
      // Read main.tsx
      let mainContent = await fs.readFile(mainTsxPath, 'utf8');
      let updated = false;

      // Add CSS import for globals.css (will be created by bundle command)
      const cssImportPath = './styles/globals.css';
      if (!mainContent.includes(cssImportPath)) {
        // Simple approach: find the index.css import line and add globals.css after it
        const indexCssImport = "import './styles/index.css';";
        if (mainContent.includes(indexCssImport)) {
          mainContent = mainContent.replace(
            indexCssImport,
            `${indexCssImport}\nimport '${cssImportPath}';`
          );
          console.log(`✅ Added import '${cssImportPath}' to main.tsx`);
          updated = true;
        } else {
          // Fallback: add after any CSS import
          const cssImportRegex = /(import\s+['"'][^'"]*\.css['"];)/;
          if (cssImportRegex.test(mainContent)) {
            mainContent = mainContent.replace(
              cssImportRegex,
              `$1\nimport '${cssImportPath}';`
            );
            console.log(`✅ Added import '${cssImportPath}' to main.tsx`);
            updated = true;
          }
        }
      }

      // Update theme in ThemeProvider if it exists
      if (mainContent.includes('ThemeProvider')) {
        const oldThemeMatch = mainContent.match(/theme="([^"]+)"/);
        if (oldThemeMatch) {
          const oldTheme = oldThemeMatch[1];

          // Update theme
          mainContent = mainContent.replace(
            /theme="[^"]+"/,
            `theme="${name}"`
          );

          // Add forceConfig if not present
          if (!mainContent.includes('forceConfig')) {
            mainContent = mainContent.replace(
              /<ThemeProvider([^>]+)>/,
              `<ThemeProvider$1 forceConfig={true}>`
            );
          }

          console.log(`✅ Updated theme from "${oldTheme}" to "${name}" in main.tsx`);
          updated = true;
        }
      } else {
        // Add ThemeProvider if it doesn't exist
        if (!mainContent.includes('ThemeProvider')) {
          // Add import
          mainContent = mainContent.replace(
            /(import.*from.*;\n)$/m,
            `$1import { ThemeProvider } from '@bloomneo/uikit/theme-provider';\n`
          );

          // Wrap App with ThemeProvider (with forceConfig to override storage)
          mainContent = mainContent.replace(
            /(<React\.StrictMode>\s*<App[^>]*\/>\s*<\/React\.StrictMode>)/,
            `<React.StrictMode>\n    <ThemeProvider theme="${name}" mode="light" forceConfig={true}>\n      <App />\n    </ThemeProvider>\n  </React.StrictMode>`
          );
          console.log(`✅ Added ThemeProvider with theme "${name}" to main.tsx`);
          updated = true;
        }
      }

      // Write updated content if changes were made
      if (updated) {
        await fs.writeFile(mainTsxPath, mainContent);
      }

    } catch (error) {
      console.log(`⚠️  Could not auto-update main.tsx: ${error.message}`);
    }

    console.log(`\n🎨 Next steps:`);
    console.log(`   1. Customize colors in ${relativePath}`);
    console.log(`   2. Run "npx uikit bundle" to generate CSS`);
    console.log(`\n🎉 Theme "${name}" is now active!`);

  } catch (error) {
    console.error(`❌ Failed to generate theme: ${error.message}`);
    throw error;
  }
}

/**
 * Generate theme file from template with proper variable replacement
 */
async function generateThemeFromTemplate(templatesPath, templateFile, outputPath, outputFile, themeName, options) {
  try {
    // Read template file
    const templatePath = path.join(templatesPath, templateFile);
    const templateContent = await fs.readFile(templatePath, 'utf8');

    // Get project name from package.json
    const currentDir = process.cwd();
    const packageJsonPath = path.join(currentDir, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
    const projectName = packageJson.name || 'my-uikit-project';

    // Determine theme
    const theme = options && options.theme || 'base';

    // Create theme name variations
    const ThemeName = themeName.charAt(0).toUpperCase() + themeName.slice(1);

    // Replace template variables
    const processedContent = templateContent
      .replace(/\{\{themeName\}\}/g, themeName)
      .replace(/\{\{ThemeName\}\}/g, ThemeName)
      .replace(/\{\{projectName\}\}/g, projectName)
      .replace(/\{\{theme\}\}/g, theme);

    // Write output file
    const outputFilePath = path.join(outputPath, outputFile);
    await fs.writeFile(outputFilePath, processedContent, 'utf8');
  } catch (error) {
    console.error(`❌ Failed to generate ${outputFile} from template ${templateFile}:`, error.message);
    throw error;
  }
}
