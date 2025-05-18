import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "../api/profile.api";
import { useAuthSelector } from "../../auth/store/auth.store";

export default function useProfileQuery() {
    const { token } = useAuthSelector()

    return useQuery({
        queryKey: ['profile'],
        queryFn: getProfileApi,
        enabled: Boolean(token),
        retry: 1
    })
}