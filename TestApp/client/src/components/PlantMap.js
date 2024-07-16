import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import EditMachButton from "./EditMachButton";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CheckBox from "./CheckBox";
import AddMachine from "./AddMachine";
import MachNavbar from "./MachNavBar";
import Workstation from "./Workstation"
import DeleteMachine from "./DeleteMachine";


const PlantMap = () =>  {


  //GRABS LOCATION COOKIE
  const location = useLocation();
  const Loc = location.state?.Loc;                                              //Location Detail Array
  const update= location.state?.onUpdate                                        //Update variable if true will refresh the fetch calls

  //DECLARES VARIABLES
  const [refresh, setUp] = useState(false)                                      //Used to refresh the page when the button position is edited
  const [machines, setMachines] = useState([]);                                 //Array of Machines
  const [buttons, setButtons] = useState([])                                    //Array of Buttons
  const [locNumber, setLocNumber] = useState(0);                                //Location #
  const [isLoading, setIsLoading] = useState(true);                             //Loading variable set to false intially so that the page doesnt render until all data is loaded
  const [uniqueMachineTypes, setUniqueMachineTypes] = useState([]);             //Array for unique machine types for the checkbox filter
  const [checkedStates, setCheckedStates] = useState({})                        //Checked States for the machines
  const [FilterVisibility, setFilterVisibility] = useState(false)               //Sets the Visibiltiy for the Filter screen to false
  const [addMachineVis, setAddMachineVis] = useState(false)                     //Sets the Visibiltiy for the Add Machine screen to false
  const [editMachineVisibility, setEditMachineVisibility] = useState(false)     //Sets the Visibiltiy for the Edit Machine screen to false
  const [singleMachine, setMach] = useState([]);                                //Singular Machine variable
  const [singleButton, setSingleButton] = useState([])                          //Singular Button variable

    

//FETCHES ALL MACHINES FOR LOCATION
const getMachines = async () => {

  await timeout(1000);                                                          //WAITS A SECOND TO GIVE TIME FOR FETCHING DATA/UPDATING DATA
  try {
    const response = await fetch(`http://COR1LTINTS9CG:5000/Machines/${Loc.loc_num}`,
      {
        method: "GET"
      });
    const jsonData = await response.json();
    setMachines(jsonData); 
    setIsLoading(false); // Indicate that loading is done
  } catch (err) {
      console.error(err.message);
  }
};


//CALLS GET MACHINES ONCE 
useEffect(() => {
    getMachines()

}, [])


//USED FOR THE WAITING TIME
function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}


//WHEN THERE IS AN UPDATE REFRESHES THE MACHINES
useEffect(() => {
  if (refresh) {
    try {
      
      getMachines();
      setUp(false); 
    } catch (error) {
      console.error("Failed to refresh machines:", error);
    }
  }
}, [update])


//FETCHES BUTTONS FROM SERVER
  const getButtons = async () => {
    await timeout(1000); //WAITS A SECOND TO GIVE TIME FOR FETCHING DATA/UPDATING DATA
    try {
      const response = await fetch(`http://COR1LTINTS9CG:5000/Buttons/${Loc.loc_num}`,
        {
          method: "GET"
        });
      const jsonData = await response.json();
      setButtons(jsonData);
      setIsLoading(false); // End loading after setting location data
    } catch (err) {
        console.error('buttons');
    }
  };


  const redirectToWebsite = () => {
    window.location.href = 'https://www.steeltechnologies.com/'; // Replace with the URL you want to redirect to
  };
 
  //CALLS BUTTONS ANYTIME MACHINES IS CHANGED
  useEffect(() => {
    getButtons(locNumber);
  }, [machines]);

  //UPDATES MACHINES WHEN ADDING A NEW MACHINE
const handleMachineUpdate = () => {
  setAddMachineVis(false)
  getMachines(); // Refetching machines 
};

