// Import necessary modules and components
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import EditLoc from "./EditLoc";

/**
 * A functional component that lists plant locations.
 * Users can filter locations, edit them, delete them, and view them on a map.
 */

var len = 0;            //Used for changing length with Filter

const ListLoc = () => {
    
    // State to hold the list of locations
    const [locations, setLoc] = useState([]);
    // State to hold the filter value entered by the user
    const [filterValue, setFilterValue] = useState("");
    // Hook to programmatically navigate between routes
    const navigate = useNavigate();
   
    // Function to navigate to the home page
    const goToNewPage = async() => {
        navigate('/');
    }

    // Function to delete a location by ID
    const deleteLoc = async(id) => {
        try {
            const deleteResponse = await fetch(`http://COR1LTINTS9CG:5000/Locations/${id}`,{
                method: "DELETE"
            });
            console.log(deleteResponse);
            setLoc(locations.filter(loc => loc.loc_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };


    //REDIRECTS TO STEELTECH WEBSITE
    const redirectToWebsite = () => {
        window.location.href = 'https://www.steeltechnologies.com/'; // Replace with the URL you want to redirect to
      };

    // Function to navigate to the PlantMap page with a location parameter
    const PlantMap = (Loc) => {
        navigate('/PlantMap', { state: { Loc: Loc } });
    };

    // Function to fetch locations from the server
    const getLoc =  async() => {
        try {
            const response = await fetch("http://COR1LTINTS9CG:5000/Locations");
            const jsonData = await response.json();
            setLoc(jsonData);
        } catch (err) {
            console.error(err.message);
        };
    };

    // Effect hook to fetch locations when the component mounts
    useEffect(() => {
        getLoc();
    }, []);

    // Effect hook to filter locations based on the filter value
    useEffect(() => {
        const filteredLocations = locations.filter(location =>
            location.loc_name.toLowerCase().includes(filterValue.toLowerCase())
        );
        if (filterValue.length >= len){
            len = filterValue.length;
        }
        else{
            len = filterValue.length;
            getLoc(); // Refetch locations if the filter value length decreases
        };
        setLoc(filteredLocations);
    }, [filterValue]);

    // Handler for input change to update the filter value
    const filterLocations = (event) => {
        setFilterValue(event.target.value);
    };

    // Rendering the component
    return (
        <Fragment>
            {/* Header and logo */}
            <h1 style={{
                color: "white",
                position: 'absolute',
                top: '0',
                width: '100%',
                backgroundColor: '#000080',
                padding: '1em',
                textAlign: 'center',
                height: "14%"
            }}>Plant Locations</h1>
            <img TYPE="BUTTON" style={{position: "absolute", right: "0%", border: "solid black", top: '.2%'}} onClick={redirectToWebsite} src="http://COR1LTINTS9CG:5000/Image/logo.png"/>
            {/* Input field for filtering locations */}
            <input
                style={{
                    position: "absolute",
                    top: "15%",
                    left: "5%",
                    color: "black",
                    zIndex: "1",
                    background: "white"
                }}
                type="text"
                placeholder="Filter locations..."
                value={filterValue}
                onChange={filterLocations}
            />
            {/* Table to display locations */}
            <table style={{
                color: "black",
                position: 'absolute',
                top: '19%',
                left: '5%',
                width: '65%',
                textAlign: 'center',
                backgroundPosition: 'left center'
            }}>
                {/* Table headers */}
                <thead>
                    <tr style={{fontSize: "1.7em", borderBottom: "2px solid black"}}>
                        <th style={{ width: "1%" }} scope="col">#</th>
                        <th style={{ width: "5%" }} scope="col">Location</th>
                        <th style={{ width: "10%" }} scope="col">Edit</th>
                        <th style={{ width: "10%" }} scope="col">Delete</th>
                        <th style={{ width: "25%", float: "left" }} scope="col">Map</th>
                    </tr>
                </thead>
                {/* Table body */}
                <tbody>
                    {locations.map(loc => (
                        <tr key={loc.loc_id}>
                            <td> {loc.loc_num}</td>
                            <td> {loc.loc_name}</td>
                            <td> <EditLoc loc={loc} /></td>
                            <td> <button className="btn btn-danger" onClick={() => deleteLoc(loc.loc_id)}>Delete</button>  </td>
                            <button style={{
                                width : "25%",
                                height: "25%",
                                background: "none",
                                float: "left"
                            }} onClick={() => PlantMap(loc)}>
                                <img style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                    margin: "0",
                                    padding: "0"
                                }} src={`http://COR1LTINTS9CG:5000/Image/${loc.loc_name}.jpg`} alt={loc.loc_name} />
                            </button>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Back button */}
            <footer>
                <button className="btn btn-dark" onClick={goToNewPage}>Back</button>
            </footer>
        </Fragment>
    );
};

export default ListLoc;
