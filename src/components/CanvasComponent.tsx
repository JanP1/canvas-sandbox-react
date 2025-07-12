import React, { useEffect, useRef } from 'react';

type PersonInput = {
  id: string;
  name: string;
  spouse_id?: string;
  children_ids?: string[];
  parents_ids?: string[];
};

type Person = {
  person: PersonInput;
  x: number;
  y: number;
};


type Coordinates = {
  x: number;
  y: number;
}

const inputs = [
  // Generation 3 — Parents of Grandchild
  { id: '2', name: 'Parent A', children_ids: ['4'], spouse_id: '3', parents_ids: ['5', '6'] },
  { id: '3', name: 'Parent B', children_ids: ['4'], spouse_id: '2', parents_ids: ['7', '8'] },
  { id: '4', name: 'Grandchild', parents_ids: ['2', '3'] },

  // Generation 2 — Grandparents
  { id: '5', name: 'Great Grandparent A', children_ids: ['2'], spouse_id: '6', parents_ids: ['9', '10'] },
  { id: '6', name: 'Great Grandparent B', children_ids: ['2'], spouse_id: '5', parents_ids: ['11', '12'] },
  { id: '7', name: 'Great Grandparent C', children_ids: ['3'], spouse_id: '8', parents_ids: ['13', '14'] },
  { id: '8', name: 'Great Grandparent D', children_ids: ['3'], spouse_id: '7', parents_ids: ['15', '16'] },

  // Generation 1 — 2nd Great Grandparents
  { id: '9', name: '2nd Great Grandparent A', children_ids: ['5'], spouse_id: '10', parents_ids: ['17', '18'] },
  { id: '10', name: '2nd Great Grandparent B', children_ids: ['5'], spouse_id: '9', parents_ids: ['19', '20'] },
  { id: '11', name: '2nd Great Grandparent C', children_ids: ['6'], spouse_id: '12', parents_ids: ['21', '22'] },
  { id: '12', name: '2nd Great Grandparent D', children_ids: ['6'], spouse_id: '11', parents_ids: ['23', '24'] },

  { id: '13', name: '2nd Great Grandparent E', children_ids: ['7'], spouse_id: '14', parents_ids: ['25', '26'] },
  { id: '14', name: '2nd Great Grandparent F', children_ids: ['7'], spouse_id: '13', parents_ids: ['27', '28'] },
  { id: '15', name: '2nd Great Grandparent G', children_ids: ['8'], spouse_id: '16', parents_ids: ['29', '30'] },
  { id: '16', name: '2nd Great Grandparent H', children_ids: ['8'], spouse_id: '15', parents_ids: ['31', '32'] },

  // Generation 0 — 3rd Great Grandparents
  { id: '17', name: '3rd Great Grandparent A', children_ids: ['9'], spouse_id: '18', parents_ids: ['33', '34'] },
  { id: '18', name: '3rd Great Grandparent B', children_ids: ['9'], spouse_id: '17', parents_ids: ['35', '36'] },
  { id: '19', name: '3rd Great Grandparent C', children_ids: ['10'], spouse_id: '20', parents_ids: ['37', '38'] },
  { id: '20', name: '3rd Great Grandparent D', children_ids: ['10'], spouse_id: '19', parents_ids: ['39', '40'] },

  { id: '21', name: '3rd Great Grandparent E', children_ids: ['11'], spouse_id: '22', parents_ids: ['41', '42'] },
  { id: '22', name: '3rd Great Grandparent F', children_ids: ['11'], spouse_id: '21', parents_ids: ['43', '44'] },
  { id: '23', name: '3rd Great Grandparent G', children_ids: ['12'], spouse_id: '24', parents_ids: ['45', '46'] },
  { id: '24', name: '3rd Great Grandparent H', children_ids: ['12'], spouse_id: '23', parents_ids: ['47', '48'] },

  { id: '25', name: '3rd Great Grandparent I', children_ids: ['13'], spouse_id: '26', parents_ids: ['49', '50'] },
  { id: '26', name: '3rd Great Grandparent J', children_ids: ['13'], spouse_id: '25', parents_ids: ['51', '52'] },
  { id: '27', name: '3rd Great Grandparent K', children_ids: ['14'], spouse_id: '28', parents_ids: ['53', '54'] },
  { id: '28', name: '3rd Great Grandparent L', children_ids: ['14'], spouse_id: '27', parents_ids: ['55', '56'] },

  { id: '29', name: '3rd Great Grandparent M', children_ids: ['15'], spouse_id: '30', parents_ids: ['57', '58'] },
  { id: '30', name: '3rd Great Grandparent N', children_ids: ['15'], spouse_id: '29', parents_ids: ['59', '60'] },
  { id: '31', name: '3rd Great Grandparent O', children_ids: ['16'], spouse_id: '32', parents_ids: ['61', '62'] },
  { id: '32', name: '3rd Great Grandparent P', children_ids: ['16'], spouse_id: '31', parents_ids: ['63'] }, // ← only 1 parent (1st of 2)

  // Generation -1 — 4th Great Grandparents (final generation with mostly complete data)
  { id: '33', name: '4th Great Grandparent A', children_ids: ['17'], spouse_id: '34' },
  { id: '34', name: '4th Great Grandparent B', children_ids: ['17'], spouse_id: '33' },
  { id: '35', name: '4th Great Grandparent C', children_ids: ['18'], spouse_id: '36' },
  { id: '36', name: '4th Great Grandparent D', children_ids: ['18'], spouse_id: '35' },
  { id: '37', name: '4th Great Grandparent E', children_ids: ['19'], spouse_id: '38' },
  { id: '38', name: '4th Great Grandparent F', children_ids: ['19'], spouse_id: '37' },
  { id: '39', name: '4th Great Grandparent G', children_ids: ['20'], spouse_id: '40' },
  { id: '40', name: '4th Great Grandparent H', children_ids: ['20'], spouse_id: '39' },
  { id: '41', name: '4th Great Grandparent I', children_ids: ['21'], spouse_id: '42' },
  { id: '42', name: '4th Great Grandparent J', children_ids: ['21'], spouse_id: '41' },
  { id: '43', name: '4th Great Grandparent K', children_ids: ['22'], spouse_id: '44' },
  { id: '44', name: '4th Great Grandparent L', children_ids: ['22'], spouse_id: '43' },
  { id: '45', name: '4th Great Grandparent M', children_ids: ['23'], spouse_id: '46' },
  { id: '46', name: '4th Great Grandparent N', children_ids: ['23'], spouse_id: '45' },
  { id: '47', name: '4th Great Grandparent O', children_ids: ['24'], spouse_id: '48' },
  { id: '48', name: '4th Great Grandparent P', children_ids: ['24'], spouse_id: '47' },
  { id: '49', name: '4th Great Grandparent Q', children_ids: ['25'], spouse_id: '50' },
  { id: '50', name: '4th Great Grandparent R', children_ids: ['25'], spouse_id: '49' },
  { id: '51', name: '4th Great Grandparent S', children_ids: ['26'], spouse_id: '52' },
  { id: '52', name: '4th Great Grandparent T', children_ids: ['26'], spouse_id: '51' },
  { id: '53', name: '4th Great Grandparent U', children_ids: ['27'], spouse_id: '54' },
  { id: '54', name: '4th Great Grandparent V', children_ids: ['27'], spouse_id: '53' },
  { id: '55', name: '4th Great Grandparent W', children_ids: ['28'], spouse_id: '56' },
  { id: '56', name: '4th Great Grandparent X', children_ids: ['28'], spouse_id: '55' },
  { id: '57', name: '4th Great Grandparent Y', children_ids: ['29'], spouse_id: '58' },
  { id: '58', name: '4th Great Grandparent Z', children_ids: ['29'], spouse_id: '57' },
  { id: '59', name: '4th Great Grandparent AA', children_ids: ['30'], spouse_id: '60' },
  { id: '60', name: '4th Great Grandparent AB', children_ids: ['30'], spouse_id: '59' },
  { id: '61', name: '4th Great Grandparent AC', children_ids: ['31'], spouse_id: '62' },
  { id: '62', name: '4th Great Grandparent AD', children_ids: ['31'], spouse_id: '61' },
  { id: '63', name: '4th Great Grandparent AE', children_ids: ['32'] }, // ← second person with only 1 parent
];


