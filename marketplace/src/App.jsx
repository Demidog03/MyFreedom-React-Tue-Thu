import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router'
import MainPage from './pages/MainPage'
import TestPage from './pages/TestPage'
import ProductPage from './pages/ProductPage'

function App() {
 
  return (
    <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path="/product/:id" element={<ProductPage/>} />
      <Route path="/test" element={<TestPage/>} />
    </Routes>
  )
}

export default App
