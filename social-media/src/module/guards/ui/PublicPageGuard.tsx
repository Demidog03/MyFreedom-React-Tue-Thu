import { JSX, useEffect } from "react"
import useProfileQuery from "../../profile/query/useProfileQuery"
import { useLocation, useNavigate } from "react-router"
import { useProfileSelector } from "../../profile/store/profile.store"
import { useAuthSelector } from "../../auth/store/auth.store"
import BackdropSpinner from "../../../shared/BackdropSpinner"

interface PublicPageGuardProps {
    children: JSX.Element
}

function PublicPageGuard({ children }: PublicPageGuardProps) {
    const { data, isSuccess, isLoading } = useProfileQuery()
    const { setCurrentUser } = useProfileSelector()
    const navigate = useNavigate()
    const { token } = useAuthSelector()
    const location = useLocation()

    useEffect(() => {
        if(data) {
            const { _id, age, email, firstName, lastName, gender, role, username } = data
            setCurrentUser({ age, email, firstName, lastName, gender, role, username, id: _id })
        }
    }, [data])

    useEffect(() => {
        if(!isLoading && isSuccess && token) { // isLoading === true
            navigate(location.state?.from || '/')
        }
    }, [isSuccess, token, isLoading])

    if (isLoading) {
        return <BackdropSpinner open={true}/>
    }

    if(isSuccess && token) {
        return null
    }

    return children
}

export default PublicPageGuard
