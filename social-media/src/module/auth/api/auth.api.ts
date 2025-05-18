import { LoginBody, LoginResponse, RegisterBody, RegisterResponse } from './auth.api.types'
import apiPublic from '../../../api/apiPublic'

export async function registerApi(body: RegisterBody): Promise<RegisterResponse> {
    const response = await apiPublic.post('/auth/register', body)
    return response.data
}

export async function loginApi(body: LoginBody): Promise<LoginResponse> {
    const response = await apiPublic.post('/auth/login', body)
    return response.data
}