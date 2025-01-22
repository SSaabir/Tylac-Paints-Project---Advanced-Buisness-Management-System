import { Alert, Button, Spinner, TextInput } from 'flowbite-react'
import React, {useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { Label } from 'flowbite-react'

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const HandleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
            <span>Have an Account?</span>
            <Link to='/signin' className='text-blue-400'>Sign In</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
