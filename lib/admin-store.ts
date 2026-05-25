import { create } from 'zustand';

interface AdminState {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  toggleTheme: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isSidebarOpen: true,
  theme: 'dark',
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    
    // Attempt to update class on document element immediately if running in browser
    if (typeof document !== 'undefined') {
      if (newTheme === 'light') {
        document.documentElement.classList.add('light-theme');
      } else {
        document.documentElement.classList.remove('light-theme');
      }
    }
    
    return { theme: newTheme };
  }),
}));
