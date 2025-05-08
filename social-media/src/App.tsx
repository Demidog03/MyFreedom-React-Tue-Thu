import { RouterProvider } from 'react-router'
import router from './router'
import './test'

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
