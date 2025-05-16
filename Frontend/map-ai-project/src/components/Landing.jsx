// File: src/components/Landing.jsx
import { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import gsap from 'gsap';
import animationData from '../assets/intro-logo.json';
import 'mapbox-gl/dist/mapbox-gl.css';

function Landing({ onComplete }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.2,
        onComplete,
      });
    }, 300000);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex flex-col justify-center items-center"
    >
      <Lottie
        animationData={animationData}
        loop={false}
        autoplay
        style={{ width: 250, height: 250 }}
        onComplete={() => console.log('Lottie animation completed')}
      />
      <h1 className="text-pink-500 text-3xl mt-4 font-bold">CircleTrip AI</h1>
    </div>
  );
}

export default Landing;