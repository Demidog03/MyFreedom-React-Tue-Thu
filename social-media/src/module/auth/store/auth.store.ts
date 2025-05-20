import { create } from 'zustand/react'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { useShallow } from 'zustand/react/shallow'
import { AuthState } from './auth.store.types'

export const useAuthStore = create<AuthState>()(
    devtools(
        immer(
            persist(
                (set) => ({
                    token: '',
                    setToken: (newToken) => {
                        set(state => { state.token = newToken })
                    },
                    logout: () => {
                        set(state => { state.token = '' })
                    }
                }),
                {
                    name: 'accessToken',
                    storage: createJSONStorage(() => localStorage),
                    partialize: (state) => ({
                        token: state.token,
                    }),
                },
            )
        )
    )
)

export function useAuthSelector(): AuthState {
    return useAuthStore(useShallow((state) => state))
}