import React from 'react';
import { useDrop } from 'react-dnd';

/*
 * A drop area component designed to work with react-dnd for handling dropped items.
 * This component listens for items of type 'button' and calls a callback function
 * with the item's ID and the position where it was dropped.
 *
 * @param {Object} props - Component properties
 * @param {function} props.onDrop - Callback function called when an item is dropped onto this area
 */
const DropArea = ({ onDrop }) => {

    /**
     * Initializes the drop functionality using react-dnd's useDrop hook.
     * Accepts items of type 'button' and defines what happens when such an item is dropped.
     */
    const [, drop] = useDrop(() => ({
      accept: 'button', // Specifies that this drop area accepts items of type 'button'
      drop: (item, monitor) => {
        // When an item is dropped, calculate its position relative to the viewport
        const dropPosition = monitor.getClientOffset();
        // Call the onDrop prop with the item's ID and its drop position
        onDrop(item.id, dropPosition);
      },
    }));

    /**
     * Renders the drop area with specific styling.
     */
    return (
      <div
        ref={drop} // Assigns the drop handler to the div element
        style={{
          border: 'none', // No border around the drop area
          padding: '20px', // Padding inside the drop area
          borderRadius: '5px', // Rounded corners
          minHeight: '140vh', // Minimum height covering most of the viewport
          minWidth: '100%', // Full width of the viewport
        }}
      >
      </div>
    );
};

export default DropArea;