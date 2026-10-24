const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('C:/Users/Mechrevo/.openclaw/state/openclaw.sqlite', { readOnly: true });
const out = {};
const q = (l, s, p) => { try { return db.prepare(s).all(...(p || [])); } catch (e) { out['err_' + l] = e.message; return null; } };

out.jobs = q('j', `SELECT job_id, name, enabled, schedule_kind, schedule_expr, schedule_tz, last_run_at_ms, last_run_status, consecutive_errors, last_duration_ms, last_error, last_delivery_status FROM cron_jobs ORDER BY name`);

// runs in window 10-24 00:00 (+08) -> 10-25 00:00
const S = Date.UTC(2026, 9, 23, 16, 0, 0);
const E = Date.UTC(2026, 9, 24, 16, 0, 0);
out.runSummary1024 = q('r24', `SELECT job_id, seq, status, delivery_status, duration_ms, total_tokens, run_at_ms, ts, substr(summary,1,200) s FROM cron_run_logs WHERE ts >= ? AND ts < ? ORDER BY ts`, [S, E]);
out.runCount1024 = q('rc24', `SELECT COUNT(*) n FROM cron_run_logs WHERE ts >= ? AND ts < ?`, [S, E]);
out.runSummary1023 = q('r23', `SELECT job_id, seq, status, delivery_status, duration_ms, total_tokens FROM cron_run_logs WHERE ts >= ? AND ts < ? ORDER BY ts`, [S - 86400000, S]);

// diary job history last 12
out.diaryRuns = q('dr', `SELECT seq, status, duration_ms, total_tokens, ts, substr(summary,1,120) s FROM cron_run_logs WHERE job_id='0d3d9208-82de-4e2f-9280-0991c82134b4' ORDER BY seq DESC LIMIT 12`);

// ingress
out.ingressCols = q('ic', `PRAGMA table_info(channel_ingress_events)`);
out.ingressCount = q('ing', `SELECT COUNT(*) n FROM channel_ingress_events`);
out.ingressSample = q('ings', `SELECT * FROM channel_ingress_events ORDER BY rowid DESC LIMIT 3`);
// delivery queue for 10-24
out.dqCols = q('dc', `PRAGMA table_info(delivery_queue_entries)`);
out.dq1024 = q('dq', `SELECT * FROM delivery_queue_entries ORDER BY rowid DESC LIMIT 5`);
fs.writeFileSync(__dirname + '/_probe_day77f_out.json', JSON.stringify(out, null, 1), 'utf8');
console.log(JSON.stringify({ jobs: out.jobs, runCount1024: out.runCount1024, runSummary1024: out.runSummary1024, runSummary1023: out.runSummary1023, diaryRuns: out.diaryRuns, ingressCount: out.ingressCount, ingressCols: (out.ingressCols || []).map((c) => c.name), ingressSample: out.ingressSample, dq: out.dq1024 }, null, 1).slice(0, 15000));
db.close();
