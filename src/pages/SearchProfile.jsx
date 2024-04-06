import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function () {

    const navigate = useNavigate()

    const [user , setUser] = useState(null)

    const handleClick = async (e) => {

        e.preventDefault()

        try {
            const response = await fetch('http://localhost:5000/profile?user=' +  user)
            const data = await response.json()
            if(!response.ok){
              alert(`${data.message}`)
              return
            }
            
        } catch (error) {
            console.error(error)
            alert('Failed to fetch user profile')
            return
        }

        navigate(`/profile/${user}`)

    }

    return (
        <div className='container mt-5'>
            <div className='container'>
                <h1 className='text-info text-center'>View other's Profile</h1>
            </div>
            <div className='container mt-5 text-center'>
                <form>
                    <div className="row col-6 mx-auto">
                        <label htmlFor="email">Enter the email of the user to be searched</label>
                        <input type="email" id="email" onChange={(e) => setUser(e.target.value)} className='mt-2'></input>
                    </div>
                    <button className='btn btn-success mt-3' onClick={(e) => handleClick(e)}>Find user</button>
                </form>
            </div>

        </div>
    )
}
