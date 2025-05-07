
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import {useUserStore} from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";
import {useEffect} from 'react';


import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast";
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const {user, checkAuth, checkingAuth} = useUserStore();

  useEffect(() => {
		checkAuth();
	}, [checkAuth]);
  if (checkingAuth) return <LoadingSpinner/>  

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(173,216,230,0.3)_0%,rgba(70,130,180,0.2)_45%,rgba(25,25,112,0.1)_100%)]" />

          
        </div>
      </div>
      

      <div className="relative z-50 pt-20">
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to ='/' />} />
          <Route path = "/login" element = {!user ? <LogInPage/> : <Navigate to ='/'/> }/> 
          <Route path = "/secret-dashboard" element = {user?.role === "admin" ? <AdminPage/> : <Navigate to ='/login'/> }/>
					<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
					<Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
					/>
					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
        </Routes>
        <Footer/>
      </div>
      <Toaster/>
    </div>
  )
}

export default App;
