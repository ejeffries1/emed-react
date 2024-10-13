//import './App.css'
import Footer from './components/Footer'
import Header from './components/Header';
import { fetchPrescriptions } from './features/prescriptions/prescriptionsSlice'
import Homepage from './pages/Homepage';
import HistoryPage from './pages/HistoryPage'
import AboutUs from './pages/AboutUsPage'
import AccountPage from './pages/AccountPage';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import SchedulePage from './pages/SchedulePage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPrescriptions());
  }, [dispatch])

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/schedule' element={<SchedulePage />}/>
        <Route path='/history' element={<HistoryPage />}/>
        <Route path='/aboutus' element={<AboutUs />}/>
        <Route path="/account" element={<AccountPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;