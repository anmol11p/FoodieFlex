import React from "react";
import moment from "moment";

const OrderCard = ({ order, onCancel, onTrack }) => {
  const { _id, deliveryAddress, status, totalAmount, createdAt, items } = order;

  return (
    <>
      <div className="order-2 flex flex-col gap-1">
        <h3 className="font-bold text-sm text-orange-600">
          Order ID: <span className="text-black">{_id.toUpperCase()}</span>
        </h3>
        <p className="text-sm text-gray-600">
          Placed on: {moment(createdAt).format("MMMM Do YYYY, h:mm a")}
        </p>
        <p className="text-sm text-gray-600 capitalize">
          Status:{" "}
          <span
            className={`font-semibold ${
              status === "cancelled"
                ? "text-red-600"
                : status === "delivered"
                ? "text-green-600"
                : "text-yellow-500"
            }`}
          >
            {status}
          </span>
        </p>

        <p className="text-sm font-light capitalize">
          <span className="text-green-500 ">Address: </span>
          {deliveryAddress}
        </p>
        <div className="flex items-center justify-between pt-5  animate-fade-in">
          {!(status === "cancelled" || status === "delivered") && (
            <button
              className="cursor-pointer bg-red-300 text-white px-4 rounded-2xl hover:bg-red-700"
              onClick={() => onCancel(_id)}
            >
              Cancel
            </button>
          )}

          <button
            className="cursor-pointer bg-transparent text-black/40 transition-all duration-200 px-4  border rounded-2xl hover:bg-red-700 hover:text-white"
            onClick={() => onTrack(_id)}
          >
            Track Order
          </button>
        </div>
      </div>

      <div className="space-y-3 order-1">
        {items.map((subItem, idx) => {
          const item = subItem.itemId;
          return (
            <div key={idx} className="flex gap-4  p-3 ">
              <img
                src={`/assets/${item?.imageUrl}`}
                alt={item?.itemName}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <h4 className="font-semibold text-orange-700 text-lg">
                  {item?.itemName}
                </h4>
                <p className="text-sm text-gray-600">Qty: {subItem.quantity}</p>
                <p className="text-sm text-gray-600">
                  Price: ₹{item?.price} x {subItem.quantity}
                </p>
                <p className="text-sm font-medium text-green-700">
                  Subtotal: ₹{totalAmount}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OrderCard;
