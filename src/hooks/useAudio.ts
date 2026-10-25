import { useState, useRef, useCallback, useEffect } from 'react';

export type SoundType = 'rain' | 'cafe' | 'white-noise';

const SOUND_FILES: Record<SoundType, string> = {
  rain: '/audio/rain.wav',
  cafe: '/audio/cafe.mp3',
  'white-noise': '/audio/white-noise.wav',
};

export function useAudio() {
  const [activeSound, setActiveSound] = useState<SoundType | null>(null);
  const [volume, setVolumeState] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopCurrent = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const playSound = useCallback((sound: SoundType) => {
    stopCurrent();
    if (sound === activeSound && isPlaying) {
      setActiveSound(null);
      return;
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'audio_select', { sound_type: sound });
    }
    const audio = new Audio(SOUND_FILES[sound]);
    audio.loop = true;
    audio.volume = volume;
    audio.play().catch(() => {});
    audioRef.current = audio;
    setActiveSound(sound);
    setIsPlaying(true);
  }, [activeSound, isPlaying, volume, stopCurrent]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !activeSound) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying, activeSound]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);



  return { activeSound, isPlaying, volume, playSound, togglePlay, setVolume, stopCurrent };
}

// Alert sounds via Web Audio API (tiny beeps, not background music)
export async function playBeep(frequency = 800, durationMs = 150) {
  try {
    const ctx = new AudioContext();
    await ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = frequency;
    gain.gain.value = 0.3;
    osc.start();
    osc.stop(ctx.currentTime + durationMs / 1000);
    setTimeout(() => ctx.close(), durationMs + 100);
  } catch {}
}

export async function playChime() {
  try {
    const ctx = new AudioContext();
    await ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = 523.25;
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
    osc.start();
    osc.stop(ctx.currentTime + 1.5);
    setTimeout(() => ctx.close(), 2000);
  } catch {}
}
