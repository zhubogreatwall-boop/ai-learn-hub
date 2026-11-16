const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');
const out = {};
const cs = (s) => new Date(s + '+08:00').getTime();

try {
  const db = new DatabaseSync('D:/hermes/state.db', { readOnly: true });
  const start = Math.floor(cs('2026-11-16T03:00:00') / 1000);
  const end = Math.floor(cs('2026-11-17T03:00:00') / 1000);
  out.window = { start, end };
  out.msgs = db.prepare(`SELECT id, session_id, role, tool_name, timestamp, length(coalesce(content,'')) len, content FROM messages WHERE timestamp >= ? AND timestamp < ? ORDER BY timestamp`).all(start, end);
  out.sessionsWin = db.prepare(`SELECT * FROM sessions WHERE started_at >= ? AND started_at <= ? ORDER BY started_at`).all(start - 7200, end);
  out.lastHuman = db.prepare(`SELECT id, timestamp, substr(coalesce(content,''),1,400) content FROM messages WHERE role='user' AND content NOT LIKE '[IMPORTANT:%' ORDER BY timestamp DESC LIMIT 8`).all();
  db.close();
} catch (e) { out.msgErr = String(e); }

try {
  const db = new DatabaseSync('C:/Users/Mechrevo/.openclaw/state/openclaw.sqlite', { readOnly: true });
  const s = cs('2026-11-16T00:00:00');
  const e = cs('2026-11-18T00:00:00');
  out.runs = db.prepare(`SELECT seq, job_id, status, run_at_ms, duration_ms, total_tokens, delivered, delivery_status, substr(coalesce(error,''),1,400) err FROM cron_run_logs WHERE run_at_ms >= ? AND run_at_ms < ? ORDER BY run_at_ms`).all(s, e);
  db.close();
} catch (err) { out.openErr = String(err); }

fs.writeFileSync('D:/ProgramData/boboblog/ai-learn-hub/scripts/_probe_t81_out.json', JSON.stringify(out, null, 1), 'utf8');
console.log('done', Object.keys(out).join(','));
