import { Button, Link, Stack, TextField } from "@mui/material"
import classes from './auth.module.scss'
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router"
import useLoginMutation from "../query/useLoginMutation"
import BackdropSpinner from "../../../shared/BackdropSpinner"
import { useAuthSelector } from "../store/auth.store"
import { useEffect } from "react"

interface SignInFormData {
    username: string
    password: string
    twoFACode: string
}

const signInSchema = yup.object({
    username: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
    twoFACode: yup.string().required("Authentication code is required")
})

function SignInForm() {
    const navigate = useNavigate()
    const { data, mutate, isPending } = useLoginMutation()
    const { setToken} = useAuthSelector()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<SignInFormData>({
        defaultValues: { username: '', password: '' },
        resolver: yupResolver(signInSchema)
    })

    function submitForm(values: SignInFormData) {
        const { username, password, twoFACode } = values
        mutate({ username, password, twoFACode })
    }

    function goToSignUp() {
        navigate('/sign-up')
    }

    useEffect(() => {
        if(data?.accessToken) {
            setToken(data.accessToken)
        }
    }, [data])

    return (
        <Stack
            onSubmit={handleSubmit(submitForm)}
            className={classes.formContainer}
            direction="column"
            gap={2}
            component="form"
        >
            <TextField
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
                {...register('username')}
                id="username"
                label="Username"
                variant="outlined"
            />
            <TextField
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                {...register('password')}
                type="password"
                id="password"
                label="Password"
                variant="outlined"
            />
            <TextField
                error={Boolean(errors.twoFACode)}
                helperText={errors.twoFACode?.message}
                {...register('twoFACode')}
                id="twoFACode"
                label="Two-Factor Authentication code"
                variant="outlined"
            />
            <Button disabled={!isValid} type="submit" className={classes.submitBtn} disableElevation variant="contained">Submit</Button>
            <Link className={classes.link} onClick={goToSignUp} variant="body2">Do not have account? Sign up</Link>
            <BackdropSpinner open={isPending}/>
        </Stack>
    )
}

export default SignInForm
