import { Button, Link, Stack, TextField } from "@mui/material"
import classes from './auth.module.scss'
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router"

interface SignUpFormData {
    username: string
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

const signUpSchema = yup.object({
    username: yup.string().min(5, 'Username is too short').max(30, 'Username is too long').required("Username is required"),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Email is invalid').required("Email is required"),
    password: yup.string()
        .min(8, 'Password min length is 8')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords does not match').required("Confirm passwor is required")
})

function SignUpForm() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors, isValid }, } = useForm<SignUpFormData>({
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(signUpSchema),
        mode: "all"
    })

    function submitForm(values: SignUpFormData) {
        console.log(values)
    }

    function goToSignIn() {
        navigate('/sign-in')
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
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
                {...register('username')}
                id="username"
                label="Username"
                variant="outlined"
            />
            <TextField
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
                {...register('firstName')}
                id="firstName"
                label="First name"
                variant="outlined"
            />
            <TextField
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
                {...register('lastName')}
                id="lastName"
                label="Last name"
                variant="outlined"
            />
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
                type="text"
                id="password"
                label="Password"
                variant="outlined"
            />
            <TextField
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword?.message}
                {...register('confirmPassword')}
                id="confirmPassword"
                label="Confirm password"
                variant="outlined"
            />
            <Button disabled={!isValid} type="submit" className={classes.submitBtn} disableElevation variant="contained">Submit</Button>
            <Link className={classes.link} onClick={goToSignIn} variant="body2">Already have an account? Sign in</Link>
        </Stack>
    )
}

export default SignUpForm
