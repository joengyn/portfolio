import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import wave from "../assets/wave.json";

function WaveLottie() {
  return (
    <Player
      autoplay
      loop={true}
      src={wave}
      style={{ height: "100%", width: "100%" }}
    >
      <Controls
        visible={false}
        buttons={["play", "repeat", "frame", "debug"]}
      />
    </Player>
  );
}

export default WaveLottie;
