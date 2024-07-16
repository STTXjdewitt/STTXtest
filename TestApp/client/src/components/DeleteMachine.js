import React from "react";

// DeleteMachine Component - Handles the deletion of a machine and associated button
const DeleteMachine = ({machine, button, onUpdate}) => {

    // Function to delete a machine and its associated button
    const deleteMachine = async(id) => {
        // Confirm deletion with the user
        if (!window.confirm("Are you sure you want to delete this machine?")) {
            return; // Exit the function if the user cancels
        }
        try {
            // Prepare the request body for deleting a machine
            const body = {machine_loc : machine.machine_loc, machine_id : machine.machine_id }
            
            // Send DELETE request to the server to remove the machine
            const deleteResponse = await fetch(`http://COR1LTINTS9CG:5000/Machines/${id}`,{
                method: "DELETE",
                headers: { "Content-Type": "application/json" }, // Set content type header
                body: JSON.stringify(body) // Send the request body as JSON
            });
            
        } catch (err) {
            console.error(err.message); // Log any errors that occur during the request
        }
        try {
            // Prepare the request body for deleting a button associated with the machine
            const body2 = {locationnum : button.locationnum, machine_id : button.machine_id }
            
            // Send DELETE request to the server to remove the button
            const deleteResponse = await fetch(`http://COR1LTINTS9CG:5000/Buttons/${id}`,{
                method: "DELETE",
                headers: { "Content-Type": "application/json" }, // Set content type header
                body: JSON.stringify(body2) // Send the request body as JSON
            });
            
        } catch (err) {
            console.error(err.message); // Log any errors that occur during the request
        }
        onUpdate() // Call the onUpdate callback after successfully deleting the machine and its button
    };
    
    
    // Log the props received by the component for debugging purposes
    console.log(machine, button)
    
    // Render the Delete button
    return (
        <button style={{alignContent:'center',position:"absolute", right:'10%'}} className="btn btn-danger" onClick={() => deleteMachine(machine.machine_id)} >Delete</button>
    )
}

export default DeleteMachine;
