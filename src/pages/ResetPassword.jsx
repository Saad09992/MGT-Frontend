import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../store/AsynMethod/AuthMethod";
import "../index.css";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, token } = useParams();
  const { loading, success, error } = useSelector(
    (state) => state.AuthReducers
  );
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
    },
    validate: (data) => {
      let errors = {};
      if (data.password?.length === 0) {
        errors.password = "Password Required.";
      } else if (data.password?.length < 8) {
        errors.password = "At least 8 character Password Required.";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
        errors.password =
          "Password must contain at least one lowercase letter, one uppercase letter, and one digit.";
      }
      if (data.cpassword?.length === 0) {
        errors.cpassword = "Confirm Password Required.";
      } else if (data.cpassword !== data.password) {
        errors.cpassword = "Password Not Matched.";
      }
      return errors;
    },
    onSubmit: async (data) => {
      const url = `/${id}/reset-password/${token}`;
      dispatch(resetPassword(data, url, formik));
    },
  });

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Adjust the delay to show the animation
    }
  }, [success, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform transition-all hover:scale-105 text-center">
          {success ? (
            <>
              <svg
                className="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className="checkmark__circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className="checkmark__check"
                  fill="none"
                  d="M14 27l7 7 16-16"
                />
              </svg>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Password reset successful!
              </h1>
              <Link to="/login">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition-opacity">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Reset Password
              </h2>
              <div className="relative">
                <label className="block text-gray-700">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="pl-4 w-full py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                  value={formik.values.password}
                  onChange={(e) =>
                    formik.setFieldValue("password", e.target.value)
                  }
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
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="pl-4 w-full py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                  value={formik.values.cpassword}
                  onChange={(e) =>
                    formik.setFieldValue("cpassword", e.target.value)
                  }
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
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition-opacity mt-6"
                disabled={loading}
              >
                {loading ? "..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