//HANDLES MACHINES DROPDOWN
const handleSelectedItem = (item) => {
      if (item.title === 'Filter') {
        setFilterVisibility(true);
      } else if (item.title === 'Add Machine') {
        setAddMachineVis(true)
      } 
      else if (item.title === 'Edit Buttons') {
      
      } else {
        setAddMachineVis(false);
        setFilterVisibility(false);
      }
};


//FUNCTION TO HANDLE CHANGES IN CHECKBOX STATE
const handleCheckboxChange = (type, isChecked) => {
  // Toggle the state for the specific machine type
  setCheckedStates(prevState => ({
    ...prevState,
    [type]: !prevState[type]
  }));
};

//CLOSES FILTERS WHEN CLOSE IS PRESSED
const closeFilter = () => {
  setFilterVisibility(false)
}

//CLOSES EDIT WHEN CLOSE IS PRESSED
const closeEdit = () => {
  setEditMachineVisibility(false)
  getMachines()
}

//OPENS EDIT WHEN EDIT IS PRESSED
const openEdit = (machine, singleButton) => {
  setEditMachineVisibility(true)
  setMach(machine)
  setSingleButton(singleButton)
}


//UPDATES FILTER WHEN A NEW TYPE OF MACHINE IS ADDED
useEffect(() => {
  const newCheckedStates = uniqueMachineTypes.reduce((acc, type) => ({ ...acc, [type]: true }), {});
  setCheckedStates(newCheckedStates);
}, [uniqueMachineTypes]);

//SETS UNIQUE MACHINE TYPES FOR FILTER WHEN MACHINES IS UPDATED
useEffect(() => {
  const types = machines.map(machine => machine.machine_type).filter((value, index, self) => self.indexOf(value) === index);
  setUniqueMachineTypes(types);
}, [machines])


