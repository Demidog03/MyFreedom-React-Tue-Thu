import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api/auth.api";

export default function useRegisterMutation() {
    return useMutation({
        mutationFn: registerApi
    })
}