import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { addUser } from "../store/AsynMethod/UserMethod";

function AddUser() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
    },
    validationSchema: Yup.object({
      fname: Yup.string().required("First name is required"),
      lname: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      const success = await dispatch(addUser(values));
      if (success) {
        alert("User added successfully!");
      } else {
        alert("Failed to add user.");
      }
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform transition-all hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Add User
          </h2>
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="relative">
              <label htmlFor="fname" className="block text-gray-700">
                First Name
              </label>
              <InputText
                id="fname"
                name="fname"
                className="pl-4 w-full py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                value={formik.values.fname}
                onChange={formik.handleChange}
              />
              {formik.errors.fname && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.fname}
                </p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="lname" className="block text-gray-700">
                Last Name
              </label>
              <InputText
                id="lname"
                name="lname"
                className="pl-4 w-full py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                value={formik.values.lname}
                onChange={formik.handleChange}
              />
              {formik.errors.lname && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.lname}
                </p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <InputText
                id="email"
                name="email"
                className="pl-4 w-full py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <Button
              type="submit"
              label="Add User"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition-opacity"
            />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddUser;
