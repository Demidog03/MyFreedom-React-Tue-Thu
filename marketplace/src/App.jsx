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
import { useContext, useEffect } from 'react'
import { AuthContext } from './components/contexts/AuthContext'
import { UserContext } from './components/contexts/UserContext'
import { getProfileApi } from './api/api'
import { useQuery } from '@tanstack/react-query'
import FullscreenSpinner from './shared/fullscreen-spinner/FullscreenSpinner'

function App() {
  const { setCurrentUser } = useContext(UserContext)
  const { token, setToken } = useContext(AuthContext)
  const { data, isLoading } = useQuery({
    queryKey: ['profile', token],
    queryFn: () => getProfileApi(token),
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: Boolean(token),
  })

  useEffect(() => {
    if(data?.data?.data) {
      setCurrentUser(data.data.data)
    }
  }, [data])

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') // 'token' || null
    if(accessToken) {
      setToken(accessToken)
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={
            <MainPage />
        } />
        <Route path="/product/:id" element={
            <ProductPage />
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
      <FullscreenSpinner active={isLoading} />
    </>
  )
}

export default App
