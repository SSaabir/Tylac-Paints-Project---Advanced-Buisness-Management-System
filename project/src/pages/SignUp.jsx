import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import {Link } from 'react-router-dom'
import { Label } from 'flowbite-react'
import { json } from 'express';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const HandleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
    } catch (error) {
      
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5'>
        <div className='flex-1'>
          {/* right */}
          <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
    <span>Tylac</span>
    </Link>
    <p className='text-sm mt-5'>This is a demo project</p>
        </div>
        <div className='flex-1'>
          {/* right */}
          <form className='flex flex-col gap-4' onSubmit={HandleSubmit}>
            <div>
              <Label value='Your Username' />
              <TextInput
              type='text' placeholder='Username' id='username' onChange={HandleChange}/>
            </div>
            
            <div>
              <Label value='Your Email'/>
              <TextInput
              type='email' placeholder='Email' id='email' onChange={HandleChange}/>
            </div>

              <div>
              <Label value='Your Password'/>
              <TextInput
              type='password' placeholder='Password' id='password' onChange={HandleChange}/>
            </div>

            <Button type='submit'>Sign Up</Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an Account?</span>
            <Link to='/signin' className='text-blue-400'>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
