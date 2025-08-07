import React from 'react';

const AboutUsComponent = () => {
  return (
    <div className="bg-gradient-to-b from-neutral-400 to-white text-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center">
        
        {/* Left Side: Title */}
        <div className="sm:w-1/2 mb-8 sm:mb-0 text-center sm:text-left">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-shadow">
            Message From Author
          </h2>
          <div className="h-1 w-16 bg-black mx-auto sm:mx-0 mb-8"></div> {/* Horizontal Line */}
        </div>

        {/* Right Side: Bio */}
        <div className="sm:w-1/2 space-y-6">
          {/* Box with shadow around the text */}
          <div className="bg-white text-center p-6 rounded-3xl drop-shadow-2xl transition-shadow duration-300">
            <p className="text-lg text-gray-800 leading-relaxed">
              How's it going guys, my name is Ashur and I am the author of this e-book/video series. I made this guide because I've came from the bottom. Being a high school dropout, being through the military, to starting multiple businesses and just recently grew my pool service business to make a quarter million dollars annually. With sights of opening up a bodybuilding gym in the very near future. If you're willing to put in the work, I highly recommend looking through this guide. Im giving you a damn blueprint to start and grow your business in any trade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
