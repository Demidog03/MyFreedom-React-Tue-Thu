import apiPrivate from "../../../api/apiPrivate"
import { EditProfileBody, GetProfileResponse } from "./profile.api.types"

export async function getProfileApi(): Promise<GetProfileResponse> {
    const response = await apiPrivate.get('/auth/profile')
    return response.data
}

export async function editProfileApi(body: EditProfileBody): Promise<{ message: string }> {
    const response = await apiPrivate.put('/auth/profile/edit', body)
    return response.data
}