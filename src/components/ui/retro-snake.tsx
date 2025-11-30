import { useEffect, useRef } from 'react';

interface RetroSnakeProps {
  gridRef?: React.RefObject<HTMLDivElement>;
}

const RetroSnake = ({ gridRef }: RetroSnakeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const gridSize = 12; // Smaller grid for smaller snake
    let snake = [{ x: 2, y: 2 }];
    let direction = { x: 1, y: 0 };
    let length = 6; // Shorter snake
    let lastUpdate = 0;
    const speed = 70;
    
    // Simple path following - no obstacle detection needed
    let pathIndex = 0;
    let path: {x: number, y: number}[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
      
      const cols = Math.floor(canvas.width / gridSize);
      const rows = Math.floor(canvas.height / gridSize);
      
      // Create a simple rectangular path around the perimeter
      // Top edge (left to right)
      path = [];
      const margin = 2;
      const bottomLimit = Math.floor(rows * 0.85); // Stay above GUILD HISTORY
      
      // Top row - go right
      for (let x = margin; x < cols - margin; x++) {
        path.push({ x, y: margin });
      }
      // Right column - go down
      for (let y = margin; y < bottomLimit; y++) {
        path.push({ x: cols - margin - 1, y });
      }
      // Bottom row - go left
      for (let x = cols - margin - 1; x >= margin; x--) {
        path.push({ x, y: bottomLimit - 1 });
      }
      // Left column - go up
      for (let y = bottomLimit - 1; y >= margin; y--) {
        path.push({ x: margin, y });
      }
      
      // Reset snake position to start of path
      if (path.length > 0) {
        snake = [{ ...path[0] }];
        pathIndex = 0;
      }
    };
    
    window.addEventListener('resize', resize);
    resize();
    setTimeout(resize, 100);
    setTimeout(resize, 500);

    const move = (timestamp: number) => {
      if (timestamp - lastUpdate < speed) {
        animationFrameId = requestAnimationFrame(move);
        return;
      }
      lastUpdate = timestamp;

      if (path.length === 0) {
        animationFrameId = requestAnimationFrame(move);
        return;
      }

      // Move to next point in path
      pathIndex = (pathIndex + 1) % path.length;
      const target = path[pathIndex];
      const head = snake[0];
      
      // Update direction based on movement
      if (target.x > head.x) direction = { x: 1, y: 0 };
      else if (target.x < head.x) direction = { x: -1, y: 0 };
      else if (target.y > head.y) direction = { x: 0, y: 1 };
      else if (target.y < head.y) direction = { x: 0, y: -1 };

      snake.unshift({ ...target });
      if (snake.length > length) snake.pop();

      draw();
      animationFrameId = requestAnimationFrame(move);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      
      const head = snake[0];
      
      // Draw body segments - subtle pixel blocks
      snake.forEach((segment, i) => {
        if (i === 0) return;
        
        const x = segment.x * gridSize;
        const y = segment.y * gridSize;
        
        ctx.fillStyle = 'rgba(34, 197, 94, 0.25)'; // Subtle green
        ctx.fillRect(x + 1, y + 1, gridSize - 2, gridSize - 2);
        
        ctx.fillStyle = 'rgba(22, 163, 74, 0.2)';
        ctx.fillRect(x + 2, y + 2, gridSize - 4, gridSize - 4);
      });
      
      // Draw head
      const hx = head.x * gridSize;
      const hy = head.y * gridSize;
      
      ctx.fillStyle = 'rgba(34, 197, 94, 0.35)';
      ctx.fillRect(hx, hy, gridSize, gridSize);
      
      ctx.fillStyle = 'rgba(22, 163, 74, 0.25)';
      ctx.fillRect(hx + 2, hy + 2, gridSize - 4, gridSize - 4);
      
      // Pixel eyes - small and subtle
      ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
      
      if (direction.x === 1) {
        ctx.fillRect(hx + 8, hy + 2, 2, 2);
        ctx.fillRect(hx + 8, hy + 8, 2, 2);
      } else if (direction.x === -1) {
        ctx.fillRect(hx + 2, hy + 2, 2, 2);
        ctx.fillRect(hx + 2, hy + 8, 2, 2);
      } else if (direction.y === 1) {
        ctx.fillRect(hx + 2, hy + 8, 2, 2);
        ctx.fillRect(hx + 8, hy + 8, 2, 2);
      } else {
        ctx.fillRect(hx + 2, hy + 2, 2, 2);
        ctx.fillRect(hx + 8, hy + 2, 2, 2);
      }
      
      // Pixel tongue - smaller
      ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
      
      if (direction.x === 1) {
        ctx.fillRect(hx + gridSize, hy + 5, 4, 2);
      } else if (direction.x === -1) {
        ctx.fillRect(hx - 4, hy + 5, 4, 2);
      } else if (direction.y === 1) {
        ctx.fillRect(hx + 5, hy + gridSize, 2, 4);
      } else {
        ctx.fillRect(hx + 5, hy - 4, 2, 4);
      }
    };

    animationFrameId = requestAnimationFrame(move);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
};

export default RetroSnake;
