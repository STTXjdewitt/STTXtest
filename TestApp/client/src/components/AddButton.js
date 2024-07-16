import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; 
import DraggableButton from './DraggableButton';
import DropArea from './DropArea';
import { useNavigate, useLocation } from 'react-router-dom';


const AddButton = ({}) => {

    //GRABS VARIABLE COOKIES
    const location = useLocation();
    const Loc = location.state?.Loc;                            //Location Detail Array
    const machine_id = location.state?.machine_id;              //Machine Id for Button
    const topnum = location.state?.top                          //Top % Number for Button
    const leftnum = location.state?.left                        //Left % Number for Button
    const machine_type = location.state?.machine_type           //Machine Type for Button
    const machip = location.state?.machip                       //Machine IP
    const workstation_id = location.state?.workstation_id       //Machine Workstation #
    const rotation = location.state?.rot                        //Machine Rotation Degrees
    const formData = location.state?.formData                   //Instance of FormData for handling form data submission
    const file = location.state?.file                           //File descriptions

    //Hook for navigation within the application
    //USED FOR GOING TO NEW PAGE
    const navigate = useNavigate();

    //DECLARE VARIABLES
    const [machloc, setLoc] = useState(Loc.loc_num)             //Machines Location #
    const [onUpdate, setUp] = useState(false)                   //Update Variable so that when complete it updates Machines in Plant Map
    const [items, setItems] = useState([{machine_id, machine_type,leftnum, topnum,  rotation }]);       //Sets Items to be mapped for Draggable button

    //FUNCTION TO APPROXIMATE PERCENTAGE BASED ON PIXEL VALUE
    function pixelToPercentage(pixelValue, totalSize) {
        return ((pixelValue / totalSize) * 100).toFixed(2);
    }
  
    const Save = async () => {
        setUp(true) //TO UPDATE MACHINES IN PLANTMAP

        if(!file){
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
            try {
                const body = { machid:machine_id, machtype:machine_type, machip, machloc:Loc.loc_num, workstation_id:workstation_id, ...(file !== null ? { fileName: file.name } : {})}; //SENDS TO SERVER TO ADD MACHINE
                const response = await fetch("http://COR1LTINTS9CG:5000/Machines",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    }
                )
            } catch (err) {
                console.error(err.message)
            }

        //POST BUTTON LOCATIONS 
        Object.entries(items).map(async([id, position]) => {

            try {
                const body = { rot : position.rotation, top : position.topnum, left: position.leftnum, machid: position.machine_id, machloc: machloc };
                const response = await fetch("http://localhost:5000/Buttons",
                    {
                        method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            )
            } catch (err) {
                console.error(err.message)
            }
        });
        //GO BACK TO PLANT MAP AND TELL IT TO UPDATE MACHINES
        navigate('/PlantMap', { state: { Loc: Loc, onUpdate: onUpdate} });
        
    };
  

  const back = () => {
    //RETURN BACK TO PLANT MAP AND NOT SAVE THE MACHINE/BUTTON
    setUp(false)
    navigate('/PlantMap', { state: { Loc: Loc, onUpdate: onUpdate} });
  }

  //WHEN YOU MOVE THE BUTTON THIS UPDATES THE POSITION
  const handleDrop = (id, position) => {
    // Calculate new leftnum and topnum based on newX and newY
   
    const documentWidth = window.innerWidth // Total width of the document
    const documentHeight = window.outerHeight  // Total HEIGHT of the document
    
    const xPercentage = pixelToPercentage(position.x, documentWidth);  // X Percentage Value
    const yPercentage = pixelToPercentage(position.y, documentHeight); // Y Percentage Value
    const newLeftNum = String(xPercentage)                             // Converts X Percentage Value To String
    const newTopNum = String(yPercentage-10)                           // Converts Y Percentage Value To String
    
    // Update the state with the new leftnum and topnum
    setItems(prevItems => ({
      ...prevItems,
      [id]: { ...prevItems[id], leftnum: newLeftNum, topnum: newTopNum }
    }));
  };


  return (
    <div>
        {/* BACKGROUND IMAGE*/ }
        <div style={{margin: "0", padding: "0", position: 'absolute', backgroundImage: `url(http://COR1LTINTS9CG:5000/Image/${Loc.loc_name}.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'top center', minHeight: '140vh', minWidth: '100%'}}></div>
        {/* LOCATION NAME*/ }
        <h1 style={{color: "white", position: 'absolute', top: '0', width: '100%', backgroundColor: '#000080', padding: '1em', textAlign: 'center'}}>{Loc.loc_name}</h1>
        {/* LOGO */ }
        <img style={{position: "absolute", right: "0%", border: "solid black", top: '.2%'}} src="http://COR1LTINTS9CG:5000/Image/logo.png"/>
        {/* SETS UP BUTTONS AND DROP AREA*/ }
        <DndProvider backend={HTML5Backend}>
            <div style={{display: 'flex', flexDirection: 'column', position: "absolute", minHeight: '140vh', minWidth: '100%', backgroundColor: "none", zIndex: 2000}}>
                {Object.entries(items || {}).map(([id, position]) => (
                    <><DraggableButton key={position.machine_id} id={id} position={position} onDrop={handleDrop}>{position.machine_type}</DraggableButton></>))}
                <DropArea onDrop={handleDrop}/>
            </div>
        </DndProvider>
        {/* SAVE */ }
        <button class = "btn btn-success" style={{zIndex: 2000, position: "absolute", left:"69.5%", top:"9%"}} onClick={Save}>Save</button> 
        {/* BACK */ }
        <button class = "btn btn-light" style={{zIndex: 2000, position: "absolute", left:"73.5%", top:"9%"}} onClick={back}>Back</button>
  </div>
  );
}
  
  export default AddButton;