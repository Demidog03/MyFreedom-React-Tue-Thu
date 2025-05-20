import { Genders, Roles } from "../../../types"

export interface GetProfileResponse {
    _id: string
    username: string
    firstName: string
    lastName: string
    age: number
    gender: Genders
    email: string
    role: Roles
    __v: number
}

export interface EditProfileBody {
    username: string
    firstName: string
    lastName: string
    age: number
    gender: Genders
}