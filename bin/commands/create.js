/**
 * @fileoverview UIKit Create Command - Project scaffolding
 * @description Creates new UIKit projects from templates
 * @package @bloomneo/uikit
 */

import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Create a new UIKit project
 */
export async function createProject(name, options) {
  const isCurrentDir = name === '.';
  const displayName = isCurrentDir ? 'current directory' : `"${name}"`;
  console.log(`🎨 Creating UIKit project in ${displayName}...\n`);

  try {
    // Determine template type
    const templateType = options.spa ? 'spa' : options.multi ? 'multi' : options.fbca ? 'fbca' : 'single';

    let projectPath;

    if (isCurrentDir) {
      // Use current directory
      projectPath = process.cwd();
      console.log(`✅ Using current directory`);
    } else {
      // Validate project name
      if (!name || !/^[a-zA-Z0-9-_]+$/.test(name)) {
        console.error('❌ Invalid project name. Use only letters, numbers, hyphens, and underscores.');
        process.exit(1);
      }

      // Check if directory exists
      projectPath = path.resolve(process.cwd(), name);
      try {
        await fs.access(projectPath);
        console.error(`❌ Directory "${name}" already exists.`);
        process.exit(1);
      } catch {
        // Directory doesn't exist, good to proceed
      }

      // Create project directory
      await fs.mkdir(projectPath, { recursive: true });
      console.log(`✅ Created ${name}/`);
    }

    // Generate project files based on template
    await generateTemplate(projectPath, templateType, options, isCurrentDir);

    // All templates now handle their own config files, package.json, and README.md

    // Generate .gitignore file
    await generateGitignore(projectPath);

    console.log('✅ Generated project files');

    // Install dependencies
    console.log('\n📦 Installing dependencies...');
    await installDependencies(projectPath);
    console.log('✅ Installed dependencies');

    // Success message
    console.log(`\n🎉 Successfully created "${name}"!`);
    console.log('\n🚀 Next steps:');
    console.log(`  cd ${name}`);
    console.log('  npx uikit serve');
    console.log('\n💡 Or run individual commands:');
    console.log('  npx uikit bundle    # Bundle themes');
    console.log('  npx uikit serve     # Start dev server');
    console.log('  npx uikit build     # Production build');

  } catch (error) {
    console.error('❌ Failed to create project:', error.message);
    process.exit(1);
  }
}

/**
 * Generate template files based on type
 */
async function generateTemplate(projectPath, templateType, options, isCurrentDir = false) {
  const srcPath = path.join(projectPath, 'src');
  await fs.mkdir(srcPath, { recursive: true });

  switch (templateType) {
    case 'single':
      await generateSinglePageTemplate(srcPath, options.theme, isCurrentDir);
      break;
    case 'spa':
      await generateSPATemplate(srcPath, options.theme, isCurrentDir);
      break;
    case 'multi':
      await generateMultiPageTemplate(srcPath, options.theme, isCurrentDir);
      break;
    case 'fbca':
      await generateFBCATemplate(srcPath, options.theme, isCurrentDir);
      break;
  }
}

/**
 * Generate single-page theme showcase template
 */
