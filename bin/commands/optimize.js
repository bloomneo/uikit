/**
 * @fileoverview Image optimization command
 * @description Compresses PNG/JPG images and converts to WebP format
 * @package @voilajsx/uikit
 * @file /bin/commands/optimize.js
 */

import { readdir, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join, extname, basename, dirname } from 'path';

/**
 * Check if sharp is installed
 */
async function checkSharp() {
  try {
    const sharp = await import('sharp');
    return sharp.default;
  } catch (error) {
    console.error('\n❌ Sharp is required for image optimization but not installed.\n');
    console.log('Install it with:');
    console.log('  npm install sharp\n');
    console.log('Or with pnpm:');
    console.log('  pnpm add sharp\n');
    process.exit(1);
  }
}

let sharpModule = null;

/**
 * Optimize images in a directory
 * @param {Object} options - Command options
 * @param {string} options.dir - Directory to scan (default: 'public')
 * @param {number} options.quality - WebP quality 0-100 (default: 80)
 * @param {number} options.maxWidth - Max width in pixels (default: 1200)
 * @param {boolean} options.webpOnly - Only generate WebP, skip PNG fallback
 * @param {boolean} options.keepOriginal - Keep original files (default: true)
 */
export async function optimizeImages(options = {}) {
  const cwd = process.cwd();
  const targetDir = join(cwd, options.dir || 'public');
  const quality = parseInt(options.quality) || 80;
  const maxWidth = parseInt(options.maxWidth) || 1200;
  const webpOnly = options.webpOnly || false;

  console.log('\n🖼️  UIKit Image Optimizer\n');

  // Check if directory exists
  if (!existsSync(targetDir)) {
    console.error(`❌ Error: Directory not found: ${targetDir}`);
    console.log('💡 Tip: Run from project root or specify --dir <path>\n');
    process.exit(1);
  }

  console.log(`📁 Directory: ${targetDir}`);
  console.log(`📊 Settings: Quality=${quality}, MaxWidth=${maxWidth}px`);
  console.log(`🔧 Mode: ${webpOnly ? 'WebP only' : 'WebP + PNG fallback'}\n`);

  // Check for sharp
  sharpModule = await checkSharp();

  // Find all images
  const images = await getImageFiles(targetDir);

  if (images.length === 0) {
    console.log('📭 No PNG/JPG/JPEG images found to optimize.\n');
    return;
  }

  console.log(`Found ${images.length} image(s) to optimize\n`);

  let successCount = 0;
  let totalSavedBytes = 0;

  for (const imagePath of images) {
    const result = await optimizeImage(imagePath, { quality, maxWidth, webpOnly });
    if (result) {
      successCount++;
      totalSavedBytes += result.savedBytes;
    }
  }

  const savedMB = (totalSavedBytes / 1024 / 1024).toFixed(2);

  console.log(`\n✨ Optimization complete!`);
  console.log(`   ✅ Processed: ${successCount}/${images.length} images`);
  console.log(`   💾 Total saved: ${savedMB}MB\n`);

  console.log('📝 Next steps:');
  console.log('   1. Update image references to use .webp files');
  console.log('   2. Add <picture> fallback for older browsers:');
  console.log(`
      <picture>
        <source srcset="image.webp" type="image/webp" />
        <img src="image.png" alt="description" />
      </picture>
`);
  console.log('   3. Delete original large files after verification\n');
}

/**
 * Recursively get all image files in a directory
 */
async function getImageFiles(dir) {
  const files = [];

  try {
    const items = await readdir(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = join(dir, item.name);

      if (item.isDirectory()) {
        // Skip node_modules and hidden directories
        if (!item.name.startsWith('.') && item.name !== 'node_modules') {
          files.push(...await getImageFiles(fullPath));
        }
      } else if (/\.(png|jpg|jpeg)$/i.test(item.name)) {
        // Skip already optimized files
        if (!item.name.includes('-optimized') && !item.name.endsWith('.webp')) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`⚠️  Error reading directory ${dir}:`, error.message);
  }

  return files;
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath, options) {
  const { quality, maxWidth, webpOnly } = options;
  const ext = extname(inputPath).toLowerCase();
  const name = basename(inputPath, ext);
  const dir = dirname(inputPath);
  const webpPath = join(dir, `${name}.webp`);

  try {
    const stats = await stat(inputPath);
    const originalSize = stats.size;
    const sizeMB = (originalSize / 1024 / 1024).toFixed(2);

    console.log(`🔄 Processing: ${basename(inputPath)} (${sizeMB}MB)`);

    // Get image metadata
    const metadata = await sharpModule(inputPath).metadata();

    // Create pipeline with optional resize
    let pipeline = sharpModule(inputPath);
    if (metadata.width > maxWidth) {
      pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
      console.log(`   📐 Resizing: ${metadata.width}px → ${maxWidth}px`);
    }

    // Convert to WebP
    await pipeline
      .webp({ quality })
      .toFile(webpPath);

    const webpStats = await stat(webpPath);
    const webpSizeMB = (webpStats.size / 1024 / 1024).toFixed(2);
    const savings = ((1 - webpStats.size / originalSize) * 100).toFixed(1);

    console.log(`   ✅ WebP: ${name}.webp (${webpSizeMB}MB) - ${savings}% smaller`);

    let totalSaved = originalSize - webpStats.size;

    // Create optimized PNG fallback
    if (!webpOnly) {
      const optimizedPngPath = join(dir, `${name}-optimized.png`);

      await sharpModule(inputPath)
        .resize(maxWidth, null, { withoutEnlargement: true })
        .png({ compressionLevel: 9 })
        .toFile(optimizedPngPath);

      const pngStats = await stat(optimizedPngPath);
      const pngSizeMB = (pngStats.size / 1024 / 1024).toFixed(2);
      const pngSavings = ((1 - pngStats.size / originalSize) * 100).toFixed(1);

      console.log(`   ✅ PNG:  ${name}-optimized.png (${pngSizeMB}MB) - ${pngSavings}% smaller`);
    }

    return {
      input: inputPath,
      webp: webpPath,
      savedBytes: totalSaved
    };
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return null;
  }
}
