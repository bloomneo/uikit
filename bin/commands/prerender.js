/**
 * @fileoverview Pre-rendering command for generating static HTML pages
 * @description Uses Puppeteer to render SPA routes for SEO optimization
 * @package @voilajsx/uikit
 * @file /bin/commands/prerender.js
 */

import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Check if puppeteer is installed
 */
async function checkPuppeteer() {
  try {
    const puppeteer = await import('puppeteer');
    return puppeteer.default;
  } catch (error) {
    console.error('\n❌ Puppeteer is required for pre-rendering but not installed.\n');
    console.log('Install it with:');
    console.log('  npm install puppeteer\n');
    console.log('Or with pnpm:');
    console.log('  pnpm add puppeteer\n');
    process.exit(1);
  }
}

/**
 * Pre-render SPA routes to static HTML for SEO
 * @param {Object} options - Command options
 * @param {string} options.dist - Distribution directory (default: 'dist')
 * @param {number} options.port - Server port (default: 4567)
 * @param {string} options.routes - Comma-separated routes or 'auto'
 * @param {string} options.config - Path to SEO config JSON file
 * @param {string} options.baseUrl - Base URL for canonical links
 */
export async function prerenderPages(options = {}) {
  const cwd = process.cwd();
  const distDir = join(cwd, options.dist || 'dist');
  const port = parseInt(options.port) || 4567;
  const baseUrl = options.baseUrl || '';

  console.log('\n🚀 UIKit Pre-render\n');

  // Check if dist exists
  if (!existsSync(distDir)) {
    console.error('❌ Error: dist folder not found. Run "npm run build" first.');
    process.exit(1);
  }

  // Load SEO config if provided
  let seoConfig = {};
  const configPath = join(cwd, options.config || 'seo.config.json');
  if (existsSync(configPath)) {
    try {
      seoConfig = JSON.parse(readFileSync(configPath, 'utf8'));
      console.log(`📋 Loaded SEO config from ${options.config || 'seo.config.json'}`);
    } catch (e) {
      console.log('⚠️  No SEO config found, using defaults');
    }
  }

  // Determine routes to render
  let routes = ['/'];
  if (options.routes && options.routes !== 'auto') {
    routes = options.routes.split(',').map(r => r.trim());
  } else if (seoConfig.routes) {
    routes = Object.keys(seoConfig.routes);
  }

  console.log(`📁 Dist: ${distDir}`);
  console.log(`🔗 Routes: ${routes.join(', ')}\n`);

  // Check for puppeteer
  const puppeteer = await checkPuppeteer();

  // Start static server
  const server = await createStaticServer(distDir, port);
  const serverUrl = `http://localhost:${server.address().port}`;

  // Launch browser
  console.log('🌐 Launching browser...\n');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let successCount = 0;
  let failCount = 0;

  // Render each route
  for (const route of routes) {
    const html = await renderRoute(browser, route, serverUrl);

    if (html) {
      const seo = seoConfig.routes?.[route] || {};
      saveHtml(route, html, distDir, seo, baseUrl);
      successCount++;
    } else {
      failCount++;
    }
  }

  // Cleanup
  await browser.close();
  server.close();

  console.log('\n📊 Pre-render complete!');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📁 Output: ${distDir}\n`);

  if (successCount > 0) {
    console.log('💡 Tip: Create seo.config.json to customize meta tags per route:');
    console.log(`
{
  "baseUrl": "https://example.com",
  "routes": {
    "/": { "title": "Home", "description": "Welcome to my site" },
    "/about": { "title": "About", "description": "About us" }
  }
}
`);
  }
}

/**
 * Create a simple static file server
 */
function createStaticServer(distDir, port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.mp4': 'video/mp4',
    '.webp': 'image/webp'
  };

  const server = createServer((req, res) => {
    let filePath = join(distDir, req.url === '/' ? '/index.html' : req.url);

    // Handle SPA routing - serve index.html for all non-file routes
    if (!existsSync(filePath) || !filePath.includes('.')) {
      filePath = join(distDir, 'index.html');
    }

    try {
      const content = readFileSync(filePath);
      const ext = filePath.substring(filePath.lastIndexOf('.'));
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch (err) {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise((resolve, reject) => {
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`⚠️  Port ${port} in use, trying ${port + 1}...`);
        server.listen(port + 1, () => {
          console.log(`📦 Static server running at http://localhost:${port + 1}`);
          resolve(server);
        });
      } else {
        reject(err);
      }
    });

    server.listen(port, () => {
      console.log(`📦 Static server running at http://localhost:${port}`);
      resolve(server);
    });
  });
}

/**
 * Render a single route using Puppeteer
 */
async function renderRoute(browser, route, baseUrl) {
  const page = await browser.newPage();
  const url = `${baseUrl}${route}`;

  console.log(`🔄 Rendering: ${route}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for React to mount
    await page.waitForSelector('#root', { timeout: 10000 });

    // Additional wait for any async content
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get the rendered HTML
    const html = await page.content();

    await page.close();
    return html;
  } catch (error) {
    console.error(`❌ Error rendering ${route}:`, error.message);
    await page.close();
    return null;
  }
}

/**
 * Update SEO meta tags in HTML
 */
function updateSeoTags(html, route, seo, baseUrl) {
  if (!seo.title && !seo.description) return html;

  const { title, description } = seo;
  const url = `${baseUrl}${route === '/' ? '' : route}`;

  // Update <title>
  if (title) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  }

  // Update meta description
  if (description) {
    if (html.includes('name="description"')) {
      html = html.replace(
        /<meta name="description" content="[^"]*">/,
        `<meta name="description" content="${description}">`
      );
    } else {
      html = html.replace('</head>', `  <meta name="description" content="${description}">\n  </head>`);
    }
  }

  // Update/add Open Graph tags
  if (title) {
    if (html.includes('og:title')) {
      html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`);
    } else {
      html = html.replace('</head>', `  <meta property="og:title" content="${title}">\n  </head>`);
    }
  }

  if (description) {
    if (html.includes('og:description')) {
      html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${description}">`);
    } else {
      html = html.replace('</head>', `  <meta property="og:description" content="${description}">\n  </head>`);
    }
  }

  // Add/update canonical URL
  if (baseUrl) {
    if (html.includes('rel="canonical"')) {
      html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
    } else {
      html = html.replace('</head>', `  <link rel="canonical" href="${url}">\n  </head>`);
    }

    if (html.includes('og:url')) {
      html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
    } else {
      html = html.replace('</head>', `  <meta property="og:url" content="${url}">\n  </head>`);
    }
  }

  return html;
}

/**
 * Save HTML to file
 */
function saveHtml(route, html, distDir, seo, baseUrl) {
  let filePath;
  if (route === '/') {
    filePath = join(distDir, 'index.html');
  } else {
    // Create directory structure: /about -> /about/index.html
    const dir = join(distDir, route);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    filePath = join(dir, 'index.html');
  }

  // Add pre-rendered marker
  let processedHtml = html.replace(
    '<div id="root">',
    '<div id="root" data-server-rendered="true">'
  );

  // Update SEO tags
  processedHtml = updateSeoTags(processedHtml, route, seo, baseUrl);

  writeFileSync(filePath, processedHtml);
  console.log(`✅ Saved: ${filePath.replace(distDir, '')}`);
}
