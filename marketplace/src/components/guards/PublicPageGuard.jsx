import { useContext } from "react"
import { Navigate } from "react-router"
import { UserContext } from "../contexts/UserContext"

function PublicPageGuard({ children }) {
    const { currentUser } = useContext(UserContext)

    if(currentUser) {
        return <Navigate to="/"/>
    }

    return children
}

export default PublicPageGuard
