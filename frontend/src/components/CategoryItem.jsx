import React, { useEffect } from 'react';
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const CategoryItem = ({ title, description, imageUrl }) => {
    const { products, fetchAllProducts } = useProductStore();
    const { user } = useUserStore();
    const { addToCart } = useCartStore();

    const firstProduct = products[0]; // Grab the first product

    useEffect(() => {
        fetchAllProducts(); // Fetch products when the component mounts
        if (firstProduct) {
            console.log("First product name:", firstProduct.name); // Print product name
        }
    }, [fetchAllProducts, firstProduct]);

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please login to add products to cart", { id: "login" });
            return;
        }
        if (firstProduct) {
            addToCart(firstProduct);
            console.log(`${firstProduct.name} has been added to the cart.`); // Log message
        } else {
            toast.error("No product available to add to cart");
        }
    };

    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center">
            
            {/* Left Side: Call to Action */}
            <div className="sm:w-1/2 text-center sm:text-left mb-8 sm:mb-0">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Get Your Copy Today!
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                This eBook provides valuable insights to help you navigate the challenges of running a blue-collar business.
                Buy now and start learning how to thrive in your industry!
              </p>
              <button 
                className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-300 flex items-center"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={22} className="mr-2" />
                Add to Cart
              </button>
            </div>
    
            {/* Right Side: Book Image */}
            <div className="sm:w-1/2 flex justify-center">
              <img 
                src="logo.jpg" 
                alt="eBook Cover"
                className="w-full sm:w-3/4 h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      );
    };
  
  export default CategoryItem;