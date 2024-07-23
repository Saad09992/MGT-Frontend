import React from "react";
import Logo from "./Logo";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Logo />
        <p className="text-sm">© {currentYear} MGT. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
