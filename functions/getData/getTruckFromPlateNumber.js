const db = require('../../db/db_connection');

async function getTruckFromPlateNumber(plateNUmber) {
    let query="SELECT * FROM truck_trucks WHERE plateNumber=?";
    try {
        const results = await db.executeQuery(query,[plateNUmber]);
        return results[0];
    } catch (error) {
        console.error('Error while fetching:', error);
        return null;
    }
}

module.exports = {
    getTruckFromPlateNumber
};