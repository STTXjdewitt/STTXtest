import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { QADropdown } from './NavItems'; 

/*
 * A functional component representing a navigation bar.
 * It features a dropdown menu that appears upon hover over the "Options" link.
 * The dropdown menu's visibility is managed through local component state.
 */
const Navbar = () => {
    // State to manage the visibility of the dropdown menu
    const [dropdown, setDropdown] = useState(false);

    /**
     * Renders the navigation bar with a dropdown menu feature.
     * The dropdown menu is toggled visible/invisible based on mouse enter/leave events.
     */
    return (
        <nav style={{ backgroundColor: 'none', color: 'white', position: 'absolute', left:'1%', top: "9%" ,zIndex:5000, fontSize: '20pt' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {/* Dropdown trigger - "Options" link */}
                <li onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)} style={{ position: 'absolute' }}>
                    Options
                    {/* Conditional rendering of the dropdown menu */}
                    {dropdown && (
                        <ul style={{ listStyleType: 'none', padding: 0, backgroundColor: 'white', position: 'absolute', top: '100%', width:"auto" }}>
                            {/* Map through the QADropdown array to render each item as a link */}
                            {QADropdown.map((item) => (
                                <li key={item.id}  style={{ width: "100%", border: "solid black" }}><Link to={item.path} style={{ color: 'black', fontSize: '20pt', textDecoration: 'none', width:"100%", whiteSpace: 'nowrap' }}>{item.title}</Link></li>
                            ))}
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;