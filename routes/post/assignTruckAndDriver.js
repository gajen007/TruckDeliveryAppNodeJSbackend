var express = require('express');
var md5 = require('md5');
var router = express.Router();
const db = require('../../db/db_connection');

router.post('/', async (req, res, next) =>{
  const reqBody = req.body;
    try {
        let assignTruckDriverQuery = "UPDATE truck_orders SET driverID=?, truckID=?, status='assigned' WHERE id=?";
        const orderUpdateResult = await db.executeQuery(assignTruckDriverQuery,[reqBody.driverID,reqBody.truckID,reqBody.orderID]);
            if (orderUpdateResult.affectedRows > 0) {
                res.status(200).json({result:true,message:"Order Assigned"});
            }
            else{ res.status(200).json({result:false,message:"Unable to assign Order! Please try again!"}); }
    } catch (error) {
        console.error('Error while insert the new user:', error);
        res.status(500).json({ message: 'Error while UPDATE order!' });
    }
});

module.exports = router;