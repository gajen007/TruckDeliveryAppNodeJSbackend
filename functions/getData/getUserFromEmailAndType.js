const db = require('../../db/db_connection');

async function getUserFromEmailAndType(userEmail,userType) {
  var userTypeTableName = "truck_staff";
  var roleColumnName = "staffID";
  if(userType!=="staff"){
    userTypeTableName = "truck_"+userType+"s";
    roleColumnName = userType+"ID";
  }
    let query="SELECT u.id, u.fullName, u.contactNUmber, u.created_at, u.updated_at FROM truck_users u JOIN "+userTypeTableName+" t ON t."+roleColumnName+" = u.id WHERE u.userEmail=?";
    try {
        const results = await db.executeQuery(query,[userEmail]);
        return results[0];
    } catch (error) {
        console.error('Error while fetching:', error);
        return null;
    }
}

module.exports = {
    getUserFromEmailAndType
};