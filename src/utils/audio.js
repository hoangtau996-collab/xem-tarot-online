// Web Audio API Synthesizer with Tibetan Singing Bowl & Zen Meditation Generator

class CosmicAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.volume = 0.5; // Default volume 50%
    this.musicMode = 'tibetan'; // 'tibetan' (Chuông Xoay Tây Tạng) or 'cosmic' (Vũ Trụ)
    
    // Ambient Music Synth Node references
    this.ambientGain = null;
    this.isPlayingAmbient = false;
    this.ambientNodes = [];
    this.bowlTimer = null;
    this.tingshaTimer = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(newVolume) {
    this.volume = Math.max(0, Math.min(1, newVolume));
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.volume * 0.12, this.ctx.currentTime);
    }
  }

  setMusicMode(mode) {
    this.musicMode = mode;
    if (this.isPlayingAmbient) {
      this.stopAmbient();
      setTimeout(() => this.startAmbient(), 300);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
    }
    return this.isMuted;
  }

  // Sound 1: Card Shuffle / Swish
  playShuffleSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, this.ctx.currentTime);
      filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      const currentGain = this.volume * 0.15;
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(currentGain, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(this.ctx.currentTime + 0.25);
    } catch (e) {}
  }

  // Sound 2: Tibetan Bell Card Flip Chime
  playFlipSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, now);
      osc.frequency.exponentialRampToValueAtTime(864, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(1296, now + 0.24);

      const currentGain = this.volume * 0.2;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(currentGain, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {}
  }

  // Sound 3: Cosmic Sparkle
  playSparkleSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      freqs.forEach((freq, idx) => {
        const now = this.ctx.currentTime + idx * 0.04;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        const currentGain = this.volume * 0.1;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(currentGain, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.3);
      });
    } catch (e) {}
  }

  // Master Ambient Synthesizer (Chuông Xoay Tây Tạng - Tibetan Singing Bowls)
  startAmbient() {
    if (this.isMuted || this.isPlayingAmbient) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.linearRampToValueAtTime(this.volume * 0.12, now + 2);

      this.ambientGain.connect(this.ctx.destination);
      this.isPlayingAmbient = true;

      if (this.musicMode === 'tibetan') {
        // 🥣 Tibetan Singing Bowl Deep Drone & Rim Vibration
        this.setupTibetanBowlDrone(now);
      } else {
        // 🌌 Cosmic Space Pad
        this.setupCosmicPad(now);
      }
    } catch (err) {
      console.warn('Ambient start error:', err);
    }
  }

  // 🥣 Tibetan Singing Bowl Deep Drone (432Hz Root & Harmonics)
  setupTibetanBowlDrone(now) {
    // Frequencies representing brass Tibetan bowl fundamentals & overtones
    const bowlHarmonics = [
      { freq: 108.00, gain: 0.05, type: 'sine' },      // Low OM Sub-bass
      { freq: 216.00, gain: 0.04, type: 'sine' },      // Low Octave
      { freq: 432.00, gain: 0.06, type: 'sine' },      // Sacred 432Hz Fundamental
      { freq: 648.00, gain: 0.02, type: 'triangle' },  // Perfect 5th Overtone
      { freq: 864.00, gain: 0.015, type: 'sine' }      // High Harmonic
    ];

    bowlHarmonics.forEach((h, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = h.type;
      osc.frequency.setValueAtTime(h.freq, now);

      // Tremolo LFO to simulate the spinning rim vibration of a Tibetan Singing Bowl
      const tremoloLfo = this.ctx.createOscillator();
      tremoloLfo.type = 'sine';
      tremoloLfo.frequency.setValueAtTime(0.6 + idx * 0.1, now); // 0.6Hz beating rate

      const tremoloGain = this.ctx.createGain();
      tremoloGain.gain.setValueAtTime(h.gain * 0.3, now);

      tremoloLfo.connect(tremoloGain.gain);

      const hGain = this.ctx.createGain();
      hGain.gain.setValueAtTime(h.gain, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500 + idx * 100, now);

      osc.connect(filter);
      filter.connect(hGain);
      hGain.connect(this.ambientGain);

      osc.start(now);
      tremoloLfo.start(now);

      this.ambientNodes.push(osc, tremoloLfo);
    });

    // Schedule Periodic Tibetan Bowl Strikes & Tingsha Bell Ringing
    this.scheduleTibetanBowlStrikes();
    this.scheduleTingshaBell();
  }

  // 🥣 Periodic Gentle Tibetan Singing Bowl Strike
  scheduleTibetanBowlStrikes() {
    if (!this.isPlayingAmbient || this.musicMode !== 'tibetan' || !this.ctx || this.isMuted) return;

    // Frequencies of brass singing bowls (288Hz, 432Hz, 528Hz, 648Hz)
    const bowlStrikes = [288.00, 432.00, 528.00, 648.00];
    const pitch = bowlStrikes[Math.floor(Math.random() * bowlStrikes.length)];

    try {
      const now = this.ctx.currentTime;
      
      // Main strike oscillator
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(pitch, now);

      // Metallic overtone oscillator (slight detune for brass bowl resonance)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(pitch * 2.01, now);

      const strikeGain = this.ctx.createGain();
      const currentGain = this.volume * 0.08;

      strikeGain.gain.setValueAtTime(0.0001, now);
      strikeGain.gain.linearRampToValueAtTime(currentGain, now + 0.02); // Sharp mallet strike
      strikeGain.gain.exponentialRampToValueAtTime(0.0001, now + 7.5); // Deep 7.5-second ringing decay!

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(strikeGain);
      strikeGain.connect(this.ambientGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 7.5);
      osc2.stop(now + 7.5);
    } catch (e) {}

    // Schedule next bowl strike every 5 - 9 seconds
    const delay = 5000 + Math.random() * 4000;
    this.bowlTimer = setTimeout(() => this.scheduleTibetanBowlStrikes(), delay);
  }

  // 🔔 Tibetan Tingsha Cymbal Bell Ringing
  scheduleTingshaBell() {
    if (!this.isPlayingAmbient || this.musicMode !== 'tibetan' || !this.ctx || this.isMuted) return;

    // High crystalline Tingsha bell frequencies (1760Hz, 2640Hz)
    const tingshaFreq = 1760.00;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(tingshaFreq, now);

      const bellGain = this.ctx.createGain();
      const currentGain = this.volume * 0.03;

      bellGain.gain.setValueAtTime(0.0001, now);
      bellGain.gain.linearRampToValueAtTime(currentGain, now + 0.01);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);

      osc.connect(bellGain);
      bellGain.connect(this.ambientGain);

      osc.start(now);
      osc.stop(now + 4.0);
    } catch (e) {}

    // Schedule next Tingsha chime every 9 - 15 seconds
    const delay = 9000 + Math.random() * 6000;
    this.tingshaTimer = setTimeout(() => this.scheduleTingshaBell(), delay);
  }

  // 🌌 Cosmic Space Pad Theme
  setupCosmicPad(now) {
    const chordFreqs = [110.00, 164.81, 220.00, 277.18];
    chordFreqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320 + i * 80, now);

      osc.connect(filter);
      filter.connect(this.ambientGain);
      osc.start(now);

      this.ambientNodes.push(osc);
    });
  }

  stopAmbient() {
    if (!this.isPlayingAmbient) return;
    try {
      if (this.bowlTimer) clearTimeout(this.bowlTimer);
      if (this.tingshaTimer) clearTimeout(this.tingshaTimer);

      if (this.ambientGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
      }
      setTimeout(() => {
        if (this.ambientNodes) {
          this.ambientNodes.forEach(node => {
            try { node.stop(); } catch (e) {}
          });
        }
        this.isPlayingAmbient = false;
        this.ambientNodes = [];
      }, 1200);
    } catch (e) {
      this.isPlayingAmbient = false;
    }
  }
}

export const cosmicAudio = new CosmicAudioSynthesizer();
