import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock } from "react-icons/fi";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/AsynMethod/AuthMethod";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.AuthReducers);

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: (data) => {
      let errors = {};
      if (data.email?.length === 0) {
        errors.email = "Email required.";
      } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = "Invalid email address.";
      }
      if (data.password?.length === 0) {
        errors.password = "Password Required.";
      } else if (data.password?.length < 8) {
        errors.password = "At least 8 character Password Required.";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
        errors.password =
          "Password must contain at least one lowercase letter, one uppercase letter, and one digit.";
      }
      if (data.name?.length === 0) {
        errors.name = "Name Required.";
      }

      if (data.cpassword?.length === 0) {
        errors.cpassword = "Confirm Password Required.";
      } else if (data.cpassword !== data.password) {
        errors.cpassword = "Password Not Matched.";
      }
      return errors;
    },
    onSubmit: async (data) => {
      console.log("Form submitted", data);
      dispatch(userRegister(data)).then((success) => {
        if (success) {
          formik.resetForm();
          console.log("Registration successful");
          navigate("/login");
        } else {
          console.log("Registration failed");
        }
      });
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform transition-all hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Register new account
          </h2>
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="relative">
              <FiUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Name"
                className="pl-10 w-full py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
              />
              {formik.errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>
            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="pl-10 w-full py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
              />
              {formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pl-10 w-full py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                value={formik.values.password}
                onChange={formik.handleChange("password")}
              />
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
              {formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="pl-10 w-full py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                value={formik.values.cpassword}
                onChange={formik.handleChange("cpassword")}
              />
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
              {formik.errors.cpassword && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.cpassword}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? "..." : "Register"}
            </button>
          </form>
          <p className="text-center mt-8 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
