import React, { Fragment, useState, useEffect, useRef } from "react";
import AddImage from "./AddImage";
import { useNavigate } from 'react-router-dom';

const AddMachine = ({Loc, onUpdate}) => {
    //DECLARE VARAIBLES
    const[machid, setMachId] = useState()           //Machine Id Variable
    const[machtype, setMachType] = useState()       //Machine Type Variable
    const[machip, setMachIp] = useState()           //Machine IP Variable
    const[top, setTop] =useState('50')              //Top % for button Variable intiallized at 50 to be in the center of the screen for adding
    const[left, setLeft] = useState('50')           //Top % for button Variable intiallized at 50 to be in the center of the screen for adding
    const[rotation, setRotation] = useState()       //Rotation Degrees Variable For Button Position
    var [width, setWidth] = useState('83')          //Width Intialized for Input Boxes
    const[workstation_id, setWrkId] = useState()    //Machine Workstation Id Variable
    const navigate = useNavigate();                 //Hook for navigation within the application
    const formData = new FormData();                //Instance of FormData for handling form data submission
    const [file, setFile] = useState(null)          //File for Image Upload

    const updateMach = async e => {
        //GOES TO ADD BUTTON PAGE TO SET BUTTON POSITION

        formData.append('file', file);  //Appends File Data to be uploaded to Server
        navigate('/AddButton', { state: {file: file, formData: formData, Loc: Loc, machine_id: machid, top: top, left: left, machine_type : machtype, rot: rotation, machip: machip, workstation_id: workstation_id } })
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

    //EXITS WINDOW IS CLOSE IS PRESSED
   const closeWin = () => {
        onUpdate();
   }


    return (
        <Fragment >
            {/* BACKGROUND BOX*/ }
          <div style={{backgroundColor:"white", border: 'solid black', width: '50%', position:"absolute", top: '20%', left:'25%', zIndex: 1001}}>
                {/* ADD MACHINE TITLE*/ }
              <h1 style={{textAlign: 'center'}}>Add Machine</h1>
                {/* ID BOX*/ }
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                <label style={{ marginRight: '20px' }}>ID:  </label>
                <input
                    style={{width: `${width}%`}}
                    type="text"
                    className="form-control"
                    placeholder="Machine ID"
                    value={machid}
                    onChange={handleMachIdChange}
                    
                />
                </div>
                    {/* MACHINE TYPE BOX*/ }            
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                <label style={{ marginRight: '20px' }}>Type:  </label>
                        <input
                            style={{width: `${width}%`}}
                            type="text"
                            className="form-control"
                            placeholder="Machine Type"
                            value={machtype}
                            onChange={handleMachTypeChange}
                        />
                        </div>
                
                {/* IP BOX*/ }
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                <label style={{ marginRight: '20px' }}>IP:  </label>
                        <input
                            style={{width: `${width}%`}}
                            type="text"
                            className="form-control"
                            placeholder="Machine IP"
                            value={machip}
                            onChange={handleMachIpChange}
                        />
                        </div>
                {/* WORKSTATION BOX*/ }
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                <label style={{ marginRight: '20px', whiteSpace: 'nowrap' }}>WorkStation ID:  </label>
                <input
                    style={{width: `${width}%`}}
                    type="text"
                    className="form-control"
                    placeholder="Workstation ID"
                    value={workstation_id}
                    onChange={handleWrkChange}
                />
                </div>
                {/* ROTATION BOX*/ }
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                <label style={{ marginRight: '20px' }}>Rotation:  </label>
                        <input
                            style={{width: `${width}%`}}
                            type="text"
                            className="form-control"
                            placeholder="Rotation %"
                            value={rotation}
                            onChange={handleRotChange}
                        />
                        </div>
                {/* ADD IMAGE */ }
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                <AddImage file={file}  setFile={setFile}/>
                </div>
                {/* BUTTONS */ }
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: '2%', paddingBottom:'2%'}}>
                    <button  style={{ marginRight: '5%' }} type="button" class="btn btn-warning"  data-dismiss="modal" onClick={e => updateMach(e)}>Confirm</button>
                    <button  type="button" class="btn btn-danger" onClick={closeWin} >Close</button>
                </div>
             
            </div>
        
         </Fragment>
      )
    };


export default AddMachine