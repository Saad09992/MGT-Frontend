import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../store/Types/AuthTypes";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.AuthReducers);

  const handleLogout = () => {
    localStorage.removeItem("nocClientToken");
    dispatch({ type: LOGOUT });
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300 transition-colors">
            MGT
          </Link>
        </div>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link
              to="/"
              className={`text-white hover:text-gray-300 transition-colors ${
                location.pathname === "/" ? "underline" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/add-user"
              className={`text-white hover:text-gray-300 transition-colors ${
                location.pathname === "/add-user" ? "underline" : ""
              }`}
            >
              Add Users
            </Link>
          </li>
          {/* <li>
            <Link
              to="/services"
              className={`text-white hover:text-gray-300 transition-colors ${
                location.pathname === "/services" ? "underline" : ""
              }`}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`text-white hover:text-gray-300 transition-colors ${
                location.pathname === "/contact" ? "underline" : ""
              }`}
            >
              Contact
            </Link>
          </li> */}
          {token ? (
            <li>
              <button
                onClick={handleLogout}
                className="text-purple-500 bg-white px-4 py-2 rounded-full transition-all duration-300 hover:bg-gray-200 shadow-md hover:shadow-lg no-underline"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={`text-purple-500 bg-white px-4 py-2 rounded-full transition-all duration-300 ${
                    location.pathname === "/login" ? "underline" : ""
                  } hover:bg-gray-200 shadow-md hover:shadow-lg no-underline`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`text-white bg-pink-500 px-4 py-2 rounded-full transition-all duration-300 ${
                    location.pathname === "/register" ? "underline" : ""
                  } hover:bg-white hover:text-pink-500 border shadow-md hover:shadow-lg no-underline`}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
