import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

  const navigate = useNavigate();
  const user = useSelector(store => store.user)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }

  return (
    <div className='relative w-full' >
      <div className='absolute left-4 w-44 z-10' >
          <img src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='Netflix logo' />
      </div>
      {
        user && <div className='absolute right-4 top-4 z-10 ' >
          {
            user?.photoURL && <img src={user?.photoURL} alt='' className='inline-block mr-6 w-10 h-10 rounded-3xl' /> 
          }
          <button 
            onClick={handleSignOut}
            className='inline-block py-3 px-4 text-slate-200 bg-red-600 rounded-lg cursor-pointer' 
          >
            Sign out
          </button>
        </div>
      }
    </div>
  )
}

export default Header