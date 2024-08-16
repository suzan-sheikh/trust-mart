import React, { useEffect, useState } from 'react';



const Products = () => {
const [products,setProducts]= useState([])
useEffect(() => {
 fetch("http://localhost:5000/products")
 .then(res=>res.json())
 .then(data=>setProducts(data))

},[])
  return (
   <div className='container mx-auto  my-16'>
   <div className=' mb-12'>
   <h2 className=' text-center text-3xl  font-bold '>Products</h2>
   </div>
   <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
  );
};

export default Products;
