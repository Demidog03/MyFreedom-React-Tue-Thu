import { JSX, useEffect } from "react"
import useProfileQuery from "../../profile/query/useProfileQuery"
import { useNavigate } from "react-router"
import { useProfileSelector } from "../../profile/store/profile.store"

interface PublicPageGuardProps {
    children: JSX.Element
}

function PublicPageGuard({ children }: PublicPageGuardProps) {
    const { data, isSuccess } = useProfileQuery()
    const { setCurrentUser } = useProfileSelector()
    const navigate = useNavigate()

    useEffect(() => {
        if(data) {
            const { _id, age, email, firstName, lastName, gender, role, username } = data
            setCurrentUser({ age, email, firstName, lastName, gender, role, username, id: _id })
        }
    }, [data])

    useEffect(() => {
        if(isSuccess) {
            navigate('/')
        }
    }, [isSuccess])

    if(isSuccess) {
        return null
    }

    return children
}

export default PublicPageGuard
