#!/usr/bin/env node
// 斗篷日记 · 开工自检（diary-check.cjs）
// 一次跑完以前每晚手动重走的路：T 编号、今日消息窗口、最后一条人话、
// 项目文件最新 mtime、errors.log 今日行数、调度器 job 数。
// 用法：cd D:/ProgramData/boboblog/ai-learn-hub && node scripts/diary-check.cjs
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const HUB = 'D:/ProgramData/boboblog/ai-learn-hub';
const HERMES = 'D:/hermes';
const pad = n => String(n).padStart(2, '0');
const t8 = s => {
  const d = new Date((s + 8 * 3600) * 1000);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
};

// ---- 1. 日记本里的 T 编号 ----
const src = fs.readFileSync(path.join(HUB, 'app/data/diary.ts'), 'utf8');
const ts = [...src.matchAll(/day: "(?:斗篷 )?T-(\d+)"/g)].map(m => +m[1]);
const days = [...src.matchAll(/day: "(Day \d+)"/g)].map(m => +m[1].split(' ')[1]);
const maxT = Math.max(...ts);

// ---- 2. 今日 24h 窗口（本地时间 03:00 -> 次日 03:00）----
const now = new Date();
// 覆盖窗口 = 昨天 03:00 → 今天 03:00（日记写的是刚过去这 24 小时，不是正在跑的这班）
const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 3, 0, 0);
const start = new Date(end.getTime() - 86400 * 1000);
const startSec = start.getTime() / 1000; // JS Date 本地时间 -> UTC epoch，别再手动减 8 小时
const endSec = startSec + 86400;
const db = new DatabaseSync(path.join(HERMES, 'state.db'), { readOnly: true });
const q = (s, ...a) => db.prepare(s).all(...a);

const win = q('SELECT COUNT(*) c FROM messages WHERE timestamp >= ? AND timestamp < ?', startSec, endSec)[0].c;
const roles = q(`SELECT role, COUNT(*) c FROM messages WHERE timestamp >= ? AND timestamp < ? GROUP BY role`, startSec, endSec);
const sess = q(`SELECT session_id, COUNT(*) c FROM messages WHERE timestamp >= ? AND timestamp < ? GROUP BY session_id`, startSec, endSec);
// 真人 = 非 cron 提示词
const lastHuman = q(`SELECT id, timestamp, substr(content,1,60) t FROM messages
  WHERE role='user' AND content NOT LIKE '[IMPORTANT:%' ORDER BY timestamp DESC LIMIT 1`)[0];
const humanAgeH = lastHuman ? ((Date.now() / 1000 - lastHuman.timestamp) / 3600).toFixed(1) : 'n/a';

// ---- 3. 项目目录 ----
let files = 0, newest = { mtime: 0, file: '' };
const walk = d => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else {
      files++;
      const m = fs.statSync(p).mtimeMs;
      if (m > newest.mtime) newest = { mtime: m, file: p };
    }
  }
};
try { walk(path.join(HERMES, '项目')); } catch { }

// ---- 4. errors.log 今日 ----
let errToday = 0;
try {
  const log = fs.readFileSync(path.join(HERMES, 'logs/errors.log'), 'utf8').split('\n');
  const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  errToday = log.filter(l => l.startsWith(stamp)).length;
} catch { }

// ---- 5. 调度器 ----
let jobs = [];
try {
  jobs = JSON.parse(fs.readFileSync(path.join(HERMES, 'cron/jobs.json'), 'utf8')).jobs || [];
} catch { }

console.log('== 斗篷开工自检 ==');
console.log(`时间        : ${now.toLocaleString('zh-CN')}`);
console.log(`日记本      : 斗篷 T-${maxT}（共 ${ts.length} 条）/ Day ${Math.max(...days)}（共 ${days.length} 条）→ 今晚写 T-${maxT + 1}`);
console.log(`今日窗口    : ${t8(startSec)} → ${t8(endSec)}`);
console.log(`消息        : ${win} 行  [${roles.map(r => r.role + ':' + r.c).join(' / ')}]  会话 ${sess.length} 个`);
console.log(`最后一句人话: id ${lastHuman ? lastHuman.id : '-'} @ ${lastHuman ? t8(lastHuman.timestamp) : '-'}（${humanAgeH} 小时前）「${lastHuman ? lastHuman.t : ''}」`);
console.log(`项目目录    : ${files} 个文件，最新 ${newest.mtime ? new Date(newest.mtime).toLocaleString('zh-CN') : '-'}`);
console.log(`今日报错    : ${errToday} 行`);
console.log(`调度器      : ${jobs.length} 个 job ${jobs.map(j => j.name + '(' + (j.enabled ? 'on' : 'off') + ', ran ' + (j.repeat?.completed ?? '?') + ')').join(' ')}`);
