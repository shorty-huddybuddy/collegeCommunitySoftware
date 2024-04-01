import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { wait } from '@testing-library/user-event/dist/utils'


export default function () {
    
    const navigate = useNavigate()
    const [formData , setFormData]  = useState({})

    const handleChange = (e) => {
        setFormData({
            ...formData , [e.target.id] : e.target.value
        })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:5000/auth/create-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          
          if(!response.ok){
            alert(`Error in internal server`)
            return
          }

          const data = await response.json()
          
          alert(`User registered successfully`)
          navigate('/')


        } catch (error) {
          console.error(error)
          alert('Failed to create user. Please try again.')
        }
      };

  return (
    <div>
        <div className="container mt-5 text-center text-success">
            <h1>
                Sign Up
            </h1>
        </div>
        <div className="container mt-4">
            <form>
                <div className="row col-6 mx-auto mt-2">
                    <label htmlFor="email">Name</label>
                    <input type="text" id="name" onChange={handleChange}></input>
                </div>                
                <div className="row col-6 mx-auto mt-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={handleChange}></input>
                </div>
                <div className="row col-6 mx-auto mt-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={handleChange}></input>
                </div>
            </form>
        </div>
        <div className="container mt-4 mx-auto row col-2">
            <button type="button" className="btn btn-success" onClick={handleClick}>Create account</button>
        </div>
        <div className="container mt-4 row mx-auto col-3">
            <span className='text-center fw-bold text-danger'> Already have an account ?</span>
            <button className='btn btn-info mt-2' onClick={() => navigate('/signin')}>Sign In</button>
        </div>
    </div>
  )
}
