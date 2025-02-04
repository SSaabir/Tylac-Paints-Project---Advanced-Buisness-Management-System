import { Alert, Button, Spinner, TextInput, FileInput, Textarea } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from 'flowbite-react';
import { useSignup } from '../hooks/useSignup';

export default function SignUp() {
  const [formData, setFormData] = useState(new FormData()); // Initialize FormData
  const navigate = useNavigate();
  const { signup, loading, error } = useSignup();

  const HandleChange = (e) => {
    if (e.target.type === 'file') {
      formData.set('profileImage', e.target.files[0]); // Handle file input
    } else {
      formData.set(e.target.id, e.target.value.trim()); // Set text fields
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.get('firstName') || !formData.get('lastName') || !formData.get('email') || !formData.get('phoneNumber') || !formData.get('password') || !formData.get('address') || !formData.get('dob')) {
      throw new Error("All Fields are Required");
    }
    await signup(formData);
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5'>
        <div className='flex-1'>
          {/* left */}
          <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span>Tylac</span>
          </Link>
          <p className='text-sm mt-5'>This is a demo project</p>
        </div>
        <div className='flex-1'>
          {/* right */}
          <form className='flex flex-col gap-4' onSubmit={HandleSubmit}>
            <div>
              <Label value='Your First Name' />
              <TextInput type='text' placeholder='First Name' id='firstName' onChange={HandleChange} />
            </div>

            <div>
              <Label value='Your Last Name' />
              <TextInput type='text' placeholder='Last Name' id='lastName' onChange={HandleChange} />
            </div>

            <div>
              <Label value='Your Email' />
              <TextInput type='email' placeholder='Email' id='email' onChange={HandleChange} />
            </div>

            <div>
              <Label value='Your Phone Number' />
              <TextInput type='text' placeholder='Phone Number' id='phoneNumber' onChange={HandleChange} />
            </div>

            <div>
              <Label value='Your Password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={HandleChange} />
            </div>

            <div>
              <Label value='Your Address' />
              <Textarea placeholder='Address' id='address' onChange={HandleChange} />
            </div>

            <div>
              <Label value='Upload Profile Image' />
              <FileInput id='profileImage' accept='image/*' onChange={HandleChange} /> {/* File input */}
            </div>

            <div>
              <Label value='Date of Birth' />
              <TextInput type='date' placeholder='Date of Birth' id='dob' onChange={HandleChange} />
            </div>

            <Button type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : 'SignUp'}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an Account?</span>
            <Link to='/signin' className='text-blue-400'>Sign In</Link>
          </div>
          {error && (
            <Alert className='mt-5' color='failure'>
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
