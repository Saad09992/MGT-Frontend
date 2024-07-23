import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const { token, user } = useSelector((state) => state.AuthReducers);

  useEffect(() => {
    console.log("Token:", token);
    console.log("User object:", user);
  }, [token, user]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          {token && user ? (
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {user.name || user.fullName || "User"}!
            </h1>
          ) : (
            <h1 className="text-3xl font-bold text-gray-800">
              Please login to continue
            </h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
