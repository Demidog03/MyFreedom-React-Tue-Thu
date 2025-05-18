import { create } from 'zustand/react'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { useShallow } from 'zustand/react/shallow'
import { ProfileState } from './profile.store.types'

export const useProfileStore = create<ProfileState>()(
    devtools(
        immer(
            (set) => ({
                currentUser: undefined,
                setCurrentUser: (newUser) => {
                    set(state => { state.currentUser = newUser })
                }
            }),
        )
    )
)

export function useProfileSelector(): ProfileState {
    return useProfileStore(useShallow((state) => state))
}