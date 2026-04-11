/**
 * @fileoverview UIKit Serve Command - Development server management
 * @description Smart Vite server with port management and process cleanup
 * @package @bloomneo/uikit
 */

import { spawn, exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

/**
 * Start development server with smart port management
 */
export async function startServer(options) {
  console.log('🚀 UIKit Development Server\n');

  try {
    // Check if we're in a valid project
    await validateProject();

    // Handle port management
    const port = parseInt(options.port) || 5173;
    
    if (options.restart) {
      console.log('🔄 Cleaning up existing processes...');
      await killProcessOnPort(port);
    }

    const availablePort = await findAvailablePort(port);
    
    if (availablePort !== port) {
      console.log(`⚡ Port ${port} in use, using port ${availablePort}`);
    }

    // Bundle themes first
    console.log('🎨 Bundling themes...');
    await bundleThemesIfNeeded();

    // Start Vite server
    console.log(`✅ Starting server on http://localhost:${availablePort}\n`);
    
    const viteArgs = [
      'vite',
      '--port', availablePort.toString(),
      '--host', '0.0.0.0'
    ];

    if (options.open) {
      viteArgs.push('--open');
    }

    const viteProcess = spawn('npx', viteArgs, {
      stdio: 'inherit',
      cwd: process.cwd(),
      env: { ...process.env, FORCE_COLOR: '1' }
    });

    // Handle process termination
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down server...');
      viteProcess.kill();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      viteProcess.kill();
      process.exit(0);
    });

    viteProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`❌ Server exited with code ${code}`);
        process.exit(code);
      }
    });

    viteProcess.on('error', (error) => {
      console.error('❌ Failed to start server:', error.message);
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Serve command failed:', error.message);
    process.exit(1);
  }
}

/**
 * Validate that we're in a valid UIKit project
 */
async function validateProject() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const indexHtmlPath = path.join(process.cwd(), 'index.html');
  const fbcaIndexHtmlPath = path.join(process.cwd(), 'src/web/index.html');

  if (!fs.existsSync(packageJsonPath)) {
    throw new Error('No package.json found. Run this command in a project directory.');
  }

  // Check for index.html in standard location or FBCA location
  if (!fs.existsSync(indexHtmlPath) && !fs.existsSync(fbcaIndexHtmlPath)) {
    throw new Error('No index.html found. This doesn\'t appear to be a Vite project.');
  }

  // Check if it's a UIKit project
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const hasUIKit = packageJson.dependencies?.['@bloomneo/uikit'] || 
                     packageJson.devDependencies?.['@bloomneo/uikit'];
    
    if (!hasUIKit) {
      console.log('💡 This project doesn\'t use @bloomneo/uikit. Server will start anyway.');
    }
  } catch (error) {
    // Invalid package.json, but let Vite handle it
  }
}

/**
 * Kill process running on specific port
 */
async function killProcessOnPort(port) {
  try {
    // For Unix/Linux/macOS
    if (process.platform !== 'win32') {
      await execAsync(`lsof -ti:${port} | xargs kill -9`).catch(() => {
        // No process found, which is fine
      });
    } else {
      // For Windows
      await execAsync(`netstat -ano | findstr :${port}`).then(async (result) => {
        const lines = result.stdout.split('\\n');
        for (const line of lines) {
          const match = line.match(/\\s+(\\d+)$/);
          if (match) {
            const pid = match[1];
            await execAsync(`taskkill /F /PID ${pid}`).catch(() => {
              // Process might already be dead
            });
          }
        }
      }).catch(() => {
        // No process found
      });
    }
  } catch (error) {
    // Ignore errors in process cleanup
  }
}

/**
 * Find available port starting from the given port
 */
async function findAvailablePort(startPort) {
  for (let port = startPort; port <= startPort + 10; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available ports found starting from ${startPort}`);
}

/**
 * Check if port is available
 */
async function isPortAvailable(port) {
  try {
    if (process.platform !== 'win32') {
      const result = await execAsync(`lsof -i:${port}`);
      return false; // Port is in use
    } else {
      const result = await execAsync(`netstat -an | findstr :${port}`);
      return false; // Port is in use
    }
  } catch (error) {
    return true; // Port is available (command failed = no process using it)
  }
}

/**
 * Bundle themes if theme files exist
 */
async function bundleThemesIfNeeded() {
  const themeDirs = [
    'src/themes/presets',
    'src/web/assets/themes/presets',
    'themes/presets'
  ];

  let hasThemes = false;
  for (const dir of themeDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => 
        f.endsWith('.js') || f.endsWith('.ts')
      );
      if (files.length > 0) {
        hasThemes = true;
        break;
      }
    }
  }

  if (hasThemes) {
    try {
      // Import and run bundle command
      const { bundleThemes } = await import('./bundle.js');
      await bundleThemes({ output: 'src/styles/globals.css' });
      console.log('✅ Themes bundled successfully');
    } catch (error) {
      console.log('⚠️  Theme bundling failed, continuing without themes:', error.message);
    }
  }
}