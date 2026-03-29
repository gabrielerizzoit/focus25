import { Cloud, Coffee, Radio, Volume2 } from 'lucide-react';
import { useAudio, type SoundType } from '@/hooks/useAudio';
import { Slider } from '@/components/ui/slider';

const sounds: { id: SoundType; label: string; icon: typeof Cloud }[] = [
  { id: 'rain', label: 'Rain', icon: Cloud },
  { id: 'cafe', label: 'Café', icon: Coffee },
  { id: 'white-noise', label: 'Noise', icon: Radio },
];

const AudioPlayer = () => {
  const { activeSound, isPlaying, volume, playSound, setVolume } = useAudio();

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-xs mx-auto">
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
      {activeSound && (
        <div className="flex items-center gap-2 w-full px-4">
          <Volume2 size={14} className="text-muted-foreground shrink-0" />
          <Slider
            value={[volume * 100]}
            onValueChange={([v]) => setVolume(v / 100)}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
