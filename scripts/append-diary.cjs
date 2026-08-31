// 通用成长日记落地脚本：把一份 JSON 日记内容插进 diary.ts 的 diaryEntries 数组最前面。
// 用法（推荐，编码最稳）：
//   node scripts/append-diary.cjs --file <json文件路径>
// 也支持：node scripts/append-diary.cjs '<json字符串>'（UTF-8 字符串）
// 或：stdin 喂 JSON（注意 Windows 管道编码可能破坏中文，建议用 --file）
// 输入 JSON 结构：
//   { day, date, title, intro, sections: [{ heading, blocks: [..] }], note? }
// 只做文本处理，不依赖 TS 运行时；不改数组其它内容，不删旧条目。
const fs = require('fs');
const path = require('path');

// ---------- 收集输入 JSON ----------
let raw = '';
const fileArgIdx = process.argv.indexOf('--file');
if (fileArgIdx >= 0 && process.argv[fileArgIdx + 1]) {
  // 从文件读（最稳：文件可精确控制 UTF-8）
  raw = fs.readFileSync(process.argv[fileArgIdx + 1], 'utf8');
} else if (process.argv[2] && process.argv[2] !== '--file') {
  raw = process.argv[2];
} else {
  // 从 stdin 读（尽力按 UTF-8）
  try {
    raw = fs.readFileSync(0, 'utf8');
  } catch (e) {
    console.error('ERR: no input JSON provided');
    process.exit(1);
  }
}
raw = raw.trim();

let entry;
try {
  entry = JSON.parse(raw);
} catch (e) {
  console.error('ERR: invalid JSON: ' + e.message);
  process.exit(1);
}

// ---------- 基础校验 ----------
if (!entry.day || !entry.title || !entry.intro || !Array.isArray(entry.sections)) {
  console.error('ERR: JSON 缺少必需字段 day/title/intro/sections');
  process.exit(1);
}
if (!entry.date) {
  // 缺 date 时默认取今天（本地日期）
  const d = new Date();
  entry.date = d.toISOString().slice(0, 10);
}

// ---------- 长度上限（防模型产出超长文本撑爆文件） ----------
const MAX_BLOCK_LEN = 2000; // 每条 block 最多字符数

// ---------- 幂等保护：先读目标文件，检查该 day 是否已存在 ----------
const FILE = path.join(__dirname, '..', 'app', 'data', 'diary.ts');
let existingSrc = '';
let existingIdx = -1;
if (fs.existsSync(FILE)) {
  existingSrc = fs.readFileSync(FILE, 'utf8');
  const dayRe = new RegExp('day: "' + entry.day.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"');
  if (dayRe.test(existingSrc)) {
    console.error('SKIP: ' + entry.day + ' already exists — not inserting again (idempotent guard)');
    process.exit(0);
  }
  existingIdx = existingSrc.indexOf('export const diaryEntries: DiaryEntry[] = [');
}
if (existingIdx < 0) {
  // diary.ts 不存在或没有标记时，直接在空结构上从头构建（兜底）
  existingSrc = existingSrc || '';
}

// ---------- 把 JSON 渲染成 TypeScript 数组元素字符串 ----------
function esc(s) {
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r\n/g, '\n')
    .replace(/\n/g, '\\n')
    .replace(/`/g, '\\`');
}

function renderSection(s) {
  const blocks = (s.blocks || []).map((b) => {
    if (String(b).length > MAX_BLOCK_LEN) {
      console.error('ERR: block 超过长度上限 ' + MAX_BLOCK_LEN + ' 字符（长度 ' + String(b).length + '），已中止');
      process.exit(1);
    }
    return '          "' + esc(b) + '"';
  });
  return `      {\n        heading: "${esc(s.heading)}",\n        blocks: [\n${blocks.join(',\n')}\n        ],\n      }`;
}

const noteLine = entry.note ? `\n    note: "${esc(entry.note)}",` : '';
const authorLine = entry.author ? `\n    author: "${esc(entry.author)}",` : '';
const sections = entry.sections.map(renderSection).join(',\n');

const block = `  {
    day: "${esc(entry.day)}",
    date: "${esc(entry.date)}",
    title: "${esc(entry.title)}",
    intro: "${esc(entry.intro)}",${noteLine}${authorLine}
    sections: [
${sections}
    ],
  },
`;

// ---------- 插入（使用前面已读取的 src） ----------
const marker = 'export const diaryEntries: DiaryEntry[] = [';
if (existingIdx < 0) {
  console.error('ERR: marker not found in diary.ts');
  process.exit(1);
}
let src = existingSrc;
// 插入到 '[' 之后（跳过换行符），使新条目位于数组最前
let insertAt = existingIdx + marker.length;
while (src[insertAt] === '\r' || src[insertAt] === '\n') insertAt++;

src = src.slice(0, insertAt) + block + src.slice(insertAt);
fs.writeFileSync(FILE, src, 'utf8');

console.log('OK: ' + entry.day + ' inserted at top of diaryEntries');
