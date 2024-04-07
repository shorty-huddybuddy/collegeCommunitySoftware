import React, { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TrackBloodRequests() {

  const [bloodRequests , setBloodRequests] = useState([])
  const [user, setUser] = useState([])
  const navigate = useNavigate()
  const user_email = localStorage.getItem('user')

  useEffect(() => {
    const fetchAllRequests = async () => {
      try{
        const resposne = await fetch('http://localhost:5000/findBloodRequests')
        const data = await resposne.json()
        if(!resposne.ok){
          alert(`${data.message}`)
        }
        setBloodRequests(data.bloodRequests)
      }
      catch(error){
        console.log(error)
        alert('Could not fetch requests')
      }
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/profile?user=' +  user_email)
        const data = await response.json()
        if(!response.ok){
          alert(`${data.message}`)
        }
        setUser(data.user)
      } catch (error) {
        console.error(error)
        alert('Failed to fetch user profile')
      }
    };

    fetchData()

    fetchAllRequests()

  },[])

  const handleDonatation = async (e , id) => {

    e.preventDefault()

    try{
      const response = await fetch('http://localhost:5000/updateBloodRequest' , {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id , user })
      })

      const data = await response.json()
      if(!response.ok){
        alert(`${data.message}`)
      }

      alert(`${data.message}`)
      window.location.reload()

    }
    catch(error){
      console.log(error)
      alert('Could not donate')
    }

  }

  return (
    <div className='mt-5'>
      <div className='container text-center'>
        <h1 className='text-warning'>All Blood Requests</h1>
      </div>
      <div className='mt-5'>
        {bloodRequests.map((request) => (
          <div className='bg-secondary-subtle mt-4 p-3' key={request._id}> 
            <span className='ms-5'>Requested Blood Group : {request.BGType}</span>
            <span  className='ms-5'>User Requested : {request.userRequested.name}</span>
            <span className='ms-5'>Time requested : {request.timeRequested.substr(0,10)}</span>
            <button className='btn btn-outline-secondary ms-5' onClick={(e) => navigate(`/profile/${request.userRequested.email}`)}>View Patient Profile</button>
            <span className='ms-5'>Request Fulfilled : {request.fulfilled ? 'Yes' : 'No'}</span>
            {user_email !== request.userRequested.email && !request.fulfilled && <button className='ms-5 btn btn-outline-danger' onClick={(e) => handleDonatation(e , request._id)}>Donate Blood</button>}
            {request.fulfilled && <span className='ms-5'>Donated User : {request.userDonated.name}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
