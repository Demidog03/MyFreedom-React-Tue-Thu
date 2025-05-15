import { Container, Typography } from "@mui/material"
import SignInForm from "../../module/auth/ui/SignInForm"
import classes from './SignInPage.module.scss'

function SignInPage() {
    return (
        <Container className={classes.container} maxWidth="sm">
            <Typography color="primary" variant="h1">Sign in</Typography>
            <SignInForm/>
        </Container>
    )
}

export default SignInPage
