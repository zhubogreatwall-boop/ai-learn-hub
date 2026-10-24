const path = require('path');
const fs = require('fs');
const out = {};
const jobs = JSON.parse(fs.readFileSync('D:/hermes/cron/jobs.json', 'utf8'));
const arr = Array.isArray(jobs) ? jobs : jobs.jobs || [];
out.jobCount = arr.length;
out.jobs = arr.map((j) => ({
  id: j.id,
  name: j.name,
  enabled: j.enabled,
  schedule: j.schedule,
  last_run_status: j.last_run_status || j.lastRunStatus,
  last_run_at: j.last_run_at || j.lastRunAt,
  consecutive_errors: j.consecutive_errors ?? j.consecutiveErrors,
  seq: j.seq ?? j.sequence,
  run_count: j.run_count ?? j.runCount,
}));

// errors log
const { DatabaseSync } = require('node:sqlite');
function open(p) { try { return new DatabaseSync(p, { readOnly: true }); } catch (e) { return null; } }

const st = open('D:/hermes/state.db');
if (st) {
  const d = (label, sql) => { try { return st.prepare(sql).all(); } catch (e) { out['err_' + label] = e.message; return null; } };
  // deliveries / obligations
  out.deliveryObligations = d('do', `SELECT * FROM delivery_obligations ORDER BY rowid DESC LIMIT 10`);
  out.deliveryCols = d('dc', `PRAGMA table_info(delivery_obligations)`);
  // cron sessions in last 3 days with token usage
  out.cronSessions = d('cs', `SELECT id, started_at, ended_at, end_reason, message_count, tool_call_count, input_tokens, output_tokens, cache_read_tokens, reasoning_tokens, title FROM sessions WHERE source='cron' ORDER BY started_at DESC LIMIT 14`);
  // last real (non-cron) human messages
  out.realHuman = d('rh', `SELECT m.session_id, m.timestamp, m.content, s.source FROM messages m LEFT JOIN sessions s ON s.id=m.session_id WHERE m.role='user' AND (m.session_id NOT LIKE 'cron_%') ORDER BY m.timestamp DESC LIMIT 8`);
  st.close();
}
fs.writeFileSync(path.join(__dirname, '_probe_day77b_out.json'), JSON.stringify(out, null, 1), 'utf8');
console.log(JSON.stringify(out.jobs, null, 1));
console.log('--- cron sessions ---');
console.log(JSON.stringify(out.cronSessions, null, 1));
console.log('--- realHuman ---');
console.log(JSON.stringify(out.realHuman, null, 1));
console.log('--- errors ---');
console.log(Object.keys(out).filter((k) => k.startsWith('err_')).map((k) => k + ': ' + out[k]).join('\n'));
