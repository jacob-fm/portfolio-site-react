import { useEffect, useRef } from "react";

function AnimatedBackground({ mode }) {
  const canvasRef = useRef(null);
  const trailPoints = useRef([]);
  const maxTrailLength = 30;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse position and add to trail
    const handleMouseMove = (e) => {
      trailPoints.current.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      });

      // Keep trail at max length
      if (trailPoints.current.length > maxTrailLength) {
        trailPoints.current.shift();
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      const now = Date.now();

      // Clear canvas with slight fade effect
      ctx.fillStyle = "rgba(255, 254, 247, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Remove old trail points
      trailPoints.current = trailPoints.current.filter(
        (point) => now - point.timestamp < 1000
      );

      // Draw trail
      trailPoints.current.forEach((point, index) => {
        const age = now - point.timestamp;
        const lifePercent = 1 - age / 1000;
        const opacity = lifePercent * 0.6;
        const size = 15 + (trailPoints.current.length - index) * 2;

        // Create gradient for glow effect with hue shift
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          size
        );

        // Color scheme based on mode
        if (mode === "blue") {
          gradient.addColorStop(0, `hsla(200, 40%, 92%, ${opacity * 0.4})`);
          gradient.addColorStop(0.2, `hsla(200, 38%, 88%, ${opacity * 0.32})`);
          gradient.addColorStop(0.4, `hsla(200, 35%, 84%, ${opacity * 0.2})`);
          gradient.addColorStop(0.6, `hsla(200, 32%, 80%, ${opacity * 0.1})`);
          gradient.addColorStop(0.8, `hsla(200, 30%, 76%, ${opacity * 0.04})`);
          gradient.addColorStop(1, `hsla(200, 28%, 72%, 0)`);
        } else {
          gradient.addColorStop(0, `hsla(355, 65%, 70%, ${opacity})`);
          gradient.addColorStop(0.2, `hsla(350, 60%, 65%, ${opacity * 0.8})`);
          gradient.addColorStop(0.4, `hsla(345, 50%, 58%, ${opacity * 0.5})`);
          gradient.addColorStop(0.6, `hsla(342, 45%, 52%, ${opacity * 0.25})`);
          gradient.addColorStop(0.8, `hsla(340, 40%, 48%, ${opacity * 0.1})`);
          gradient.addColorStop(1, `hsla(338, 40%, 45%, 0)`);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(
          point.x - size,
          point.y - size,
          size * 2,
          size * 2
        );
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: "none" }}
    />
  );
}

export default AnimatedBackground;
