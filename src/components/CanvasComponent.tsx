import React, { useEffect, useRef } from 'react';

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

  const offsetX = useRef(0);
  const offsetY = useRef(0);
  const scale = useRef(1);

  const isDragging = useRef(false);
  const wasDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const needsRedraw = useRef(true);

  const drawShapes = () => {
    const canvas = canvasRef.current;
    if (!canvas || !needsRedraw.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    needsRedraw.current = false;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    ctx.translate(offsetX.current, offsetY.current);
    ctx.scale(scale.current, scale.current);

    // Red rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(50, 50, 100, 80);

    // Green rectangle
    const greenRect = { x: 100, y: 200, w: 100, h: 60 };
    ctx.fillStyle = 'green';
    ctx.fillRect(greenRect.x, greenRect.y, greenRect.w, greenRect.h);

    // Blue rectangle
    const blueRect = { x: 350, y: 200, w: 100, h: 60 };
    ctx.fillStyle = 'blue';
    ctx.fillRect(blueRect.x, blueRect.y, blueRect.w, blueRect.h);

    // Connecting line
    const greenMidTop = { x: greenRect.x + greenRect.w / 2, y: greenRect.y };
    const blueMidTop = { x: blueRect.x + blueRect.w / 2, y: blueRect.y };
    const joinX = (greenMidTop.x + blueMidTop.x) / 2;
    const joinY = greenMidTop.y - 40;
    const bumpHeight = 10;

    ctx.beginPath();
    ctx.moveTo(greenMidTop.x, greenMidTop.y);
    ctx.lineTo(greenMidTop.x, greenMidTop.y - 20);
    ctx.lineTo(joinX - 10, joinY);
    ctx.lineTo(joinX, joinY - bumpHeight);
    ctx.lineTo(joinX + 10, joinY);
    ctx.lineTo(blueMidTop.x, blueMidTop.y - 20);
    ctx.lineTo(blueMidTop.x, blueMidTop.y);
    ctx.strokeStyle = 'lightblue';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.restore();
  };

  const handleCanvasClick = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    const infoDiv = infoRef.current;
    if (!canvas || !infoDiv) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const contentX = (mouseX - offsetX.current) / scale.current;
    const contentY = (mouseY - offsetY.current) / scale.current;

    if (contentX >= 50 && contentX <= 150 && contentY >= 50 && contentY <= 130) {
      infoDiv.textContent = 'Red';
    } else {
      infoDiv.textContent = '';
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const animate = () => {
      drawShapes();
      requestAnimationFrame(animate);
    };
    animate();

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      wasDragging.current = false;
      dragStartX.current = e.clientX;
      dragStartY.current = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const dx = e.clientX - dragStartX.current;
      const dy = e.clientY - dragStartY.current;

      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        wasDragging.current = true;
      }

      offsetX.current += dx;
      offsetY.current += dy;
      needsRedraw.current = true;

      dragStartX.current = e.clientX;
      dragStartY.current = e.clientY;
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isDragging.current && !wasDragging.current) {
        handleCanvasClick(e);
      }
      isDragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;

      e.preventDefault();

      const zoomAmount = -e.deltaY * 0.001;
      const oldScale = scale.current;
      const newScale = Math.min(Math.max(0.2, oldScale * (1 + zoomAmount)), 5);

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const worldX = (mouseX - offsetX.current) / oldScale;
      const worldY = (mouseY - offsetY.current) / oldScale;

      scale.current = newScale;
      offsetX.current = mouseX - worldX * newScale;
      offsetY.current = mouseY - worldY * newScale;

      needsRedraw.current = true;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="myCanvas"
        width={1500}
        height={800}
        style={{ border: '1px solid black', touchAction: 'none' }}
      />
      <div id="info" ref={infoRef} style={{ marginTop: '10px' }} />
    </div>
  );
};

export default CanvasComponent;
