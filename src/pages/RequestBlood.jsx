import React, { useState , useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function BloodGroupTracking() {

    const[BG , setBG] = useState("O+")
    const [user, setUser] = useState([]);

    const username = localStorage.getItem('user')    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/profile?user=' +  username)
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
    }, [])


    const handleSubmit = async(e) => {
      e.preventDefault()
      
      try{
        const response = await fetch('http://localhost:5000/requestBlood' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({BGType : BG , user}),
        })

        const data = await response.json()
        if(!response.ok){
          console.log(data.message)
          alert(`${data.message}`)
          return
        }

        alert(`${data.message}`)

      }
      catch(error){
        console.log(error)
        alert('Could not request blood')
      }

    }

  return (
    <div className='mt-5'>
        <div className='container text-center'>
            <h1 className='text-info'>Request Blood</h1>
        </div>
        <div className='mt-5 col-3 mx-auto'>
        <label htmlFor='selectBG'>Choose the blood group of the patient</label>
        <select className="form-select" aria-label="Default select example" id='selectBG' defaultValue={"O+"} onChange={(e) => setBG(e.target.value)}>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="AB+">AB+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="O-">O-</option>
            <option value="AB-">AB-</option>
        </select>
        <div className='mt-3 d-flex'>
          <button className='btn btn-success mx-auto text-center' onClick={handleSubmit}>Request Now</button>
        </div>
        </div>
    </div>
  )
}
