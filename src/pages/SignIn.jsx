import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {

    const navigate = useNavigate()

  return (
    <div>
        <div className="container mt-5 text-center text-success">
            <h1>
                Sign In
            </h1>
        </div>
        <div className="container mt-4">
            <form>
                <div className="row col-6 mx-auto mt-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email"></input>
                </div>
                <div className="row col-6 mx-auto mt-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"></input>
                </div>
            </form>
        </div>
        <div className="container mt-4 mx-auto row col-1">
            <button type="button" className="btn btn-success">Log In</button>
        </div>
        <div className="container mt-4 row mx-auto col-3">
            <span className='text-center fw-bold text-danger'> Don't have an account ?</span>
            <button className='btn btn-info mt-2' onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
    </div>
  )
}
