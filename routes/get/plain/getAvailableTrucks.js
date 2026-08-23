var express = require('express');
var router = express.Router();
const db = require('../../../db/db_connection');

router.get('/', async(req, res, next)=>{
    let query="SELECT t.id, t.plateNumber, t.truckName, t.description, t.imageURL FROM truck_trucks t";
    try {
        const results = await db.executeQuery(query);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error while fetching:', error);
        res.status(500).json({ message: 'Error while fetching' });
    }
});

module.exports = router;