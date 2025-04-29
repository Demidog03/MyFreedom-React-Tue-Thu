import { act, useContext, useReducer, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { UserContext } from "../contexts/UserContext"
import classes from './ProfileEditForm.module.css'
import axios from "axios"
import { AuthContext } from "../contexts/AuthContext"

// action = {
//     type: String
//     payload: любые данные
// }

const ACTIONS = {
    changeUsername: 'changeUsername',
    changeEmail: 'changeEmail',
    resetForm: 'resetForm',
    allowEditing: 'allowEditing',
}

function reducer(state, action) {
    if (action.type === ACTIONS.changeUsername) {
        return { ...state, username: action.payload } // 'testuser2' -> payload -> username: 'testuser2'
    }
    if (action.type === ACTIONS.changeEmail) {
        return { ...state, email: action.payload } // 'testuser2@gmail.com' -> payload -> email: 'testuser2@gmail.com'
    }
    if (action.type === ACTIONS.resetForm) {
        return action.payload
    }
    if (action.type === ACTIONS.allowEditing) {
        return { ...state, isEditing: true }
    }
    console.error('Unknown action')
    return state
}

function ProfileEditForm() {
    const { token } = useContext(AuthContext)
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const initialState = {
        isEditing: false,
        username: currentUser?.username || '',
        email: currentUser?.email || ''
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    function allowEditing() {
        dispatch({ type: ACTIONS.allowEditing })
    }

    function resetForm() {
        dispatch({ type: ACTIONS.resetForm, payload: initialState })
    }

    function changeUsername(event) {
        dispatch({ type: ACTIONS.changeUsername, payload: event.target.value })
    }

    function changeEmail(event) {
        dispatch({ type: ACTIONS.changeEmail, payload: event.target.value })
    }

    async function editProfile() {
        try {
            const response = await axios.put('http://localhost:5000/auth/profile/edit', {
                username: state.username,
                email: state.email
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            if(response.status === 200 && response?.data?.data) {
                setCurrentUser(response.data.data)
                dispatch({ type: ACTIONS.resetForm, payload: {
                    isEditing: false,
                    username: response.data.data.username,
                    email: response.data.data.email
                }})
            }
            else {
                console.error('Error when editing profile')
            }
        }
        catch {
            console.error('Error when editing profile')
        }
    }

    return (
        <Container fluid="lg">
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Username
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control onChange={changeUsername} readOnly={!state.isEditing} value={state.username} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control onChange={changeEmail} readOnly={!state.isEditing} value={state.email} />
                    </Col>
                </Form.Group>
                <div className={classes.buttons}>
                    {state.isEditing && <Button onClick={resetForm} variant="outline-danger">Cancel</Button>}
                    {!state.isEditing && <Button onClick={allowEditing} variant="outline-warning">Edit</Button>}
                    <Button onClick={editProfile} disabled={!state.isEditing} variant="success">Confirm</Button>
                </div>
            </Form>
        </Container>
    )
}

export default ProfileEditForm
