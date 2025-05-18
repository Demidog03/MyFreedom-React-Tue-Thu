import { createBrowserRouter } from 'react-router'
import { HomePage, SignInPage, SignUpPage } from './lazyPages'
import AuthPageGuard from './module/guards/ui/AuthPageGuard'
import PublicPageGuard from './module/guards/ui/PublicPageGuard'
// import HomePage from './pages/HomePage'
// import SignInPage from './pages/SignInPage'
// import SignUpPage from './pages/SignUpPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthPageGuard>
                    <HomePage />
                </AuthPageGuard>,
    },
    {
        path: '/sign-in',
        element: <PublicPageGuard>
                    <SignInPage />
                </PublicPageGuard>,
    },
    {
        path: '/sign-up',
        element: <PublicPageGuard>
                    <SignUpPage />
                </PublicPageGuard>,
    },
])

export default router
