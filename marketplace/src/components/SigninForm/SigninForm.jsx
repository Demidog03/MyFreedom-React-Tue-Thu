import {Button, Form, Container, Toast, ToastContainer} from 'react-bootstrap';
import classes from './SigninForm.module.css'
import axios from 'axios';
import { useState } from 'react';
import FullscreenSpinner from '../../shared/FullscreenSpinner/FullscreenSpinner';
import { useNavigate } from 'react-router';
import MarketplaceToaster from '../../shared/MarketplaceToaster/MarketplaceToaster';
import PasswordFormControl from '../../shared/PasswordFormControl/PasswordFormControl';

function SigninForm() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [signinData, setSigninData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState({
        email: '',
        password: ''
    })

    async function signin(event) {
        setError('')
        event.preventDefault()
        let hasErrors = false
        try {
            setLoading(true)
            const { password, email } = signinData

            if(!email) {
                setValidationErrors(validationErrors => ({...validationErrors, email: 'Email is required!'}))
                hasErrors = true
            }
            if(!password) {
                setValidationErrors(validationErrors => ({...validationErrors, password: 'Password is required!'}))
                hasErrors = true
            }

            if(hasErrors) {
                return
            }

            const response = await axios.post('http://localhost:5000/auth/login', {
                email, password
            })

            if(response?.status === 200 && response?.data) {
                navigate('/')
            }
        }
        catch(err) {
            console.log(err)
            if(typeof err?.response?.data?.message === 'string') {
                setError(err.response.data.message)
            }
            else {
                setError('Sign-in error!')
            }
        }
        finally {
            setLoading(false)
        }
    }

    function changeEmail(event) {
        setValidationErrors({...validationErrors, email: ''})
        setSigninData({
            ...signinData,
            email: event.target.value
        })
    }

    function changePassword(event) {
        setValidationErrors({...validationErrors, password: ''})
        setSigninData({
            ...signinData,
            password: event.target.value
        })
    }

    function closeToaster() {
        setError('')
    }

    function goToSignupPage() {
        navigate('/signup')
    }

    function goBack() {
        navigate('/')
    }

    return (
        <Container fluid="lg">
            <Button className={classes.goBackBtn} onClick={goBack} variant='secondary' size="sm">Back</Button>
            <div className={classes.formContainer}>
                <h1 className='mb-4'>Sign-in</h1>
                <Form className={classes.form}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            onChange={changeEmail}
                            type="text"
                            placeholder="Enter email"
                            isInvalid={Boolean(validationErrors.email)} // Boolean('') => false, Boolean('Email is required!') => true
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
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Button onClick={goToSignupPage} variant="link">Do not have account? Sign-up!</Button>
                    </Form.Group>
                    <Button onClick={signin} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            <MarketplaceToaster show={Boolean(error)} close={closeToaster} error={error} />
            <FullscreenSpinner active={loading}/>
       </Container>
    )
}

export default SigninForm
