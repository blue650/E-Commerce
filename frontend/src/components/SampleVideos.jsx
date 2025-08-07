import React from 'react';

const SampleVideos = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Sample Video</h2>

        {/* Container for the excerpt and video */}
        <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-8 sm:space-y-0 justify-center">
          
          {/* Left Side: Sample Excerpt */}
          <div className="flex-shrink-0 w-full sm:w-1/2">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <p className="text-lg text-gray-800 leading-relaxed">
                Sample video from section 4 part two of the blue-collar business guide; section 4 is about your bank accounts.
              </p>
            </div>
          </div>

          {/* Right Side: Example Video */}
          <div className="flex-shrink-0 w-full sm:w-1/2">
            <div className="relative pb-9/16">
              <video
                className="rounded-lg shadow-lg"
                controls
                style={{ height: "300px", width: "100%" }} // Adjusted height and set width to 100% for responsiveness
                playsInline // Prevents video from expanding
              >
                <source src="introvideo.mov" type="video/quicktime" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SampleVideos;
