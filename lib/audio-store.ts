import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AudioState {
  isPlaying:     boolean;
  volume:        number;
  isMuted:       boolean;
  isImmersive:   boolean;
  isComfortMode: boolean;
  isLightTheme:  boolean;
  currentTrack: {
    title:     string;
    presenter: string;
  };
  actions: {
    togglePlay:       () => void;
    setVolume:        (volume: number) => void;
    toggleMute:       () => void;
    toggleImmersive:  () => void;
    toggleComfortMode:() => void;
    toggleLightTheme: () => void;
    setTrack:         (title: string, presenter: string) => void;
    setIsPlaying:     (playing: boolean) => void;
  };
}

/** Apply / remove .comfort-mode on <html> immediately in the browser */
function applyComfortMode(enabled: boolean) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('comfort-mode', enabled);
}

/** Apply / remove .light-theme on <html> immediately in the browser */
function applyLightTheme(enabled: boolean) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('light-theme', enabled);
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      isPlaying:     false,
      volume:        0.8,
      isMuted:       false,
      isImmersive:   false, // Default to false for better mobile performance & battery life
      isComfortMode: false,
      isLightTheme:  false,
      currentTrack: {
        title:     'Morning Drive Show',
        presenter: 'Oloye Banji Agboola',
      },
      actions: {
        togglePlay:       () => set((s) => ({ isPlaying: !s.isPlaying })),
        setIsPlaying:     (playing) => set({ isPlaying: playing }),
        setVolume:        (volume)  => set({ volume }),
        toggleMute:       () => set((s) => ({ isMuted: !s.isMuted })),
        toggleImmersive:  () => set((s) => ({ isImmersive: !s.isImmersive })),
        toggleComfortMode:() => set((s) => {
          const next = !s.isComfortMode;
          applyComfortMode(next);
          return { isComfortMode: next };
        }),
        toggleLightTheme: () => set((s) => {
          const next = !s.isLightTheme;
          applyLightTheme(next);
          return { isLightTheme: next };
        }),
        setTrack: (title, presenter) => set({ currentTrack: { title, presenter } }),
      },
    }),
    {
      name:    'orisun-ui-prefs',
      // Only persist UI preferences — never audio playback state
      partialize: (s) => ({
        isImmersive:   s.isImmersive,
        isComfortMode: s.isComfortMode,
        isLightTheme:  s.isLightTheme,
        volume:        s.volume,
        isMuted:       s.isMuted,
      }),
      onRehydrateStorage: () => (state) => {
        // Re-apply DOM class on page load from persisted preference
        if (state) {
          applyComfortMode(state.isComfortMode);
          applyLightTheme(state.isLightTheme);
        }
      },
    }
  )
);