async function generateSinglePageTemplate(srcPath, theme = 'base', isCurrentDir = false) {
  const templatesPath = path.join(__dirname, '../templates/single');
  const projectName = path.basename(path.dirname(srcPath));

  // Read and process App.tsx template
  const appTemplate = await fs.readFile(path.join(templatesPath, 'src/App.tsx.template'), 'utf8');
  await fs.writeFile(path.join(srcPath, 'App.tsx'), appTemplate);

  // Read and process main.tsx template
  const mainTemplate = await fs.readFile(path.join(templatesPath, 'src/main.tsx.template'), 'utf8');
  const mainContent = mainTemplate.replace(/{{THEME}}/g, theme);
  await fs.writeFile(path.join(srcPath, 'main.tsx'), mainContent);

  // Read and copy index.css template
  const cssTemplate = await fs.readFile(path.join(templatesPath, 'src/index.css.template'), 'utf8');
  await fs.writeFile(path.join(srcPath, 'index.css'), cssTemplate);

  // Copy utils folder
  const utilsPath = path.join(srcPath, 'utils');
  await fs.mkdir(utilsPath, { recursive: true });
  const assetUtilTemplate = await fs.readFile(path.join(templatesPath, 'src/utils/asset.ts'), 'utf8');
  await fs.writeFile(path.join(utilsPath, 'asset.ts'), assetUtilTemplate);

  // Read and process index.html template
  const indexTemplate = await fs.readFile(path.join(templatesPath, 'index.html.template'), 'utf8');
  const indexContent = indexTemplate.replace(/{{PROJECT_NAME}}/g, projectName);
  await fs.writeFile(path.join(srcPath, '../index.html'), indexContent);

  // Copy public assets
  const publicTargetPath = path.join(srcPath, '../public');
  await fs.mkdir(publicTargetPath, { recursive: true });

  try {
    // Copy favicon.svg
    const faviconSourcePath = path.join(templatesPath, 'public/favicon.svg');
    await fs.copyFile(faviconSourcePath, path.join(publicTargetPath, 'favicon.svg'));

    // Copy hero.svg if it exists
    const heroSourcePath = path.join(templatesPath, 'public/hero.svg');
    await fs.copyFile(heroSourcePath, path.join(publicTargetPath, 'hero.svg'));
  } catch (error) {
    // Assets don't exist, skip copying
  }


  // Copy documentation
  const docsSourcePath = path.join(templatesPath, 'docs');
  const docsTargetPath = path.join(srcPath, '../docs');
  try {
    await fs.access(docsSourcePath);
    await fs.mkdir(docsTargetPath, { recursive: true });
    const docsFiles = await fs.readdir(docsSourcePath);
    for (const file of docsFiles) {
      await fs.copyFile(path.join(docsSourcePath, file), path.join(docsTargetPath, file));
    }
  } catch (error) {
    // Docs directory doesn't exist, skip copying
  }

  // Copy agent entrypoints (.claude/skills/bloomneo-uikit/*)
  const claudeSourcePath = path.join(templatesPath, '.claude');
  const claudeTargetPath = path.join(srcPath, '../.claude');
  try {
    await fs.access(claudeSourcePath);
    await fs.cp(claudeSourcePath, claudeTargetPath, { recursive: true });
  } catch (error) {
    // .claude directory doesn't exist, skip copying
  }

  // Copy config files
  const projectPath = path.dirname(srcPath);

  // Copy vite.config.ts
  const viteConfigTemplate = await fs.readFile(path.join(templatesPath, 'vite.config.ts.template'), 'utf8');
  await fs.writeFile(path.join(projectPath, 'vite.config.ts'), viteConfigTemplate);

  // Copy tsconfig.json
  const tsConfigTemplate = await fs.readFile(path.join(templatesPath, 'tsconfig.json'), 'utf8');
  await fs.writeFile(path.join(projectPath, 'tsconfig.json'), tsConfigTemplate);

  // Copy tsconfig.node.json
  const tsNodeConfigTemplate = await fs.readFile(path.join(templatesPath, 'tsconfig.node.json'), 'utf8');
  await fs.writeFile(path.join(projectPath, 'tsconfig.node.json'), tsNodeConfigTemplate);

  // Copy package.json
  const packageTemplate = await fs.readFile(path.join(templatesPath, 'package.json.template'), 'utf8');
  const packageContent = packageTemplate.replace(/{{PROJECT_NAME}}/g, projectName);
  await fs.writeFile(path.join(projectPath, 'package.json'), packageContent);

  // Copy README.md
  const readmeTemplate = await fs.readFile(path.join(templatesPath, 'README.md.template'), 'utf8');
  const readmeContent = readmeTemplate.replace(/{{PROJECT_NAME}}/g, projectName);
  await fs.writeFile(path.join(projectPath, 'README.md'), readmeContent);

}

/**
 * Generate SPA template with routing
 */