function generateCoordinates(family: PersonInput[], rootID: string, spacing: number) {
  const peopleWithCoordinates: Person[] = [];
  const inputMap = new Map(family.map(p => [p.id, p]));
  let currentPotentialChildren: PersonInput[] = [];
  let dummyNextPotentialChildren: PersonInput[] = [];



  // Get the root person of the whole tree
  const rootPerson = inputMap.get(rootID);

  // Apply only if the person exists
  if (rootPerson) {

    // Checking if parents exist on the curent root
    currentPotentialChildren.push(rootPerson);

    // We give the root coordinates 0, 0 placing him in the middle of the canvas (after applyin offset)
    peopleWithCoordinates.push({person: rootPerson, x: 0, y:0})

    // we have to give 2 ^ n spaces for every iteration
    // the spaces are filled with blocks or empty fields based
    // on the parents of the person currently being checked 
    /*
        []    []    []    []    []    []    []    []



                    []    []    []    []


                          []    []

                             []



    */
    let currentIteration = 1;

    // as long as there are people that can potentialy have parents check for the parents
    while (currentPotentialChildren.length > 0){
      const count = 2 ** currentIteration;
      const y = -250 * currentIteration;

      const fullWidth = spacing * (count - 1);

      const coordinatesList: Coordinates[] = []; // Reset coordinates list per iteration
      for (let i = 0; i < count; i++) {
        const x = -fullWidth / 2 + i * spacing;
        coordinatesList.push({ x, y });
      }

      let currentSpot = 0; // The spot (index of coordinate list) to which the next person will be located


      // we check for every person that was a parent in the previous iteration if they have parents
      for (const person of currentPotentialChildren) {

        let spotsTaken = 0; // 2 spots for every persons parent if we didnt take up 2 spots we have to shift the untaken spots to space the blocks evenly

        // If there exists a parent of those parents we add them to the dummy list -- Has to check and even if doesn t exist has to shift spot for parent
        if (person.parents_ids && person.parents_ids.length > 0) {
          person.parents_ids.forEach(parentId => {
            const parent = inputMap.get(parentId);
            if (parent) {
              dummyNextPotentialChildren.push(parent);
              
              peopleWithCoordinates.push({
                person: parent, 
                x: coordinatesList[currentSpot].x, 
                y: coordinatesList[currentSpot].y
              })

              currentSpot += 1;
              spotsTaken += 1;
            }
          });
        }
        currentSpot += (2 - spotsTaken); // If none were taken we have to shift 2 spots, if 1 then 1 if 2 then we dont shift
      }
      currentPotentialChildren = dummyNextPotentialChildren;
      dummyNextPotentialChildren = [];

      currentIteration += 1;

    }

  }
  return peopleWithCoordinates

}
const people = generateCoordinates(inputs, '11', 200); // '1' is the rootId

