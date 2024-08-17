import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";


const Root = () => {
  return (
    <div className="min-h-screen">
    <Navbar></Navbar>
    <div className=" mt-12">
    <Outlet/>
   <div className="">
   <Footer/>
   </div>
    </div>
    </div>
  );
};

export default Root;