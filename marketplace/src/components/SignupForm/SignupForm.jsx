import {Button, Form, Container, Toast, ToastContainer} from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import FullscreenSpinner from '../../shared/FullscreenSpinner/FullscreenSpinner';
import { useNavigate } from 'react-router';
import MarketplaceToaster from '../../shared/MarketplaceToaster/MarketplaceToaster';
import classes from './SignupForm.module.css'

function SignupForm() {
    const navigate = useNavigate()
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function goBack() {
        navigate('/')
    }

    function goToSigninPage() {
        navigate('/signin')
    }

    function changeUsername(event) {
        setSignupData({
            ...signupData,
            username: event.target.value
        })
    }

    function changeEmail(event) {
        setSignupData({
            ...signupData,
            email: event.target.value
        })
    }

    function changePassword(event) {
        setSignupData({
            ...signupData,
            password: event.target.value
        })
    }

    async function signup(event) {
        event.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post('https://fakestoreapi.com/users', {
                id: Date.now(),
                username: signupData.username,
                password: signupData.password,
                email: signupData.email
            })
            console.log(response)
        }
        catch(err) {
            console.error(err)
            if(err?.response?.data) {
                setError(err.response.data)
            }
            else {
                setError('Sign-up error!')
            }
        }
        finally {
            setLoading(false)
        }
    }

    function closeToaster() {
        setError('')
    }

    return (
        <Container fluid="lg">
            <Button className={classes.goBackBtn} onClick={goBack} variant='secondary' size="sm">Back</Button>
            <div className={classes.formContainer}>
                <h1 className='mb-4'>Sign-up</h1>
                <Form className={classes.form}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={changeUsername} type="text" placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={changeEmail} type="text" placeholder="Enter Email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={changePassword} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Button onClick={goToSigninPage} variant="link">Already have an account? Sign-in!</Button>
                    </Form.Group>
                    <Button onClick={signup} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            <MarketplaceToaster show={Boolean(error)} close={closeToaster} error={error} />
            <FullscreenSpinner active={loading}/>
       </Container>
    )
}

export default SignupForm
