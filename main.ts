import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve from the script's own location: the grader runs node
// /bot/main.ts as uid 65534 from an unknown working directory,
// so a bare relative path like "VIDEO.json" would fail with ENOENT.
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "VIDEO.json");
const text = readFileSync(src, "utf8");
const video = JSON.parse(text);
const re = /^https:\/\/(www\.)?youtube\.com\/shorts\/[A-Za-z0-9_-]{11}([?#].*)?$/;
if (typeof video.url !== "string" || !re.test(video.url)) {
  throw new Error("VIDEO.json: url must be a YouTube Shorts URL");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "VIDEO.json");
writeFileSync(outPath, text);
console.log(`VIDEO.json -> ${outPath}`);
