import { Toast, ToastContainer, Button } from "react-bootstrap"
import { XIconLg } from "../Icons"
import classes from './MarketplaceToaster.module.css'

function MarketplaceSuccessToaster({ show, text, close }) {
    return (
        <ToastContainer
                className="p-3"
                position="top-end"
                style={{ zIndex: 1 }}
            >
                <Toast bg='success' position="top-end" show={show}>
                    <Toast.Body>
                        <div className={classes.toastBody}>
                            <span>{text}</span> 
                            <Button onClick={close} variant="outline-light" size="sm"><XIconLg/></Button>
                        </div>
                    </Toast.Body>
                </Toast>
        </ToastContainer>
    )
}

export default MarketplaceSuccessToaster
