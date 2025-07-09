import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import lqip from "lqip-modern"; // ✅ default import

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Folders to scan
const foldersToScan = [
  path.join(__dirname, "public/avatar"),
  path.join(__dirname, "public/branding"),
  path.join(__dirname, "public/comfort"),
  path.join(__dirname, "public/CSR"),
  path.join(__dirname, "public/events"),
  path.join(__dirname, "public/food"),
  path.join(__dirname, "public/hero"),
  path.join(__dirname, "public/hospitals"),
  path.join(__dirname, "public/infrastructure"),
  path.join(__dirname, "public/other"),
  path.join(__dirname, "src/assets/gallery"),
];

// ✅ Allowed image extensions
const allowedExtensions = /\.(jpe?g|png|webp)$/i;

// ✅ Output location
const outputPath = path.join(__dirname, "src/data/blur-data.json");

// ✅ Convert file path to public-facing key
const toWebPath = (filePath) => {
  const relativePath = path.relative(__dirname, filePath).replace(/\\/g, "/");
  if (relativePath.includes("public/")) {
    return "/" + relativePath.split("public/")[1];
  }
  if (relativePath.includes("src/assets/")) {
    return "/src/assets/" + relativePath.split("src/assets/")[1];
  }
  return "/" + relativePath;
};


const blurData = {};

for (const folder of foldersToScan) {
  if (!fs.existsSync(folder)) continue;

  const files = fs.readdirSync(folder);
  for (const file of files) {
    const fullPath = path.join(folder, file);
    if (!allowedExtensions.test(file)) continue;

    try {
      const { metadata } = await lqip(fullPath);
      const base64 = metadata.dataURIBase64; // ✅ Get proper data URI
      const key = toWebPath(fullPath);
      blurData[key] = base64;
      console.log(`✅ Processed: ${key}`);
    } catch (err) {
      console.warn(`⚠️ Failed: ${file}`, err.message);
    }
  }
}

// ✅ Save JSON
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(blurData, null, 2));
console.log(`\n🎉 All blur placeholders saved to ${outputPath}`);
