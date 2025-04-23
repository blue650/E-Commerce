import React from 'react';

const AboutUsComponent = () => {
  return (
    <div className="bg-gradient-to-b from-neutral-400 to-white text-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center">
        
        {/* Left Side: Title */}
        <div className="sm:w-1/2 mb-8 sm:mb-0 text-center sm:text-left">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-shadow">
            About Us
          </h2>
          <div className="h-1 w-16 bg-black mx-auto sm:mx-0 mb-8"></div> {/* Horizontal Line */}
        </div>

        {/* Right Side: Bio */}
        <div className="sm:w-1/2 space-y-6">
          {/* Box with shadow around the text */}
          <div className="bg-white text-center p-6 rounded-3xl drop-shadow-2xl transition-shadow duration-300">
            <p className="text-lg text-gray-800 leading-relaxed">
              We specialize in helping blue-collar businesses navigate the challenges of modern markets. 
              Our mission is to empower hardworking individuals with the tools, insights, and strategies 
              they need to thrive in their industries. Built upon personal experiences and lessons, this book
              will give an honest and real perspective on how to accurately and effectively navigate a new blue-collar business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
