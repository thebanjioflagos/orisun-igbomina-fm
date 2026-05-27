import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Howl } from "howler";

/**
 * Jingle Slots — each maps to a specific user interaction or page event.
 * Place your 8 MP3/M4A files into  public/audio/jingles/  using these names.
 */
export const JINGLE_SLOTS = {
  welcome:           "/audio/jingles/welcome.mp3?v=3",           // 1. Hero section on first visit
  stationId:         "/audio/jingles/station-id.mp3?v=3",        // 2. Before live stream starts
  transition1:       "/audio/jingles/transition-1.mp3?v=3",      // 3. Page navigation sound A
  transition2:       "/audio/jingles/transition-2.mp3?v=3",      // 4. Page navigation sound B
  newsIntro:         "/audio/jingles/news-intro.m4a?v=3",        // 5. News article audio
  dedicationThanks:  "/audio/jingles/dedication-thanks.mp3?v=3", // 6. Dedication confirmation
  reportReceived:    "/audio/jingles/report-received.mp3?v=3",   // 7. Eye-witness success
  adminWelcome:      "/audio/jingles/admin-welcome.mp3?v=3",     // 8. Admin login
} as const;

export type JingleSlot = keyof typeof JINGLE_SLOTS;

interface JingleState {
  /** Master toggle — lets users silence all sound effects globally */
  sfxEnabled: boolean;
  /** 0 – 1 jingle volume */
  sfxVolume: number;
  /** Currently playing slot (or null) */
  nowPlaying: JingleSlot | null;
  actions: {
    toggleSfx: () => void;
    setSfxVolume: (v: number) => void;
    play: (slot: JingleSlot) => void;
    stop: () => void;
  };
}

// Browser-only audio cache using Howler so we never create duplicate instances
const howlCache: Partial<Record<JingleSlot, Howl>> = {};

function getOrCreateHowl(slot: JingleSlot): Howl | null {
  if (typeof window === "undefined") return null;

  if (!howlCache[slot]) {
    howlCache[slot] = new Howl({
      src: [JINGLE_SLOTS[slot]],
      preload: true,
      html5: false, // Use Web Audio API for short jingles for low latency
    });
  }
  return howlCache[slot]!;
}

/** Preload all jingles so they play instantly */
export function preloadAllJingles() {
  if (typeof window === "undefined") return;
  (Object.keys(JINGLE_SLOTS) as JingleSlot[]).forEach((slot) => {
    getOrCreateHowl(slot);
  });
}

export const useJingleStore = create<JingleState>()(
  persist(
    (set, get) => ({
      sfxEnabled: true,
      sfxVolume: 0.6,
      nowPlaying: null,
      actions: {
        toggleSfx: () => set((s) => ({ sfxEnabled: !s.sfxEnabled })),
        setSfxVolume: (v) => set({ sfxVolume: v }),

        play: (slot) => {
          const state = get();
          if (!state.sfxEnabled) return;

          // Stop any currently playing jingle first
          state.actions.stop();

          const howl = getOrCreateHowl(slot);
          if (!howl) return;

          howl.volume(state.sfxVolume);
          howl.play();
          
          set({ nowPlaying: slot });

          howl.once("end", () => {
            const current = get().nowPlaying;
            if (current === slot) {
              set({ nowPlaying: null });
            }
          });
          
          howl.once("loaderror", (id, err) => {
            console.error(`[JingleEngine] Failed to load jingle '${slot}':`, err);
          });
          howl.once("playerror", (id, err) => {
             console.error(`[JingleEngine] Failed to play jingle '${slot}':`, err);
             howl.once('unlock', () => howl.play());
          });
        },

        stop: () => {
          const { nowPlaying } = get();
          if (nowPlaying && howlCache[nowPlaying]) {
            howlCache[nowPlaying]!.stop();
          }
          set({ nowPlaying: null });
        },
      },
    }),
    {
      name: "orisun-sfx-prefs",
      partialize: (s) => ({
        sfxEnabled: s.sfxEnabled,
        sfxVolume: s.sfxVolume,
      }),
    }
  )
);
