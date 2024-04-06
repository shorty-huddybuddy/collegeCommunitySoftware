import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useParams } from 'react-router-dom'

const UserDetails = () => {

  const [user, setUser] = useState([]);

  const { username } = useParams()

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

  const isLoggedIn = (localStorage.getItem('user') == user.email)

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = async () => {
      // Process the image data (e.g., display preview)
      const imageURL = reader.result
      const { email } = user 
      try{
        const response = await fetch('http://localhost:5000/user/updateImage', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, imageURL })
        });
    
        if (!response.ok) {
          const data = await response.json()
          alert(`${data.message}`)
          return
        }
        const data = await response.json()
        document.querySelector('#profilePhoto').setAttribute("src" , imageURL)
        alert(`${data.message}`)

      } catch (error) {
        console.error(error)
      }


    };
  
    reader.readAsDataURL(imageFile);
  }

  const [aboutToggle , setAboutToggle] = useState(true)

  const [profileAbout , setProfileAbout] = useState(user.about)

  const updateAbout = async (e) => {

    const profileAboutData = profileAbout
    const { email } = user

    try {
      const response = await fetch('http://localhost:5000/user/updateAbout', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, profileAboutData })
      });
  
      const data = await response.json()

      if (!response.ok) {
        alert(`${data.message}`)
        return
      }
  
      alert(`${data.message}`)
      window.location.reload()

    } catch (error) {
      console.error(error)
    }
  }

  const About = (
    <div>
      <span>About {user.name} :</span>
      <input type='text' defaultValue={user.about} className='text-center mx-4 p-1' disabled={aboutToggle} id = 'profileAbout' onChange={(e) => setProfileAbout(e.target.value)}></input>
      <button className='btn' onClick={() => setAboutToggle(false)}>
        {(aboutToggle && isLoggedIn) && <i className='bi bi-pencil-fill'></i>}
      </button>
      <button className='btn' onClick = {updateAbout}>
        {profileAbout && <i className="bi bi-check-circle-fill text-success"></i>}
      </button>
    </div>
  )

  const defaultAbout = (
    <div className='col-6 mx-auto'>
      <label htmlFor="profileAbout">Add something about yourself</label>
      <input type='text-area' id = 'profileAbout' className='mx-3' onChange={(e) => setProfileAbout(e.target.value) }></input>
      <button className='btn' onClick = {updateAbout}>
        {profileAbout && <i className="bi bi-check-circle-fill text-success"></i>}
      </button>
    </div>
  )

  const [year , setYear] = useState(2026)

  const updateYear = async (e) => {

    const passoutYear = year
    const { email } = user

    try {
      const response = await fetch('http://localhost:5000/user/updateYear', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, passoutYear })
      });
  
      const data = await response.json()

      if (!response.ok) {
        alert(`${data.message}`)
        return
      }

      alert(`${data.message}`)
      window.location.reload()

    } catch (error) {
      console.error(error)
    }
  }

  const defaultPassoutYear = (
    <div className='col-6 mx-auto'>
      <div className="form-floating">
        <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e) => setYear(e.target.value)} defaultValue={2026}>
        <option value={2000}>2000</option>
        <option value={2001}>2001</option>
        <option value={2002}>2002</option>
        <option value={2003}>2003</option>
        <option value={2004}>2004</option>
        <option value={2005}>2005</option>
        <option value={2006}>2006</option>
        <option value={2007}>2007</option>
        <option value={2008}>2008</option>
        <option value={2009}>2009</option>
        <option value={2010}>2010</option>
        <option value={2011}>2011</option>
        <option value={2012}>2012</option>
        <option value={2013}>2013</option>
        <option value={2014}>2014</option>
        <option value={2015}>2015</option>
        <option value={2016}>2016</option>
        <option value={2017}>2017</option>
        <option value={2018}>2018</option>
        <option value={2019}>2019</option>
        <option value={2020}>2020</option>
        <option value={2021}>2021</option>
        <option value={2022}>2022</option>
        <option value={2023}>2023</option>
        <option value={2024}>2024</option>
        <option value={2025}>2025</option>
        <option value={2026}>2026</option>
        <option value={2027}>2027</option>
        <option value={2028}>2028</option>
        <option value={2029}>2029</option>
        </select>
        <label htmlFor="floatingSelect">Select passout year</label>
      </div>
        <button className='btn btn-success mt-2' onClick = {updateYear}>
          Update passout year
        </button>
    </div>
  )

  const [yearToggle, setYearToggle] = useState(true)

  const PassoutYear = (
    <div>
      <span>Passout year :</span>
      <select disabled={yearToggle} defaultValue={user.passoutYear} onChange={(e) => setYear(e.target.value)} className='mx-4 p-1'>
        <option value={2000}>2000</option>
        <option value={2001}>2001</option>
        <option value={2002}>2002</option>
        <option value={2003}>2003</option>
        <option value={2004}>2004</option>
        <option value={2005}>2005</option>
        <option value={2006}>2006</option>
        <option value={2007}>2007</option>
        <option value={2008}>2008</option>
        <option value={2009}>2009</option>
        <option value={2010}>2010</option>
        <option value={2011}>2011</option>
        <option value={2012}>2012</option>
        <option value={2013}>2013</option>
        <option value={2014}>2014</option>
        <option value={2015}>2015</option>
        <option value={2016}>2016</option>
        <option value={2017}>2017</option>
        <option value={2018}>2018</option>
        <option value={2019}>2019</option>
        <option value={2020}>2020</option>
        <option value={2021}>2021</option>
        <option value={2022}>2022</option>
        <option value={2023}>2023</option>
        <option value={2024}>2024</option>
        <option value={2025}>2025</option>
        <option value={2026}>2026</option>
        <option value={2027}>2027</option>
        <option value={2028}>2028</option>
        <option value={2029}>2029</option>
      </select>
      <button className='btn' onClick={() => setYearToggle(false)}>
        {(yearToggle && isLoggedIn) && <i className='bi bi-pencil-fill'></i>}
      </button>
      {!yearToggle && <button className='btn btn-success mt-2' onClick = {updateYear}>
        Update passout year
      </button>}
    </div>
  )
  
  return (
    <div className='container mt-5'>
      <div>
        <h1 className='text-center text-info'>
          {isLoggedIn && 'Welcome'} {user.name}
        </h1>
      </div>
      <div className='mt-5 text-center'>
        <img src={user.photoURL} className='rounded mx-auto d-block w-25 h-25' alt='profilePhoto' id='profilePhoto'></img>
        {isLoggedIn && <label htmlFor="photoSelector" style={{cursor : 'pointer'}} className='bg-success p-2 text-white border rounded-3'>Update photo</label>}
        <input type="file" name="fileInput" id="photoSelector" className='visually-hidden' accept="image/*" onChange={handleImageChange}/>
      </div>
      <div className='mt-4 text-center'>
        {(!isLoggedIn) ? About : (user.about ? About : defaultAbout)}
      </div>
      <div className='mt-4 text-center'>
        {(!isLoggedIn) ? PassoutYear : (user.passoutYear ? PassoutYear : defaultPassoutYear)}
      </div>
    </div>
  )
}

export default UserDetails