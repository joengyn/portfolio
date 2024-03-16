import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import enso from "../assets/enso.json";

function EnsoLottie() {
  return (
    <Player
      autoplay
      loop={false}
      keepLastFrame={true}
      src={enso}
      style={{ height: "100%", width: "100%" }}
    >
      <Controls
        visible={false}
        buttons={["play", "repeat", "frame", "debug"]}
      />
    </Player>
  );
}

export default EnsoLottie;
