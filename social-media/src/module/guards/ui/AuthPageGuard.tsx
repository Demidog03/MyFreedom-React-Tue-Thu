import { JSX, useEffect } from "react"
import useProfileQuery from "../../profile/query/useProfileQuery"
import { useNavigate } from "react-router"
import { useProfileSelector } from "../../profile/store/profile.store"

interface AuthPageGuardProps {
    children: JSX.Element
}

function AuthPageGuard({ children }: AuthPageGuardProps) {
    const { isSuccess, data } = useProfileQuery()
    const { setCurrentUser } = useProfileSelector()
    const navigate = useNavigate()

    useEffect(() => {
        if(data) {
            const { _id, age, email, firstName, lastName, gender, role, username } = data
            setCurrentUser({ age, email, firstName, lastName, gender, role, username, id: _id })
        }
    }, [data])

    useEffect(() => {
        if(!isSuccess) {
            navigate('/sign-in')
        }
    }, [isSuccess])

    if(!isSuccess) {
        return null
    }

    return children
}

export default AuthPageGuard
