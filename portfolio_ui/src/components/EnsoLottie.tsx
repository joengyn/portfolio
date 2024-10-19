import React, { useEffect, useState } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import ensoCircle from "../assets/enso-circle.json";

function EnsoLottie() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAnimation(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      {showAnimation && (
        <Player
          autoplay
          loop={false}
          keepLastFrame={true}
          src={ensoCircle}
          style={{ height: "100%", width: "100%" }}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      )}
    </div>
  );
}

export default EnsoLottie;
