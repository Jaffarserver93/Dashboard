"use client";

import React, { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

type DotGridProps = {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  shockRadius?: number;
  shockStrength?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
};

export function DotGrid({
  dotSize = 2,
  gap = 20,
  baseColor = "rgba(128, 128, 128, 0.2)",
  activeColor = "rgba(128, 128, 128, 1)",
  proximity = 100,
  shockRadius = 200,
  shockStrength = 2,
  resistance = 500,
  returnDuration = 0.5,
  className,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dots = useRef<any[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || !containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
        if (!containerRef.current || !canvas) return;
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
        dots.current = [];
        for (let i = gap; i < canvas.width; i += gap) {
          for (let j = gap; j < canvas.height; j += gap) {
            dots.current.push({ x: i, y: j, ox: i, oy: j, size: dotSize, color: baseColor });
          }
        }
        draw();
      });
      
    resizeObserver.observe(containerRef.current);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouse.current = { x: -1000, y: -1000 };
    };

    const handleClick = () => {
        dots.current.forEach(dot => {
            const dist = Math.hypot(dot.x - mouse.current.x, dot.y - mouse.current.y);
            if (dist < shockRadius) {
                const angle = Math.atan2(dot.y - mouse.current.y, dot.x - mouse.current.x);
                const force = (shockRadius - dist) / shockRadius * shockStrength;
                dot.vx = Math.cos(angle) * force;
                dot.vy = Math.sin(angle) * force;
            }
        });
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    const draw = () => {
      if (!context || !canvas) return;
      context.clearRect(0, 0, canvas.width, canvas.height);

      dots.current.forEach(dot => {
        // Handle forces
        if (dot.vx || dot.vy) {
            dot.x += dot.vx;
            dot.y += dot.vy;

            dot.vx *= (1 - 1/resistance);
            dot.vy *= (1 - 1/resistance);
        }

        // Return to original position
        const returnSpeed = 1 / (returnDuration * 60); 
        dot.x += (dot.ox - dot.x) * returnSpeed;
        dot.y += (dot.oy - dot.y) * returnSpeed;


        const dist = Math.hypot(dot.x - mouse.current.x, dot.y - mouse.current.y);
        
        let targetSize = dotSize;
        let targetColor = baseColor;
        
        if (dist < proximity) {
          const factor = 1 - dist / proximity;
          targetSize = dotSize * (1 + factor * 2);
          targetColor = activeColor;
        }

        dot.size += (targetSize - dot.size) * 0.1;
        
        context.beginPath();
        context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        context.fillStyle = targetColor;
        context.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
    };
  }, [dotSize, gap, baseColor, activeColor, proximity, shockRadius, shockStrength, resistance, returnDuration]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 -z-10", className)}>
        <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
