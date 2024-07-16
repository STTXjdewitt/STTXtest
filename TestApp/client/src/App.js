import React, { Fragment } from "react"
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


//Components

import InputLoc from "./components/InputLoc";
import ListLoc from "./components/ListLoc";
import PlantMap from "./components/PlantMap";
import Navbar from "./components/NavBar";
import EditButtonLoc from "./components/EditButtonLoc";
import AddButton from "./components/AddButton";



//App
function App() {

  


  return (
    <Fragment>  
      <Router>
      


      <div  style={{ float: 'left',
    display: 'flex',
    alignItems: 'flex-start', // Aligns children to the start of the cross axis
    justifyContent: 'flex-start', // Aligns children along the vertical axis
    height: '100vh', // Takes up the full viewport height
    width: '100%', // Takes up the full viewport width
    paddingLeft: '0', // Removes any default padding
    boxSizing: 'border-box' // Ensures padding doesn't affect the total width
  }}className="container">
        <Navbar /> 
      
        <Routes >
          <Route path="/AddLocation" element={<InputLoc />} />
          <Route path="/Locations" element={<ListLoc />} />
          <Route path="/PlantMap" element={<PlantMap />}/>
          <Route path="/EditButtonLoc" element={<EditButtonLoc />}/>
          <Route path="/AddButton" element={<AddButton />}/>
        </Routes>
      </div>
      </Router>

      
    </Fragment>
  );
}

export default App;
