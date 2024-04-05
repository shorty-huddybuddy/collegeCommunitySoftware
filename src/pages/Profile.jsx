import React, { useEffect, useState } from 'react'
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

  const [profileAbout, setProfileAbout]  = useState(localStorage.getItem('about'))

  const updateAbout = async (e) => {

    const profileAboutData = profileAbout.profileAbout

    try {
      const response = await fetch('http://localhost:5000/user/updateAbout', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, profileAboutData })
      });
  
      if (!response.ok) {
        const data = await response.json()
        alert(`${data.message}`)
        return
      }
  
      const data = await response.json()
      alert(`${data.message}`)
      localStorage.setItem('about' , data.profileAboutData)
      window.location.reload()

    } catch (error) {
      console.error(error)
    }
  }

  const [aboutToggle, setAboutToggle] = useState(true)

  const About = (
    <div>
      <input type='text' defaultValue={about} className='text-center' disabled={aboutToggle} id ='profileAbout'onChange={(e)=>setProfileAbout({[e.target.id] : e.target.value})}></input>
      <button className='btn' onClick={()=>setAboutToggle(false)}>
        {aboutToggle && <i className='bi bi-pencil-fill'></i>}
      </button>
      <button className='btn' onClick = {updateAbout}>
        {profileAbout.profileAbout && <i className="bi bi-check-circle-fill text-success"></i>}
      </button>
    </div>
  )

  const defaultAbout = (
    <div className='col-6 mx-auto'>
      <label htmlFor="profileAbout">Add something about yourself</label>
      <input type='text-area' id = 'profileAbout' className='mx-3' onChange={(e) => setProfileAbout({[e.target.id] : e.target.value}) }></input>
      <button className='btn' onClick = {updateAbout}>
        {profileAbout.profileAbout && <i className="bi bi-check-circle-fill text-success"></i>}
      </button>
    </div>
  )

  return (
    <div className='container mt-5'>
      <div>
        <h1 className='text-center text-info'>Welcome {name}</h1>
      </div>
      <div className="mt-5">
        <img src={require(`../assets/${photoURL}`)} className="rounded mx-auto d-block w-25 h-25" alt="profilePhoto" />
      </div>
      <div className='mt-4 text-center'>
        {about === 'undefined' ? defaultAbout : About}
      </div>
    </div>
  )
}
