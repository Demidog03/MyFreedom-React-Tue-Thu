import { Form } from 'react-bootstrap'
import classes from './PasswordFormControl.module.css'
import { EyeFillIcon, EyeSlashFillIcon } from '../Icons'
import { useEffect, useState } from 'react'

function PasswordFormControl(props) {
    const [isIconsAvailable, setIsIconsAvailable] = useState(true)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsIconsAvailable(!props?.isInvalid)
    }, [props?.isInvalid])

    function showPassword() {
        setIsVisible(true)
    }

    function hidePassword() {
        setIsVisible(false)
    }

    return (
        <div className={classes.container}>
            <Form.Control
                type={isVisible ? 'text' : 'password'}
                {...props}
            />
            {props.error && (
                <Form.Control.Feedback type="invalid">
                    {props.error}
                </Form.Control.Feedback>
            )}
            {isIconsAvailable && !isVisible && (
                <div className={classes.eyeFillIcon} onMouseDown={showPassword}>
                    <EyeFillIcon />
                </div>
            )}
            {isIconsAvailable && isVisible && (
                <div className={classes.eyeFillIcon} onMouseUp={hidePassword}>
                    <EyeSlashFillIcon />
                </div>
            )}
        </div>
    )
}

export default PasswordFormControl
