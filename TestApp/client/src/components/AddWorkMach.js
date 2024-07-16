import React, { useState, Fragment } from 'react';
import AddImage from './AddImage';



const AddWorkMach = ({wrk_id, loc_num, onUpdate}) => {

    //DECLARE VARIABLES
    const[machid, setMachId] = useState()                   //Machine Id Variable
    const[machtype, setMachType] = useState()               //Machine Type Variable
    const[machip, setMachIp] = useState()                   //Machine IP Variable
    const[machloc, setMachLoc] = useState(loc_num)          //Machines Location
    const[IsVisible, setIsVisible] = useState(false)        //Controls the Visibility of the Add Machine Box
    const[workstation_id, setWrkId] = useState(wrk_id)      //Machine Workstation #
    

    //POST TO MACHINE TABLE
    const postMachine = async e => {
        e.stopPropagation();                                // Prevents event from bubbling up
        e.preventDefault();                                 // Prevents the default action associated with the event from occurring
        onUpdate()
        try {
            const body = {   machid,  machtype, machip, machloc,workstation_id };
            const response = await fetch("http://COR1LTINTS9CG:5000/Machines",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            )
            toggleVisible()
            
        } catch (err) {
            console.error(err.message)
        }
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
    const toggleVisible = () => {
        setIsVisible(!IsVisible)
    }
   
    return(

        <Fragment >
            {/* ADD BUTTON */ }
            <button type="button" class="btn btn-success" style={{height: '8%', display: 'flex', position: 'absolute', bottom: '0%', alignItems: 'center', left: '35%',cursor: 'pointer', Top: '10%',marginBottom: '.5%', zIndex:1001 }} onClick={()=>toggleVisible()}>Add</button>

            {/* SHOWS WHEN ADD IS PRESSED*/ }
            {IsVisible?(
            <div style={{backgroundColor:"white", border: 'solid black', width: '50%', position:"absolute", top: '20%', left:'25%', zIndex: 1005}}>
                {/* ADD MACHINE TITLE*/ }
                <h1 style={{textAlign: 'center'}}>Add Machine</h1>
                {/* ID BOX*/ }
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                <label style={{ marginRight: '20px' }}>ID:  </label>
                <input
                    style={{width: "90%"}}
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
                            style={{width: "90%"}}
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
                            style={{width: "90%"}}
                            type="text"
                            className="form-control"
                            placeholder="Machine IP"
                            value={machip}
                            onChange={handleMachIpChange}
                        />
                </div>
                {/* ADD IMAGE */ }
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
                    <AddImage />
                </div>
                {/* BUTTONS */ }
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: '2%', paddingBottom:'2%'}}>
                    <button  style={{ marginRight: '5%' }} type="button" class="btn btn-warning"  onClick={e => postMachine(e)}>Confirm</button>
                    <button  type="button" class="btn btn-danger" onClick={toggleVisible} >Close</button>
                </div>
                
                </div>): null}
        
        </Fragment>)
    };



export default AddWorkMach