async function generateSPATemplate(srcPath, theme = 'base', isCurrentDir = false) {
  const templatesPath = path.join(__dirname, '../templates/spa');

  // Copy src folder structure recursively
  const srcTemplatePath = path.join(templatesPath, 'src');
  try {
    await fs.access(srcTemplatePath);
    const entries = await fs.readdir(srcTemplatePath, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = path.join(srcTemplatePath, entry.name);
      const targetPath = path.join(srcPath, entry.name);

      if (entry.isDirectory()) {
        // Copy directory recursively
        await fs.mkdir(targetPath, { recursive: true });
        const dirFiles = await fs.readdir(sourcePath);
        for (const file of dirFiles) {
          const sourceFile = path.join(sourcePath, file);
          const targetFile = path.join(targetPath, file);
          if (file.endsWith('.template')) {
            const content = await fs.readFile(sourceFile, 'utf8');
            const processedContent = content.replace(/{{THEME}}/g, theme);
            await fs.writeFile(targetFile.replace('.template', ''), processedContent);
          } else {
            await fs.copyFile(sourceFile, targetFile);
          }
        }
      } else if (entry.name.endsWith('.template')) {
        // Process template file
        const template = await fs.readFile(sourcePath, 'utf8');
        const content = template.replace(/{{THEME}}/g, theme);
        await fs.writeFile(targetPath.replace('.template', ''), content);
      } else {
        // Copy non-template files as-is
        await fs.copyFile(sourcePath, targetPath);
      }
    }
  } catch (error) {
    console.warn('⚠️  No src folder found in SPA template, using legacy file structure');

    // Fallback to old method if src folder doesn't exist
    const appTemplate = await fs.readFile(path.join(templatesPath, 'App.tsx.template'), 'utf8');
    const appContent = appTemplate.replace(/{{THEME}}/g, theme);
    await fs.writeFile(path.join(srcPath, 'App.tsx'), appContent);

    const mainTemplate = await fs.readFile(path.join(templatesPath, 'main.tsx.template'), 'utf8');
    await fs.writeFile(path.join(srcPath, 'main.tsx'), mainTemplate);

    const cssTemplate = await fs.readFile(path.join(templatesPath, 'index.css.template'), 'utf8');
    await fs.writeFile(path.join(srcPath, 'index.css'), cssTemplate);
  }

  // Read and copy index.html template
  const indexTemplate = await fs.readFile(path.join(templatesPath, 'index.html.template'), 'utf8');
  await fs.writeFile(path.join(srcPath, '../index.html'), indexTemplate);

  // Copy public assets
  const publicSourcePath = path.join(templatesPath, 'public');
  const publicTargetPath = path.join(srcPath, '../public');
  try {
    await fs.access(publicSourcePath);
    await fs.mkdir(publicTargetPath, { recursive: true });
    const publicFiles = await fs.readdir(publicSourcePath);
    for (const file of publicFiles) {
      await fs.copyFile(path.join(publicSourcePath, file), path.join(publicTargetPath, file));
    }
  } catch (error) {
    // Public directory doesn't exist, skip copying
  }

  // Copy documentation
  const docsSourcePath = path.join(templatesPath, 'docs');
  const docsTargetPath = path.join(srcPath, '../docs');
  try {
    await fs.access(docsSourcePath);
    await fs.mkdir(docsTargetPath, { recursive: true });
    const docsFiles = await fs.readdir(docsSourcePath);
    for (const file of docsFiles) {
      await fs.copyFile(path.join(docsSourcePath, file), path.join(docsTargetPath, file));
    }
  } catch (error) {
    // Docs directory doesn't exist, skip copying
  }

  // Copy agent entrypoints (.claude/skills/bloomneo-uikit/*)
  const claudeSourcePath = path.join(templatesPath, '.claude');
  const claudeTargetPath = path.join(srcPath, '../.claude');
  try {
    await fs.access(claudeSourcePath);
    await fs.cp(claudeSourcePath, claudeTargetPath, { recursive: true });
  } catch (error) {
    // .claude directory doesn't exist, skip copying
  }

  // Copy hooks directory
  const hooksSourcePath = path.join(templatesPath, 'hooks');
  const hooksTargetPath = path.join(srcPath, 'hooks');
  try {
    await fs.access(hooksSourcePath);
    await fs.mkdir(hooksTargetPath, { recursive: true });
    const hookFiles = await fs.readdir(hooksSourcePath);
    for (const file of hookFiles) {
      const content = await fs.readFile(path.join(hooksSourcePath, file), 'utf8');
      const targetFile = file.replace('.template', '');
      await fs.writeFile(path.join(hooksTargetPath, targetFile), content);
    }
  } catch (error) {
    // Hooks directory doesn't exist, skip copying
  }

  // Copy components directory
  const componentsSourcePath = path.join(templatesPath, 'components');
  const componentsTargetPath = path.join(srcPath, 'components');
  try {
    await fs.access(componentsSourcePath);
    await fs.mkdir(componentsTargetPath, { recursive: true });
    const componentFiles = await fs.readdir(componentsSourcePath);
    for (const file of componentFiles) {
      const content = await fs.readFile(path.join(componentsSourcePath, file), 'utf8');
      const targetFile = file.replace('.template', '');
      await fs.writeFile(path.join(componentsTargetPath, targetFile), content);
    }
  } catch (error) {
    // Components directory doesn't exist, skip copying
  }

  // Copy config files
  const projectPath = path.dirname(srcPath);
  const projectName = path.basename(projectPath);

  // Copy vite.config.ts
  const viteConfigTemplate = await fs.readFile(path.join(templatesPath, 'vite.config.ts.template'), 'utf8');
  await fs.writeFile(path.join(projectPath, 'vite.config.ts'), viteConfigTemplate);

  // Copy tsconfig.json
  const tsConfigTemplate = await fs.readFile(path.join(templatesPath, 'tsconfig.json.template'), 'utf8');
  await fs.writeFile(path.join(projectPath, 'tsconfig.json'), tsConfigTemplate);

  // Copy tsconfig.node.json
  const tsNodeConfigTemplate = await fs.readFile(path.join(templatesPath, 'tsconfig.node.json'), 'utf8');
  await fs.writeFile(path.join(projectPath, 'tsconfig.node.json'), tsNodeConfigTemplate);

  // Copy package.json
  const packageTemplate = await fs.readFile(path.join(templatesPath, 'package.json.template'), 'utf8');
  const packageContent = packageTemplate.replace(/{{PROJECT_NAME}}/g, projectName);
  await fs.writeFile(path.join(projectPath, 'package.json'), packageContent);

  // Copy README.md
  const readmeTemplate = await fs.readFile(path.join(templatesPath, 'README.md.template'), 'utf8');
  const readmeContent = readmeTemplate.replace(/{{PROJECT_NAME}}/g, projectName);
  await fs.writeFile(path.join(projectPath, 'README.md'), readmeContent);

  console.log('✅ Generated SPA template with React Router navigation');
}

