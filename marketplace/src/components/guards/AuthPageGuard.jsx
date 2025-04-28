import { useContext } from "react"
import { Navigate } from "react-router"
import { UserContext } from "../contexts/UserContext"

function AuthPageGuard({ children }) {
    const { currentUser } = useContext(UserContext)

    if(!currentUser) {
        return <Navigate to="/signin"/>
    }

    return children
}

export default AuthPageGuard
