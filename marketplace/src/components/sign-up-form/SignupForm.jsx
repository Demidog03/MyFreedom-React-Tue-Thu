import {Button, Form, Container, Toast, ToastContainer} from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import FullscreenSpinner from '../../shared/fullscreen-spinner/FullscreenSpinner';
import { useNavigate } from 'react-router';
import MarketplaceErrorToaster from '../../shared/marketplace-toaster/MarketplaceErrorToaster';
import classes from './SignupForm.module.css'
import { EmailRegex, PasswordRegex, UsernameRegex } from '../../shared/Regex';
import PasswordFormControl from '../../shared/password-form-control/PasswordFormControl';
import GoBackButton from '../../shared/go-back-button/GoBackButton';

function SignupForm() {
    const navigate = useNavigate()
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState({
        username: '',
        email: '',
        password: ''
    })

    function goBack() {
        navigate('/')
    }

    function goToSigninPage() {
        navigate('/signin')
    }

    function changeUsername(event) {
        setValidationErrors({
            ...validationErrors,
            username: ''
        })
        setSignupData({
            ...signupData,
            username: event.target.value
        })
    }

    function changeEmail(event) {
        setValidationErrors({
            ...validationErrors,
            email: ''
        })
        setSignupData({
            ...signupData,
            email: event.target.value
        })
    }

    function changePassword(event) {
        setValidationErrors({
            ...validationErrors,
            password: ''
        })
        setSignupData({
            ...signupData,
            password: event.target.value
        })
    }

    async function signup(event) {
        event.preventDefault()
        let hasErrors = false
        try {
            setLoading(true)
            const { username, email, password } = signupData
            
            if(!UsernameRegex.test(username)) {
                setValidationErrors(validationErrors => ({
                    ...validationErrors,
                    username: 'Username must contain only letters and numbers, and it must be between 6 and 16 characters long'
                }))
                hasErrors = true
            }
            if(!EmailRegex.test(email)) {
                setValidationErrors(validationErrors => ({
                    ...validationErrors,
                    email: 'Please enter a valid email address (e.g., name@example.com).'
                }))
                hasErrors = true
            }
            if(!PasswordRegex.test(password)) {
                setValidationErrors(validationErrors => ({
                    ...validationErrors,
                    password: 'Password must be at least 8 characters long and contain at least one letter and one number.'
                }))
                hasErrors = true
            }

            if(hasErrors) {
                return
            }

            const response = await axios.post('http://localhost:5000/auth/register', {
                username,
                email,
                password
            })

            if(response?.status === 201 && response?.data) {
                navigate('/signin')
            }
        }
        catch(err) {
            console.error(err)
            if(typeof err?.response?.data?.message === 'string') {
                setError(err.response.data.message)
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
            <div className={classes.formContainer}>
                <h1 className='mb-4'>Sign-up</h1>
                <Form className={classes.form}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            onChange={changeUsername}
                            type="text"
                            placeholder="Enter username"
                            isInvalid={Boolean(validationErrors.username)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            onChange={changeEmail}
                            type="text"
                            placeholder="Enter Email"
                            isInvalid={Boolean(validationErrors.email)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <PasswordFormControl
                            onChange={changePassword}
                            placeholder="Password"
                            isInvalid={Boolean(validationErrors.password)}
                            error={validationErrors.password}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Button onClick={goToSigninPage} variant="link">Already have an account? Sign-in!</Button>
                    </Form.Group>
                    <Button onClick={signup} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            <MarketplaceErrorToaster show={Boolean(error)} close={closeToaster} error={error} />
            <FullscreenSpinner active={loading}/>
       </Container>
    )
}

export default SignupForm
