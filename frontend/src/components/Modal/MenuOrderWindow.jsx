import React, { useCallback, useContext, useState } from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { orderBook } from "../../api/BookingApi";
import { UserContext } from "../../context/Userprovider";
import LottieModal from "../LottieModal";
import successAnimation from "../../assets/success.json";

const OrderModal = ({
  item,
  closeModal,
  showQuantity = false,
  quantity = 1,
  handleDecrement,
  handleIncrement,
}) => {
  const [address, setAddress] = useState("");
  const { token } = useContext(UserContext);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleOrder = useCallback(
    async (event) => {
      event.preventDefault();

      if (!address.trim()) {
        toast.error("Please enter your address.");
        return;
      }

      const dataToSend = {
        deliveryAddress: address,
        items: [
          {
            itemId: item._id,
            quantity,
          },
        ],
      };

      try {
        const resp = await orderBook(token, dataToSend);

        switch (resp.status) {
          case 400: {
            const errors = resp?.response?.data?.errors;
            if (Array.isArray(errors)) {
              errors.forEach((err) => toast.error(err.message));
            } else {
              toast.error(resp?.response?.data?.message || "Order failed");
            }
            break;
          }
          case 201:
            setShowAnimation(true);
            setTimeout(() => {
              closeModal();
            }, 2500);
            break;

          default:
            break;
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    },
    [address, quantity, token, item, closeModal]
  );

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm px-4">
      <div
        className={`${
          !showAnimation && "bg-white"
        } rounded-xl p-6 text-black max-w-md w-full shadow-xl space-y-4`}
      >
        {showAnimation ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <LottieModal
              animationData={successAnimation}
              onComplete={() => closeModal()}
              loop={false}
              message={"Order Placed!"}
            />
          </div>
        ) : (
          <>
            <img
              src={`/assets/${item.imageUrl}`}
              alt={item.itemName}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-2xl font-bold">{item.itemName}</h2>

            {showQuantity && (
              <div className="flex items-center justify-between">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-3 border px-4 py-1 rounded-full">
                  <button
                    onClick={() => handleDecrement(item._id)}
                    className="cursor-pointer"
                  >
                    <FiMinusCircle className="text-red-500 text-2xl hover:text-red-700 transition" />
                  </button>
                  <span className="font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleIncrement(item._id)}
                    className="cursor-pointer"
                  >
                    <FiPlusCircle className="text-green-500 text-2xl hover:text-green-700 transition" />
                  </button>
                </div>
              </div>
            )}

            <form className="flex flex-col gap-4" onSubmit={handleOrder}>
              <input
                type="text"
                placeholder="Enter your address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded border border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-full"
                >
                  Order
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
