const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');
const { execFileSync } = require('child_process');
const out = {};

const db = new DatabaseSync('C:/Users/Mechrevo/.openclaw/state/openclaw.sqlite', { readOnly: true });
const q = (l, s, p) => { try { return db.prepare(s).all(...(p || [])); } catch (e) { out['err_' + l] = e.message; return null; } };
out.lights = q('l', `SELECT name, last_run_at_ms, last_run_status, consecutive_errors, last_duration_ms, last_delivery_status FROM cron_jobs ORDER BY last_run_at_ms DESC`);
const S = Date.UTC(2026, 9, 23, 16, 0, 0);
const E = Date.UTC(2026, 9, 24, 16, 0, 0);
out.runs1024 = q('r', `SELECT substr(e.job_id,1,8) job, c.name, e.seq, e.status, e.delivery_status, e.duration_ms, e.total_tokens, e.run_at_ms FROM cron_run_logs e LEFT JOIN cron_jobs c ON c.job_id=e.job_id WHERE e.ts>=? AND e.ts<? ORDER BY e.run_at_ms`, [S, E]);
out.week = q('w', `SELECT substr(e.job_id,1,8) job, e.seq, e.status, e.duration_ms, e.total_tokens, e.run_at_ms FROM cron_run_logs e WHERE e.job_id='0d3d9208-82de-4e2f-9280-0991c82134b4' ORDER BY seq DESC LIMIT 8`);
db.close();

// project dir mtime stats
function statDir(dir) {
  const res = { dir, n: 0, newest: null, newestFile: null };
  (function walk(d) {
    let ents = [];
    try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
    for (const e of ents) {
      const p = d + '/' + e.name;
      if (e.isDirectory()) walk(p);
      else {
        try { const st = fs.statSync(p); res.n++; if (!res.newest || st.mtime > res.newest) { res.newest = st.mtime; res.newestFile = p; } } catch (err) {}
      }
    }
  })(dir);
  res.newest = res.newest && res.newest.toISOString();
  return res;
}
try { out.projDir = statDir('D:/hermes/项目'); } catch (e) { out.projDir = e.message; }

// errors.log
try {
  const el = fs.readFileSync('D:/hermes/logs/errors.log', 'utf8').split(/\r?\n/).filter(Boolean);
  out.errorsTotal = el.length;
  out.errorsTail = el.slice(-8);
  out.errorsDates = el.filter((l) => /2026-10-2[45]/.test(l)).map((l) => l.slice(0, 160));
} catch (e) { out.errorsErr = e.message; }

// git state
function git(args) {
  try { return execFileSync('git', args, { cwd: 'D:/ProgramData/boboblog/ai-learn-hub', encoding: 'utf8' }).trim(); } catch (e) { return 'ERR ' + e.message; }
}
out.gitLog = git(['log', '--oneline', '-3']);
out.gitStatus = git(['status', '--porcelain']).slice(0, 500);
out.html = (() => { try { return fs.readFileSync('D:/ProgramData/boboblog/ai-learn-hub/public/index.html', 'utf8').length; } catch (e) { return 'no index.html'; } })();

fs.writeFileSync(__dirname + '/_probe_day77h_out.json', JSON.stringify(out, null, 1), 'utf8');
console.log(JSON.stringify(out, null, 1).slice(0, 12000));