const CanvasComponent: React.FC = () => {
  // Refs to access the canvas and info div DOM elements
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

  // Refs for canvas pan and zoom behavior
  const offsetX = useRef(0); // horizontal pan offset
  const offsetY = useRef(0); // vertical pan offset
  const scale = useRef(1);   // current zoom level

  // Refs for drag/pan tracking
  const isDragging = useRef(false);        // is mouse dragging?
  const wasDragging = useRef(false);       // was there a drag movement?
  const dragStartX = useRef(0);            // mouse X at drag start
  const dragStartY = useRef(0);            // mouse Y at drag start
  const needsRedraw = useRef(true);        // whether canvas needs to be redrawn

  // Size of each person's rectangle
  const rectW = 80;
  const rectH = 40;

  // Draws the entire tree structure
  const drawShapes = () => {
    const canvas = canvasRef.current;
    if (!canvas || !needsRedraw.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    needsRedraw.current = false;

    // Clear and set up canvas transformation (pan & zoom)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(offsetX.current, offsetY.current);
    ctx.scale(scale.current, scale.current);

    const peopleMap = new Map<string, Person>();
    people.forEach(p => peopleMap.set(p.person.id, p)); // Map for easy lookup

    // Draw relationship lines first (under boxes)
    ctx.strokeStyle = '#3096b8';
    ctx.lineWidth = 2;

    people.forEach(person => {
      // Only draw spouse line once per couple
      if (person.person.spouse_id && person.person.id < person.person.spouse_id) {
        const spouse = peopleMap.get(person.person.spouse_id);
        if (!spouse) return;

        // Coordinates of each spouse's center
        const x1 = person.x + rectW / 2;
        const y1 = person.y + rectH / 2;
        const x2 = spouse.x + rectW / 2;
        const y2 = spouse.y + rectH / 2;

        // Draw line connecting spouses
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Draw lines connecting to children

        // if (person.children_ids && person.children_ids.length > 0) {
        //   const joinX = (x1 + x2) / 2;
        //   const joinY = (y1 + y2) / 2;
        //   const childY = joinY + 40;
        //
        //   // Vertical line downward from spouse connection
        //   ctx.beginPath();
        //   ctx.moveTo(joinX, joinY);
        //   ctx.lineTo(joinX, childY);
        //   ctx.stroke();
        //
        //   // Get X center positions of all children
        //   const childXs = person.children_ids
        //     .map(id => {
        //       const child = peopleMap.get(id);
        //       return child ? child.x + rectW / 2 : null;
        //     })
        //     .filter(x => x !== null) as number[];
        //
        //   if (childXs.length === 0) return;
        //
        //   // Horizontal line connecting all children
        //   const minX = Math.min(...childXs);
        //   const maxX = Math.max(...childXs);
        //   ctx.beginPath();
        //   ctx.moveTo(minX, childY);
        //   ctx.lineTo(maxX, childY);
        //   ctx.stroke();
        //
        //   // Vertical lines from horizontal to each child
        //   person.children_ids.forEach(childId => {
        //     const child = peopleMap.get(childId);
        //     if (!child) return;
        //     const cx = child.x + rectW / 2;
        //     const cy = child.y;
        //     ctx.beginPath();
        //     ctx.moveTo(cx, childY);
        //     ctx.lineTo(cx, cy);
        //     ctx.stroke();
        //   });
        // }
      }
    });

    // Draw person boxes after lines
    people.forEach(person => {
      ctx.fillStyle = '#28758f'; // Box color
      ctx.fillRect(person.x, person.y, rectW, rectH);

      // Person name
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px sans-serif';
      ctx.fillText(person.person.name, person.x + 8, person.y + 25);
    });

    ctx.restore(); // Reset transformations
  };

  // Handle clicking on canvas to show which person was clicked
  const handleCanvasClick = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    const infoDiv = infoRef.current;
    if (!canvas || !infoDiv) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert mouse coords to canvas (world) space
    const contentX = (mouseX - offsetX.current) / scale.current;
    const contentY = (mouseY - offsetY.current) / scale.current;

    // Check if a person's box was clicked
    const clickedPerson = people.find(
      p =>
        contentX >= p.x &&
        contentX <= p.x + rectW &&
        contentY >= p.y &&
        contentY <= p.y + rectH
    );

    // Show person's name or clear text
    if (clickedPerson) {
      infoDiv.textContent = `Clicked: ${clickedPerson.person.name}`;
    } else {
      infoDiv.textContent = '';
    }
  };

  // Set up canvas events and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Main animation loop to draw the canvas
    const animate = () => {
      drawShapes();
      requestAnimationFrame(animate);
    };
    animate();

    // Handle mouse down: begin drag
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      wasDragging.current = false;
      dragStartX.current = e.clientX;
      dragStartY.current = e.clientY;
    };

    // Handle mouse move: update pan position if dragging
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const dx = e.clientX - dragStartX.current;
      const dy = e.clientY - dragStartY.current;

      // Mark as drag if significant movement
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        wasDragging.current = true;
      }

      // Update offsets for panning
      offsetX.current += dx;
      offsetY.current += dy;
      needsRedraw.current = true;

      // Update drag start point
      dragStartX.current = e.clientX;
      dragStartY.current = e.clientY;
    };

    // Handle mouse up: finish drag or treat as click
    const handleMouseUp = (e: MouseEvent) => {
      if (isDragging.current && !wasDragging.current) {
        handleCanvasClick(e); // only click if not dragged
      }
      isDragging.current = false;
    };

    // Handle zooming with Ctrl + scroll wheel
    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;

      e.preventDefault();

      const zoomAmount = -e.deltaY * 0.001;
      const oldScale = scale.current;
      const newScale = Math.min(Math.max(0.2, oldScale * (1 + zoomAmount)), 2);

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Maintain zoom focus at cursor position
      const worldX = (mouseX - offsetX.current) / oldScale;
      const worldY = (mouseY - offsetY.current) / oldScale;

      scale.current = newScale;
      offsetX.current = mouseX - worldX * newScale;
      offsetY.current = mouseY - worldY * newScale;

      needsRedraw.current = true;
    };

    // Add event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // Clean up on component unmount
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Render canvas and info panel
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
