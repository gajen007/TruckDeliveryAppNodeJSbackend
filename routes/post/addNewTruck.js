var express = require('express');
var md5 = require('md5');
var router = express.Router();
const db = require('../../db/db_connection');
const getTruck = require('../../functions/getData/getTruckFromPlateNumber')

router.post('/', async (req, res, next) =>{
  const reqBody = req.body;
  const truck = await getTruck.getTruckFromPlateNumber(reqBody.plateNumber,"client");
  if (truck!==undefined) {
    res.status(200).json({result:false,message:"This Plate-Number is already existed!"});
  }
  else{
        let addTruckQuery="INSERT INTO truck_trucks (truckName, plateNumber, description, created_at, updated_at) VALUES (?,?,?,?,?)";
    try {
        const addTruckResult = await db.executeQuery(addTruckQuery,[reqBody.truckName, reqBody.plateNumber,reqBody.description, new Date(), new Date()]);
        if (addTruckResult.affectedRows > 0) {
            res.status(200).json({result:true,message:"Truck added successfully!"});
        }
        else{ res.status(200).json({result:false,message:"Unable to insert new Truck !"}); }
        
    } catch (error) {
        console.error('Error while insert the new Truck:', error);
        res.status(500).json({ message: 'Error while fetching' });
    }
  }
});

module.exports = router;