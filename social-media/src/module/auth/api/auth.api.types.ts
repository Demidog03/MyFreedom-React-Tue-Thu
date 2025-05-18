import { Genders } from "../../../types"

export interface RegisterResponse {
    message: string
    qrCode: string
}

export interface RegisterBody {
    username: string
    password: string
    firstName: string
    lastName: string
    age: number
    gender: Genders
    email: string
}

export interface LoginBody {
    username: string
    password: string
    twoFACode: string
}

export interface LoginResponse {
    accessToken: string
    refreshToken: string
}