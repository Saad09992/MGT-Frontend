import React, { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import backend from "../api/backend";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";

const EmailVerify = () => {
  const { id, token } = useParams();
  const [validUrl, setValidUrl] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyEmailUrl = useCallback(async () => {
    setLoading(true);
    try {
      const url = `/${id}/verify/${token}`;
      const { data } = await backend.get(url);
      console.log(data);
      setValidUrl(true);
    } catch (error) {
      console.error(error.response);
      setValidUrl(false);
      toast.error(error.response.data.error.msg);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform transition-all hover:scale-105 text-center">
          {validUrl ? (
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
                Email verified successfully
              </h1>
              <Link to="/login">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition-opacity">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition-opacity"
              onClick={verifyEmailUrl}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Click Here To Verify Your Account"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(EmailVerify);
