import React from "react";

/*--------------------------------------------ADD IMAGE-------------------------------------------- */
const AddImage = ({file, setFile}) => {
    //HANDLES WHEN NO FILE IS SELECTED
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
return(  
<input type="file" onChange={handleFileChange} />
)
}

export default AddImage