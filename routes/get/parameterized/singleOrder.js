var express = require('express');
var router = express.Router();
const db = require('../../../db/db_connection');

router.get('/', async(req, res, next)=>{
    const reqBody = req.query;
    let query="SELECT o.id, o.clientID, o.truckID, o.driverID, o.itemsDescription, o.created_at, o.departFrom, o.departFromLatitude, o.departFromLongitude, o.departedAt, o.destination, o.destinationLatitude, o.destinationLongitude, o.reachedAt, o.status as orderStatus, o.remarks, u.fullName, u.userEmail, u.contactNumber FROM truck_orders o JOIN truck_users u ON u.id=o.clientID WHERE o.id=?";
    try {
        const result = await db.executeQuery(query,[reqBody.orderID]);
        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error while fetching:', error);
        res.status(500).json({ message: 'Error while fetching' });
    }
});

module.exports = router;