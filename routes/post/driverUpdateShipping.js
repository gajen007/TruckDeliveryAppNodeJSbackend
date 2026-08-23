var express = require('express');
var md5 = require('md5');
var router = express.Router();
const db = require('../../db/db_connection');

router.post('/', async (req, res, next) =>{
  const reqBody = req.body;
        let msgToDriver="";
        let departedAt=new Date();
        let reachedAt=new Date();
        if (reqBody.update==="picked") { 
            msgToDriver="Order picked; Drive safely!";
                    try {
        let driverUpdateShipping = "UPDATE truck_orders SET status=?, departedAt=? WHERE id=?";
        const orderUpdateResult = await db.executeQuery(driverUpdateShipping,["picked",new Date(),reqBody.orderID]);
            if (orderUpdateResult.affectedRows > 0) {
                res.status(200).json({result:true,message:msgToDriver});
            }
            else{ res.status(200).json({result:false,message:"Unable to pick the Order! Please try again!"}); }
        } catch (error) {
            console.error('Error while pick the new user:', error);
            res.status(500).json({ message: 'Error while UPDATE order!' });
        }
        }
        else if (reqBody.update==="completed") {
            msgToDriver="Order Completed! Your payment will be processed soon !";
                    try {
        let driverUpdateShipping = "UPDATE truck_orders SET status=?, reachedAt=? WHERE id=?";
        const orderUpdateResult = await db.executeQuery(driverUpdateShipping,["completed",new Date(),reqBody.orderID]);
            if (orderUpdateResult.affectedRows > 0) {
                res.status(200).json({result:true,message:msgToDriver});
            }
            else{ res.status(200).json({result:false,message:"Unable to drop the Order! Please try again!"}); }
        } catch (error) {
            console.error('Error while insert the new user:', error);
            res.status(500).json({ message: 'Error while UPDATE order!' });
        }
        }
});

module.exports = router;