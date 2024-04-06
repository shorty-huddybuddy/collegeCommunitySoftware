import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function () {

    const navigate = useNavigate()

    const [name , setName] = useState('')
    const [users , setUsers] = useState([])

    const handleClick = async (e) => {

        e.preventDefault()

        try {
            const response = await fetch('http://localhost:5000/searchUsers?name=' +  name)
            const data = await response.json()
            if(!response.ok){
              alert(`${data.message}`)
              return
            }
            setUsers(data.users)
            
        } catch (error) {
            console.error(error)
            alert('Failed to fetch name profile')
            return
        }

    }

    console.log(users)

    return (
        <div className='container mt-5'>
            <div className='container'>
                <h1 className='text-info text-center'>View other's Profile</h1>
            </div>
            <div className='container mt-5 text-center'>
                <form>
                    <div className="row col-6 mx-auto">
                        <label htmlFor="name">Enter the name of the name to be searched</label>
                        <input type="text" id="name" onChange={(e) => setName(e.target.value)} className='mt-2' placeholder='Leave it empty to get all the users...'></input>
                    </div>
                    <button className='btn btn-success mt-3' onClick={(e) => handleClick(e)}>Find name</button>
                </form>
            </div>
            <div className='mt-5 row text-center'>
                {users.map((user) => (
                    <div className="card mx-auto" style={{ width: '18rem', margin: '10px' }} key={user._id}>
                        <img src={user.photoURL} className="card-img-top" alt="profilePhoto"/>
                        <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.about}</p>
                        <a href={`/profile/${user.email}`} className="btn btn-primary">View profile</a>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}
