import { Alert, Button, Spinner, TextInput } from 'flowbite-react'
import React, {useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { Label } from 'flowbite-react'
import { useSignin } from '../hooks/useSignin';

export default function SignIn() {

    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const {signin, loading, error} = useSignin();
    const HandleChange = (e) => {
      setFormData({...formData, [e.target.id]: e.target.value.trim()});
    };

    const HandleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.email || !formData.password) {
        return setErrorMessage('Please fill out all fields');
      }
     await signin(formData);
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
              <Label value='Your Email'/>
              <TextInput
              type='email' placeholder='Email' id='email' onChange={HandleChange}/>
            </div>

              <div>
              <Label value='Your Password'/>
              <TextInput
              type='password' placeholder='Password' id='password' onChange={HandleChange}/>
            </div>

            <Button type='submit' disabled = {loading}>
              {
                loading ? (
                  <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
                </>
              ) : 'SignUp'
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Create an Account?</span>
            <Link to='/signup' className='text-blue-400'>Sign Up</Link>
          </div>
          {
            error && (
              <Alert className='mt-5' color='failure'>
                {error}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
