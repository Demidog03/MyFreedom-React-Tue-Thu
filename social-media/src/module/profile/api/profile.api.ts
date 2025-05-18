import apiPrivate from "../../../api/apiPrivate"
import { GetProfileResponse } from "./profile.api.types"

export async function getProfileApi(): Promise<GetProfileResponse> {
    const response = await apiPrivate.get('/auth/profile')
    return response.data
}