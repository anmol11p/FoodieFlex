import Lottie from "lottie-react";
import React from "react";

const LottieModal = ({ animationData, loop, bg, message, onComplete }) => {
  return (
    <div
      className={`fixed inset-0 z-31 flex items-center justify-center backdrop-blur-sm bg-${bg}`}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <Lottie
          animationData={animationData}
          loop={loop}
          className="h-60 w-60"
          onComplete={onComplete}
        />

        {message && (
          <h2 className="text-xl font-semibold text-green-700 animate-bounce">
            {message}
          </h2>
        )}
      </div>
    </div>
  );
};

export default LottieModal;
