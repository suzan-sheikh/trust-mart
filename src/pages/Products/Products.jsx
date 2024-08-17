import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { useLocation } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [productCount,setProductCount]= useState(0)
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("search") || '';
  console.log(searchTerm);
    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products?page=${currentPage}&size=${itemPerPage}`);
        setProducts(response.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [itemPerPage,currentPage]);
  
    useEffect(() => {
    const fetchProductscount = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/count`);
        setProductCount(response?.data?.count);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductscount();
  }, []);
  
  
  
  
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(productCount/ itemPerPage) - 1));
  };

  const numPages = Math.ceil(productCount / itemPerPage);

  return (
    <div className="container mx-auto min-h-(100vh-73.5px) my-16">

      <div className="grid grid-cols-4 gap-4 ">
        {/* Left fixed section */}
        <div className="col-span-1 min-h-(100vh-73.5px) sticky top-[73.5px]">
      <div className=' flex justify-between items-center '>
      <div>
      <select className="px-4 py-2 rounded-md border w-full  rounded-r-none border-gray-300 focus:outline-none focus:border-blue-500">
            <option value="tshirt">Brand Name</option>
            <option value="pant">Pant</option>
            <option value="suit">Suit</option>
          </select>
      </div>
      <div>
      <select className="px-4 py-2 rounded-md border  rounded-r-none border-gray-300 focus:outline-none focus:border-blue-500">
            <option value="tshirt">Categori name</option>
            <option value="tshirt">T-shirt</option>
            <option value="pant">Pant</option>
            <option value="suit">Suit</option>
          </select>
      </div>
      </div>
      <div>
      <select className="px-4 py-2 rounded-md border  rounded-r-none border-gray-300 focus:outline-none focus:border-blue-500">
            <option value="tshirt">Product price</option>
            <option value="tshirt">T-shirt</option>
            <option value="pant">Pant</option>
            <option value="suit">Suit</option>
          </select>
      </div>
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
          <div className="flex justify-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className="btn btn-outline btn-circle"
          >
            <GrLinkPrevious size={20} className="inline-block mr-2" />
          </button>
          {Array.from({ length: numPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`mx-2 text-2xl ${currentPage === i ? "underline" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === numPages - 1}
            className="btn btn-outline btn-circle"
          >
            <GrLinkNext size={20} className="inline-block ml-2" />
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
