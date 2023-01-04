import { atom } from 'jotai'

type NavbarState = 'create' | 'manage' | 'registered_event'

// Read only state data.
const navbarStatusAtom = atom<NavbarState>('create')

// Read and modify state data.
const setNavbarStatusAtom = atom(
  (get) => get(navbarStatusAtom),
  (_get, set, status: NavbarState) => set(navbarStatusAtom, status),
)

export type { NavbarState }

export { navbarStatusAtom, setNavbarStatusAtom }
