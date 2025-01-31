import React from 'react';
import { Button } from 'flowbite-react';

export default function Product () {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Explore Our Products
        </h1>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-12">
          <Button gradientDuoTone="purpleToBlue" pill>
            All Products
          </Button>
          <Button gradientDuoTone="cyanToBlue" pill>
            Best Sellers
          </Button>
          <Button gradientDuoTone="tealToLime" pill>
            New Arrivals
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Product Card 1 */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80"
              alt="Product 1"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Outdoor Shield</h3>
              <p className="text-gray-600 mb-4">
                Premium waterproof paint for all outdoor surfaces.
              </p>
              <p className="text-2xl font-bold text-blue-500">$29.99</p>
              <Button gradientDuoTone="purpleToBlue" pill className="w-full mt-4">
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Product 2"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">WeatherGuard</h3>
              <p className="text-gray-600 mb-4">
                Advanced protection against extreme weather conditions.
              </p>
              <p className="text-2xl font-bold text-blue-500">$39.99</p>
              <Button gradientDuoTone="purpleToBlue" pill className="w-full mt-4">
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Add more product cards as needed */}
        </div>
      </div>
    </div>
  );
};
