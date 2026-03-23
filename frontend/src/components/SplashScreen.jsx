import Lottie from "lottie-react";
import splashAnimation from "../assets/splash.json";

export default function SplashScreen() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "52%",
          bottom: "120px", // 👈 control vertical position
          transform: "translateX(-50%) scale(1.3)", // 🔥 PERFECT CENTER + SCALE
          width: "300px",
        }}
      >
        <Lottie animationData={splashAnimation} loop={false} />
      </div>
    </div>
  );
}