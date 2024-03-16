import React, { useState, useEffect } from 'react'

import axios from 'axios';

const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: ""
}

export default function AddContact() {

  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading]= useState(false)
  const URL = "http://localhost:5000"

  const handleChange = e => {
    const { name, value } = e.target
    setState(s => ({ ...s, [name]: value }))
  }


  const handleSubmit = e => {
    e.preventDefault();
  
    let { firstName, lastName, phoneNumber } = state
    firstName = firstName.trim()
    lastName = lastName.trim()
   
    if (firstName.length < 3) { 
      console.log("First name is too short");
      return alert("Please enter the first name correctly!") 
    }
    if (lastName.length < 3) { 
      console.log("Last name is too short");
      return alert("Please enter the last name correctly!") 
    }
  
    let contact = {
      firstName, lastName, phoneNumber,
    }
  
    
    setIsLoading(true);
    axios.post(`${URL}/api/contacts`, contact)
      .then((res) => {
        console.log('Response:', res)
        window.toastify("Contact Added", "success")
        setState(initialState); 
      })
      .catch((err) => {
        console.error('Error:', err)
      })
      .finally(() => {
        setIsLoading(false);
        console.log('Form reset.');
      });
  }
  
  return (
    <div className="py-5 home d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-3 p-md-4 p-lg-5">
              <form onSubmit={handleSubmit} >
                <div className="row">
                  <div className="col">
                    <h2 className='text-center mb-4'>Add Contact</h2>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <input type="text" className='form-control' name='firstName' placeholder='Enter First Name' onChange={handleChange} />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <input type="text" className='form-control' name='lastName' placeholder='Enter Last Name' onChange={handleChange} />
                  </div>
                </div>


                <div className="row mb-4">
                  <div className="col">
                    <input name="phoneNumber" type="number" className='form-control'  placeholder='Enter your Phone Number' onChange={handleChange} ></input>
                  </div>
                </div>


                <div className="row">
                  <div className="col d-flex align-items-center justify-content-center">

                    {
                      !isLoading ? <button className='btn btn-danger w-50'> Add Contact </button> : <div className="spinner spinner-grow spinner-grow-sm"></div>
                    }

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