/**
 * Generate multi-page template
 */
async function generateMultiPageTemplate(srcPath, theme = 'elegant', isCurrentDir = false) {
  const templatesPath = path.join(__dirname, '../templates/multi');
  const projectName = path.basename(path.dirname(srcPath));

  // Helper function to recursively copy directory structure
  async function copyDirectory(sourceDir, targetDir) {
    await fs.mkdir(targetDir, { recursive: true });
    const entries = await fs.readdir(sourceDir, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = path.join(sourceDir, entry.name);
      const targetPath = path.join(targetDir, entry.name);

      if (entry.isDirectory()) {
        await copyDirectory(sourcePath, targetPath);
      } else if (entry.name.endsWith('.template')) {
        // Process template file
        const template = await fs.readFile(sourcePath, 'utf8');
        const content = template
          .replace(/{{DEFAULT_THEME}}/g, theme)
          .replace(/{{DEFAULT_MODE}}/g, 'light')
          .replace(/{{PROJECT_NAME}}/g, projectName)
          .replace(/{{CURRENT_YEAR}}/g, new Date().getFullYear().toString())
          .replace(/{{THEME}}/g, theme);

        const outputFileName = entry.name.replace('.template', '');
        await fs.writeFile(targetPath.replace('.template', ''), content);
      } else {
        // Copy non-template files as-is
        await fs.copyFile(sourcePath, targetPath);
      }
    }
  }

  // Copy src folder structure recursively
  const srcTemplatePath = path.join(templatesPath, 'src');
  try {
    await fs.access(srcTemplatePath);
    await copyDirectory(srcTemplatePath, srcPath);
  } catch (error) {
    console.warn('⚠️  No src folder found in multi template, using legacy file structure');

    // Fallback to old method if src folder doesn't exist
    const appTemplate = await fs.readFile(path.join(templatesPath, 'App.tsx.template'), 'utf8');
    const appContent = appTemplate
      .replace(/{{DEFAULT_THEME}}/g, theme)
      .replace(/{{DEFAULT_MODE}}/g, 'light');
    await fs.writeFile(path.join(srcPath, 'App.tsx'), appContent);

    const routerTemplate = await fs.readFile(path.join(templatesPath, 'router.tsx.template'), 'utf8');
    await fs.writeFile(path.join(srcPath, 'router.tsx'), routerTemplate);

    const mainTemplate = await fs.readFile(path.join(templatesPath, 'main.tsx.template'), 'utf8');
    await fs.writeFile(path.join(srcPath, 'main.tsx'), mainTemplate);

    const cssTemplate = await fs.readFile(path.join(templatesPath, 'index.css.template'), 'utf8');
    await fs.writeFile(path.join(srcPath, 'index.css'), cssTemplate);

    // Create pages directory and copy all page templates
    const pagesPath = path.join(srcPath, 'pages');
    await fs.mkdir(pagesPath, { recursive: true });

    const pageFiles = ['Home.tsx.template', 'Components.tsx.template', 'Themes.tsx.template', 'About.tsx.template', 'Contact.tsx.template', 'Login.tsx.template', 'Dashboard.tsx.template', 'ErrorPage.tsx.template'];

    for (const pageFile of pageFiles) {
      const pageTemplate = await fs.readFile(path.join(templatesPath, 'pages', pageFile), 'utf8');
      const pageContent = pageTemplate.replace(/{{THEME}}/g, theme);
      const outputFileName = pageFile.replace('.template', '');
      await fs.writeFile(path.join(pagesPath, outputFileName), pageContent);
    }

    // Create components directory and copy header/footer components
    const componentsPath = path.join(srcPath, 'components');
    await fs.mkdir(componentsPath, { recursive: true });

    const componentFiles = ['Header.tsx.template', 'Footer.tsx.template', 'SEO.tsx.template', 'index.ts.template'];

    for (const componentFile of componentFiles) {
      try {
        const componentTemplate = await fs.readFile(path.join(templatesPath, 'components', componentFile), 'utf8');
        const componentContent = componentTemplate
          .replace(/{{PROJECT_NAME}}/g, projectName)
          .replace(/{{CURRENT_YEAR}}/g, new Date().getFullYear().toString())
          .replace(/{{THEME}}/g, theme);
        const outputFileName = componentFile.replace('.template', '');
        await fs.writeFile(path.join(componentsPath, outputFileName), componentContent);
      } catch (error) {
        console.warn(`⚠️ Warning: Could not find component template ${componentFile}`);
      }
    }
  }

  // Copy index.html template
  const indexTemplate = await fs.readFile(path.join(templatesPath, 'index.html.template'), 'utf8');
  await fs.writeFile(path.join(srcPath, '../index.html'), indexTemplate);

  // Copy public assets
  const publicSourcePath = path.join(templatesPath, 'public');
  const publicTargetPath = path.join(srcPath, '../public');
  try {
    await fs.access(publicSourcePath);
    await fs.mkdir(publicTargetPath, { recursive: true });
    const publicFiles = await fs.readdir(publicSourcePath);
    for (const file of publicFiles) {
      await fs.copyFile(path.join(publicSourcePath, file), path.join(publicTargetPath, file));
    }
  } catch (error) {
    // Public directory doesn't exist, skip copying
  }

  // Copy documentation
  const docsSourcePath = path.join(templatesPath, 'docs');
  const docsTargetPath = path.join(srcPath, '../docs');
  try {
    await fs.access(docsSourcePath);
    await fs.mkdir(docsTargetPath, { recursive: true });
    const docsFiles = await fs.readdir(docsSourcePath);
    for (const file of docsFiles) {
      await fs.copyFile(path.join(docsSourcePath, file), path.join(docsTargetPath, file));
    }
  } catch (error) {
    // Docs directory doesn't exist, skip copying
  }

  // Copy agent entrypoints (.claude/skills/bloomneo-uikit/*)
  const claudeSourcePath = path.join(templatesPath, '.claude');
  const claudeTargetPath = path.join(srcPath, '../.claude');
  try {
    await fs.access(claudeSourcePath);
    await fs.cp(claudeSourcePath, claudeTargetPath, { recursive: true });
  } catch (error) {
    // .claude directory doesn't exist, skip copying
  }

  // Copy hooks directory
  const hooksSourcePath = path.join(templatesPath, 'hooks');
  const hooksTargetPath = path.join(srcPath, 'hooks');
  try {
    await fs.access(hooksSourcePath);
    await fs.mkdir(hooksTargetPath, { recursive: true });
    const hookFiles = await fs.readdir(hooksSourcePath);
    for (const file of hookFiles) {
      const content = await fs.readFile(path.join(hooksSourcePath, file), 'utf8');
      const targetFile = file.replace('.template', '');
      await fs.writeFile(path.join(hooksTargetPath, targetFile), content);
    }
  } catch (error) {
    // Hooks directory doesn't exist, skip copying
  }

  // Copy config files
  const projectPath = path.dirname(srcPath);

  // Copy vite.config.ts
  const viteConfigTemplate = await fs.readFile(path.join(templatesPath, 'vite.config.ts.template'), 'utf8');
  await fs.writeFile(path.join(projectPath, 'vite.config.ts'), viteConfigTemplate);

  // Copy tsconfig.json
  const tsConfigTemplate = await fs.readFile(path.join(templatesPath, 'tsconfig.json.template'), 'utf8');
  await fs.writeFile(path.join(projectPath, 'tsconfig.json'), tsConfigTemplate);

  // Copy tsconfig.node.json
  const tsNodeConfigTemplate = await fs.readFile(path.join(templatesPath, 'tsconfig.node.json'), 'utf8');
  await fs.writeFile(path.join(projectPath, 'tsconfig.node.json'), tsNodeConfigTemplate);

  // Copy package.json
  const packageTemplate = await fs.readFile(path.join(templatesPath, 'package.json.template'), 'utf8');
  const packageContent = packageTemplate.replace(/{{PROJECT_NAME}}/g, projectName);
  await fs.writeFile(path.join(projectPath, 'package.json'), packageContent);

  // Copy README.md
  const readmeTemplate = await fs.readFile(path.join(templatesPath, 'README.md.template'), 'utf8');
  const readmeContent = readmeTemplate.replace(/{{PROJECT_NAME}}/g, projectName);
  await fs.writeFile(path.join(projectPath, 'README.md'), readmeContent);

  console.log('✅ Generated multi-page template with ultra-simple App.tsx, routing, pages, and configurable components');
}

