import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function BloodGroupTracking() {

    const[BG , setBG] = useState("O+")

  return (
    <div className='mt-5'>
        <div className='container text-center'>
            <h1 className='text-info'>Request Blood</h1>
        </div>
        <div className='mt-5 col-3 mx-auto'>
        <label htmlFor='selectBG'>Choose the blood group to be requested</label>
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
        </div>
    </div>
  )
}
