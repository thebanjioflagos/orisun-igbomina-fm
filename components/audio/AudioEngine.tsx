"use client";

import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useAudioStore } from '@/lib/audio-store';

// Official Stream URL (Falls back to placeholder if env not set)
const STREAM_URL = process.env.NEXT_PUBLIC_STREAM_URL || "https://icecast.radiofrance.fr/fip-midfi.mp3";

export default function AudioEngine() {
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const volume = useAudioStore((state) => state.volume);
  const isMuted = useAudioStore((state) => state.isMuted);
  const { setIsPlaying } = useAudioStore((state) => state.actions);
  
  const howlRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Initialise Howl for live stream
    howlRef.current = new Howl({
      src: [STREAM_URL],
      html5: true, // Required for large streams
      format: ['mp3'],
      autoplay: false,
      volume: isMuted ? 0 : volume,
      onloaderror: (id, error) => {
        console.error("Audio Load Error:", error);
        setIsPlaying(false);
      },
      onplayerror: (id, error) => {
        console.error("Audio Play Error:", error);
        howlRef.current?.once('unlock', () => howlRef.current?.play());
      }
    });

    return () => {
      if (howlRef.current) {
        howlRef.current.unload();
      }
    };
  }, []);

  // Sync play/pause
  useEffect(() => {
    if (!howlRef.current) return;

    if (isPlaying) {
      if (howlRef.current.state() === 'unloaded') {
        howlRef.current.load();
      }
      howlRef.current.play();
    } else {
      howlRef.current.pause();
    }
  }, [isPlaying]);

  // Sync volume/mute
  useEffect(() => {
    if (!howlRef.current) return;
    howlRef.current.volume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  return null; // This component doesn't render anything
}