/**
 * Generate FBCA template with auto-discovery routing
 */
async function generateFBCATemplate(srcPath, theme = 'elegant', isCurrentDir = false) {
  const templatesPath = path.join(__dirname, '../templates/fbca');
  const projectPath = path.dirname(srcPath);  // Get project root instead of src
  const projectName = path.basename(projectPath);

  // Helper function to recursively copy directory structure
  async function copyDirectory(sourceDir, targetDir, excludeDirs = [], excludeFiles = []) {
    await fs.mkdir(targetDir, { recursive: true });
    const entries = await fs.readdir(sourceDir, { withFileTypes: true });

    for (const entry of entries) {
      // Skip excluded directories
      if (entry.isDirectory() && excludeDirs.includes(entry.name)) {
        continue;
      }

      // Skip excluded files
      if (entry.isFile() && excludeFiles.includes(entry.name)) {
        continue;
      }

      const sourcePath = path.join(sourceDir, entry.name);
      const targetPath = path.join(targetDir, entry.name);

      if (entry.isDirectory()) {
        await copyDirectory(sourcePath, targetPath, excludeDirs, excludeFiles);
      } else if (entry.name.endsWith('.template')) {
        // Process template file
        const template = await fs.readFile(sourcePath, 'utf8');
        const content = template
          .replace(/{{DEFAULT_THEME}}/g, theme)
          .replace(/{{DEFAULT_MODE}}/g, 'light')
          .replace(/{{PROJECT_NAME}}/g, projectName)
          .replace(/{{CURRENT_YEAR}}/g, new Date().getFullYear().toString())
          .replace(/{{THEME}}/g, theme);

        const outputFileName = entry.name.replace('.template', '');
        await fs.writeFile(targetPath.replace('.template', ''), content);
      } else {
        // Copy non-template files as-is
        await fs.copyFile(sourcePath, targetPath);
      }
    }
  }

  // First, copy root-level config files directly to project root
  let rootConfigFiles = [
    'package.json.template',
    'tsconfig.json.template',
    'tsconfig.node.json.template',
    'vite.config.ts.template'
  ];

  // Handle package.json for current directory
  if (isCurrentDir) {
    const packageJsonPath = path.join(projectPath, 'package.json');
    try {
      await fs.access(packageJsonPath);
      // package.json exists, skip it from rootConfigFiles and update it separately
      rootConfigFiles = rootConfigFiles.filter(file => file !== 'package.json.template');
      console.log('🔄 Updating existing package.json with UIKit dependencies and scripts');
      await updateExistingPackageJson(projectPath, templatesPath, theme, projectName);
    } catch {
      // package.json doesn't exist, keep it in rootConfigFiles so it gets created
      console.log('📦 Creating package.json from template (no existing file found)');
    }
  }

  for (const configFile of rootConfigFiles) {
    try {
      const sourcePath = path.join(templatesPath, configFile);
      const template = await fs.readFile(sourcePath, 'utf8');
      const content = template
        .replace(/{{DEFAULT_THEME}}/g, theme)
        .replace(/{{DEFAULT_MODE}}/g, 'light')
        .replace(/{{PROJECT_NAME}}/g, projectName);

      const outputFileName = configFile.replace('.template', '');
      await fs.writeFile(path.join(projectPath, outputFileName), content);
    } catch (error) {
      console.warn(`⚠️ Warning: Could not copy root config file ${configFile}`);
    }
  }

  // Copy the web directory contents to src/web, excluding root config files
  const webTemplatesPath = path.join(templatesPath, 'src', 'web');
  const webTargetPath = path.join(srcPath, 'web');
  try {
    await copyDirectory(webTemplatesPath, webTargetPath, ['docs'], rootConfigFiles);

    // index.html stays in src/web - it's handled by copyDirectory above
  } catch (error) {
    console.warn('⚠️ Warning: Could not copy web directory structure');
  }

  // Copy the api directory if it exists
  const apiTemplatesPath = path.join(templatesPath, 'src', 'api');
  const apiTargetPath = path.join(srcPath, 'api');
  try {
    await fs.access(apiTemplatesPath);
    await copyDirectory(apiTemplatesPath, apiTargetPath);
  } catch (error) {
    // API directory doesn't exist, skip copying
  }

  // Copy public directory if it exists
  const publicSourcePath = path.join(templatesPath, 'public');
  const publicTargetPath = path.join(projectPath, 'public');
  try {
    await fs.access(publicSourcePath);
    await copyDirectory(publicSourcePath, publicTargetPath);
  } catch (error) {
    // Public directory doesn't exist, skip copying
  }

  // Copy documentation to project root
  const docsSourcePath = path.join(templatesPath, 'docs');
  const docsTargetPath = path.join(projectPath, 'docs');
  try {
    await fs.access(docsSourcePath);
    await fs.mkdir(docsTargetPath, { recursive: true });
    const docsFiles = await fs.readdir(docsSourcePath);
    for (const file of docsFiles) {
      await fs.copyFile(path.join(docsSourcePath, file), path.join(docsTargetPath, file));
    }
  } catch (error) {
    // Docs directory doesn't exist, skip copying
  }

  // Copy agent entrypoints (.claude/skills/bloomneo-uikit/*) to project root
  const claudeSourcePath = path.join(templatesPath, '.claude');
  const claudeTargetPath = path.join(projectPath, '.claude');
  try {
    await fs.access(claudeSourcePath);
    await fs.cp(claudeSourcePath, claudeTargetPath, { recursive: true });
  } catch (error) {
    // .claude directory doesn't exist, skip copying
  }

  console.log('✅ Generated FBCA template with auto-discovery routing, feature organization, and SEO support');
}

