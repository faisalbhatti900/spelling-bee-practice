// One-time word-audio generator (macOS). Run: npm run audio:generate
//
// Reads every unique word from src/lib/wordBank.ts, synthesises each with the
// best available voice using macOS `say`, and writes a small mono AAC clip to
// public/audio/<slug>.m4a. Incremental: existing clips are skipped.
//
// Prefers a Premium/Enhanced English voice (download one in System Settings →
// Accessibility → Spoken Content → System Voice) and falls back to Samantha.

import { readFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ROOT = process.cwd();
const OUT = join(ROOT, 'public', 'audio');
mkdirSync(OUT, { recursive: true });

// --- 1. unique words ---
// Words are double-quoted string literals inside the WORD_BANK block (category
// keys use single quotes; letter keys are unquoted) — so a regex over that block
// safely collects every word without eval-ing project source.
const src = readFileSync(join(ROOT, 'src/lib/wordBank.ts'), 'utf8');
const match = src.match(/export const WORD_BANK[^=]*=\s*(\{[\s\S]*?\n\});/);
if (!match) throw new Error('Could not find WORD_BANK in wordBank.ts');
const block = match[1];
const words = new Set();
for (const m of block.matchAll(/"([^"\\]+)"/g)) words.add(m[1]);
const list = [...words];

// --- 2. choose the best voice ---
const voiceLines = execFileSync('say', ['-v', '?'], { encoding: 'utf8' })
  .split('\n')
  .filter((l) => /\sen[_-]/i.test(l));
const nameOf = (line) => line.split(/\s{2,}/)[0].trim();
const pick = (re) => { const l = voiceLines.find((l) => re.test(l)); return l ? nameOf(l) : null; };
const voice =
  pick(/premium/i) || pick(/enhanced/i) ||
  pick(/\b(Ava|Allison|Samantha|Evan|Zoe|Joelle|Daniel)\b/) ||
  (voiceLines[0] && nameOf(voiceLines[0]));
if (!voice) throw new Error('No English voice found for `say`.');

console.log(`Voice: "${voice}"  |  Words: ${list.length}  ->  public/audio/`);

// --- 3. synthesise ---
const slug = (w) => w.toLowerCase().replace(/[^a-z0-9]/g, '');
const tmp = join(tmpdir(), 'wb_say.aiff');
let made = 0, skipped = 0;
for (let i = 0; i < list.length; i++) {
  const word = list[i];
  const out = join(OUT, slug(word) + '.m4a');
  if (existsSync(out)) { skipped++; continue; }
  execFileSync('say', ['-v', voice, '-o', tmp, word]);
  // small, clear speech clip: mono AAC ~40kbps
  execFileSync('afconvert', [tmp, out, '-f', 'm4af', '-d', 'aac', '-b', '40000', '--mix']);
  made++;
  if ((made + skipped) % 100 === 0) console.log(`  ${made + skipped}/${list.length}…`);
}
rmSync(tmp, { force: true });
console.log(`Done. Generated ${made}, skipped ${skipped} existing.`);
