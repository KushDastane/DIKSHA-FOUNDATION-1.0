import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

// ES module __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Accept folder path from command line
const targetDir = process.argv[2];

if (!targetDir) {
  console.error("❌ Please provide a folder path.");
  process.exit(1);
}

const fullPath = path.resolve(__dirname, targetDir);

if (!fs.existsSync(fullPath)) {
  console.error("❌ Folder does not exist:", fullPath);
  process.exit(1);
}

console.log(`🔁 Processing: ${fullPath}`);

fs.readdirSync(fullPath).forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  const basename = path.basename(file, ext);

  if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    const inputPath = path.join(fullPath, file);
    const outputPath = path.join(fullPath, `${basename}.webp`);

    sharp(inputPath)
      .webp({ quality: 90 }) // high quality setting
      .toFile(outputPath)
      .then(() => {
        console.log(`✅ Converted: ${file} → ${basename}.webp`);
      })
      .catch((err) => {
        console.error(`❌ Error converting ${file}:`, err);
      });
  }
});
