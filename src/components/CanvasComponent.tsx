import React, { useEffect, useRef } from 'react';

type Person = {
  id: string;
  name: string;
  parent_id?: string;
  spouse_id?: string;
  children_ids?: string[];
  x: number;
  y: number;
};

const people: Person[] = [
  { id: '1', name: 'John', x: 100, y: 100, spouse_id: '2', children_ids: ['3', '4'] },
  { id: '2', name: 'Jane', x: 220, y: 100, spouse_id: '1', children_ids: ['3', '4'] },
  { id: '3', name: 'Alice', parent_id: '1', x: 100, y: 250 },
  { id: '4', name: 'Bob', parent_id: '1', x: 220, y: 250 },
];

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

  const rectW = 80;
  const rectH = 40;

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

    const peopleMap = new Map<string, Person>();
    people.forEach(p => peopleMap.set(p.id, p));

    // Draw spouse connections and children lines FIRST (lines go below rectangles)
    ctx.strokeStyle = '#3096b8';
    ctx.lineWidth = 2;

    people.forEach(person => {
      if (person.spouse_id && person.id < person.spouse_id) {
        const spouse = peopleMap.get(person.spouse_id);
        if (!spouse) return;
        const x1 = person.x + rectW / 2;
        const y1 = person.y + rectH / 2;
        const x2 = spouse.x + rectW / 2;
        const y2 = spouse.y + rectH / 2;

        // Spouse connection line
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        if (person.children_ids && person.children_ids.length > 0) {
          const joinX = (x1 + x2) / 2;
          const joinY = (y1 + y2) / 2;
          const childY = joinY + 40;

          // Vertical line down from spouse connection
          ctx.beginPath();
          ctx.moveTo(joinX, joinY);
          ctx.lineTo(joinX, childY);
          ctx.stroke();

          // Get children center x positions
          const childXs = person.children_ids
            .map(id => {
              const child = peopleMap.get(id);
              return child ? child.x + rectW / 2 : null;
            })
            .filter(x => x !== null) as number[];

          if (childXs.length === 0) return;

          const minX = Math.min(...childXs);
          const maxX = Math.max(...childXs);

          // Horizontal line connecting children
          ctx.beginPath();
          ctx.moveTo(minX, childY);
          ctx.lineTo(maxX, childY);
          ctx.stroke();

          // Vertical lines from horizontal to each child
          person.children_ids.forEach(childId => {
            const child = peopleMap.get(childId);
            if (!child) return;
            const cx = child.x + rectW / 2;
            const cy = child.y;
            ctx.beginPath();
            ctx.moveTo(cx, childY);
            ctx.lineTo(cx, cy);
            ctx.stroke();
          });
        }
      }
    });

    // Draw people rectangles ON TOP of lines
    people.forEach(person => {
      ctx.fillStyle = '#28758f';
      ctx.fillRect(person.x, person.y, rectW, rectH);

      ctx.fillStyle = '#ffffff';
      ctx.font = '14px sans-serif';
      ctx.fillText(person.name, person.x + 8, person.y + 25);
    });

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

    // Check if click is inside any person's rectangle
    const clickedPerson = people.find(
      p =>
        contentX >= p.x &&
        contentX <= p.x + rectW &&
        contentY >= p.y &&
        contentY <= p.y + rectH
    );

    if (clickedPerson) {
      infoDiv.textContent = `Clicked: ${clickedPerson.name}`;
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
      const newScale = Math.min(Math.max(0.2, oldScale * (1 + zoomAmount)), 2);

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
      <div id="info" ref={infoRef} style={{ marginTop: '10px', color: 'lightblue' }} />
    </div>
  );
};

export default CanvasComponent;
