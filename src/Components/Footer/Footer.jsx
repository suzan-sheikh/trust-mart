import { FaReddit, FaFacebookF, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png"

const Footer = () => {
  return (
    <footer className="bg-[#e8e5e5]">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl">
              Subscribe to our newsletter to get updates.
            </h1>

            <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
              <input
                id="email"
                type="text"
                className="px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                placeholder="Email Address"
              />
              <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Quick Links</p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">
                Home
              </a>
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">
                Who We Are
              </a>
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">
                Our Philosophy
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Industries</p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">
                Retail & E-Commerce
              </a>
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">
                Information Technology
              </a>
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">
                Finance & Insurance
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-8" />

        <div className="flex items-center justify-between">
        <div className="text-white text-lg font-bold">
          <Link to="/">
            <img
              className="w-16 rounded-sm h-10"
              src={logo}
              alt="Logo"
            />
          </Link>
        </div>

          <div className="flex -mx-2">
            <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500" aria-label="Reddit">
              <FaReddit className="w-5 h-5" />
            </a>

            <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500" aria-label="Facebook">
              <FaFacebookF className="w-5 h-5" />
            </a>

            <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500" aria-label="Github">
              <FaGithub className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
