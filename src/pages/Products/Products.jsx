import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { useLocation } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [sortBy, setSortBy] = useState('price'); // Default sort by price
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order is ascending
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("search") || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products?page=${currentPage}&size=${itemPerPage}&search=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}&brand=${brand}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [itemPerPage, currentPage, searchTerm, sortBy, sortOrder, brand, category, minPrice, maxPrice]);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/count?search=${searchTerm}&brand=${brand}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
        setProductCount(response.data.count);
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };

    fetchProductCount();
  }, [searchTerm, brand, category, minPrice, maxPrice]);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(productCount / itemPerPage) - 1));
  };

  const numPages = Math.ceil(productCount / itemPerPage);

  return (
    <div className="container w-[98%] mx-auto min-h-(100vh-73.5px) my-16">
      <div className="grid grid-cols-4 gap-4 border-t-2 border-[#1e1e1e34] pt-5">
        {/* Left fixed section */}
        <div className="col-span-1 min-h-(100vh-73.5px) sticky top-[73.5px] border-r-2 border-[#1e1e1e34] pr-5">
          {/* Filters and sorting options */}
          <div className="mb-4">
            <h2 className='text-green-400 font-semibold text-2xl text-center my-3'>Filters</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Brand Name</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="px-4 py-2 rounded-md border w-full border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">All Brands</option>
                {/* Add more options dynamically */}
                <option value="BrandA">Brand A</option>
                <option value="BrandB">Brand B</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Category Name</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 rounded-md border w-full border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {/* Add more options dynamically */}
                <option value="CategoryA">Category A</option>
                <option value="CategoryB">Category B</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price Range</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(parseFloat(e.target.value))}
                placeholder="Min Price"
                className="px-4 py-2 rounded-md border w-full border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                placeholder="Max Price"
                className="px-4 py-2 rounded-md border w-full border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <h2 className='text-green-400 font-semibold text-2xl text-center my-3'>Sort by</h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-md border w-full border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
              >
                <option value="price">Price</option>
                <option value="date">Date Added</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-2 rounded-md border w-full border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
        {/* Right scrollable product section with hidden scrollbar */}
        <div className="col-span-3 min-h-(100vh-73.5px) overflow-y-auto hide-scrollbar">
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
