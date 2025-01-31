import React from 'react';
import { Button, Sidebar } from 'flowbite-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartSidebar({ isOpen, onClose }) {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <Sidebar
      aria-label="Cart Sidebar"
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <Button size="xs" color="failure" onClick={() => removeFromCart(item)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button color="failure" className="w-full mt-4" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        )}
        <Button gradientDuoTone="purpleToBlue" className="w-full mt-4" as={Link} to="/checkout">
  Proceed to Checkout
</Button>
      </div>
    </Sidebar>
  );
}