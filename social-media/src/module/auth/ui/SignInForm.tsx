import { Button, Link, Stack, TextField } from "@mui/material"
import classes from './auth.module.scss'
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router"

interface SignInFormData {
    email: string
    password: string
}

const signInSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required")
})

function SignInForm() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<SignInFormData>({
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(signInSchema)
    })

    function submitForm(values: SignInFormData) {
        console.log(values)
    }

    function goToSignUp() {
        navigate('/sign-up')
    }

    return (
        <Stack
            onSubmit={handleSubmit(submitForm)}
            className={classes.formContainer}
            direction="column"
            gap={2}
            component="form"
        >
            <TextField
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...register('email')}
                id="email"
                label="Email"
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
            <Button disabled={!isValid} type="submit" className={classes.submitBtn} disableElevation variant="contained">Submit</Button>
            <Link className={classes.link} onClick={goToSignUp} variant="body2">Do not have account? Sign up</Link>
        </Stack>
    )
}

export default SignInForm
