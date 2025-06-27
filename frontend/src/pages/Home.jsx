import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";

// import json file
import successAnimation from "../assets/success.json";
import { data, NavLink, useNavigate } from "react-router-dom";
import { getCategoryData } from "../api/productApi";
import {
  FaUtensils,
  FaHamburger,
  FaWineGlass,
  FaIceCream,
} from "react-icons/fa";

import SkeletonCard from "../components/SkeletonCard";
import { UserContext } from "../context/Userprovider";
import { toast } from "react-toastify";
import { orderBook } from "../api/BookingApi";
import LottieModal from "../components/LottieModal";
import OrderModal from "../components/Modal/MenuOrderWindow";

const categories = [
  { label: "Meal", value: "meal", icon: <FaUtensils /> },
  { label: "Fast Food", value: "fast food", icon: <FaHamburger /> },
  { label: "Drink", value: "drink", icon: <FaWineGlass /> },
  { label: "Dessert", value: "dessert", icon: <FaIceCream /> },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("meal");
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState([]);
  const [openModalId, setOpenModalId] = useState(null);
  const Navigate = useNavigate();
  const handleCategoryChange = (category) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
  };
  const { token } = useContext(UserContext);
  useEffect(() => {
    const categoryFetch = async () => {
      try {
        const resp = await getCategoryData(selectedCategory);
        if (resp.status === 200) {
          setData(resp.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    startTransition(categoryFetch);
  }, [selectedCategory]);

  const handleToggle = (id) => {
    if (!token) {
      toast.error("login first");
      Navigate("/login");
    }
    setOpenModalId(id);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center pt-10">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Delicious food delivered to your doorstep
              </h1>

              {openModalId && (
                <OrderModal
                  item={data.find((p) => p._id === openModalId)}
                  closeModal={() => setOpenModalId(null)}
                />
              )}

              <p className="text-lg mb-6 text-orange-100">
                Order from your favorite restaurants with just a few taps
              </p>
              <NavLink
                to={"/menu"}
                className="bg-white text-orange-600 font-bold py-3 px-6 rounded-full shadow hover:bg-orange-100 transition-all duration-300"
              >
                Order Now
              </NavLink>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="assets/home_page_food_booking_app.webp"
                alt="Delicious food"
                className="rounded-2xl shadow-2xl w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6 text-center text-orange-600">
            Explore by Category
          </h2>
          <div className="flex justify-center flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`flex cursor-pointer items-center gap-2 border px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 ${
                  selectedCategory === cat.value
                    ? "bg-orange-500 text-white"
                    : "bg-white text-orange-600 border-orange-400"
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          {isPending ? (
            <ul className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 mb-5 px-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </ul>
          ) : data.length > 0 ? (
            <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-25 lg:gap-10">
              {data.map((item) => {
                const {
                  available,
                  description,
                  imageUrl,
                  itemName,
                  price,
                  _id,
                } = item;
                return (
                  <li
                    key={_id}
                    className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-xl transition-all duration-300 animate-fade-in"
                  >
                    <img
                      src={`/assets/${imageUrl}`}
                      alt={itemName}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    <h3 className="text-xl font-semibold text-orange-700 mb-1">
                      {itemName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{description}</p>
                    <p className="text-green-600 font-bold">₹{price}</p>
                    <p className="text-xs mt-1 mb-3 text-yellow-500">
                      {available ? "Available" : "Out of Stock"}
                    </p>
                    {available && (
                      <button
                        className="cursor-pointer group relative overflow-hidden px-6 py-2 font-semibold text-white border rounded-full bg-gradient-to-r from-orange-400 to-red-500 hover:scale-105 transition-transform duration-300"
                        onClick={() => handleToggle(_id)}
                      >
                        <span className="relative z-10">Order</span>
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-center text-red-500 text-lg font-medium mt-8">
              No items found in this category.
            </div>
          )}
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            How MealBook Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-500 text-2xl font-bold">1</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Choose Your Food</h3>
              <p className="text-gray-600">
                Browse restaurants and menus that deliver to your location
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-500 text-2xl font-bold">2</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Place Your Order</h3>
              <p className="text-gray-600">
                Add items to your cart and checkout with secure payment
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-500 text-2xl font-bold">3</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Enjoy Your Meal</h3>
              <p className="text-gray-600">
                Track your order in real-time until delivery
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Custom Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default Home;
