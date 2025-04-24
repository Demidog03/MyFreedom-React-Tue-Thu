import { useContext, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { UserContext } from "../contexts/UserContext"
import classes from './ProfileEditForm.module.css'

function ProfileEditForm() {
    const { currentUser } = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false)

    function allowEditing() {
        setIsEditing(true)
    }

    function resetForm() {
        setIsEditing(false)
    }

    return (
        <Container fluid="lg">
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Username
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control readOnly={!isEditing} defaultValue={currentUser?.username} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control readOnly={!isEditing} defaultValue={currentUser?.email} />
                    </Col>
                </Form.Group>
                <div className={classes.buttons}>
                    {isEditing && <Button onClick={resetForm} variant="outline-danger">Cancel</Button>}
                    {!isEditing && <Button onClick={allowEditing} variant="outline-warning">Edit</Button>}
                    <Button disabled={!isEditing} variant="success">Confirm</Button>
                </div>
            </Form>
        </Container>
    )
}

export default ProfileEditForm
