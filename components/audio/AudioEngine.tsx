"use client";

import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { useAudioStore } from '@/lib/audio-store';

// Ordered list of stream URLs to try (Falls back to local file if network fails)
const STREAM_URLS = [
  process.env.NEXT_PUBLIC_STREAM_URL,
  "https://ice1.somafm.com/groovesalad-128-mp3",
  "/audio/jingles/station-id.mp3"
].filter(Boolean) as string[];

export default function AudioEngine() {
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const volume = useAudioStore((state) => state.volume);
  const isMuted = useAudioStore((state) => state.isMuted);
  const { setIsPlaying } = useAudioStore((state) => state.actions);
  
  const howlRef = useRef<Howl | null>(null);
  const [streamIndex, setStreamIndex] = useState(0);

  useEffect(() => {
    // Initialise Howl for live stream
    howlRef.current = new Howl({
      src: [STREAM_URLS[streamIndex]],
      html5: true, // Required for large streams
      format: ['mp3'],
      autoplay: false,
      loop: streamIndex === STREAM_URLS.length - 1, // Loop if it's the local fallback jingle
      volume: isMuted ? 0 : volume,
      onloaderror: (id, error) => {
        console.warn(`Audio Load Error (URL: ${STREAM_URLS[streamIndex]}):`, error);
        
        if (streamIndex < STREAM_URLS.length - 1) {
          console.log("Attempting fallback stream...");
          setStreamIndex((prev) => prev + 1);
        } else {
          console.error("All audio streams failed to load.");
          setIsPlaying(false);
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamIndex]);

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
  }, [isPlaying, streamIndex]);

  // Sync volume/mute
  useEffect(() => {
    if (!howlRef.current) return;
    howlRef.current.volume(isMuted ? 0 : volume);
  }, [volume, isMuted, streamIndex]);

  return null; // This component doesn't render anything
}
