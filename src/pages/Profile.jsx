import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useParams } from 'react-router-dom';

export default function Profile() {

  const { username } = useParams()

  const findUser = async(username) => {

    try{
      const response = await fetch(`http://localhost:5000/profile?user=${username}`)
      
      if(!response.ok){
        const data = await response.json()
        alert(`${data.message}`)
        return
      }

      const { user }  = await response.json()

      return user

    } catch (error) {
      console.error(error)
      alert('Failed to fetch user profile')
    }

  }

  const setUser = async () => {
    const user = await findUser(username)
    localStorage.setItem('name' , user.name)
    localStorage.setItem('email' , user.email)
    localStorage.setItem('photoURL' , user.photoURL)
    localStorage.setItem('about' , user.about)
    localStorage.setItem('passoutYear' , user.passoutYear)
  } 
  
  setUser()
  
  let name = localStorage.getItem('name')
  let email = localStorage.getItem('email')
  let photoURL = localStorage.getItem('photoURL')
  let about = localStorage.getItem('about')
  let passoutYear = localStorage.getItem('passoutYear')
  let user = localStorage.getItem('user')
  

  return (
    <div className='container mt-5'>
      <div>
        <h1 className='text-center text-info'>Welcome {name}</h1>
      </div>
      <div className="mt-5">
        <img src={require(`../assets/${photoURL}`)} className="rounded mx-auto d-block w-25 h-25" alt="profilePhoto" />

      </div>
    </div>
  )
}
