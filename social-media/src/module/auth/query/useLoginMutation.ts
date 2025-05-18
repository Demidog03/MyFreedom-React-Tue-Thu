import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/auth.api";

export default function useLoginMutation() {
    return useMutation({
        mutationFn: loginApi
    })
}