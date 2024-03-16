import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddContact from './AddContact/AddContact'
import ReadContact from './ReadContact/ReadContact'

function Index() {
  return (
<Routes>
    <Route  path='/' element={<AddContact />} />
    <Route  path='/read-contact' element={<ReadContact />} />
</Routes>
    )
}

export default Index