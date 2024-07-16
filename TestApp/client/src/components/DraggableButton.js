// Import necessary modules
import React from 'react';
import { useDrag } from 'react-dnd';

/*
 * A draggable button component that uses react-dnd for drag-and-drop functionality.
 * It allows for custom positioning and rotation of the button on the screen.
 *
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique identifier for the draggable button
 * @param {ReactNode} props.children - Content inside the draggable button
 * @param {Object} props.position - Positioning details for the button
 * @param {number} props.position.leftnum - Horizontal position percentage
 * @param {number} props.position.topnum - Vertical position percentage
 * @param {number} props.position.rotation - Rotation degree for the button
 */
const DraggableButton = ({ id, children, position }) => {

    /**
     * Initializes the drag functionality using react-dnd's useDrag hook.
     * The collected state includes whether the button is currently being dragged.
     */
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'button', // Type of the draggable item
      item: { id }, // Data associated with the draggable item
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(), // Whether the item is currently being dragged
      }),
    }));

    /**
     * Renders the draggable button with dynamic styles based on its dragging state and position.
     */
    return (
      <div
        ref={drag} // Assigns the drag handle to the div element
        style={{
          opacity: isDragging ? 0.5 : 1, // Changes opacity when dragging
          cursor: 'move', // Cursor changes to move when hovering over the button
          height: '2.5%', // Fixed height
          border: '2px solid black', // Button border styling
          backgroundColor: "blue", // Background color
          color: "white", // Text color
          paddingLeft: '.5%', // Padding on the left
          paddingRight: '.5%', // Padding on the right
          textAlign: 'center', // Centered text
          position: 'absolute', // Absolute positioning
          left: `${position.leftnum}%`, // Horizontal position
          top: `${position.topnum}%`, // Vertical position
          transform: `rotate(${position.rotation}deg)` // Rotates the button
        }}>
        {children} 
      </div>
    );
};

export default DraggableButton;
