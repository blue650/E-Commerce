import React from 'react'
import {ShoppingCart, UserPlus, LogIn, LogOut, Lock} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from '../stores/useUserStore';

const NavBar = () => {
  const {user, logout} = useUserStore();
  const isAdmin = user?.role === "admin";


  return (
    <header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-white'>
      <div className='container mx-auto px-4 py-5'>
        
        <div className='flex flex-wrap justify-between items-center'>
          <Link to='/' className='text-3xl font-bold text-white items-center space-x-2 flex'>
            Blue Collar Business Guide - Start to Finish
          </Link>
        
          <nav className='flex flex-wrap items-center gap-4'>
            <Link to={'/'} className='text-white hover:text-sky-600 transition duration-300
            ease-in-out'> Home </Link>
            {user && (

              <Link to = {"/cart"} className='relative group text-white hover:text-sky-600 transition duration-300 
							ease-in-out'>
                
                <ShoppingCart className='inline-block mr-1'  size={20} />
                <span className='hidden sm:inline'>Cart</span>
                
              </Link>
              
            )}
            {isAdmin && (
              <Link
              className='bg-sky-600 hover:bg-sky-400 text-white px-3 py-1 rounded-md font-medium
              transition duration-300 ease-in-out flex items-center'to={"/secret-dashboard"}>
              <Lock className='inline-block mr-1' size={18} />
              <span className='hidden sm:inline'>Dashboard</span>
              </Link>
            )}
            {user ? (
              <button className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
              rounded-md flex items-center transition duration-300 ease-in-out'
              onClick ={logout}
              >
                <LogOut size={18} />
                <span className='hidden sm:inline ml-2'>Log Out</span>
              </button>
            ):(
              <>
                <Link to= {"/signup"} className='bg-sky-500 hover:bg-sky-300 text-white py-2 px-4 
                    rounded-md flex items-center transition duration-300 ease-in-out'>
                <UserPlus className='mr-2' size = {18} />
                SignUp 
                
                </Link>

                <Link to= {"/login"} className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
                    rounded-md flex items-center transition duration-300 ease-in-out'
                  >
                <LogIn className='mr-2' size = {18} />
                LogIn 
                
                </Link>
              </>
            )}
            
          </nav>
        </div>
      </div>
    </header>
  )
}

export default NavBar