import { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import splashAnimation from "../assets/splash.json";

export default function SplashScreen() {
  const lottieRef = useRef();

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(1.5); // 🔥 1.5x speed
    }
  }, []);

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
          bottom: "120px",
          transform: "translateX(-50%) scale(1.3)",
          width: "300px",
        }}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={splashAnimation}
          loop={false}
        />
      </div>
    </div>
  );
}