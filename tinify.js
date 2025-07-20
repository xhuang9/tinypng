import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import tinify from 'tinify';
import dotenv from 'dotenv';
dotenv.config();

// === CONFIG FROM .env ===
const API_KEY = process.env.TINIFY_API_KEY;
const TARGET_FOLDER = process.env.TARGET_FOLDER || process.cwd();
const FILE_EXTENSIONS = (process.env.FILE_EXTENSIONS || 'png|jpg|jpeg').split('|').map(ext => ext.toLowerCase());
const INCLUDE_SUB_FOLDER = process.env.INCLUDE_SUB_FOLDER !== 'false';
const REPLACE_EXISTING_FILE = process.env.REPLACE_EXISTING_FILE !== 'false';
const SHOULD_RESIZE = process.env.SHOULD_RESIZE !== 'false';
const RESIZE_MAX_WIDTH = parseInt(process.env.RESIZE_MAX_WIDTH || '1920', 10);
const RESIZE_MAX_HEIGHT = process.env.RESIZE_MAX_HEIGHT === 'null' ? null : parseInt(process.env.RESIZE_MAX_HEIGHT, 10);
// ========================

tinify.key = API_KEY;

if (!fs.existsSync(TARGET_FOLDER)) {
  console.error(`❌ ERROR: Provided TARGET_FOLDER does not exist: ${TARGET_FOLDER}`);
  process.exit(1);
}

function getAllImages(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  let imgs = [];
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (INCLUDE_SUB_FOLDER) imgs = imgs.concat(getAllImages(full));
    } else {
      const ext = path.extname(item.name).slice(1).toLowerCase();
      if (FILE_EXTENSIONS.includes(ext)) {
        imgs.push(full);
      }
    }
  }
  return imgs;
}

async function processImage(filePath) {
  const tempResize = filePath + '.resized';
  const outDir = REPLACE_EXISTING_FILE ?
    path.dirname(filePath) :
    path.join(TARGET_FOLDER, 'minified');

  if (!REPLACE_EXISTING_FILE && !fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outputPath = path.join(outDir, path.basename(filePath));

  try {
    let toCompress = filePath;

    if (SHOULD_RESIZE) {
      const resizeCmd = [`sips --resampleWidth ${RESIZE_MAX_WIDTH}`];
      if (RESIZE_MAX_HEIGHT !== null) resizeCmd.push(`--resampleHeight ${RESIZE_MAX_HEIGHT}`);
      resizeCmd.push(`"${filePath}" --out "${tempResize}"`);
      execSync(resizeCmd.join(' '));
      toCompress = tempResize;
    }

    process.stdout.write(`Compressing ${filePath} → ${outputPath}… `);
    await tinify.fromFile(toCompress).toFile(outputPath);
    if (fs.existsSync(tempResize)) fs.unlinkSync(tempResize);
    console.log('done');
  } catch (err) {
    console.error(`Failed: ${err.message}`);
    if (fs.existsSync(tempResize)) fs.unlinkSync(tempResize);
  }
}

(async () => {
  const imgs = getAllImages(TARGET_FOLDER);
  if (imgs.length === 0) {
    console.log('No image files found.');
    process.exit(0);
  }

  for (const img of imgs) {
    await processImage(img);
  }
})();
