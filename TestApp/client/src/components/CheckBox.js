
import React from 'react';

const CheckBox = ({index, label, checked, onChange}) => {

    //HANDLES CHECKED BOX AND SENDS IT BACK TO PLANT MAP
    const handleChange = (event) => {
      onChange(event.target.checked); 
    };

    return (
      //CHECK BOXES
      <div style={{top: "15%", zIndex: 1006}}>
        {/* PUSHES EACH CHECK DOWN BELOW THE PREVIOUS BASED ON INDEX */}
          <div style={{ zIndex: 1006, position: "absolute", top: `${index*1.5  + 14}%`, color: 'black', left: "1.5%", textAlign: "left", width: '60%' }}>
            <label style={{ zIndex: 1006, transform: "scale(1.3)" }}>
              <input type="checkbox" checked={checked} onChange={handleChange} />
            </label>
            <span style={{ top: '5%', zIndex: 1006, position: "absolute", width: "50%", textAlign: "left", left: "3%" }}>{label}</span>
          
          </div>
      </div>
    );
  };
  export default CheckBox;