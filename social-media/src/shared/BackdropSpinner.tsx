import { Backdrop, CircularProgress } from "@mui/material"

interface BackdropSpinnerProps {
    open: boolean
}

function BackdropSpinner({ open }: BackdropSpinnerProps) {
    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default BackdropSpinner
