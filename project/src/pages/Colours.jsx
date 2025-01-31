import React from 'react';

export default function Colours () {
  const colors = [
    { name: 'Ocean Blue', hex: '#1E90FF' },
    { name: 'Forest Green', hex: '#228B22' },
    { name: 'Sunset Orange', hex: '#FF4500' },
    { name: 'Classic Red', hex: '#B22222' },
    { name: 'Golden Yellow', hex: '#FFD700' },
    { name: 'Elegant Gray', hex: '#808080' },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Explore Our Colors
        </h1>

        {/* Color Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {colors.map((color, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className="w-full h-48 rounded-t-lg"
                style={{ backgroundColor: color.hex }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{color.name}</h3>
                <p className="text-gray-600">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};