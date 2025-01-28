import React from 'react'
import Navbar from '../components/Navbar'
import Form from '../components/Form';


function UserForm() {

  return (
    <div className='flex flex-col gap-10 '>
    <Navbar/>
    <Form/>
    </div>
  )
}

export default UserForm