import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import ensoCircle from "../assets/lotties/enso-circle.json";
import ErrorBoundary from "./ErrorBoundary";

function EnsoLottieContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current && !animationRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: ensoCircle,
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

function EnsoLottie() {
  return (
    <ErrorBoundary fallback={<div style={{ height: "100%", width: "100%" }} />}>
      <EnsoLottieContent />
    </ErrorBoundary>
  );
}

export default EnsoLottie;
