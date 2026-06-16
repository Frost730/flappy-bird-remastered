const NOTE_MAP: { [key: string]: number } = {
  C: 0, 'C#': 1, 'Db': 1, D: 2, 'D#': 3, 'Eb': 3, E: 4, F: 5, 'F#': 6, 'Gb': 6, G: 7, 'G#': 8, 'Ab': 8, A: 9, 'A#': 10, 'Bb': 10, B: 11
};

function noteToFreq(noteStr: string): number {
  const match = noteStr.match(/^([A-G](?:#|b)??)(\d+)$/);
  if (!match) return 440;
  const name = match[1];
  const octave = parseInt(match[2], 10);
  const semitones = NOTE_MAP[name] ?? 0;
  const midi = 12 + octave * 12 + semitones;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Procedural loops for each theme
const BGM_THEMES: { [key: string]: string[] } = {
  classic: [
    'C3', 'E3', 'G3', 'C4', 'E3', 'G3', 'C4', 'G3',
    'A2', 'C3', 'E3', 'A3', 'C3', 'E3', 'A3', 'E3',
    'F2', 'A2', 'C3', 'F3', 'A2', 'C3', 'F3', 'C3',
    'G2', 'B2', 'D3', 'G3', 'B2', 'D3', 'G3', 'D3'
  ],
  night: [
    'A2', 'E3', 'A3', 'C4', 'E3', 'A3', 'C4', 'E3',
    'F2', 'C3', 'F3', 'A3', 'C3', 'F3', 'A3', 'F3',
    'C3', 'G3', 'C4', 'E4', 'G3', 'C4', 'E4', 'C4',
    'G2', 'D3', 'G3', 'B3', 'D3', 'G3', 'B3', 'G3'
  ],
  cyberpunk: [
    'D2', 'D3', 'A2', 'D3', 'F3', 'D3', 'A3', 'D3',
    'Bb2', 'Bb3', 'F3', 'Bb3', 'D4', 'Bb3', 'F3', 'Bb3',
    'G2', 'G3', 'D3', 'G3', 'Bb3', 'G3', 'D4', 'G3',
    'A2', 'A3', 'E3', 'A3', 'C#4', 'A3', 'E3', 'A3'
  ],
  military: [
    'D2', 'D2', 'D3', 'D2', 'A2', 'A2', 'D3', 'D2',
    'G2', 'G2', 'G3', 'G2', 'D3', 'D3', 'G3', 'G2',
    'C2', 'C2', 'C3', 'C2', 'G2', 'G2', 'C3', 'C2',
    'D2', 'D2', 'A2', 'D2', 'F2', 'F2', 'A2', 'D2'
  ]
};

class SoundManager {
  private ctx: AudioContext | null = null;
  private bgmVolumeNode: GainNode | null = null;
  private sfxVolumeNode: GainNode | null = null;
  
  private sfxVolume: number = 0.5;
  private bgmVolume: number = 0.3;
  private isBgmPlaying: boolean = false;
  private currentTheme: string = 'classic';
  
  private bgmIntervalId: ReturnType<typeof setInterval> | null = null;
  private bgmStep: number = 0;
  private nextNoteTime: number = 0;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (this.ctx) return;
    
    // Create audio context
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();
    
    // Create gain nodes
    this.bgmVolumeNode = this.ctx.createGain();
    this.sfxVolumeNode = this.ctx.createGain();
    
    // Set volumes
    this.bgmVolumeNode.gain.value = this.bgmVolume;
    this.sfxVolumeNode.gain.value = this.sfxVolume;
    
    // Connect to destination
    this.bgmVolumeNode.connect(this.ctx.destination);
    this.sfxVolumeNode.connect(this.ctx.destination);
  }

  public setSFXVolume(vol: number) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
    if (this.sfxVolumeNode) {
      this.sfxVolumeNode.gain.setValueAtTime(this.sfxVolume, this.ctx?.currentTime || 0);
    }
  }

  public setBGMVolume(vol: number) {
    this.bgmVolume = Math.max(0, Math.min(1, vol)) * 0.5; // Scale down BGM to not overpower sfx
    if (this.bgmVolumeNode) {
      this.bgmVolumeNode.gain.setValueAtTime(this.bgmVolume, this.ctx?.currentTime || 0);
    }
  }

  public playFlap() {
    this.initContext();
    if (!this.ctx || this.sfxVolume === 0) return;
    
    // Resume context if suspended
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle'; // Retro 8-bit soft flap sound
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxVolumeNode!);
    
    osc.start(now);
    osc.stop(now + 0.13);
  }

  public playPoint() {
    this.initContext();
    if (!this.ctx || this.sfxVolume === 0) return;
    
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    
    // Tone 1
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(noteToFreq('C5'), now);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.setValueAtTime(0.2, now + 0.07);
    gain1.gain.linearRampToValueAtTime(0.01, now + 0.08);
    osc1.connect(gain1);
    gain1.connect(this.sfxVolumeNode!);
    osc1.start(now);
    osc1.stop(now + 0.08);

    // Tone 2
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(noteToFreq('E5'), now + 0.08);
    gain2.gain.setValueAtTime(0.2, now + 0.08);
    gain2.gain.setValueAtTime(0.2, now + 0.22);
    gain2.gain.linearRampToValueAtTime(0.01, now + 0.23);
    osc2.connect(gain2);
    gain2.connect(this.sfxVolumeNode!);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.23);
  }

  public playCoin() {
    this.initContext();
    if (!this.ctx || this.sfxVolume === 0) return;
    
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    
    // Tone 1
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(noteToFreq('B5'), now);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc1.connect(gain1);
    gain1.connect(this.sfxVolumeNode!);
    osc1.start(now);
    osc1.stop(now + 0.16);

    // Tone 2
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(noteToFreq('E6'), now + 0.08);
    gain2.gain.setValueAtTime(0.3, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc2.connect(gain2);
    gain2.connect(this.sfxVolumeNode!);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.31);
  }

  public playHit() {
    this.initContext();
    if (!this.ctx || this.sfxVolume === 0) return;
    
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    
    // Synthesize crash/impact sound
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(40, now + 0.35);
    
    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
    
    osc.connect(gain);
    gain.connect(this.sfxVolumeNode!);
    
    osc.start(now);
    osc.stop(now + 0.45);

    // Add noise crunch
    try {
      const bufferSize = this.ctx.sampleRate * 0.3; // 0.3 seconds
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.linearRampToValueAtTime(80, now + 0.3);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.5, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxVolumeNode!);
      noise.start(now);
      noise.stop(now + 0.3);
    } catch {
      // Fallback if buffer creation fails
    }
  }

  public startBGM(themeId: string = 'classic') {
    this.currentTheme = themeId;
    this.initContext();
    if (!this.ctx) return;

    if (this.isBgmPlaying) {
      // If already playing the same theme, do nothing
      return;
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isBgmPlaying = true;
    this.bgmStep = 0;
    this.nextNoteTime = this.ctx.currentTime;
    
    // Scheduler loop - ticks every 100ms, schedules notes slightly in advance
    const scheduler = () => {
      if (!this.isBgmPlaying || !this.ctx) return;
      
      const tempo = 150; // BPM
      const secondsPerBeat = 60.0 / tempo;
      const stepDuration = secondsPerBeat * 0.5; // Eighth notes
      
      while (this.nextNoteTime < this.ctx.currentTime + 0.2) {
        this.scheduleNextNote(this.nextNoteTime, stepDuration);
        this.nextNoteTime += stepDuration;
      }
    };
    
    // Tick immediately and start interval
    scheduler();
    this.bgmIntervalId = setInterval(scheduler, 100);
  }

  private scheduleNextNote(time: number, duration: number) {
    if (!this.ctx || this.bgmVolume === 0) return;

    const themeNotes = BGM_THEMES[this.currentTheme] || BGM_THEMES.classic;
    const noteName = themeNotes[this.bgmStep % themeNotes.length];
    this.bgmStep++;

    if (!noteName) return;

    const freq = noteToFreq(noteName);
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // Change synth type based on theme
    if (this.currentTheme === 'cyberpunk') {
      osc.type = 'sawtooth';
    } else if (this.currentTheme === 'military') {
      osc.type = 'triangle';
    } else {
      osc.type = 'sine'; // classic/night
    }
    
    osc.frequency.setValueAtTime(freq, time);
    
    // Gentle envelope to prevent clicks
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.15, time + 0.02);
    
    if (this.currentTheme === 'cyberpunk') {
      // Cyberpunk staccato feel
      gain.gain.setValueAtTime(0.15, time + duration * 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    } else {
      // Smooth decay
      gain.gain.setValueAtTime(0.15, time + duration - 0.05);
      gain.gain.linearRampToValueAtTime(0.001, time + duration);
    }
    
    // Add lowpass filter for cyberpunk to give it that deep synthwave warmth
    let lastNode: AudioNode = osc;
    if (this.currentTheme === 'cyberpunk') {
      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(1000, time);
      osc.connect(lp);
      lastNode = lp;
    }
    
    lastNode.connect(gain);
    gain.connect(this.bgmVolumeNode!);
    
    osc.start(time);
    osc.stop(time + duration);
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
  }

  public updateTheme(themeId: string) {
    this.currentTheme = themeId;
    if (this.isBgmPlaying) {
      // Reset the music step to align with the new track
      this.bgmStep = 0;
      if (this.ctx) {
        this.nextNoteTime = this.ctx.currentTime;
      }
    }
  }
}

export const sound = new SoundManager();
