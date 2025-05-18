import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../api/auth.api";

export default function useLoginMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: loginApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] })
        }
    }
    )
}