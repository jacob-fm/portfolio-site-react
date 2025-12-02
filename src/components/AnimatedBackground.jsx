import { useEffect, useRef } from "react";

function AnimatedBackground() {
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
        const size = 20 + (trailPoints.current.length - index) * 3;

        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          size
        );

        gradient.addColorStop(0, `rgba(176, 75, 108, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(176, 75, 108, ${opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(176, 75, 108, 0)`);

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
