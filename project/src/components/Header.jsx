import { Button, Navbar, TextInput, Dropdown, Avatar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import React from 'react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import CartSidebar from '../components/CartSidebar';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const path = useLocation().pathname;
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

  const handleClick = () => {
    logout();
  };

  return (
    <Navbar className='border-b-2'>
      {/* Brand Logo */}
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span>Tylac</span>
      </Link>

      {/* Mobile Search Button */}
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>

      {/* Right Side: Search, Theme Toggle, and Auth */}
      <div className='flex gap-2 md:order-2'>
        {/* Search Bar (Desktop) */}
        <TextInput
          icon={AiOutlineSearch}
          placeholder='Search...'
          className='hidden lg:inline'
        />

        {/* Theme Toggle */}
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon />
        </Button>

        {/* Authentication */}
        {!user && (
          <Link to='/signin'>
            <Button color='teal'>Sign In</Button>
          </Link>
        )}

<div className="flex md:order-2">
          <Button onClick={() => setIsCartOpen(!isCartOpen)}>
            Cart ({cart.items.length})
          </Button>
        </div>

        {/* User Dropdown */}
        {user && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar 
  alt="User" 
  img={user?.image ? `http://localhost:3000/${user.image}` : 'https://via.placeholder.com/150'} 
  rounded 
/>
            }
          >
            <Dropdown.Header>
              <span className="block text-sm font-semibold">{user.name || 'User'}</span>
              <span className="block text-sm text-gray-500 truncate">{user.email}</span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to="/profile">Profile</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/settings">Settings</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleClick}>Logout</Dropdown.Item>
          </Dropdown>
        )}
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Navbar Links */}
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/colours'} as={'div'}>
          <Link to='/colours'>Colours</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/product'} as={'div'}>
          <Link to='/product'>Product</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/instruction'} as={'div'}>
          <Link to='/instruction'>Instruction</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/contactus'} as={'div'}>
          <Link to='/contactus'>Contact Us</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}