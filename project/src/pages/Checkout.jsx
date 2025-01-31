import React, { useState } from 'react';
import { Button, Card, TextInput, Alert } from 'flowbite-react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [useExistingAddress, setUseExistingAddress] = useState(false);

  // Calculate subtotal
  const subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

  // Apply discount
  const total = subtotal - discount;

  // Handle coupon application
  const applyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setDiscount(subtotal * 0.1); // 10% discount
      alert('Coupon applied successfully!');
    } else {
      alert('Invalid coupon code.');
    }
  };

  // Handle address form submission
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    alert('Address saved successfully!');
  };

  // Handle payment submission
  const handlePaymentSubmit = () => {
    alert('Payment successful! Thank you for your purchase.');
    clearCart(); // Clear the cart after successful payment
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Checkout</h1>

        {/* Cart Summary */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-bold">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Discount</p>
              <p className="font-bold">-${discount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Total</p>
              <p className="font-bold">${total.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        {/* Coupon Code */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Apply Coupon</h2>
          <div className="flex gap-4">
            <TextInput
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1"
            />
            <Button gradientDuoTone="purpleToBlue" onClick={applyCoupon}>
              Apply
            </Button>
          </div>
        </Card>

        {/* Address Section */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
          {useExistingAddress ? (
            <Alert color="info" className="mb-4">
              Using existing address: 123 Main St, Springfield, IL, 62704
            </Alert>
          ) : (
            <form onSubmit={handleAddressSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  type="text"
                  placeholder="Full Name"
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  required
                />
                <TextInput
                  type="text"
                  placeholder="Street Address"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  required
                />
                <TextInput
                  type="text"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  required
                />
                <TextInput
                  type="text"
                  placeholder="State"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  required
                />
                <TextInput
                  type="text"
                  placeholder="ZIP Code"
                  value={address.zip}
                  onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" gradientDuoTone="purpleToBlue" className="mt-4">
                Save Address
              </Button>
            </form>
          )}
          <Button
            gradientDuoTone="tealToLime"
            className="mt-4"
            onClick={() => setUseExistingAddress(!useExistingAddress)}
          >
            {useExistingAddress ? 'Use New Address' : 'Use Existing Address'}
          </Button>
        </Card>

        {/* Payment Section */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput type="text" placeholder="Card Number" required />
              <TextInput type="text" placeholder="Expiration Date (MM/YY)" required />
              <TextInput type="text" placeholder="CVV" required />
              <TextInput type="text" placeholder="Cardholder Name" required />
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              className="w-full mt-4"
              onClick={handlePaymentSubmit}
            >
              Pay Now
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}