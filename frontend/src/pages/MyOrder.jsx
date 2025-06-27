import React, { useContext, useEffect, useState, useTransition } from "react";
import { UserContext } from "../context/Userprovider";
import { cancelOrder, showAllOrder } from "../api/BookingApi";
import moment from "moment"; // optional: to format date
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import cancelAnimation from "../assets/cancelOrder.json";
import SkeletonCard from "../components/SkeletonCard";
import OrderTracker from "./OrderTrack";
import { ImCross } from "react-icons/im";
import trackAnimationJson from "../assets/trackanimation.json";
import LottieModal from "../components/LottieModal";
import OrderCard from "../components/cards/OrderCard";
const MyOrder = () => {
  const [isPending, startTransition] = useTransition();
  const [showAnimation, setShowAnimation] = useState(false);
  const [trackAnimation, setTrackAnimation] = useState(false);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const { token } = useContext(UserContext);

  const Navigate = useNavigate();
  const fetchAllOrder = async () => {
    try {
      const resp = await showAllOrder(token);
      if (resp.status === 200) setData(resp?.data?.order);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    if (token) startTransition(fetchAllOrder);
  }, [token]);
  const handleOrderCancle = async (id) => {
    try {
      const resp = await cancelOrder(token, id);

      switch (resp.status) {
        case 200:
          // animation add
          setShowAnimation(true);
          setTimeout(() => {
            setShowAnimation(false);
          }, 3000);
          //update the setData
          startTransition(fetchAllOrder);
          break;
        case 400:
          toast.error(resp.response.data.message);
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggle = (id) => {
    setTrackAnimation(true);
    setTimeout(() => {
      setShowModal(id);
      setTrackAnimation(false);
    }, 2000);
  };

  return (
    <>
      <section className="py-10 px-4 ">
        <h2 className="text-center font-bold text-3xl mb-8 text-orange-600 py-20">
          Order History
        </h2>

        {/* animation */}
        {showAnimation && (
          <LottieModal
            animationData={cancelAnimation}
            loop={false}
            bg={"bg-white/80"}
            message={"Order Cancelled Successfully"}
          />
        )}
        {/* animation */}
        {trackAnimation && (
          <LottieModal
            animationData={trackAnimationJson}
            loop={false}
            bg={"bg-transparent"}
            message={""}
          />
        )}

        {/* login */}
        {!token && (
          <div className="flex justify-center gap-2">
            You are not login Yet{" "}
            <NavLink
              to={"/login"}
              className={"text-center grid place-items-center underline"}
            >
              Login First{" "}
            </NavLink>
          </div>
        )}

        {isPending ? (
          <ul className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 mb-5 lg:px-40">
            {Array.from({ length: data.length }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </ul>
        ) : token && data.length === 0 ? (
          <p className="text-center  text-lg font-medium">
            No order found.
            <NavLink to={"/menu"} className={"text-red-400 underline"}>
              Go to order
            </NavLink>
          </p>
        ) : (
          <ul className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-40">
            {data.map((order) => {
              const {
                _id,
                deliveryAddress,
                status,
                totalAmount,
                createdAt,
                items,
              } = order;

              return (
                <li
                  key={_id}
                  className="bg-white  border-gray-200 rounded-lg shadow p-5 space-y-4 hover:shadow-xl transition-all duration-300 flex flex-col gap-2 mb-10 animate-fade-in"
                >
                  {showModal === _id && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <div className="bg-white/80 p-6 rounded-xl shadow-lg w-[90%] max-w-md relative animate-fade-in">
                        <button
                          className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-red-600 border rounded-full p-2"
                          onClick={() => setShowModal(null)}
                        >
                          <ImCross />
                        </button>
                        <h3 className="text-lg font-bold text-orange-600 mb-4 text-center">
                          Track Order
                        </h3>
                        <OrderTracker
                          status={status}
                          deliveryAddress={deliveryAddress}
                        />
                      </div>
                    </div>
                  )}

                  <OrderCard
                    order={order}
                    onCancel={handleOrderCancle}
                    onTrack={handleToggle}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </section>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default MyOrder;
