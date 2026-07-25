import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const gameDir = path.join(root, "picture-puzzle");
const imageDir = path.join(gameDir, "artworks");
const metaPath = path.join(gameDir, "artworks-meta.json");
const outputPath = path.join(gameDir, "artworks.json");
const baseUrl = "https://healingmart.github.io/hm-mini-game-dist/picture-puzzle/artworks/";
const allowed = /^(\d{3})\.(webp|png|jpe?g)$/i;

let meta = { items: {} };
try {
  meta = JSON.parse(await readFile(metaPath, "utf8"));
} catch (error) {
  console.warn("artworks-meta.json을 읽지 못해 기본 작품명을 사용합니다.", error.message);
}

const entries = await readdir(imageDir, { withFileTypes: true });
const byCode = new Map();
for (const entry of entries) {
  if (!entry.isFile()) continue;
  const match = entry.name.match(allowed);
  if (!match) continue;
  const code = match[1];
  const number = Number(code);
  if (number < 1 || number > 999) continue;
  if (byCode.has(code)) {
    throw new Error(`${code} 번호에 이미지가 두 개 이상 있습니다: ${byCode.get(code)}, ${entry.name}`);
  }
  byCode.set(code, entry.name);
}

const artworks = [...byCode.entries()]
  .sort((a, b) => Number(a[0]) - Number(b[0]))
  .flatMap(([code, file]) => {
    const item = meta.items?.[code] ?? {};
    if (item.enabled === false) return [];
    const id = Number(item.id ?? code);
    if (!Number.isInteger(id) || id < 1 || id > 999) {
      throw new Error(`${code}의 id가 001부터 999 범위를 벗어났습니다.`);
    }
    return [{
      number: Number(code),
      code,
      id,
      file,
      title: String(item.title || `작품 ${code}`),
      category: String(item.category || "기타")
    }];
  });

if (!artworks.length) {
  throw new Error("001부터 999 사이의 작품 이미지가 없습니다.");
}

const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  version: `${Date.now()}`,
  count: artworks.length,
  baseUrl,
  artworks
};
await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`picture-puzzle/artworks.json 생성 완료: ${artworks.length}개`);
