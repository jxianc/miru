import { atom } from 'jotai'
import { User } from '../../generated/graphql'

const currUserAtom = atom<User | null>(null)

const setCurrUserAtom = atom(
  (get) => get(currUserAtom),
  (_get, set, currUser: User | null) => set(currUserAtom, currUser),
)

export { currUserAtom, setCurrUserAtom }
