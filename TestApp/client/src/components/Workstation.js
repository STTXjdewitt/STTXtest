import React, { useState } from 'react';
import AddWorkMach from './AddWorkMach';
import EditWorkMachine from './EditWorkMachine';
import EditMachButton from './EditMachButton';


const Workstation = ({ wrkId, machines, button, onUpdate}) => {

    //VARIABLES
    const filteredMachines = machines.filter(mach => mach.workstation_id === wrkId);                                  //Filter Machines That have the Same Workstation Id
    const wrkMachine= machines.filter(mach => mach.machine_type.includes("Work") && mach.workstation_id === wrkId);   //Filter For Which one is the workstation
    const [workStationVis, setWorkStationVis] = useState(false)                                                       //Workstation Visibilty Variable  
    const [EditWrkMachineVis, setEditWrkMachineVis] = useState(false)                                                 //Edit Workstation Machine Visibilty Variable
    const [machine, setMachine] = useState([])                                                                        //Single Machine For Editing
    const [editWrkStationVis, setEditWrkStationVis] = useState(false)                                                 //Edit Workstation  Visibility Variable


//Open Workstation
const openWrk = () => {
  setWorkStationVis(!workStationVis)
}

//Open Workstation Edit
const openEditWrkStation = () => {
  
  setEditWrkStationVis(!editWrkStationVis)
}


//Open Workstation Machine Edit
const openEditWrkMachine = (machine) => {
  setMachine(machine)
  setEditWrkMachineVis(!EditWrkMachineVis)

}

//Close the Workstaion 
const exit = () => {
setWorkStationVis(false)


}

    return (
      <div>
            <div style={{width: '50%', top: "25%", height: '100%', left: "25%", position: "absolute"}}>

              {/*Edit Workstation*/}
              {editWrkStationVis && <EditMachButton button ={button} mach={wrkMachine[0]} onUpdate={openEditWrkStation} />}

              {/*Edit Workstation  Machine*/}
              {EditWrkMachineVis && <EditWorkMachine mach={machine} onUpdate={openEditWrkMachine} />}

              {/*Workstation Machines Displayed*/}
              {workStationVis ? (<div style={{position:"absolute", width: '100%', height: `${15 * filteredMachines.length }%`, top: "0%", left:'0%', backgroundColor:"white", border: 'solid black', zIndex: 1000}}>
                    <table style={{width: '100%', height: '90%', position: "absolute", zIndex: 1001}}>
                              {/*Table Titles*/}
                              <thead>
                                    <h4 style={{position:"absolute", left: "38%" , whiteSpace: 'nowrap', textAlign: 'center'}}>Work Station: {wrkId}</h4><br/><br />
                                    <tr style={{ fontSize: "1.7em", borderBottom: "2px solid black"}}>
                                      <th style={{ width: "5%", padding:"0 5%"}} scope="col">ID</th>
                                      <th style={{ width: "10%" }} scope="col">Type</th>
                                      <th style={{ width: "10%" }} scope="col">IP</th>
                                      <th style={{ width: "15%" }} scope="col">Image</th>
                                    </tr>
                            </thead>
                            {filteredMachines.map((mach) => (
                              
                              !mach.machine_type.includes("Work") //Displays Only Workstation Machines
                              ? (
                                  <>
                                  <tr style={{borderBottom:"solid black"}}>
                                      <td style={{ width: "5%",padding: "0% 5%"}} scope="col">{mach.machine_id}</td> 
                                      
                                      <td style={{ width: "10%", padding: "0% 0%"}} scope="col">{mach.machine_type}</td>
                                      
                                      <td style={{ width: "10%",  padding: "0% 0%"}} scope="col">{mach.machine_ip}</td> 
                                      
                                      <td style={{ width: "10%", padding: "0% 0%"}} scope="col"><button
                                      style={{background: "none", border: "none"}}
                                      
                                      onClick ={() =>openEditWrkMachine(mach)}><img style = {{width: "50%", // Make the image fill the entire button width
                                          height: "50%", // Make the image fill the entire button height
                                          objectFit: "cover", // Ensure the image covers the area without distortion
                                          display: "block", // Remove bottom space under the image
                                          margin: "0", // Remove default margin
                                          padding: "0",
                                        border: "solid black"}}
                                          src={`http://COR1LTINTS9CG:5000/Image/${mach.img_url}`} alt={`${mach.machine_type}`} /></button></td> 
                                  </tr>
                                    </>):null
                            ))}
                    </table>

                {/*Add Machine To Workstation*/}
                <AddWorkMach wrk_id = {wrkId} loc_num = {machines[0].machine_loc} onUpdate={onUpdate}/>

                {/*Edit Workstation*/}
                <button style={{height: '8%', display: 'flex', position: 'absolute', bottom: '0%', alignItems: 'center', left: '45%',cursor: 'pointer', Top: '10%',marginBottom: '.5%', zIndex:1000 }} class="btn btn-warning" type="button"  onClick={() =>openEditWrkStation()}>Edit</button>
                
                {/*Close*/}
                <button style={{height: '8%', display: 'flex', position: 'absolute', bottom: '0%', alignItems: 'center', left: '55%',cursor: 'pointer', Top: '10%',marginBottom: '.5%', zIndex:1000 }} class="btn btn-danger" onClick={exit}>Close</button>
                
                </div> ): null}</div>
            


              {filteredMachines.map((mach) => (
                <tr key={mach.machine_id}>
                  {/* Workstation Button Location */}
                  {mach.machine_type.includes("Work")? (<button   style={{position: 'absolute',top: `${button.topnum}%`,left: `${button.leftnum}%`,rotate: `${button.rotation}%`, backgroundColor: "blue",color: "white",whiteSpace: 'nowrap',zIndex:999}}
                        onClick={() => openWrk()}
                        >{mach.machine_type + ' ' + mach.workstation_id}</button>
                      ) : null }
                </tr>
              ))}
      </div>
    );
  };
  

export default Workstation;