var express = require('express');
var router = express.Router();
const db = require('../../../db/db_connection');

router.get('/', async(req, res, next)=>{
    let query="SELECT u.id, u.fullName, u.contactNumber, u.userEmail, u.created_at, u.updated_at FROM truck_users u JOIN truck_clients c ON c.clientID=u.id";
    try {
        const results = await db.executeQuery(query);
        res.status(200).json({clients:results});
    } catch (error) {
        console.error('Error while fetching:', error);
        res.status(500).json({ message: 'Error while fetching' });
    }
});

module.exports = router;

/*
"ordersCount" for each client ?
*/
