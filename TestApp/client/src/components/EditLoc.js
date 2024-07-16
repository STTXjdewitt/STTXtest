import React, { Fragment, useState } from "react";

// EditLoc Component - Allows editing location details
const EditLoc = ({ loc }) => {

    // State hooks for location name and number
    const [loc_name, setLocName] = useState(loc.loc_name);      // State for location name
    const [loc_num, setLocNum] = useState(loc.loc_num);         // State for location number

    // Function to update location details via API call
    const updateLoc = async e => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Prepare the request body
            const body = { loc_name };
            // Perform PUT request to update location
            const response = await fetch(`http://COR1LTINTS9CG:5000/Locations/${loc.loc_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            // Redirect to home page upon successful update
            window.location = "/";
        } catch (err) {
            console.error(err.message); // Log error message if request fails
        }
    }

    // Handlers for updating individual state values
    const handleLocNumChange = (e) => {
        setLocNum(e.target.value); // Update location number state
    };

    const handleLocNameChange = (e) => {
        setLocName(e.target.value); // Update location name state
    };

    return (
        <Fragment>
            {/* Button to trigger modal edit for location */}
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${loc.loc_id}`}>
                Edit
            </button>

            {/* Modal content for editing location details */}
            <div class="modal" id={`id${loc.loc_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Location</h4>
                            {/* Button to close modal */}
                            <button type="button" class="close" data-dismiss="modal" onClick={() => setLocName(loc.loc_name)}>&times;</button>
                        </div>

                        <div class="modal-body">
                            {/* Input fields for editing location number and name */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                                <label style={{ marginRight: '20px' }}>Number: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Location Number"
                                    value={loc_num}
                                    onChange={handleLocNumChange}
                                    style={{ marginRight: '10px' }} // Inline style for margin-right
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                                <label style={{ marginRight: '20px' }}>Location: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Location Name"
                                    value={loc_name}
                                    onChange={handleLocNameChange}
                                />
                            </div>
                        </div>

                        <div class="modal-footer">
                            {/* Buttons for saving edits and closing modal */}
                            <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={e => updateLoc(e)}>Edit</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditLoc;
