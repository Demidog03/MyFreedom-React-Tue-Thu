import { Button, Dialog, DialogTitle, FormControl, FormHelperText, InputLabel, Link, MenuItem, Select, Stack, TextField } from "@mui/material"
import classes from './auth.module.scss'
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router"
import { Genders } from "../../../types"
import useRegisterMutation from "../query/useRegisterMutation"
import { useEffect, useState } from "react"
import BackdropSpinner from "../../../shared/BackdropSpinner"

interface SignUpFormData {
    username: string
    firstName: string
    lastName: string
    age: number
    gender: Genders
    email: string
    password: string
    confirmPassword: string
}

const signUpSchema = yup.object({
    username: yup.string().min(5, 'Username is too short').max(30, 'Username is too long').required("Username is required"),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    age: yup.number().min(0, "Age cannot be below 0").max(150, "Maximum age is 150").required("Age is required"),
    gender: yup.mixed<Genders>().oneOf(['male', 'female', 'other'], 'Gender is required').required('Gender is required'),
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
    const { data, mutate, isPending } = useRegisterMutation() // mutate() => registerApi()
    const [isOpen, setIsOpen] = useState(false)

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<SignUpFormData>({
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(signUpSchema),
        mode: "all"
    })

    function submitForm(values: SignUpFormData) {
        const { age, email, firstName, lastName, gender, username, password } = values
        mutate({ age, email, firstName, lastName, gender, username, password })
    }

    function goToSignIn() {
        navigate('/sign-in')
    }

    function handleClose() {
        reset()
        setIsOpen(false)
    }

    useEffect(() => {
        if(data?.qrCode) {
            setIsOpen(true)
        }
    }, [data])

    console.log(data)

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
                error={Boolean(errors.age)}
                helperText={errors.age?.message}
                {...register('age')}
                id="age"
                type="number"
                label="Age"
                variant="outlined"
                slotProps={{ htmlInput: { min: 0, max: 150 } }}
            // <input type="number" min="0" max="150" />
            />
            <FormControl error={Boolean(errors.gender)} fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                    labelId="gender-label"
                    id="gender"
                    label="Gender"
                    {...register('gender')}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
                <FormHelperText>{errors.gender?.message}</FormHelperText>
            </FormControl>
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

            <Dialog onClose={handleClose} open={isOpen}>
                <DialogTitle>Please scan qr in some authentication app</DialogTitle>
                <div className={classes.qrCodeContainer}>
                    <img src={data?.qrCode} alt="Authentication QR code" />
                    <Button onClick={goToSignIn} disableElevation variant="contained">Sign in</Button>
                </div>
            </Dialog>
            <BackdropSpinner open={isPending}/>
        </Stack>
    )
}

export default SignUpForm
