import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { Genders } from "../../../types"
import BackdropSpinner from "../../../shared/BackdropSpinner"
import classes from './profile.module.scss'
import useProfileQuery from "../query/useProfileQuery"
import { useState } from "react"
import useEditProfileMutation from "../query/useEditProfileMutation"

interface EditProfileFormData {
    username: string
    firstName: string
    lastName: string
    age: number
    gender: Genders
    email: string
}

const editProfileSchema = yup.object({
    username: yup.string().min(5, 'Username is too short').max(30, 'Username is too long').required("Username is required"),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    age: yup.number().min(0, "Age cannot be below 0").max(150, "Maximum age is 150").required("Age is required"),
    gender: yup.mixed<Genders>().oneOf(['male', 'female', 'other'], 'Gender is required').required('Gender is required'),
    email: yup.string().email('Email is invalid').required("Email is required"),
})

function EditProfileForm() {
    const { data: profile, isLoading } = useProfileQuery()
    const { mutate, isPending } = useEditProfileMutation()
    const [isEditing, setIsEditing] = useState(false)

    const { register, handleSubmit, formState: { errors, isValid, defaultValues }, reset } = useForm<EditProfileFormData>({
        defaultValues: {
            email: profile?.email,
            age: profile?.age,
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            gender: profile?.gender,
            username: profile?.username
        },
        resolver: yupResolver(editProfileSchema),
        mode: "all"
    })

    function submitForm(values: EditProfileFormData) {
        const { age, firstName, lastName, gender, username } = values
        mutate({ age, firstName, lastName, gender, username })
        setIsEditing(false)
    }

    function startEditing() {
        setIsEditing(true)
    }

    function stopEditing() {
        setIsEditing(false)
        reset()
    }

    return (
        <Stack
            className={classes.editProfileFormContainer}
            onSubmit={handleSubmit(submitForm)}
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
                disabled={!isEditing}
            />
            <TextField
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
                {...register('firstName')}
                id="firstName"
                label="First name"
                variant="outlined"
                disabled={!isEditing}
            />
            <TextField
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
                {...register('lastName')}
                id="lastName"
                label="Last name"
                variant="outlined"
                disabled={!isEditing}
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
                disabled={!isEditing}
            />
            <FormControl error={Boolean(errors.gender)} fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                    labelId="gender-label"
                    id="gender"
                    label="Gender"
                    {...register('gender')}
                    defaultValue={defaultValues?.gender}
                    disabled={!isEditing}
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
                slotProps={{ htmlInput: { readOnly: true } }}
                disabled
            />
            <Stack flexDirection="row" gap={1}>
                {!isEditing && <Button disabled={isEditing} onClick={startEditing} color="warning" className={classes.submitBtn} disableElevation variant="outlined">Edit</Button>}
                {isEditing && <Button disabled={!isEditing} onClick={stopEditing} color="error" className={classes.submitBtn} disableElevation variant="outlined">Cancel</Button>}
                <Button disabled={!isValid || !isEditing} className={classes.submitBtn} type="submit" disableElevation variant="contained">Submit</Button>
            </Stack>
            <BackdropSpinner open={isPending || isLoading}/>
        </Stack>
    )
}

export default EditProfileForm
