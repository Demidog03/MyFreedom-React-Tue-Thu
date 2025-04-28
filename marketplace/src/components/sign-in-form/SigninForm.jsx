import {Button, Form, Container, Toast, ToastContainer} from 'react-bootstrap';
import classes from './SigninForm.module.css'
import { useContext, useState } from 'react';
import FullscreenSpinner from '../../shared/fullscreen-spinner/FullscreenSpinner';
import { useNavigate } from 'react-router';
import MarketplaceErrorToaster from '../../shared/marketplace-toaster/MarketplaceErrorToaster';
import PasswordFormControl from '../../shared/password-form-control/PasswordFormControl';
import GoBackButton from '../../shared/go-back-button/GoBackButton';
import MarketplaceSuccessToaster from '../../shared/marketplace-toaster/MarketplaceSuccessToaster';
import { AuthContext } from '../contexts/AuthContext';
import { loginApi } from '../../api/api';

function SigninForm() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [signinData, setSigninData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState({
        email: '',
        password: ''
    })

    const { setToken } = useContext(AuthContext)

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

            const response = await loginApi(email, password)

            if(response?.status === 200 && response?.data) {
                if(response.data?.data?.accessToken) {
                    setToken(response.data.data.accessToken)
                    localStorage.setItem('accessToken', response.data.data.accessToken)
                }
                setSuccess(response.data?.message || 'Successful login!')
                setTimeout(() => {
                    navigate('/')
                }, 1000)
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

    function closeErrorToaster() {
        setError('')
    }

    function closeSuccessToaster() {
        setSuccess('')
    }

    function goToSignupPage() {
        navigate('/signup')
    }

    return (
        <Container fluid="lg">
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
            <MarketplaceErrorToaster show={Boolean(error)} close={closeErrorToaster} error={error} />
            <MarketplaceSuccessToaster show={Boolean(success)} close={closeSuccessToaster} text={success} />
            <FullscreenSpinner active={loading}/>
       </Container>
    )
}

export default SigninForm
