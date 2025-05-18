import { Genders, Roles } from "../../../types"

export interface ProfileState {
    currentUser: CurrentUser | undefined,
    setCurrentUser: (newUser: CurrentUser) => void
}

export interface CurrentUser {
    id: string
    username: string
    firstName: string
    lastName: string
    age: number
    gender: Genders
    email: string
    role: Roles
}