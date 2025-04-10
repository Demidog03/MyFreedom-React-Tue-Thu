import {Button, Form, Container, Toast, ToastContainer} from 'react-bootstrap';
import classes from './SigninForm.module.css'
import axios from 'axios';
import { useState } from 'react';
import FullscreenSpinner from '../../shared/FullscreenSpinner/FullscreenSpinner';
import { useNavigate } from 'react-router';
import MarketplaceToaster from '../../shared/MarketplaceToaster/MarketplaceToaster';

function SigninForm() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [signinData, setSigninData] = useState({
        username: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    async function signin(event) {
        setError('')
        event.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post('https://fakestoreapi.com/auth/login', {
                username: signinData.username,
                password: signinData.password
            })
            if(response?.data?.token) {
                navigate('/')
            }
        }
        catch(err) {
            console.log(err)
            if(err?.response?.data) {
                setError(err.response.data)
            }
            else {
                setError('Sign-in error!')
            }
        }
        finally {
            setLoading(false)
        }
    }

    function changeUsername(event) {
        setSigninData({
            ...signinData,
            username: event.target.value
        })
    }

    function changePassword(event) {
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
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={changeUsername} type="text" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={changePassword} type="password" placeholder="Password" />
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
