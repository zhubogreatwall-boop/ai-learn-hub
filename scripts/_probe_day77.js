const path = require('path');
const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');
const HERMES = 'D:/hermes';

function open(p) {
  if (!fs.existsSync(p)) return null;
  try {
    return new DatabaseSync(p, { readOnly: true });
  } catch (e) {
    console.log('OPEN FAIL', p, e.message);
    return null;
  }
}
function tryq(db, label, sql, params) {
  if (!db) return null;
  try {
    const r = db.prepare(sql).all(...(params || []));
    return r;
  } catch (e) {
    console.log('SQLFAIL[' + label + ']:', e.message);
    return null;
  }
}
function cols(db, table) {
  const r = tryq(db, 'pragma ' + table, `PRAGMA table_info(${table})`);
  return r ? r.map((x) => x.name) : [];
}

const out = {};

// ---------- 1. state.db messages for 10-24 ----------
const state = open(HERMES + '/state.db');
if (state) {
  out.stateTables = tryq(state, 'tables', `SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`).map((r) => r.name);
  out.messagesCols = cols(state, 'messages');
  const c = out.messagesCols;
  // figure the time column type
  const tn = c.includes('timestamp') ? 'timestamp' : c.includes('created_at') ? 'created_at' : c.includes('ts') ? 'ts' : null;
  out.timeCol = tn;
  if (tn) {
    const sample = tryq(state, 'tsSample', `SELECT ${tn} AS v, typeof(${tn}) AS t FROM messages ORDER BY rowid DESC LIMIT 3`);
    out.tsSample = sample;
    // window 10-24 local 00:00 -> 10-25 00:00 (Asia/Shanghai = UTC+8)
    const start = Date.UTC(2026, 9, 23, 16, 0, 0) / 1000; // 2026-10-24T00:00 +08
    const end = Date.UTC(2026, 9, 24, 16, 0, 0) / 1000; // 2026-10-25T00:00 +08
    out.window = { startEpoch: start, endEpoch: end };
    out.msgs1024 = tryq(
      state,
      'msgs1024',
      `SELECT session_id, role, COUNT(*) n, MIN(${tn}) mn, MAX(${tn}) mx FROM messages WHERE ${tn} >= ? AND ${tn} < ? GROUP BY session_id, role ORDER BY session_id, role`,
      [start, end]
    );
    out.msgs1024Total = tryq(state, 'total', `SELECT COUNT(*) n FROM messages WHERE ${tn} >= ? AND ${tn} < ?`, [start, end])[0];
    out.userMsgs1024 = tryq(
      state,
      'user',
      `SELECT session_id, ${tn} t, substr(content,1,300) c FROM messages WHERE ${tn} >= ? AND ${tn} < ? AND role='user' ORDER BY ${tn}`,
      [start, end]
    );
    // last human-ish message overall
    out.lastUserMsgs = tryq(
      state,
      'lastuser',
      `SELECT session_id, ${tn} t, substr(content,1,200) c FROM messages WHERE role='user' ORDER BY ${tn} DESC LIMIT 12`
    );
    // sessions on 10-24
    const sc = cols(state, 'sessions');
    out.sessionsCols = sc;
    const stn = sc.includes('created_at') ? 'created_at' : sc.includes('timestamp') ? 'timestamp' : sc.includes('started_at') ? 'started_at' : null;
    if (stn) {
      const samp = tryq(state, 'sessSample', `SELECT ${stn} v, typeof(${stn}) tt FROM sessions ORDER BY rowid DESC LIMIT 3`);
      out.sessSample = samp;
      const isNum = samp && samp[0] && samp[0].tt !== 'text';
      out.sessions1024 = tryq(
        state,
        'sess1024',
        `SELECT * FROM sessions WHERE ${isNum ? stn + ' >= ? AND ' + stn + ' < ?' : "substr(" + stn + ",1,10)='2026-10-24'"}`,
        isNum ? [start, end] : []
      );
    }
  }
  // platform message ids
  const midCol = out.messagesCols.includes('platform_message_id');
  out.hasPlatformMessageId = midCol;
  if (midCol) {
    out.platformIds = tryq(state, 'pmids', `SELECT COUNT(*) total, SUM(CASE WHEN platform_message_id IS NOT NULL AND platform_message_id<>'' THEN 1 ELSE 0 END) nonempty FROM messages`)[0];
  }
  // ingress / audit
  if (out.stateTables.includes('channel_ingress_events')) {
    out.ingress = tryq(state, 'ingress', `SELECT COUNT(*) n FROM channel_ingress_events`)[0];
  }
  if (out.stateTables.includes('audit_events')) {
    out.auditKinds = tryq(state, 'audit', `SELECT kind, COUNT(*) n, MAX(created_at) mx FROM audit_events GROUP BY kind`);
  }
  // last human message overall + count messages per day for last 6 days
  if (tn) {
    out.msgsPerDay = tryq(
      state,
      'perday',
      `SELECT date(${tn} + 8*3600, 'unixepoch') d, COUNT(*) n, SUM(CASE WHEN role='user' THEN 1 ELSE 0 END) u FROM messages GROUP BY d ORDER BY d DESC LIMIT 8`
    );
  }
  state.close();
}

// ---------- 2. cron executions + jobs ----------
const cx = open(HERMES + '/cron/executions.db');
if (cx) {
  out.cxTables = tryq(cx, 't', `SELECT name FROM sqlite_master WHERE type='table'`).map((r) => r.name);
  for (const t of out.cxTables) out['cxcols_' + t] = cols(cx, t);
  out.recentExec = tryq(cx, 'recent', `SELECT * FROM executions ORDER BY rowid DESC LIMIT 12`);
  cx.close();
}

// ---------- 3. cron job state json ----------
const cronDir = HERMES + '/cron';
out.cronFiles = fs.readdirSync(cronDir).filter((f) => /\.(json|db)$/.test(f));

fs.writeFileSync(path.join(__dirname, '_probe_day77_out.json'), JSON.stringify(out, null, 1), 'utf8');
console.log('WROTE _probe_day77_out.json');
console.log('stateTables:', (out.stateTables || []).join(','));
console.log('timeCol:', out.timeCol, 'total 10-24:', JSON.stringify(out.msgs1024Total));
console.log('userMsgs 10-24:', JSON.stringify(out.userMsgs1024, null, 1));
console.log('perday:', JSON.stringify(out.msgsPerDay));
