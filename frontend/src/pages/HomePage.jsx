import React from 'react';
import { motion } from "framer-motion";
import AboutUsComponent from '../components/AboutUs';
import { useProductStore } from "../stores/useProductStore";
import CategoryItem from '../components/CategoryItem';
import SampleVideos from '../components/SampleVideos'; // Import SampleVideos

const HomPage = () => {
  const { products } = useProductStore();
  console.log("products:", products);
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background and Top Content Wrapper */}
      <div className="relative z-10 text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>
          <img 
            src="backgroundImage.jpg" 
            alt="Description of the image" 
            className="w-full h-full object-cover scale-100 grayscale transition-transform duration-500 ease-in-out" 
          />
        </div>

        {/* Top Content Section */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className=""
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <h1 className="text-center text-5xl sm:text-5xl font-bold text-white mb-4">
              Explore How to Navigate a Blue Collar Business
            </h1>
            <p className="text-center text-xl text-gray-300 mb-12">
              Get Started Here
            </p>
          </motion.div>
          <motion.div
            className=""
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex justify-center mt-12">
              <video
                className="rounded-lg shadow-lg"
                controls
                style={{ height: "700px", width: "125%" }}
              >
                <source src="intro.mov" type="video/mp4" />
                
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="relative z-30">
        <AboutUsComponent />
      </div>

      {/* Category Item Section */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CategoryItem 
          title="Category 1"
          description="This is the description of category 1."
          imageUrl="category1.jpg" 
        />
      </div>

      {/* Sample Videos Section */}
      <div className="relative z-30">
        <SampleVideos /> {/* Include the SampleVideos component */}
      </div>
      
    </div>
  );
};

export default HomPage;
