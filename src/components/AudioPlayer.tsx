import { Cloud, Coffee, Radio, Volume2 } from 'lucide-react';
import type { SoundType } from '@/hooks/useAudio';
import { useAudioContext } from '@/contexts/AudioContext';
import { Slider } from '@/components/ui/slider';

const sounds: { id: SoundType; label: string; icon: typeof Cloud }[] = [
  { id: 'rain', label: 'Rain', icon: Cloud },
  { id: 'cafe', label: 'Café', icon: Coffee },
  { id: 'white-noise', label: 'Noise', icon: Radio },
];

const AudioPlayer = ({ compact = false }: { compact?: boolean }) => {
  const { activeSound, isPlaying, volume, playSound, setVolume } = useAudioContext();
  const playing = !!activeSound && isPlaying;

  if (compact) {
    return (
      <div className="flex gap-2">
        {sounds.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => playSound(id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
              activeSound === id && isPlaying
                ? 'bg-primary/20 text-primary border border-primary/40'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-transparent'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-3 gap-2">
        {sounds.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => playSound(id)}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm border transition-colors ${
              activeSound === id && isPlaying
                ? 'bg-primary/15 text-primary border-primary/60'
                : 'bg-muted/50 text-foreground border-transparent hover:bg-muted'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>
      <div className={`flex items-center gap-2 transition-opacity ${playing ? '' : 'opacity-40'}`}>
        <Volume2 size={16} className="text-muted-foreground shrink-0" />
        <Slider
          value={[volume * 100]}
          onValueChange={([v]) => setVolume(v / 100)}
          max={100}
          step={1}
          className="flex-1"
          aria-label="Volume"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
