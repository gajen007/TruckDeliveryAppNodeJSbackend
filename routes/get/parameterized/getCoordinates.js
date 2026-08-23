var express = require('express');
var router = express.Router();
const db = require('../../../db/db_connection');

router.get('/', async(req, res, next)=>{
    const reqQuery = req.query;
    let query="SELECT * FROM truck_addresses WHERE address LIKE '"+decodeURI(reqQuery.addressText)+"%'";
    try {
        const results = await db.executeQuery(query);
        res.status(200).json({addresses:results});
    } catch (error) {
        console.error('Error while fetching:', error);
        res.status(500).json({ message: 'Error while fetching' });
    }
});

module.exports = router;
