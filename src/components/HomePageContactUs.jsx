import React from 'react'
import { useState } from 'react'

export default function HomePageContactUs() {

  const [formData, setFormData] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch('http://localhost:5000/contact-us', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if(!response.ok){
          const data = await response.json()
          alert(`${data.message}`)
          return
        }
  
        const data = await response.json()
        alert('Query raised successfully')
        setFormData({})
  
      } catch (error) {
        console.error(error)
        alert('Failed to send the query. Please try again.')
      }

  }


  return (
    <div className='container my-5'>
        <h1 className="text-danger-emphasis d-flex justify-content-center">
            Need some help ? Contact us !
        </h1>
        <form className='mt-5'>
          <div className="row col-6 mx-auto mt-2">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })} defaultValue={localStorage.getItem('user')}></input>
          </div>
          <div className="row col-6 mx-auto mt-2">
            <label htmlFor="query">Enter your query here</label>
            <input type="textarea" id="query" onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })}></input>
          </div>
          <div className="container mt-4 mx-auto row col-2">
            <button type="submit" className="btn btn-success" onClick={handleSubmit}>Contact Us</button>
          </div>
        </form>
    </div>
  )
}