/**
 * Update existing package.json with UIKit dependencies and scripts
 */
async function updateExistingPackageJson(projectPath, templatesPath, theme, projectName) {
  const packageJsonPath = path.join(projectPath, 'package.json');
  const templatePath = path.join(templatesPath, 'package.json.template');

  try {
    // Read existing package.json
    const existingPackage = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));

    // Read template package.json
    const templateContent = await fs.readFile(templatePath, 'utf8');
    const templatePackage = JSON.parse(templateContent
      .replace(/{{DEFAULT_THEME}}/g, theme)
      .replace(/{{DEFAULT_MODE}}/g, 'light')
      .replace(/{{PROJECT_NAME}}/g, projectName));

    // Merge dependencies (only add missing ones)
    if (!existingPackage.dependencies) existingPackage.dependencies = {};
    if (!existingPackage.devDependencies) existingPackage.devDependencies = {};
    if (!existingPackage.scripts) existingPackage.scripts = {};

    // Add missing dependencies
    for (const [dep, version] of Object.entries(templatePackage.dependencies || {})) {
      if (!existingPackage.dependencies[dep]) {
        existingPackage.dependencies[dep] = version;
      }
    }

    // Add missing devDependencies
    for (const [dep, version] of Object.entries(templatePackage.devDependencies || {})) {
      if (!existingPackage.devDependencies[dep]) {
        existingPackage.devDependencies[dep] = version;
      }
    }

    // Add missing scripts
    for (const [script, command] of Object.entries(templatePackage.scripts || {})) {
      if (!existingPackage.scripts[script]) {
        existingPackage.scripts[script] = command;
      }
    }

    // Ensure type: "module" is set (override if needed)
    existingPackage.type = 'module';

    // Write updated package.json
    await fs.writeFile(packageJsonPath, JSON.stringify(existingPackage, null, 2) + '\n');
    console.log('✅ Updated package.json with UIKit dependencies and scripts');

  } catch (error) {
    console.warn('⚠️ Warning: Could not update package.json:', error.message);
  }
}

