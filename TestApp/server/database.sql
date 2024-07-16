-- Create a new database called 'Locations;

CREATE DATABASE Steel;


Create table Locations(
    Loc_Id Serial Primary Key,
    Loc_Name VARCHAR(30)
);



Create table Machines(
    Machine_Id integer,
    Machine_Type VARCHAR(30),
    Machine_IP VARCHAR(25),
    Machine_Loc VARCHAR(2),
    PRIMARY KEY (Machine_Id, Machine_Loc)
);



Create table Buttons(
    Machine_Id VARCHAR(3),
    LocationNum VARCHAR(3),
    TopNum VARCHAR(3),
    LeftNum VARCHAR(3),
    Rotation VARCHAR(3),
    primary key (Machine_Id, LocationNum)
    
);


UPDATE Buttons
SET leftnum = '42', topnum ='40'
where machine_id = '2' AND LocationNum = '1';

INSERT 
INSERT INTO Buttons (Machine_Id, LocationNum, TopNum, LeftNum, Rotation) VALUES('8', '1', '75', '25', '0') ;



INSERT INTO machines (Machine_Id, Machine_Type, Machine_IP, Machine_Loc) VALUES('1', '0.0.1.69', 'TypeWriter', '3');


ALTER TABLE machines
ADD PRIMARY KEY(Machine_id, "locNum");


INSERT INTO machines (Machine_Id, Machine_Type, Machine_IP, Machine_Loc) VALUES ('1', 'Fax', '0.0.1.75', '1');

ALTER TABLE machines
ADD machine_loc INTEGER DEFAULT 1;



INSERT INTO machines (Machine_Id, Machine_Type, Machine_IP, Machine_Loc) VALUES('8', 'Printer', '0.0.1.79' , '1');


INSERT INTO Machines (machine_id, machine_type, machine_ip, machine_loc, workstation_id)
VALUES ('7', 'Work Station', '1.2.3.4', '1', '1');
INSERT INTO Buttons (Machine_Id, LocationNum, TopNum, LeftNum, Rotation) VALUES('7', '1', '90', '90', '0') ;



INSERT INTO Machines (machine_id, machine_type, machine_ip, machine_loc, workstation_id)
VALUES ('17', 'Calculator', '1.2.3.4', '1', '1');


update  buttons set topnum = '25', leftnum = '25' where machine_id = '7';


CREATE TABLE machineImg (
    Machine_Id VARCHAR(3),
    Machine_Loc VARCHAR(3),
    Machine_Img BYTEA,
    PRIMARY KEY (Machine_Id, Machine_Loc)
);