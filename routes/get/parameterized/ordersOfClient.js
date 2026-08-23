var express = require('express');
var router = express.Router();
const db = require('../../../db/db_connection');
const getUser = require('../../../functions/getData/getUserFromEmailAndType')

router.get('/', async(req, res, next)=>{
    const reqBody = req.query;
    const client = await getUser.getUserFromEmailAndType(reqBody.clientEmail,"client");
    let query="SELECT * FROM truck_orders WHERE clientID=?";
    try {
        const results = await db.executeQuery(query,[client.id]);
        res.status(200).json({ordersOfClient:results});
    } catch (error) {
        console.error('Error while fetching:', error);
        res.status(500).json({ message: 'Error while fetching' });
    }
});

module.exports = router;
