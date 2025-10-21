import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import wave from "../assets/wave.json";
import ErrorBoundary from "./ErrorBoundary";

function WaveLottieContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current && !animationRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: wave,
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={{ height: "100%", width: "100%" }} />;
}

function WaveLottie() {
  return (
    <ErrorBoundary fallback={<div style={{ height: "100%", width: "100%" }} />}>
      <WaveLottieContent />
    </ErrorBoundary>
  );
}

export default WaveLottie;
