import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router"
import { UserContext } from "../contexts/UserContext"

function PublicPageGuard({ children }) {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [isInit, setInit] = useState(false) // проверять отправился ли запрос хотя бы один раз

    useEffect(() => {
        if(!isInit) {
            getProfile()
        }
    }, [isInit])
    
    async function getProfile() {
        try {
            const accessToken = localStorage.getItem('accessToken')
            if(!accessToken) {
                setAuthorized(false)
                return
            }
            const response = await axios.get('http://localhost:5000/auth/profile', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if(response.status === 200 && response?.data?.data) {
                setCurrentUser(response.data.data)
            }
        }
        catch {
            setCurrentUser(undefined)
        }
        finally {
            setInit(true)
        }
    }

    if(isInit && currentUser) {
        return <Navigate to="/"/>
    }

    return children
}

export default PublicPageGuard
