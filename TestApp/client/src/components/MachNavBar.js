// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { MachDropDown } from './NavItems';
import { useNavigate } from 'react-router-dom';

/*
 * A functional component representing a machine-specific navigation bar.
 * It features a dropdown menu that appears upon hover over the "Machines" link.
 * The dropdown menu's visibility is managed through local component state.
 * Upon selecting an item from the dropdown, it navigates to a new route or triggers a callback function.
 */
const MachNavbar = ({ onSelectItem, Loc }) => {
    // State to manage the visibility of the dropdown menu
    const [dropdown, setDropdown] = useState(false);
    // Hook to programmatically navigate between routes
    const navigate = useNavigate();
    // State to store fetched machine data
    const [machine, setMachines] = useState({});

    /**
     * Asynchronously fetches machine data from a specified endpoint.
     * The endpoint URL includes a location number passed via props.
     * The fetched data is stored in the component's state.
     */
    const getMachines = async () => {
        try {
          const response = await fetch(`http://COR1LTINTS9CG:5000/ButtonsPos/${Loc.loc_num}`, {
              method: "GET"
          });
          const jsonData = await response.json();
          setMachines(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    /**
     * Effect hook to call getMachines whenever the Loc prop changes.
     * Ensures that the component re-fetches machine data when the location number changes.
     */
    useEffect(() => {
        getMachines();
    }, [Loc]);

    /**
     * Handles click events on dropdown items.
     * Depending on the selected item, it either navigates to a new route or triggers a callback function.
     * After handling the click, it closes the dropdown menu.
     */
    const handleItemClick = (item) => {
        console.log(item);
        if (item.title === "Edit Buttons") {
            navigate('/EditButtonLoc', { state: { Loc: Loc, machine: machine } });
        }
        onSelectItem(item);
        setDropdown(false); // Close the dropdown after selection
    };

    /**
     * Renders the machine-specific navigation bar with a dropdown menu feature.
     * The dropdown menu is toggled visible/invisible based on mouse enter/leave events.
     */
    return (
        <div>
            <nav style={{ backgroundColor: 'none', color: 'white', position: 'absolute', left:'10%', top: "68.5%" , zIndex:5, fontSize: '20pt', fontWeight: 'normal' }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)} style={{ position: 'absolute' }}>
                        Machines
                        {/* Conditional rendering of the dropdown menu */}
                        {dropdown && (
                            <ul style={{ listStyleType: 'none', padding: 0, backgroundColor: 'white', position: 'absolute', top: '100%', width:"auto" }}>
                                {/* Map through the MachDropDown array to render each item as a clickable link */}
                                {MachDropDown.map((item) => (
                                    <li key={item.id} style={{ width: "100%", border: "solid black", color: 'black', fontSize: '20pt', textDecoration: 'none', width:"100%", whiteSpace: 'nowrap', cursor: 'pointer' }} onClick={() => handleItemClick(item)}>{item.title}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default MachNavbar;
