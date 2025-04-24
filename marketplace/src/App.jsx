import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router'
import MainPage from './pages/MainPage'
import TestPage from './pages/TestPage'
import ProductPage from './pages/ProductPage'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import AuthPageGuard from './components/guards/AuthPageGuard'
import PublicPageGuard from './components/guards/PublicPageGuard'
import ProfileEditPage from './pages/ProfileEditPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={
        <AuthPageGuard>
          <MainPage />
        </AuthPageGuard>
      } />
      <Route path="/product/:id" element={
        <AuthPageGuard>
          <ProductPage />
        </AuthPageGuard>
      } />
      <Route path="/signin" element={
        <PublicPageGuard>
          <SigninPage />
        </PublicPageGuard>
      } />
      <Route path="/signup" element={
        <PublicPageGuard>
          <SignupPage />
        </PublicPageGuard>
      } />
      <Route path='/profile/edit' element={
        <AuthPageGuard>
          <ProfileEditPage />
        </AuthPageGuard>
      } />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  )
}

export default App
