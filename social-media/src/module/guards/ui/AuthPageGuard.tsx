import { JSX, useEffect } from "react"
import useProfileQuery from "../../profile/query/useProfileQuery"
import { useLocation, useNavigate } from "react-router"
import { useProfileSelector } from "../../profile/store/profile.store"
import { useAuthSelector } from "../../auth/store/auth.store"
import BackdropSpinner from "../../../shared/BackdropSpinner"

interface AuthPageGuardProps {
    children: JSX.Element
}

function AuthPageGuard({ children }: AuthPageGuardProps) {
    const { isSuccess, data, isLoading } = useProfileQuery()
    const { setCurrentUser } = useProfileSelector()
    const { token } = useAuthSelector()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(data) {
            const { _id, age, email, firstName, lastName, gender, role, username } = data
            setCurrentUser({ age, email, firstName, lastName, gender, role, username, id: _id })
        }
    }, [data])

    useEffect(() => {
        if(!isLoading && !isSuccess || !token) {
            navigate('/sign-in', { state: { from: location.pathname } })
        }
    }, [isSuccess, token, isLoading])

    if (isLoading) {
        return <BackdropSpinner open={true}/>
    }

    if(!isSuccess || !token) {
        return null
    }

    return children
}

export default AuthPageGuard
