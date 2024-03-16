import React, { useState, useEffect } from 'react'
import axios from 'axios';


export default function ReadContact() {

  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [editContact, setEditContact] = useState([]);
  console.log(editContact)
  const [isProcessingUpdate, setIsProcessingUpdate] = useState(false)
  const URL = "http://localhost:5000"

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditContact(s => ({ ...s, [name]: value }))
  }


  useEffect(() => {
    axios.get(`${URL}/api/contacts`)
      .then((res) => {
        const { data } = res
        setDocuments(data)
        setFilteredDocs(data)
        console.log('Array', data)
      })
      .catch(err => {
        console.log('err', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const handleEdit = contact => {
    console.log('Contact for Edit', contact);
    setEditContact(contact)
    axios.put(`${URL}/api/contacts/${contact._id}`, editContact)
      .then((res) => {
        console.log('res', res);
     
        const updatedContact = res.data;
        const updatedDocs = filteredDocs.map(doc => {
          if (doc._id === updatedContact._id) {
            return updatedContact;
          }
          return doc;
        });

        setFilteredDocs(updatedDocs);
        setDocuments(updatedDocs); 

        
      })
      .catch((err) => {
        console.log('err', err);
      });
}


  const handleDelete = contact => {
    console.log('Contact for delete', contact);

    axios.delete(`${URL}/api/contacts/${contact._id}`)
      .then((res) => {
        console.log('res', res);

        
        setFilteredDocs(prevDocuments => prevDocuments.filter(doc => doc._id !== contact._id));
        setDocuments(prevDocuments => prevDocuments.filter(doc => doc._id !== contact._id));

        window.toastify("Deleted!", "success")
      })
      .catch((err) => {
        console.log('err', err);
      });
  }



  const handleSearch = e => {
    let text = e.target.value.toLowerCase();
    // console.log(text);
    setFilteredDocs(documents.filter(doc =>
      doc.firstName.toLowerCase().includes(text) ||
      doc.lastName.toLowerCase().includes(text)
    ));
  }

  return (
    <>
      <div className="py-5 bg-light d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row" >
            <div className="col ">
              <h2 className='text-center mb-4'>All Contacts</h2>
            </div>
          </div>

          <div className="row ">
            <div className="col d-flex justify-content-center align-items-center">

              <input type="text" className='form-control w-50 mb-5' placeholder='Search With FirstName' onChange={handleSearch} />
            </div>
          </div>

          <div className="row">
            <div className="col">

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Index</th>
                    <th scope="col">FirstName</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocs.map((contact, i) => {
                    return <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{contact.firstName}</td>
                      <td>{contact.lastName}</td>
                      <td>{contact.phoneNumber}</td>
                      <td>
                        <button className='btn btn-info btn-sm me-2' data-bs-toggle="modal" data-bs-target="#exampleModal" onChange={handleChange} onClick={() => { handleEdit(contact) }}>Edit</button>
                        <button className='btn btn-danger btn-sm' onClick={() => { handleDelete(contact) }}>Del</button>
                      </td>
                    </tr>
                  })}
                  
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>



      {/* Model */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit your Contact</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input type="text" class="form-control" placeholder="firstName" onChange={handleChange} name='firstName' value={editContact.firstName} aria-label="firstName" aria-describedby="basic-addon1" />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input type="text" class="form-control" placeholder="lastName" onChange={handleChange} name='lastName' value={editContact.lastName} aria-label="lastName" aria-describedby="basic-addon1" />
              </div>
              {/* <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">@</span>
        <input type="date" class="form-control" placeholder="Date" onChange={handleChange} name='date' value={editStudent.date instanceof Date ? editStudent.date.toISOString().substr(0, 10) : editStudent.date}   aria-label="date" aria-describedby="basic-addon1" />
      </div> */}
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input type="number" class="form-control" placeholder="Phone Number" onChange={handleChange} name='phoneNumber' value={editContact.phoneNumber} aria-label="phoneNumber" aria-describedby="basic-addon1" />
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" disabled={isProcessingUpdate} onClick={handleEdit}>{
                !isProcessingUpdate ? 'Update Contact' : <div className="spinner-border spinner-border-sm"></div>
              }</button>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}


