const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express()

app.use(cors());
app.use(express.json());

// DATABASE CONNECTION AREA
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'parkingLots',
});

app.get('/', (req,res) => {
    res.send("API is running")
})

app.get('/get', (req, res) => {
    // THIS GETS THE INFORMATION IF YOU WANT DIFFERENT INFO CHANGE THE SQL QUERY
    const SQL = "SELECT SUM(CurrentSpacesFaculty+CurrentSpacesStudent+CurrentSpacesHandicapped+CurrentSpacesVisitor) AS total FROM ParkingLot2 GROUP BY Datetime;"
    const SQL2 = "SELECT cast(Datetime as time) AS time from ParkingLot2;"
    const SQL3 = "SELECT cast(Datetime as time) AS time, SUM(CurrentSpacesFaculty+CurrentSpacesStudent+CurrentSpacesHandicapped+CurrentSpacesVisitor) AS total FROM ParkingLot2 GROUP BY Datetime;"
    db.query(SQL3,(err, result) =>{
        res.send(result);
    })
})

app.get('/current', (req, res) => {
    // THIS GETS THE INFORMATION IF YOU WANT DIFFERENT INFO CHANGE THE SQL QUERY
    const SQL = "SELECT CurrentSpacesFaculty, CurrentSpacesStudent, CurrentSpacesHandicapped, CurrentSpacesVisitor FROM ParkingLot2;"
    db.query(SQL,(err, result) =>{
        res.send(result);
    })
})

module.exports = app
//app.listen(3001, () => console.log("server started on port 3001"))