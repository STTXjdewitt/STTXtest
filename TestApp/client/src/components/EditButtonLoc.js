import React, { useState, useEffect, Fragment } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; 
import DraggableButton from './DraggableButton';
import DropArea from './DropArea';
import { useNavigate, useLocation } from 'react-router-dom';


const TestButton = () => {
    //GRAB COOKIE BASED ON LOCATION
    const location = useLocation(); 
    const Loc = location.state?.Loc;                            //Location Array
    const machine = location.state?.machine;                    //Machine Array
    
    //Hook for navigation within the application
    //USED TO NAVIGATE TO NEW SCREEN
    const navigate = useNavigate();  
    
    
    //DECLARE VARIABLES
    const [items, setItems] = useState({});                     //Sets Items to be mapped for Draggable button
    const [machloc, setLoc] = useState(Loc.loc_num)             //Machines Location #
    const [onUpdate, setUp] = useState(false)                   //Update Variable so that when complete it updates Machines in Plant Map
    const [isLoading, setIsLoading] = useState(true);           //Load Buttons when data is completely loaded

    //SETS ITEMS WHEN MACHINE IS LOADED
    
    const fetchData = async () => {
      if (Array.isArray(machine)) {
        await Promise.all(machine.map(async (mach) => {
          // Simulate an asynchronous operation, such as fetching data
          // Here we're just constructing the object synchronously for demonstration
          items[mach.machine_id] = {machine_type: mach.machine_type, leftnum: mach.leftnum, topnum: mach.topnum};
        }));
      }
      setItems(items); // Update 'items' state with the newly constructed object
      setIsLoading(false); // Set isLoading to false once items are loaded
    };


      useEffect(() => {
        // Call the async function
        fetchData();
      }); // Depend on 'machine' to re-run this effect whenever 'machine' changes
  
    //CALCULATES A GOOD ESTIMATE FROM PIXELS TO PERCENTAGE FOR PAGE
    function pixelToPercentage(pixelValue, totalSize) {
      return ((pixelValue / totalSize) * 100).toFixed(2);
    }
    
    //SAVES BUTTONS NEW POSITION
    const Save = async () => {
      
      //SENDS TO SERVER TO UPDATE BUTTONS TABLE
      Object.entries(items).map(async([id, position]) => {
        try {
          const body2 = {
              top: position.topnum, left: position.leftnum,  machloc, machid:id
          };
          const response = await fetch(`http://COR1LTINTS9CG:5000/ButtonUpdate/${id}`,
              {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body2)
              }

          )
          
      } catch (err) {
          console.error(err.message)
      }
      });
    //GOES TO PLANT MAP AND TELLS IT TO REFRESH IN ORDER TO LOAD NEW MACHINE
    setUp(true)
    navigate('/PlantMap', { state: { Loc: Loc, onUpdate: onUpdate} });
    };
    
    //GOES BACK TO PLANT MAP WITHOUT SAVING
    const back = () => {
      setUp(false)
      navigate('/PlantMap', { state: { Loc: Loc, onUpdate: onUpdate} });
    }

    //HANDLES UPDATING BUTTON POSITION WHEN YOU DROP IT
    const handleDrop = (id, position) => {
      // Calculate new leftnum and topnum based on newX and newY
    
      const documentWidth = window.innerWidth                               // Total width of the document
      const documentHeight = window.outerHeight                             // Total height of the document
      
      const xPercentage = pixelToPercentage(position.x, documentWidth);     // X Percentage Value
      const yPercentage = pixelToPercentage(position.y, documentHeight);    // Y Percentage Value
      const newLeftNum = String(xPercentage)                                // Converts X Percentage Value To String
      const newTopNum = String(yPercentage-10)                              // Converts Y Percentage Value To String

      // Update the state with the new leftnum and topnum
      setItems(prevItems => ({
        ...prevItems,
        [id]: { ...prevItems[id], leftnum: newLeftNum, topnum: newTopNum }
      }));
    };
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
  return (
      <div>
        {isLoading ? (
      <div>Loading...</div> // Replace with your preferred loading indicator
    ) : (
      <>
          {/* BACKGROUND IMAGE*/ }
          <div style={{margin: "0", padding: "0", position: 'absolute', backgroundImage: `url(http://COR1LTINTS9CG:5000/Image/${Loc.loc_name}.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'top center', minHeight: '140vh', minWidth: '100%'}}></div>
          {/* LOCATION NAME*/ }
          <h1 style={{color: "white", position: 'absolute', top: '0', width: '100%', backgroundColor: '#000080', padding: '1em', textAlign: 'center'}}>{Loc.loc_name}</h1>
          {/* LOGO */ }
          <img style={{position: "absolute", right: "0%", border: "solid black", top: '.2%'}} src="http://COR1LTINTS9CG:5000/Image/logo.png" alt = 'logo'/>
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
          </> )}
    </div>
  );
}
  
  export default TestButton;