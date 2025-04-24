import { createContext, useState } from "react";

export const UserContext = createContext(null)

export default function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(undefined)

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    )
}