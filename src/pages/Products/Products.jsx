import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="container mx-auto min-h-(100vh-73.5px) my-16">

      <div className="grid grid-cols-4 gap-4 ">
        {/* Left fixed section */}
        <div className="col-span-1 min-h-(100vh-73.5px) sticky top-[73.5px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis veniam libero cumque exercitationem blanditiis repellat necessitatibus ullam tempore quae nulla, iste pariatur cupiditate? Assumenda ut laudantium magnam excepturi blanditiis exercitationem ducimus beatae quisquam animi incidunt! Veniam dignissimos quisquam, eveniet assumenda, excepturi nulla corporis est qqui labore dolorem maxime odit consequuntur. Animi eaque voluptas laborum in quisquam voluptate veritatis?
        </div>
        {/* Right scrollable product section with hidden scrollbar */}
        <div className="col-span-3 min-h-(100vh-73.5px)  overflow-y-auto hide-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-semibold text-blue-600">${product.price}</span>
                    <span className="text-yellow-500">⭐ {product.ratings}</span>
                  </div>
                  <p className="text-sm text-gray-500">Category: {product.category}</p>
                  <p className="text-sm text-gray-400">Created on: {new Date(product.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
