const OrderTracker = ({ status }) => {
  const isCancelled = status === "cancelled";
  const steps = isCancelled
    ? ["placed", "preparing", "cancelled"]
    : ["placed", "preparing", "delivered"];

  const activeIndex = steps.indexOf(status);

  return (
    <div className="flex flex-col items-center gap-6">
      {steps.map((step, index) => {
        const isActive = index <= activeIndex;
        const isCancelledStep = step === "cancelled";

        return (
          <div key={step} className="flex flex-col items-center relative">
            {/* Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 
                ${
                  isCancelledStep && status === "cancelled"
                    ? "bg-red-600 text-white"
                    : isActive
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
            >
              {index + 1}
            </div>

            {/* Label */}
            <p
              className={`text-xs mt-2 capitalize text-center ${
                isCancelledStep && status === "cancelled"
                  ? "text-red-600 font-semibold"
                  : ""
              }`}
            >
              {step}
            </p>

            {/* Vertical Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-1 h-8 mt-1 ${
                  isCancelledStep && status === "cancelled"
                    ? "bg-red-600"
                    : isActive
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderTracker;
