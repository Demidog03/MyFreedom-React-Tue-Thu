import { RouterProvider } from 'react-router'
import router from './router'
import './test'
import { ThemeProvider } from '@mui/material'
import theme from './theme'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App
