import { Container, Typography } from "@mui/material"
import classes from './SignUpPage.module.scss'
import SignUpForm from "../../module/auth/ui/SignUpForm"

function SignUpPage() {
    return (
        <Container className={classes.container} maxWidth="sm">
            <Typography color="primary" variant="h1">Sign up</Typography>
            <SignUpForm/>
        </Container>
    )
}

export default SignUpPage
