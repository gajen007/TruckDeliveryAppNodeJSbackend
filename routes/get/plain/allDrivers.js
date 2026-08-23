var express = require('express');
var router = express.Router();
const db = require('../../../db/db_connection');

router.get('/', async(req, res, next)=>{
    let query="SELECT d.driverID, u.fullName as driverName, u.userEmail as driverEmail, u.contactNumber, u.created_at, u.updated_at FROM truck_drivers d JOIN truck_users u ON u.id=d.driverID";
    try {
        const results = await db.executeQuery(query);
        res.status(200).json({drivers:results});
    } catch (error) {
        console.error('Error while fetching:', error);
        res.status(500).json({ message: 'Error while fetching' });
    }
});

module.exports = router;

/*
"ordersCount" for each driver ?
*/
