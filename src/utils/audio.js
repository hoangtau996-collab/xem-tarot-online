// Web Audio API Synthesizer with Tibetan Singing Bowl & Zen Meditation Generator

class CosmicAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.volume = 0.5; // Default volume 50%
    /* Chế độ nhạc nền: 'tibetan' (Chuông Tây Tạng), 'cosmic' (Vũ Trụ),
       'rain' (Mưa Đêm), 'chimes' (Chuông Gió).
       Danh sách này phải khớp với MUSIC_MODES trong components/Navbar.jsx. */
    this.musicMode = 'tibetan';
    
    // Ambient Music Synth Node references
    this.ambientGain = null;
    this.isPlayingAmbient = false;
    this.ambientNodes = [];

    /* Mọi hẹn giờ của tiếng nền gom vào một mảng. Trước đây mỗi loại tiếng giữ
       một biến riêng (bowlTimer, tingshaTimer), nên thêm một chế độ nhạc là
       phải nhớ khai thêm biến VÀ nhớ dọn nó trong stopAmbient - quên một chỗ
       là chuông của chế độ cũ còn kêu chồng lên chế độ mới. */
    this.ambientTimers = [];

    /* Thang ngũ cung cho tiếng lật bài. Ngũ cung vì bất kỳ hai nốt nào trong
       thang này ghép lại cũng không chỏi tai - lật năm lá liền nhau vẫn nghe
       thuận, bất kể lá nào lật trước lá nào. */
    this.flipScale = [432.00, 486.00, 540.00, 648.00, 720.00];
    this.flipStep = 0;
  }

  /* Đưa tiếng lật về nốt đầu thang, để mỗi phiên trải bài bắt đầu lại từ nốt
     trầm nhất thay vì nối tiếp phiên trước. */
  resetFlipSequence() {
    this.flipStep = 0;
  }

  /* Hẹn một tiếng nền vang lên sau `delay` mili giây. */
  scheduleAmbient(fn, delay) {
    this.ambientTimers.push(setTimeout(fn, delay));
  }

  clearAmbientTimers() {
    this.ambientTimers.forEach(clearTimeout);
    this.ambientTimers = [];
  }

  /* Còn được phép phát tiếng nền của chế độ `mode` nữa không.
     Mọi vòng lặp hẹn giờ đều hỏi câu này trước khi kêu, nếu không thì khách
     tắt tiếng hoặc đổi chế độ xong vẫn còn nghe tiếng của chế độ cũ. */
  ambientAlive(mode) {
    return this.isPlayingAmbient && !this.isMuted && this.ctx && this.musicMode === mode;
  }

  /* Lấy ngẫu nhiên một phần tử. Dùng khắp nơi để cùng một hành động không phát
     ra đúng một tiếng giống hệt nhau lần nào cũng như lần nào. */
  pick(list) {
    return list[Math.floor(Math.random() * list.length)];
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

      /* Mỗi lá một cao độ khác nhau, đi lên dần theo thứ tự lật.
         Trước đây tiếng này cố định ở 432Hz, mà rút tự động thì năm lá lật
         liên tiếp cách nhau 220ms - nghe ra đúng năm tiếng y hệt nhau, giống
         máy đếm hơn giống lật bài. Nay chạy vòng qua thang ngũ cung nên chuỗi
         lật thành một câu nhạc ngắn, và lá sau nghe cao hơn lá trước. */
      const base = this.flipScale[this.flipStep % this.flipScale.length];
      this.flipStep += 1;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(base, now);
      osc.frequency.exponentialRampToValueAtTime(base * 2, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(base * 3, now + 0.24);

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
      /* Bốn câu lấp lánh thay vì một. Tiếng này vang lên rất nhiều lần trong
         một phiên - lưu nhật ký, đổi ngôn ngữ, đổi chế độ nhạc, lật hết bài -
         nên dùng mãi một câu đi lên Đô trưởng thì chỉ vài phút là thành tiếng
         thông báo của máy. Bốn câu đều dựng trên cùng gốc nên vẫn là một nhà. */
      const patterns = [
        [523.25, 659.25, 783.99, 1046.50, 1318.51], // đi lên, sáng
        [1046.50, 783.99, 659.25, 587.33, 523.25],  // đi xuống, dịu
        [523.25, 783.99, 659.25, 1046.50, 987.77],  // nhảy quãng, tinh nghịch
        [659.25, 880.00, 1174.66, 1318.51]          // thưa hơn, thoáng
      ];
      const freqs = this.pick(patterns);
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

      const builders = {
        tibetan: () => this.setupTibetanBowlDrone(now), // 🥣 Chuông xoay Tây Tạng
        cosmic: () => this.setupCosmicPad(now),         // 🌌 Nền vũ trụ
        rain: () => this.setupRainAmbience(now),        // 🌧️ Mưa đêm
        chimes: () => this.setupWindChimes(now)         // 🎐 Chuông gió
      };
      (builders[this.musicMode] || builders.tibetan)();
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
    if (!this.ambientAlive('tibetan')) return;

    // Frequencies of brass singing bowls (288Hz, 432Hz, 528Hz, 648Hz)
    const pitch = this.pick([288.00, 432.00, 528.00, 648.00]);

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
    this.scheduleAmbient(() => this.scheduleTibetanBowlStrikes(), 5000 + Math.random() * 4000);
  }

  // 🔔 Tibetan Tingsha Cymbal Bell Ringing
  scheduleTingshaBell() {
    if (!this.ambientAlive('tibetan')) return;

    /* Chuông tingsha thật là hai chiếc chũm choẹ nhỏ gõ vào nhau, không bao
       giờ ra đúng một cao độ hai lần. Trước đây tiếng này khoá cứng ở 1760Hz
       và ngân đúng 4 giây, cứ 9-15 giây lại vang một lần - ngồi đọc bản giải
       chừng mười phút là nghe chừng năm chục tiếng chuông giống hệt nhau.
       Nay bốc cao độ trong một thang, và ngân dài ngắn khác nhau mỗi lần. */
    const tingshaFreq = this.pick([1567.98, 1760.00, 1975.53, 2093.00, 2637.02]);
    const ring = 3.0 + Math.random() * 2.5;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(tingshaFreq, now);

      /* Bồi âm lệch một quãng rất nhỏ so với âm gốc. Hai tần số gần nhau đập
         vào nhau tạo ra tiếng ngân rung đặc trưng của kim loại - thiếu nó thì
         chuông nghe phẳng như tiếng máy báo. */
      const shimmer = this.ctx.createOscillator();
      shimmer.type = 'sine';
      shimmer.frequency.setValueAtTime(tingshaFreq * 1.004, now);

      const bellGain = this.ctx.createGain();
      const currentGain = this.volume * (0.022 + Math.random() * 0.014);

      bellGain.gain.setValueAtTime(0.0001, now);
      bellGain.gain.linearRampToValueAtTime(currentGain, now + 0.01);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + ring);

      osc.connect(bellGain);
      shimmer.connect(bellGain);
      bellGain.connect(this.ambientGain);

      osc.start(now);
      shimmer.start(now);
      osc.stop(now + ring);
      shimmer.stop(now + ring);
    } catch (e) {}

    // Nhịp cũng thưa dày khác nhau, để không đoán trước được lúc nào chuông kêu
    this.scheduleAmbient(() => this.scheduleTingshaBell(), 8000 + Math.random() * 11000);
  }

  // 🌌 Cosmic Space Pad Theme
  setupCosmicPad(now) {
    const chordFreqs = [110.00, 164.81, 220.00, 277.18];
    chordFreqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      /* Cho mỗi bè trôi lên xuống rất chậm quanh nốt của nó, mỗi bè một tốc độ
         khác nhau nên không bao giờ khớp pha. Thiếu phần này thì hợp âm đứng
         chết một chỗ - tai người nghe chừng nửa phút là lọc nó ra khỏi ý thức
         và chỉ còn thấy ù ù khó chịu. */
      const drift = this.ctx.createOscillator();
      drift.type = 'sine';
      drift.frequency.setValueAtTime(0.05 + i * 0.017, now);
      const driftDepth = this.ctx.createGain();
      driftDepth.gain.setValueAtTime(freq * 0.004, now);
      drift.connect(driftDepth);
      driftDepth.connect(osc.frequency);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320 + i * 80, now);

      osc.connect(filter);
      filter.connect(this.ambientGain);
      osc.start(now);
      drift.start(now);

      this.ambientNodes.push(osc, drift);
    });

    this.scheduleStarPing();
  }

  /* ✨ Tiếng sao xa: một nốt cao, mảnh, vang lên thưa thớt.
     Chế độ Vũ Trụ trước đây chỉ có hợp âm nền và không có lấy một sự kiện nào,
     nên nghe như quên tắt máy chứ không như một bản nhạc. */
  scheduleStarPing() {
    if (!this.ambientAlive('cosmic')) return;

    const freq = this.pick([880.00, 1108.73, 1318.51, 1661.22, 1975.53]);
    const ring = 2.5 + Math.random() * 3;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      // Trượt xuống nhẹ trong lúc tắt dần, nghe như tiếng vọng đang đi xa
      osc.frequency.exponentialRampToValueAtTime(freq * 0.94, now + ring);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.02, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + ring);

      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start(now);
      osc.stop(now + ring);
    } catch (e) {}

    this.scheduleAmbient(() => this.scheduleStarPing(), 7000 + Math.random() * 12000);
  }

  /* 🌧️ Mưa đêm: tiếng mưa rơi đều, thỉnh thoảng có giọt nước rơi vào vũng.
     Dựng bằng nhiễu trắng lọc qua bộ lọc, không nạp file âm thanh nào - trang
     không nặng thêm một byte. */
  setupRainAmbience(now) {
    /* Đệm nhiễu dài 2 giây rồi cho chạy vòng. Ngắn hơn thì tai bắt được chỗ
       nối và nghe thành tiếng lặp; dài hơn thì tốn bộ nhớ mà không hay thêm. */
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Cắt phần cao chói, giữ lại tiếng rào rào trầm của mưa qua mái
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100, now);
    filter.Q.setValueAtTime(0.7, now);

    /* Mưa thật lúc nặng hạt lúc thưa. Cho độ mở của bộ lọc trôi rất chậm để
       cơn mưa dày lên rồi nhẹ đi, thay vì rào đều một mức suốt buổi. */
    const sweep = this.ctx.createOscillator();
    sweep.type = 'sine';
    sweep.frequency.setValueAtTime(0.03, now);
    const sweepDepth = this.ctx.createGain();
    sweepDepth.gain.setValueAtTime(450, now);
    sweep.connect(sweepDepth);
    sweepDepth.connect(filter.frequency);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.9, now);

    noise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.ambientGain);

    noise.start(now);
    sweep.start(now);
    this.ambientNodes.push(noise, sweep);

    this.scheduleWaterDrop();
  }

  // 💧 Một giọt nước rơi vào vũng, thưa thớt giữa tiếng mưa
  scheduleWaterDrop() {
    if (!this.ambientAlive('rain')) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';

      /* Giọt nước nghe ra tiếng "tóc" là nhờ cao độ vọt LÊN rất nhanh khi mặt
         nước khép lại, chứ không phải nhờ cao độ nào cố định. */
      const start = 420 + Math.random() * 380;
      osc.frequency.setValueAtTime(start, now);
      osc.frequency.exponentialRampToValueAtTime(start * 2.6, now + 0.07);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.05, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch (e) {}

    this.scheduleAmbient(() => this.scheduleWaterDrop(), 1800 + Math.random() * 4500);
  }

  /* 🎐 Chuông gió: nền gió rất nhẹ, và từng chùm chuông kim loại khẽ chạm nhau
     khi có luồng gió đi qua. */
  setupWindChimes(now) {
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const wind = this.ctx.createBufferSource();
    wind.buffer = buffer;
    wind.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(420, now);
    filter.Q.setValueAtTime(0.9, now);

    // Gió lên rồi lắng, chu kỳ khoảng hai mươi giây
    const gust = this.ctx.createOscillator();
    gust.type = 'sine';
    gust.frequency.setValueAtTime(0.05, now);
    const gustDepth = this.ctx.createGain();
    gustDepth.gain.setValueAtTime(240, now);
    gust.connect(gustDepth);
    gustDepth.connect(filter.frequency);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.35, now);

    wind.connect(filter);
    filter.connect(windGain);
    windGain.connect(this.ambientGain);

    wind.start(now);
    gust.start(now);
    this.ambientNodes.push(wind, gust);

    this.scheduleChimeCluster();
  }

  // 🎐 Một luồng gió chạm vào chuông: hai tới bốn thanh kêu lệch nhau chút ít
  scheduleChimeCluster() {
    if (!this.ambientAlive('chimes')) return;

    /* Thang ngũ cung, đúng như chuông gió ngoài đời: các thanh được cắt sẵn
       theo một thang không có nốt chỏi, nên gió thổi kiểu gì cũng ra tiếng
       thuận tai. Đó là lý do chuông gió nghe hay mà không cần ai chơi. */
    const scale = [587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51];
    const count = 2 + Math.floor(Math.random() * 3);

    try {
      for (let i = 0; i < count; i++) {
        // Các thanh không bao giờ kêu cùng lúc - gió chạm thanh này rồi mới tới thanh kia
        const at = this.ctx.currentTime + i * (0.06 + Math.random() * 0.13);
        const freq = this.pick(scale);
        const ring = 2.2 + Math.random() * 2;

        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, at);

        // Bồi âm kim loại: quãng cao lệch nhẹ, cho ra chất ống nhôm
        const metal = this.ctx.createOscillator();
        metal.type = 'sine';
        metal.frequency.setValueAtTime(freq * 2.76, at);
        const metalGain = this.ctx.createGain();
        metalGain.gain.setValueAtTime(0.25, at);
        metal.connect(metalGain);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.0001, at);
        gain.gain.linearRampToValueAtTime(this.volume * (0.02 + Math.random() * 0.02), at + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, at + ring);

        osc.connect(gain);
        metalGain.connect(gain);
        gain.connect(this.ambientGain);

        osc.start(at);
        metal.start(at);
        osc.stop(at + ring);
        metal.stop(at + ring);
      }
    } catch (e) {}

    // Gió tới thất thường: có lúc dồn dập, có lúc lặng khá lâu
    this.scheduleAmbient(() => this.scheduleChimeCluster(), 4000 + Math.random() * 14000);
  }

  stopAmbient() {
    if (!this.isPlayingAmbient) return;
    try {
      this.clearAmbientTimers();

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
