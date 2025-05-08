import { createBrowserRouter } from 'react-router'
import { HomePage, SignInPage, SignUpPage } from './lazyPages'
// import HomePage from './pages/HomePage'
// import SignInPage from './pages/SignInPage'
// import SignUpPage from './pages/SignUpPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/sign-in',
        element: <SignInPage />,
    },
    {
        path: '/sign-up',
        element: <SignUpPage />,
    },
])

export default router
