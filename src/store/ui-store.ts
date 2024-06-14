import { create } from 'zustand'

type UiStore = {
  isMenuOpen: boolean,
  openMenu: () => void,
  closeMenu: () => void
}

export const useUiStore = create<UiStore>()((set) => ({
    isMenuOpen: false,
    openMenu: () => set({isMenuOpen: true}),
    closeMenu: () => set({isMenuOpen: false})  
}))

