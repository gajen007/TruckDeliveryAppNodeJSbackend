var express = require('express');
var md5 = require('md5');
var router = express.Router();
const db = require('../../db/db_connection');
const getUser = require('../../functions/getData/getUserFromEmailAndType')

router.post('/', async (req, res, next) =>{
  const reqBody = req.body;
  const client = await getUser.getUserFromEmailAndType(reqBody.clientEmail,"client");
    let insertOrderQuery="INSERT INTO truck_orders(clientID, itemsDescription, departFrom, departFromLatitude, departFromLongitude, destination, destinationLatitude, destinationLongitude, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)";
    try {
        const orderInsertResult = await db.executeQuery(insertOrderQuery,[client.id, reqBody.itemsDescription, reqBody.departFrom, reqBody.departFromLatitude, reqBody.departFromLongitude, reqBody.destination, reqBody.destinationLatitude, reqBody.destinationLongitude, new Date(),new Date()]);
        if (orderInsertResult.affectedRows > 0) {
            res.status(200).json({result:true,message:"Order placed successfully!"});
        }
        else{ res.status(200).json({result:false,message:"Unable to insert new User !"}); }
        
    } catch (error) {
        console.error('Error while insert the new user:', error);
        res.status(500).json({ message: 'Error while fetching' });
    }

});

module.exports = router;