/**
 * Generate .gitignore file for new projects
 */
async function generateGitignore(projectPath) {
  // Always generate .gitignore (moved outside try/catch to ensure it runs)
  console.log('🔧 Generating .gitignore...');

  // Read .gitignore template from shared templates directory
  try {
    const gitignoreTemplatePath = path.join(__dirname, '../templates/.gitignore');
    const gitignoreContent = await fs.readFile(gitignoreTemplatePath, 'utf8');
    await fs.writeFile(path.join(projectPath, '.gitignore'), gitignoreContent);
  } catch (error) {
    console.warn('⚠️ Warning: Could not copy .gitignore template, using fallback');

    // Fallback to minimal .gitignore if template is not available
    const fallbackGitignore = `# Dependencies
node_modules/

# Build outputs
dist/
build/

# Environment variables
.env
.env.local

# Logs
*.log

# IDE files
.vscode/
.idea/
.DS_Store
`;
    await fs.writeFile(path.join(projectPath, '.gitignore'), fallbackGitignore);
  }
}

/**
 * Install dependencies using npm
 */
async function installDependencies(projectPath) {
  return new Promise((resolve, reject) => {
    const npm = spawn('npm', ['install'], {
      cwd: projectPath,
      stdio: 'pipe'
    });

    npm.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`npm install failed with code ${code}`));
      }
    });

    npm.on('error', reject);
  });
}