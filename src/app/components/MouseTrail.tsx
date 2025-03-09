"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function MouseTrail() {
  useEffect(() => {
    const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF33A8", "#33FFF5", "#FFD700"];

    const handleMouseMove = (event: MouseEvent) => {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.backgroundColor = randomColor;
      particle.style.boxShadow = `0 0 10px ${randomColor}`;
      particle.style.borderRadius = "50%";

      document.body.appendChild(particle);

      gsap.set(particle, {
        position: "fixed",
        left: event.clientX,
        top: event.clientY,
        width: "8px",
        height: "8px",
        opacity: 1,
        zIndex: 9999,
        pointerEvents: "none",
      });

      gsap.to(particle, {
        x: (Math.random() - 0.5) * 50,
        y: (Math.random() - 0.5) * 50,
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "power1.out",
        onComplete: () => particle.remove(),
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}
