import { NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-blue-200 text-gray-700 py-4 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <p className="text-sm mb-2 md:mb-0">
          © {new Date().getFullYear()} Demo App. All rights reserved.
        </p>

        {/* Middle Links */}
        <div className="flex space-x-4">
          <NavLink
            to="/about"
            className="hover:text-blue-700 transition-colors duration-200"
          >
            About
            </NavLink>
            <NavLink
            to="/Contect"
            className="hover:text-blue-700 transition-colors duration-200"
          >
            Contect
            </NavLink>
            <NavLink
            to="/about"
            className="hover:text-blue-700 transition-colors duration-200"
          >
            About
            </NavLink>
          
          
        </div>

        {/* Right Section */}
        <div className="flex space-x-3 mt-2 md:mt-0">
          <a href="#" className="hover:text-blue-700">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-blue-700">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-blue-700">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
