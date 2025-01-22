import {Footer} from 'flowbite-react';
import {Link} from 'react-router-dom';
import {BsFacebook, BsTwitter, BsTwitterX} from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';

export default function FooterCom() {
  return (
   <Footer container className='border border-t-8 border-blue-300'>
    <div className='w-full max-w-7xl mx-auto'>
      <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
        <div className='mt-5'>
        <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
    <span>Tylac</span>
    </Link>
        </div>
        <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
          <div>
          <Footer.Title title='About'/>
        <Footer.LinkGroup col>
          <Footer.Link href='https://www.google.com' target='_blank' rel='noopener noreferrer'>
            DAMN it is
          </Footer.Link>
          <Footer.Link href='https://www.google.com' target='_blank' rel='noopener noreferrer'>
            DAMN it is
          </Footer.Link>
        </Footer.LinkGroup>
          </div>
        <div>
        <Footer.Title title='About'/>
        <Footer.LinkGroup col>
          <Footer.Link href='https://www.google.com' target='_blank' rel='noopener noreferrer'>
            DAMN it is
          </Footer.Link>
          <Footer.Link href='https://www.google.com' target='_blank' rel='noopener noreferrer'>
            DAMN it is
          </Footer.Link>
        </Footer.LinkGroup>
        </div>
        <div>
        <Footer.Title title='About'/>
        <Footer.LinkGroup col>
          <Footer.Link href='https://www.google.com' target='_blank' rel='noopener noreferrer'>
            DAMN it is
          </Footer.Link>
          <Footer.Link href='https://www.google.com' target='_blank' rel='noopener noreferrer'>
            DAMN it is
          </Footer.Link>
        </Footer.LinkGroup>
        </div>
        </div>
      </div>
      <Footer.Divider />
      <div className='w-full sm:flex sm:items-center sm:justify-between'>
        <Footer.Copyright href='#' by='siraaj' year={new Date().getFullYear()}/>
       
        <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
          <Footer.Icon href='#' icon={BsFacebook}/>
          <Footer.Icon href='#' icon={BsLinkedin}/>
          <Footer.Icon href='#' icon={BsInstagram}/>
          <Footer.Icon href='#' icon={BsGithub}/>

        </div>
      </div>
    </div>
   </Footer>
  )
}
