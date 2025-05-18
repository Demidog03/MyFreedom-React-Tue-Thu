import { RouterProvider } from 'react-router'
import router from './router'
import './test'
import { ThemeProvider } from '@mui/material'
import theme from './theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
            <ToastContainer />
        </QueryClientProvider>
    )
}

export default App
