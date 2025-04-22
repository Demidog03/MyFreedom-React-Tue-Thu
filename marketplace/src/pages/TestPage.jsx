import { useState } from "react"

function TestPage() {
    const [user, setUser] = useState({
        name: 'Olzhas',
        email: 'olzhas@gmail.com'
    })
    const username = user.name
    const email = user.email

    function changeName() {
        setUser({ ...user, name: 'Dauren' })
    }
    
    return (
        <div>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <button onClick={changeName}>Change Name</button>
        </div>
    )
}

export default TestPage
