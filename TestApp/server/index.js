const multer = require('multer');
const express = require("express");
const app = express();
const cors  = require("cors")
const pool = require("./db")

//Middleware

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


//ROUTES


{/*---------------------------------------------------------------------ADD IMAGE-------------------------------------------------------------------------------------------------------- */}


//Add Image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/Image/');
    },
    filename: (req, file, cb) => {
      cb(null,file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  

  app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    
    res.send(`File uploaded successfully!`);
  });



{/*-----------------------------------------------------------------------POST------------------------------------------------------------------------------------------------------ */}

//Create New Location
app.post("/Locations", async(req, res) => {
    try {
        
        const { loc_num, loc_name } = req.body;
        const newLoc = await pool.query("INSERT INTO Locations (loc_num, loc_name) VALUES($1, $2)  RETURNING *", [loc_num, loc_name])

        res.json(newLoc.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//Create New Machine
app.post("/Machines", async(req, res) => {
    
    try {
        
        const { machid, machtype, machip, machloc, workstation_id, file_name } = req.body;
        
        const newMach = await pool.query("INSERT INTO Machines (Machine_Id, Machine_Type, Machine_IP, Machine_Loc, workstation_id, img_url ) VALUES($1, $2, $3, $4, $5, $6)  RETURNING *", [machid, machtype, machip, machloc, workstation_id, file_name])

        res.json(newMach.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//Create New Button
app.post("/Buttons", async(req, res) => {
    try {
        const { rot, top, left, machid, machloc } = req.body;
        const newButton = await pool.query("INSERT INTO Buttons (Machine_Id, LocationNum, TopNum, LeftNum, Rotation) VALUES($1, $2, $3, $4, $5)   RETURNING *", [machid, machloc, top, left, rot])

        res.json(newButton.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})




{/*-------------------------------------------------------------------------GET-------------------------------------------------------------------------------------------------- */}

//Get all locations
app.get("/Locations", async(req, res) => {
    try {
        
        const allLoc = await pool.query("SELECT * FROM Locations ORDER BY loc_num")

        res.json(allLoc.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//Get Location by name
app.get("/Locations/:name", async(req, res) => {
    try {
        
        const { name } = req.params
        
        const Loc = await pool.query("SELECT * FROM Locations WHERE loc_name = $1", [name])

        res.json(Loc.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})



//Get Location by ID
app.get("/Locations/:id", async(req, res) => {
    try {
       
        const { id } = req.params
        
        const Loc = await pool.query("SELECT * FROM Locations WHERE loc_id = $1", [id])

        res.json(Loc.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//Get all Machines
app.get("/Machines", async(req, res) => {
    try {
        
        const allMac = await pool.query("SELECT * FROM Machines")

        res.json(allMac.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//Get Machines by Loc#
app.get("/Machines/:num", async(req, res) => {
    try {
        
        const { num } = req.params
        
        const MachNum = await pool.query("SELECT * FROM Machines WHERE Machine_Loc = $1 ORDER BY machine_id" , [num])

        res.json(MachNum.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//Get All Machines that match ID and Loc #
app.get("/Mach/:num/:id", async(req, res) => {
    try {
    
        const { num, id } = req.params; // Destructure num and id from query params
    
    

        const MachNum = await pool.query("SELECT * FROM Machines WHERE Machine_Loc = $1 AND Machine_Id = $2 ORDER BY machine_id" , [num, id])

        res.json(MachNum.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//Get All Buttons
app.get("/Buttons", async(req, res) => {
    try {
        
        const allButtons = await pool.query("SELECT * FROM Buttons ORDER BY (machine_id)")

        res.json(allButtons.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//Get all buttons that match loc #
app.get("/Buttons/:num", async(req, res) => {
    try {
        const { num } = req.params
        
        const locButtons = await pool.query("SELECT * FROM Buttons WHERE locationnum = $1  ORDER BY CAST(machine_id AS INTEGER)", [num])

        res.json(locButtons.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//Get all buttons that match id and loc# in the machines table
app.get("/ButtonsPos/:Loc", async(req, res) => {
    try {
        const { Loc } = req.params
        
        const locButtons = await pool.query("SELECT * FROM machines INNER JOIN buttons ON buttons.locationnum = CAST(machines.machine_loc AS VARCHAR) AND buttons.machine_id = CAST(machines.machine_id AS VARCHAR) WHERE machines.machine_loc = $1;", [Loc])

        res.json(locButtons.rows)
    } catch (err) {
        console.error(err.message)
    }
})




{/*---------------------------------------------------------------------------UPDATE-------------------------------------------------------------------------------------------------- */}


//Update Locations name and ID
app.put("/Locations/:id", async(req, res) => {
    try {
       
        const { id } = req.params
        const { loc_name } = req.body;
        
        const UpdateLoc = await pool.query("UPDATE  Locations SET loc_name = $1 WHERE loc_id = $2", [loc_name, id])

        res.json("Locations Updated")
    } catch (err) {
        console.error(err.message)
    }
})


//Update Machines that match ID and Loc #
app.put("/MachUp/:id", async(req, res) => {
    try {
        
        const { id } = req.params
        const { machid, machtype , machip, machloc, workstation_id, fileName } = req.body;
        
        const UpdateMach = await pool.query("UPDATE Machines SET machine_id = $5, machine_type = $2, machine_ip = $3,  workstation_id = $6, img_url =$7 WHERE machine_id = $1 AND machine_loc = $4", [id, machtype , machip, machloc, machid, workstation_id, fileName])

        res.json("Machine Updated")
    } catch (err) {
        console.error(err.message)
    }
})


//Update All of Button that matches ID and Loc #
app.put("/ButtonUp/:id", async(req, res) => {
    try {
        
        const { id } = req.params
        const { rot, top, left, machloc, machid} = req.body;
        
        const UpdateButton = await pool.query("UPDATE Buttons SET machine_id = $1, rotation = $2,  topnum = $3, leftnum = $4  WHERE machine_id = $6 AND locationnum = $5", [machid, rot, top, left, machloc, id])

        res.json("Button Updated")
    } catch (err) {
        console.error(err.message)
    }
})


//Update All of Button that matches ID and Loc # besides Rotation
app.put("/ButtonUpdate/:id", async(req, res) => {
    try {
        
        const { id } = req.params
        const {top, left, machloc, machid} = req.body;
        
        const UpdateButton = await pool.query("UPDATE Buttons SET machine_id = $1, topnum = $2, leftnum = $3  WHERE machine_id = $5 AND locationnum = $4", [machid, top, left, machloc, id])

        res.json("Button Updated")
    } catch (err) {
        console.error(err.message)
    }
})



{/*-------------------------------------------------------------------------------DELETE---------------------------------------------------------------------------------------------- */}


//Delete Location by ID
app.delete("/Locations/:id", async(req, res) => {
    try {
        
        const { id } = req.params
        const { loc_name } = req.body;
        
        const deleteLoc = await pool.query("DELETE FROM Locations WHERE loc_id = $1", [id])

        res.json("Location Deleted")
    } catch (err) {
        console.error(err.message)
    }
})

//Delete Machine by ID and Loc #
app.delete("/Machines/:id", async(req, res) => {
    try {
        
        const { id } = req.params
        const { machine_loc, machine_id } = req.body;
        
        const deleteMach = await pool.query("DELETE FROM Machines WHERE machine_id = $1 AND machine_loc = $2", [machine_loc, machine_id])
        res.json("Machine Deleted")
    } catch (err) {
        console.error(err.message)
    }
})

//Delete Button by ID and Loc #
app.delete("/Buttons/:id", async(req, res) => {
    try {
        
        const { id } = req.params
        const { locationnum, machine_id } = req.body;
    
        const deleteButton = await pool.query("DELETE FROM Buttons WHERE locationnum = $1 and machine_id = $2", [locationnum, machine_id])

        res.json("Button Deleted")
    } catch (err) {
        console.error(err.message)
    }
})


{/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}



app.listen(5000, () => {
    console.log("server has started on port 5000")
});