<<<<<<< HEAD
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../api/auth.api";

export default function useLoginMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: loginApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] })
        }
=======
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/auth.api";

export default function useLoginMutation() {
    return useMutation({
        mutationFn: loginApi
>>>>>>> ea099b67bc2ebb6516ffff0b5183816789c02a18
    })
}