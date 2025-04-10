import { Spinner } from 'react-bootstrap'
import classes from './FullscreenSpinner.module.css'

function FullscreenSpinner({active}) {
    if(active) {
        return (
            <div className={classes.container}>
                <Spinner variant="light" animation="border" />
            </div>
        )
    }
    return null
}

export default FullscreenSpinner
