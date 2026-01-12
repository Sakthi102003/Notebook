
// Audio Engine using Web Audio API for procedural sound generation
// No external assets required.

class CyberAudioEngine {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private isMuted: boolean = false;

    constructor() {
        this.init();
    }

    private init() {
        try {
            // @ts-ignore - Handle browser compatibility
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContextClass();
            this.masterGain = this.ctx.createGain();
            this.masterGain.connect(this.ctx.destination);
            this.masterGain.gain.value = 0.3; // Default volume

            // Attempt to resume context if suspended (browser autopilot policy)
            if (this.ctx.state === 'suspended') {
                const resume = () => {
                    this.ctx?.resume();
                    window.removeEventListener('click', resume);
                    window.removeEventListener('keydown', resume);
                };
                window.addEventListener('click', resume);
                window.addEventListener('keydown', resume);
            }

        } catch (e) {
            console.error("AudioEngine initialization failed:", e);
        }
    }

    public setMute(mute: boolean) {
        this.isMuted = mute;
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(mute ? 0 : 0.3, this.ctx?.currentTime || 0);
        }
    }

    public toggleMute() {
        this.setMute(!this.isMuted);
        return this.isMuted;
    }

    private createOscillator(type: OscillatorType, freq: number, duration: number, gainVal: number = 0.1) {
        if (!this.ctx || !this.masterGain || this.isMuted) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    // SOUND FX DEFINITIONS

    // High-tech chirp for hover
    public playHover() {
        if (!this.ctx || this.isMuted) return;

        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        // Frequency sweep
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.linearRampToValueAtTime(1200, t + 0.05);

        gain.gain.setValueAtTime(0.05, t); // Low volume for hover to not be annoying
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(t);
        osc.stop(t + 0.05);
    }

    // Mechanical switch click
    public playClick() {
        if (!this.ctx || this.isMuted) return;

        // 1. Low thud
        this.createOscillator('square', 150, 0.1, 0.1);
        // 2. High click
        this.createOscillator('triangle', 2000, 0.05, 0.05);
    }

    // Digital typing sound
    public playType() {
        if (!this.ctx || this.isMuted) return;
        // Very short burst
        this.createOscillator('square', 600 + Math.random() * 200, 0.03, 0.05);
    }

    // Success/Confirm sound
    public playSuccess() {
        if (!this.ctx || this.isMuted) return;

        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.setValueAtTime(880, t + 0.1);

        gain.gain.setValueAtTime(0.1, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.3);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(t);
        osc.stop(t + 0.3);
    }
}

export const audioEngine = new CyberAudioEngine();
