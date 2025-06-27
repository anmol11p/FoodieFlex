import { useCallback, useContext, useState } from "react";
import { UserContext } from "../context/Userprovider";
import Loader from "../components/Loader";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { orderBook } from "../api/BookingApi";
import SkeletonCard from "../components/SkeletonCard";
import { useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import successAnimation from "../assets/success2.json";
import LottieModal from "../components/LottieModal";
import MenuOrderWindow from "../components/Modal/MenuOrderWindow";
import OrderModal from "../components/Modal/MenuOrderWindow";
const Menu = () => {
  const { products, token, productLoader } = useContext(UserContext);
  const Navigate = useNavigate();

  const [quantities, setQuantities] = useState({});
  const [openModalId, setOpenModalId] = useState(null);

  const Capitalize = (word) => {
    return word
      .split(" ")
      .map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1))
      .join(" ");
  };

  const handleToggle = (id) => {
    if (!token) {
      toast.error("login first");
      Navigate("/login");
    }
    setOpenModalId(id);
  };

  const handleIncrement = (id) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      if (current >= 5) {
        toast.error("You can't add more than 5");
        return prev;
      }
      return { ...prev, [id]: current + 1 };
    });
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      if (current <= 1) {
        toast.error("You can't go below 1");
        return prev;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  return (
    <div
      className={`relative text-white min-h-screen flex items-center justify-center `}
    >
      <div className="absolute inset-0 z-0 bg-[url('assets/login.webp')] bg-cover bg-center blur-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
      </div>

      <div className="contentBox z-20 relative p-4">
        <h2 className="text-center text-3xl mt-20 mb-20 font-bold ">
          Choose your Meal/Fast Food/Dessert/Drink
        </h2>

        {openModalId && (
          <OrderModal
            item={products.find((p) => p._id === openModalId)}
            closeModal={() => setOpenModalId(null)}
            showQuantity={true}
            quantity={quantities[openModalId] || 1}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
          />
        )}

        {productLoader ? (
          <ul className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 mb-5 px-4 ">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </ul>
        ) : products.length !== 0 ? (
          <ul className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 mb-5">
            {products.map((item) => {
              const {
                available,
                category,
                description,
                imageUrl,
                itemName,
                price,
                _id,
              } = item;

              const quantity = quantities[_id] || 1;

              return (
                <li
                  key={_id}
                  className="bg-black/20  p-4 rounded-md shadow hover:shadow-white overflow-hidden transition-all"
                >
                  <img
                    src={`/assets/${imageUrl}`}
                    alt={itemName}
                    className="w-full h-40 object-cover rounded-md mb-3 transform transition-transform duration-500 ease-in-out hover:scale-105"
                  />

                  <div className="CardContent flex flex-col gap-1.5">
                    <h3 className="text-xl font-semibold">{itemName}</h3>
                    <p className="text-sm text-green-200">Price: ₹{price}</p>
                    <p className="text-sm mt-1 text-gray-300">{description}</p>
                    <p className="text-sm text-green-200">
                      Category: {Capitalize(category)}
                    </p>
                    <p className="text-xs text-yellow-400">
                      {available ? "Available" : "Out of stock"}
                    </p>
                  </div>

                  <div className="flex mt-2 items-center justify-between">
                    <div className="incre-decre flex items-center gap-2 rounded-s-2xl bg-transparent border px-3 py-1">
                      <button onClick={() => handleIncrement(_id)}>
                        <FiPlusCircle className="text-red-200 text-2xl hover:text-green-500 transition-all duration-200" />
                      </button>
                      {quantity}
                      <button onClick={() => handleDecrement(_id)}>
                        <FiMinusCircle className="text-red-200 text-2xl hover:text-red-400 transition-all duration-300" />
                      </button>
                    </div>

                    {available && (
                      <button
                        className="group relative overflow-hidden px-6 py-2 font-semibold text-white border rounded-r-2xl cursor-pointer transition-all duration-300"
                        onClick={() => handleToggle(_id)}
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-red-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out opacity-80"></span>
                        <span className="relative z-10">Order</span>
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-300">No items available.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
