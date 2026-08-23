var express = require('express');
var router = express.Router();
const db = require('../../../db/db_connection');

router.get('/', async(req, res, next)=>{
    let query="SELECT o.id, o.clientID, o.truckID, o.driverID, o.itemsDescription, o.created_at, o.departFrom, o.departFromLatitude, o.departFromLongitude, o.departedAt, o.destination, o.destinationLatitude, o.destinationLongitude, o.reachedAt, o.status as orderStatus, o.remarks, u.fullName, u.userEmail, u.contactNumber FROM truck_orders o JOIN truck_users u ON u.id=o.clientID";
    try {
        const results = await db.executeQuery(query);
        res.status(200).json({allOrders:results});
    } catch (error) {
        console.error('Error while fetching:', error);
        res.status(500).json({ message: 'Error while fetching' });
    }
});

module.exports = router;