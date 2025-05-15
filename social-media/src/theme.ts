import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: '4rem'
                }
            }
        },
    }
})

export default theme