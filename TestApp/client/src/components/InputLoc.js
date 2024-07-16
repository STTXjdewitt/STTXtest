// Import necessary modules and components
import React, { Fragment, useState } from "react";
import { useNavigate } from 'react-router-dom';

/**
 * A functional component for inputting location details.
 * Users can enter a location number and name, then submit these details.
 * Upon submission, the details are sent to a backend service.
 */
const InputLoc = () => {
    
    // State to hold the location number and name inputs
    const [loc_name, setLocName] = useState("");                        
    const [loc_num, setLocNum] = useState("");
    // State to hold images related to the location (placeholder for now)
    const [images, setImg] = useState([]);

    // Hook to programmatically navigate between routes
    const navigate = useNavigate();

    /**
     * Navigates to the ListLoc page when called.
     * This could be used to redirect users after adding a location.
     */
    const goToNewPage = async() => {
        navigate('/Locations');
    }

    /**
     * Handles form submission.
     * Prevents the default form submission behavior, constructs the request body,
     * sends a POST request to the backend, and redirects the user to the home page.
     */
    const onSubmitForm = async(e) => {
        e.preventDefault();
        
        try {
            const body = { loc_num, loc_name }; // Constructing the request body
            console.log(body); // Logging the request body for debugging purposes
            
            const response = await fetch("http://COR1LTINTS9CG:5000/Locations", {
                method: "POST",
                headers: { "Content-Type": "application/json"}, // Setting the content type to JSON
                body: JSON.stringify(body) // Sending the request body as JSON
            });

            // Redirecting the user to the home page after successful submission
            window.location = "/Locations";
        } catch (err) {
            console.error(err.message); // Logging errors for debugging purposes
        }
    }

    // Handlers for updating individual state values
    const handleLocNumChange = (e) => {
        setLocNum(e.target.value); // Updating the location number state
    };

    const handleLocNameChange = (e) => {
        setLocName(e.target.value); // Updating the location name state
    };

    // Rendering the component
    return (
        <Fragment>
            <h1 className="text-center mt-5">Input Location</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                {/* Inputs for location number and name */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Location Number"
                    value={loc_num}
                    onChange={handleLocNumChange}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Location Name"
                    value={loc_name}
                    onChange={handleLocNameChange}
                />
                {/* Submit button */}
                <button className="btn btn-success">Add</button>
                {/* Button to navigate to the list of locations */}
                <button className="btn btn-link" onClick={goToNewPage}>Go to All</button>
            </form>
            {/* Placeholder for displaying images related to the location */}
            <img src={images} alt = "here"></img>
        </Fragment>
    );
}

export default InputLoc;
