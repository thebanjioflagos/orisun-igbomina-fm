import { create } from 'zustand';

interface AudioState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTrack: {
    title: string;
    presenter: string;
  };
  actions: {
    togglePlay: () => void;
    setVolume: (volume: number) => void;
    toggleMute: () => void;
    setTrack: (title: string, presenter: string) => void;
    setIsPlaying: (playing: boolean) => void;
  };
}

export const useAudioStore = create<AudioState>((set) => ({
  isPlaying: false,
  volume: 0.8,
  isMuted: false,
  currentTrack: {
    title: "Morning Drive Show",
    presenter: "Oloye Banji Agboola",
  },
  actions: {
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    setIsPlaying: (playing) => set({ isPlaying: playing }),
    setVolume: (volume) => set({ volume }),
    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
    setTrack: (title, presenter) => set({ currentTrack: { title, presenter } }),
  },
}));
