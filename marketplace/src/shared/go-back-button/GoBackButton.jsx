import { Button } from "react-bootstrap"
import { useNavigate } from "react-router"

function GoBackButton({ className, to = -1, size = 'sm' }) {
    const navigate = useNavigate()

    function goBack() {
        navigate(to)
    }

    return (
        <Button className={className} onClick={goBack} variant='secondary' size={size}>Back</Button>
    )
}

export default GoBackButton
