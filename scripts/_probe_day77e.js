const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('C:/Users/Mechrevo/.openclaw/state/openclaw.sqlite', { readOnly: true });
const out = {};
const q = (label, sql, p) => { try { return db.prepare(sql).all(...(p || [])); } catch (e) { out['err_' + label] = e.message; return null; } };
out.cronJobs = q('cj', `SELECT id, name, enabled, schedule_expr, schedule_kind, schedule_tz, status, consecutive_errors, last_run_at, last_run_status, last_error, run_count, next_run_at FROM cron_jobs`);
// discover columns if the above failed
if (out.err_cj) out.cronJobsCols = q('cjc', `PRAGMA table_info(cron_jobs)`);
out.recentRuns = q('rr', `SELECT * FROM cron_run_logs ORDER BY rowid DESC LIMIT 12`);
out.runCols = q('rc', `PRAGMA table_info(cron_run_logs)`);
out.taskRuns = q('tr', `SELECT * FROM task_runs ORDER BY rowid DESC LIMIT 8`);
out.ingress = q('ing', `SELECT COUNT(*) n FROM channel_ingress_events`);
out.ingressCols = q('ic', `PRAGMA table_info(channel_ingress_events)`);
out.auditRecent = q('ar', `SELECT COUNT(*) n, MIN(created_at) mn, MAX(created_at) mx FROM audit_events`);
fs.writeFileSync(__dirname + '/_probe_day77e_out.json', JSON.stringify(out, null, 1), 'utf8');
console.log(JSON.stringify(out, null, 1).slice(0, 20000));
db.close();