if (isLoading) { //IF CALLS ARE STILL FETCHING DATA 
  return <div>Loading...</div>;
}
    return (    //IF DATA IS LOADED
      <Fragment >
        
        {/* BACKGROUND IMAGE */}
      <div style={{ margin: "0", padding: "0", position: 'absolute', backgroundImage: `url(http://COR1LTINTS9CG:5000/Image/${Loc.loc_name}.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'top center', minHeight: '140vh', minWidth: '100%'}}>;

      {/* MACHINES DROPDOWN */}
        <h1 style={{ backgroundColor: 'none', color: 'white', position: 'absolute', left:'7%', top: "6.75%" ,zIndex:5000, fontSize: '20pt' }}>
        <MachNavbar style={{position:"absolute", zIndex:1}}  onSelectItem = {handleSelectedItem} Loc={Loc} />
      </h1>

        {/* LOCATION NAME*/}
    <h1 style={{
      color: "white", position: 'absolute', /* Fixed positioning */ top: '0', /* Aligns the top edge of the header with the top edge of the viewport */ width: '100%', /* Ensures the header spans the full width of the viewport */ backgroundColor: '#000080', /* Optional: Adds a background color to the header */ padding: '1em', /* Optional: Adds padding around the header content */ textAlign: 'center' /* Centers the text horizontally */}}>
      {Loc.loc_name}
    </h1>

    {/* LOGO */}
    <img type="button"style={{position: "absolute", right: "0%", border: "solid black", top: '.2%'}} onClick={redirectToWebsite} src="http://COR1LTINTS9CG:5000/Image/logo.png"/>


{/* MACHINE DROPDOWN COMPONENTS */}
{/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

{/* ADD MACHINE */}
{addMachineVis && <AddMachine Loc={Loc} onUpdate={handleMachineUpdate} />} 
{/* EDIT MACHINE */}
{editMachineVisibility && <EditMachButton button ={singleButton} machine={singleMachine} onUpdate={closeEdit} />}
{/* FILTERS */}
{FilterVisibility && uniqueMachineTypes.length > 0 && uniqueMachineTypes.map((type , index) => (
    <div key={type} >
                {/* CHECKBOX BACKGROUND */}
                {<div style={{backgroundColor:"white", border: 'solid black', width: '20%', height:`${uniqueMachineTypes.length * 2 + 5}%`,  position:"absolute", top: '11%', left:'1%', display: 'flex', flexDirection: 'column',  alignItems: 'center', boxSizing: 'border-box', zIndex: 1005 }}> 
                  <h3>Filters</h3>
                  {/* CLOSE BUTTON */}
                    <button style={{height: '15%', position: 'absolute', alignItems: 'center', bottom: 0, cursor: 'pointer', marginBottom: '5%', display: 'flex', alignItems: 'center',  justifyContent: 'center', zIndex: 1005 }} className="btn btn-danger" onClick={() => closeFilter()}>Close</button>
          </div>} 
        {/* CHECKBOXES */}
      {<CheckBox index ={index} label={type} checked={checkedStates[type]} onChange={(isChecked) => handleCheckboxChange(type, isChecked)}/>}
    </div>
    ))}


{/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */}


      {/* LOADS MACHINE POPUP AND BUTTON LOCATIONS */}
      {buttons.map((button) => {
        //GRAB THE MACHINE THAT MATCHES THE BUTTON
        const machine = (machines.filter(mach => mach.machine_id == button.machine_id))
        if(machine.length > 0){ //MAKES SURE MACHINES IS LOADED BEFORE TRYING TO GRAB DATA
          
          //GRAB WHETHER THE MACHINE IS CHECKED IN THE FILTERS OR NOT
          const type = machine[0].machine_type
          const isChecked = checkedStates[type] || false;
      
              if (isChecked) {
                
                return (
                  <>
                    {/* IF THE WORKSTATION ID IS NOT 0 THEN IT IS APART OF A WORKSTATION */}
                    {machine[0].workstation_id !== '0'?(<>
                      {/* MAKES SURE TO ONLY LOAD THE WORKSTATION IF ITS THE WORKSTATION AND NOT IN THE WORKSTATION */}
                      {machine[0].machine_type.includes("Work")?(
                      <Workstation wrkId = {machine[0].workstation_id} machines = {machines} button = {button} onUpdate={handleMachineUpdate}/>
                      
                      ):(null)}</>
                  ) : (
                    /* POPUP FOR BUTTONS */
                    <Popup style={{ borderWidth: '50%',   borderColor: 'black',  borderRadius: '500px', padding: '10px', zIndex: 1000, background: "black"}}  
                      key={machine[0].machine_id} trigger={ 
                        //BUTTON THAT TRIGGERS THE POPUP
                        <button style={{ position: 'absolute', top: `${parseInt(button.topnum, 10)+ .6 }%`, left: `${button.leftnum}%`, rotate: `${button.rotation}deg`,  backgroundColor: "blue", color: "white", zIndex: 999}}>
                          {machine? machine[0].machine_type : "Not enough machines"}
                        </button>} 
                      position="bottom center" >
                        
                        <div style = {{position:"relative", height: '100%', width: '100%'}}>
                          {machine? (
                            //POPUP INFO
                            <>
                                  ID: {machine[0].machine_id} <br />
                                  Type: {machine[0].machine_type} <br />
                                  IP: {machine[0].machine_ip} <br />
                                  <img style = {{width: "100%", height: "100%", objectFit: "cover", display: "block", margin: "0", padding: "0"}} 
                                  src={`http://COR1LTINTS9CG:5000/Image/${machine[0].img_url}`} alt={`${machine[0].machine_type}`} /> <br /> 
                                  <button style={{alignContent:'center', position:"relative", left:'10%'}} type="button" class="btn btn-warning" onClick={() => openEdit(machine[0], button)}>Edit</button>
                                  <DeleteMachine style={{alignContent:'center', position:"relative", left:'60%'}} type="button" machine={machine[0]} button={button} onUpdate={handleMachineUpdate}/>  
                                         
                                </>
                          ) : (
                            <p>No machine found.</p>
                          )}
                        </div>
                </Popup>
          )};
          </>
        )}
  }})}
      </div>
    </Fragment>
  );
};

export default PlantMap;