// Web Audio API sound effects — no external files needed
let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

export function playCorrect() {
  try {
    const ctx = getCtx();
    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    const g = ctx.createGain();
    o1.type = 'sine';
    o2.type = 'sine';
    o1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    o1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
    o2.frequency.setValueAtTime(783.99, ctx.currentTime + 0.15); // G5
    g.gain.setValueAtTime(0.3, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    o1.connect(g);
    o2.connect(g);
    g.connect(ctx.destination);
    o1.start(ctx.currentTime);
    o2.start(ctx.currentTime + 0.1);
    o1.stop(ctx.currentTime + 0.4);
    o2.stop(ctx.currentTime + 0.4);
  } catch {}
}

export function playWrong() {
  try {
    const ctx = getCtx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(200, ctx.currentTime);
    o.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.3);
    g.gain.setValueAtTime(0.2, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(ctx.currentTime);
    o.stop(ctx.currentTime + 0.4);
  } catch {}
}

export function playWin() {
  try {
    const ctx = getCtx();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, ctx.currentTime);
      g.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.15);
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.3);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.15);
      o.stop(ctx.currentTime + i * 0.15 + 0.3);
    });
    // Add a sparkle
    setTimeout(() => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(1568, ctx.currentTime);
      o.frequency.setValueAtTime(2093, ctx.currentTime + 0.05);
      g.gain.setValueAtTime(0.15, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime);
      o.stop(ctx.currentTime + 0.3);
    }, 700);
  } catch {}
}

export function playLose() {
  try {
    const ctx = getCtx();
    const notes = [392, 349.23, 311.13, 261.63]; // G4 F4 Eb4 C4
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(freq, ctx.currentTime);
      g.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.2);
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.2 + 0.35);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.2);
      o.stop(ctx.currentTime + i * 0.2 + 0.35);
    });
  } catch {}
}

export function playClick() {
  try {
    const ctx = getCtx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(800, ctx.currentTime);
    g.gain.setValueAtTime(0.1, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(ctx.currentTime);
    o.stop(ctx.currentTime + 0.05);
  } catch {}
}

export function playLevelUp() {
  try {
    const ctx = getCtx();
    const notes = [440, 554.37, 659.25, 880]; // A4 C#5 E5 A5
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      g.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.08);
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.2);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.08);
      o.stop(ctx.currentTime + i * 0.08 + 0.2);
    });
  } catch {}
}
