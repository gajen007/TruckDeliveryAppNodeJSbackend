var express = require('express');
var router = express.Router();
const db = require('../../../db/db_connection');
const getUser = require('../../../functions/getData/getUserFromEmailAndType')

router.get('/', async(req, res, next)=>{
    const reqBody = req.query;
    const driver = await getUser.getUserFromEmailAndType(reqBody.driverEmail,"driver");
    let query="SELECT * FROM truck_orders WHERE driverID=?";
    try {
        const results = await db.executeQuery(query,[driver.id]);
        res.status(200).json({ordersForDriver:results});
    } catch (error) {
        console.error('Error while fetching:', error);
        res.status(500).json({ message: 'Error while fetching' });
    }
});

module.exports = router;
