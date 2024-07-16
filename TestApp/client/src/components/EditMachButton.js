import React, { Fragment, useState } from "react";
import AddImage from "./AddImage";

const EditMachButton = ({ button, machine, onUpdate }) => {
    // State to hold the current values of machine attributes and button positions
    const [machid, setMachId] = useState(machine.machine_id);                              //Machine Id for Button
    const [machtype, setMachType] = useState(machine.machine_type);                        //Machine Type
    const [machip, setMachIp] = useState(machine.machine_ip);                              //Machine IP
    const [machloc, setMachLoc] = useState(machine.machine_loc);                           //Machines Location #
    const [top, setTop] = useState(button.topnum);                                         //Top % Number for Button
    const [left, setLeft] = useState(button.leftnum);                                      //Left % Number for Button
    const [rotation, setRotation] = useState(button.rotation);                             //Machine Rotation Degrees
    const [workstation_id, setWrkId] = useState(machine.workstation_id);                   //Machine Workstation #
    const formData = new FormData();                                                       //Instance of FormData for handling form data submission   
    const [file, setFile] = useState(null)                                                 //File descriptions
    var [width, setWidth] = useState('83');                                                // Width percentage for input fields

    // Function to update machine details
    const updateWorkStation = async e => {
        e.stopPropagation();                                                               // Prevents event from bubbling up
        e.preventDefault();                                                                // Prevents the default action associated with the event from occurring
        
        formData.append('file', file);                                                     //Appends the files data to form Data for upload to server

        //For Uploading File
        if(file !== null){
        try {
            const response = await fetch('http://COR1LTINTS9CG:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            alert('File uploaded successfully!');
        } catch (error) {
            console.error(error);
            alert('An error occurred during file upload.');
        }
        }


        //Updating Workstation
        try {
            const body = {
                machid,
                machtype,
                machip,
                machloc,
                workstation_id,
                ...(file !== null ? { fileName: file.name } : {})
            };
            const response = await fetch(`http://COR1LTINTS9CG:5000/MachUp/${machine.machine_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            updateButton(e); // Update button properties after updating machine details
            onUpdate(); // Refresh parent component
        } catch (err) {
            console.error(err.message);
        }
    }

    // Function to update button properties
    const updateButton = async e => {
        e.stopPropagation(); // Prevents event from bubbling up
        e.preventDefault();
        
        try {
            const body2 = {
                rot: rotation, top, left,  machloc, machid
            };
            const response = await fetch(`http://COR1LTINTS9CG:5000/ButtonUp/${machine.machine_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body2)
            });

            onUpdate(); // Refresh parent component
        } catch (err) {
            console.error(err.message);
        }
    }


    

    // Function to close the edit window and refresh the parent component
    const closeWin = () => {
        onUpdate();
    }

    // Handlers for updating individual state values
    const handleMachIdChange = (e) => {
        setMachId(e.target.value);
    };

    const handleMachTypeChange = (e) => {
        setMachType(e.target.value);
    }

    const handleMachIpChange = (e) => {
        setMachIp(e.target.value);
    }

    const handleWrkChange = (e) => {
        setWrkId(e.target.value);
    }
    const handleRotChange = (e) => {
        setRotation(e.target.value);
    }
   

    return (
    
        <Fragment>
        <div style={{backgroundColor:"white", border: 'solid black', width: '90%', position:"absolute", top: '20%', left:'5%', zIndex: 2000}}>
            <h1 style={{textAlign: 'center'}}>Edit Machine</h1>
            {/* Form group for Machine ID */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                <label style={{ marginRight: '20px' }}>ID:  </label>
                <input
                    style={{width: `${width}%`}} // Dynamically setting input width
                    type="text"
                    className="form-control"
                    placeholder="Machine ID"
                    value={machid} // Binding input value to state
                    onChange={handleMachIdChange} // Handling input change to update state
                />
            </div>
            {/* Form group for Machine Type */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                <label style={{ marginRight: '20px' }}>Type:  </label>
                <input
                    style={{width: `${width}%`}} // Dynamically setting input width
                    type="text"
                    className="form-control"
                    placeholder="Machine Type"
                    value={machtype} // Binding input value to state
                    onChange={handleMachTypeChange} // Handling input change to update state
                />
            </div>
            {/* Form group for Machine IP */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                <label style={{ marginRight: '20px' }}>IP:  </label>
                <input
                    style={{width: `${width}%`}} // Dynamically setting input width
                    type="text"
                    className="form-control"
                    placeholder="Machine IP"
                    value={machip} // Binding input value to state
                    onChange={handleMachIpChange} // Handling input change to update state
                />
            </div>
            {/* Form group for WorkStation ID */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                <label style={{ marginRight: '20px', whiteSpace: 'nowrap' }}>WorkStation ID:  </label>
                <input
                    style={{width: `${width}%`}} // Dynamically setting input width
                    type="text"
                    className="form-control"
                    placeholder="Workstation ID"
                    value={workstation_id} // Binding input value to state
                    onChange={handleWrkChange} // Handling input change to update state
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                <label style={{ marginRight: '20px' }}>Rotation:  </label>
                    <input
                                style={{width: `${width}%`}} // Dynamically setting input width
                                type="text"
                                className="form-control"
                                placeholder="Rotation %"
                                value={rotation} // Binding input value to state
                                onChange={handleRotChange} // Handling input change to update state
                    />
             </div>
            {/* Section for adding images related to the machine */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                <AddImage file={file}  setFile={setFile}/> {/* Custom component for image addition */}
            </div>
            {/* Action buttons for submitting or canceling the form */}
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: '2%', paddingBottom:'2%'}}>
                <button type="button" class="btn btn-warning"  data-dismiss="modal" onClick={e => updateWorkStation(e)}>Confirm</button> {/* Confirm button */}
                <button  type="button" class="btn btn-danger" onClick={closeWin} >Close</button> {/* Close button */}
            </div>
        </div>
    </Fragment>)
};

export default EditMachButton;