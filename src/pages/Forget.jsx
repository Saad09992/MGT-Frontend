import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../store/AsynMethod/AuthMethod";
import { toast } from "react-toastify";
import { RESET_ERROR, RESET_SUCCESS } from "../store/Types/AuthTypes";

function Forget() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector(
    (state) => state.AuthReducers
  );

  useEffect(() => {
    if (success) {
      toast.success("Password reset email sent!");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Adjust the delay as needed
    } else if (error) {
      toast.error("Unable to send password reset email. Please try again.");
    }
  }, [success, error, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (data) => {
      let errors = {};
      if (data.email?.length === 0) {
        errors.email = "Email required.";
      } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = "Invalid email address.";
      }
      return errors;
    },
    onSubmit: async (data) => {
      dispatch(forgotPassword(data)).then((success) => {
        if (success) {
          formik.resetForm();
        }
      });
    },
  });

  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error mb-1 ml-2" style={{ color: "#de622c" }}>
        {formik.errors[name]}
      </small>
    ) : (
      <small className="p-error">{""}</small>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform transition-all hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Forgot Password
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="pl-4 w-full py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                value={formik.values.email}
                onChange={(e) => formik.setFieldValue("email", e.target.value)}
              />
              {formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition-opacity mt-6"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Email"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forget;
