// Web Audio API Synthesizer with Zen Meditation & Babbling Brook Water Sound Generator

class CosmicAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.volume = 0.5; // Default volume 50%
    this.musicMode = 'stream'; // 'stream' (Thiền Suối Chảy) or 'cosmic' (Vũ Trụ)
    
    // Ambient Music Synth Node references
    this.ambientGain = null;
    this.isPlayingAmbient = false;
    this.ambientNodes = [];
    this.melodyTimer = null;
    this.waterTimer = null;
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
      this.ambientGain.gain.setValueAtTime(this.volume * 0.1, this.ctx.currentTime);
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

  // Sound 2: Crystal Chime Card Flip
  playFlipSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.24);

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

  // Master Ambient Synthesizer (Thiền Suối Chảy Róc Rách & Nhạc Không Lời)
  startAmbient() {
    if (this.isMuted || this.isPlayingAmbient) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.linearRampToValueAtTime(this.volume * 0.1, now + 2);

      this.ambientGain.connect(this.ctx.destination);
      this.isPlayingAmbient = true;

      if (this.musicMode === 'stream') {
        // 🌊 Synthesize Continuous Babbling Brook Water Stream Sound
        this.setupWaterStream(now);
        // 🧘 Synthesize Deep Meditation Tibetan Bowl & Zen Flute Chords
        this.setupZenMeditationChords(now);
      } else {
        // 🌌 Cosmic Space Pad
        this.setupCosmicPad(now);
      }
    } catch (err) {
      console.warn('Ambient start error:', err);
    }
  }

  // 🌊 Babbling Brook Water Stream Generator (Âm thanh suối chảy róc rách)
  setupWaterStream(now) {
    // 1. Continuous Soft Water Flow (Rushing Water Noise)
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const waterNoise = this.ctx.createBufferSource();
    waterNoise.buffer = buffer;
    waterNoise.loop = true;

    // Water Stream Bandpass Filter (Dynamic Modulation)
    const waterFilter = this.ctx.createBiquadFilter();
    waterFilter.type = 'bandpass';
    waterFilter.frequency.setValueAtTime(650, now);
    waterFilter.Q.setValueAtTime(1.8, now);

    // Filter LFO to simulate undulating water currents
    const filterLfo = this.ctx.createOscillator();
    filterLfo.type = 'sine';
    filterLfo.frequency.setValueAtTime(0.2, now);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(150, now);
    filterLfo.connect(lfoGain);
    lfoGain.connect(waterFilter.frequency);
    filterLfo.start(now);

    const waterGainNode = this.ctx.createGain();
    waterGainNode.gain.setValueAtTime(0.04, now);

    waterNoise.connect(waterFilter);
    waterFilter.connect(waterGainNode);
    waterGainNode.connect(this.ambientGain);

    waterNoise.start(now);
    this.ambientNodes.push(waterNoise, filterLfo);

    // 2. Random Babbling Water Trickles & Bubble Pops
    this.scheduleWaterBubbles();
  }

  scheduleWaterBubbles() {
    if (!this.isPlayingAmbient || this.musicMode !== 'stream' || !this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      // Water bubble drop pitch & frequency
      const pitch = 500 + Math.random() * 700; // 500Hz - 1200Hz
      const osc = this.ctx.createOscillator();
      const bubbleGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      // Fast pitch drop simulates water droplet hitting stream
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, now + 0.08);

      const currentGain = this.volume * (0.02 + Math.random() * 0.03);
      bubbleGain.gain.setValueAtTime(0.001, now);
      bubbleGain.gain.linearRampToValueAtTime(currentGain, now + 0.01);
      bubbleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(bubbleGain);
      bubbleGain.connect(this.ambientGain);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}

    // Schedule next water trickle bubble between 80ms - 250ms
    const nextBubble = 80 + Math.random() * 170;
    this.waterTimer = setTimeout(() => this.scheduleWaterBubbles(), nextBubble);
  }

  // 🧘 Deep Zen Meditation Chords (432Hz Solfeggio Harmony)
  setupZenMeditationChords(now) {
    // Tibetan Singing Bowl / Zen Meditation Frequencies (432Hz, 528Hz Miracle tone, 648Hz)
    const zenFreqs = [216.00, 288.00, 432.00, 528.00];

    zenFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const padGain = this.ctx.createGain();
      // Soft breathing volume modulation
      padGain.gain.setValueAtTime(0.01, now);
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      osc.connect(filter);
      filter.connect(padGain);
      padGain.connect(this.ambientGain);

      osc.start(now);
      this.ambientNodes.push(osc);
    });

    // Schedule Zen Bamboo Chime / Bell Melody Notes
    this.scheduleZenMelody();
  }

  scheduleZenMelody() {
    if (!this.isPlayingAmbient || this.musicMode !== 'stream' || !this.ctx || this.isMuted) return;

    // Zen Pentatonic Scale (D4, F4, G4, A4, C5, D5)
    const scale = [293.66, 349.23, 392.00, 440.00, 523.25, 587.33];
    const note = scale[Math.floor(Math.random() * scale.length)];

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, now);

      const currentGain = this.volume * 0.05;
      bellGain.gain.setValueAtTime(0.0001, now);
      bellGain.gain.linearRampToValueAtTime(currentGain, now + 0.8);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.0); // Long decay ringing like Tibetan bowl

      osc.connect(bellGain);
      bellGain.connect(this.ambientGain);

      osc.start(now);
      osc.stop(now + 5.0);
    } catch (e) {}

    const delay = 4000 + Math.random() * 5000;
    this.melodyTimer = setTimeout(() => this.scheduleZenMelody(), delay);
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
      if (this.melodyTimer) clearTimeout(this.melodyTimer);
      if (this.waterTimer) clearTimeout(this.waterTimer);

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
