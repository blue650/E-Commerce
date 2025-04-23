import React from 'react';

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Contact Info */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-gray-300">Email: Bluecollarbizguide@gmail.com</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/cart" className="text-gray-300 hover:text-white">Cart</a></li>
              <li><a href="/logout" className="text-gray-300 hover:text-white">LogOut</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-300">Sign up for our newsletter to receive updates and offers.</p>
            <form action="#" method="POST" className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 focus:outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default Footer;
