var express = require('express');
var md5 = require('md5');
var router = express.Router();
const db = require('../../db/db_connection');

router.post('/', async (req, res, next) =>{
  const reqBody = req.body;
        let toBeUpdated="accepted";
        let msgToDriver="Thanks for Accepting! Please pickup the stuff!";
        if (reqBody.response==="decline") { toBeUpdated="declined"; msgToDriver="Order denied! Your deniel will affect the accepting rate!"; }
    try {
        let driverResponseQuery = "UPDATE truck_orders SET status=? WHERE id=?";
        const orderUpdateResult = await db.executeQuery(driverResponseQuery,[toBeUpdated,reqBody.orderID]);
            if (orderUpdateResult.affectedRows > 0) {
                res.status(200).json({result:true,message:msgToDriver});
            }
            else{ res.status(200).json({result:false,message:"Unable to response for Order! Please try again!"}); }
    } catch (error) {
        console.error('Error while insert the new user:', error);
        res.status(500).json({ message: 'Error while UPDATE order!' });
    }
});

module.exports = router;