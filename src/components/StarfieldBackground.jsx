import React, { useEffect, useRef } from 'react';

export const StarfieldBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Star particle system
    const STAR_COUNT = Math.min(Math.floor((width * height) / 4000), 220);
    const stars = [];
    const colors = ['#ffffff', '#fde68a', '#c084fc', '#38bdf8', '#f472b6'];

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random(),
        speed: Math.random() * 0.015 + 0.005,
        increasing: Math.random() > 0.5
      });
    }

    // Shooting stars system
    const shootingStars = [];
    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.5),
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4,
        alpha: 1
      });
    };

    let shootingStarTimer = 0;

    // Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render Deep Space Background Gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#090616');
      grad.addColorStop(0.5, '#120c2e');
      grad.addColorStop(1, '#070512');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Soft Nebula Glows
      const nebula1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 10, width * 0.2, height * 0.3, width * 0.4);
      nebula1.addColorStop(0, 'rgba(168, 85, 247, 0.12)');
      nebula1.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 10, width * 0.8, height * 0.7, width * 0.5);
      nebula2.addColorStop(0, 'rgba(56, 189, 248, 0.1)');
      nebula2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // 3. Render Stars
      stars.forEach(star => {
        // Twinkle update
        if (star.increasing) {
          star.alpha += star.speed;
          if (star.alpha >= 1) star.increasing = false;
        } else {
          star.alpha -= star.speed;
          if (star.alpha <= 0.15) star.increasing = true;
        }

        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = star.color;
        ctx.shadowBlur = star.radius * 3;
        ctx.shadowColor = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 4. Render Shooting Stars
      shootingStarTimer++;
      if (shootingStarTimer > 180 && Math.random() < 0.03) {
        createShootingStar();
        shootingStarTimer = 0;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const endX = s.x - s.length * Math.cos(s.angle);
        const endY = s.y + s.length * Math.sin(s.angle);

        const strokeGrad = ctx.createLinearGradient(s.x, s.y, endX, endY);
        strokeGrad.addColorStop(0, `rgba(255, 255, 255, ${s.alpha})`);
        strokeGrad.addColorStop(1, 'transparent');

        ctx.strokeStyle = strokeGrad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        s.x += s.speed * Math.cos(s.angle);
        s.y += s.speed * Math.sin(s.angle);
        s.alpha -= 0.015;

        if (s.alpha <= 0 || s.x > width || s.y > height) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
};
