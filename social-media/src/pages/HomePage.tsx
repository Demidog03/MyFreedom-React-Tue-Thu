import { Link, Typography } from '@mui/material'
import SidebarLayout from '../shared/SidebarLayout'
import { useNavigate } from 'react-router'
import { useProfileSelector } from '../module/profile/store/profile.store'

function HomePage() {
    const navigate = useNavigate()
    const { currentUser } = useProfileSelector()

    function goToSignInPage() {
        navigate('/sign-in')
    }

    function goToSignUpPage() {
        navigate('/sign-up')
    }

    return (
        <SidebarLayout>
            <div>
                <Typography variant='h1' gutterBottom>
                    Welcome {currentUser?.firstName}
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nobis fugit velit eligendi nam odit obcaecati rem ut. Officiis
                    temporibus animi, perferendis excepturi natus saepe vero et amet dolore commodi.
                </Typography>
                <Link onClick={goToSignInPage}>Sign in</Link>
                <Link onClick={goToSignUpPage}>Sign up</Link>
            </div>
        </SidebarLayout>
    )
}

export default HomePage
