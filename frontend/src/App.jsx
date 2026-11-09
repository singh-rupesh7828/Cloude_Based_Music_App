import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import PlayerPage from './pages/PlayerPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import UploadSongPage from './pages/UploadSongPage.jsx'
import { loadSongs } from './redux/feature.js'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSongs())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/player" element={<PlayerPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/upload" element={<UploadSongPage />} />
    </Routes>
  )
}

export default App

