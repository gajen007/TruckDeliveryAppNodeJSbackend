// db.js
const mysql = require('mysql2/promise');

// Configure your database connection
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, // Whether the pool should wait for connections to become available
    connectionLimit: 10,     // Max number of connections in the pool
    queueLimit: 0            // No limit on the number of requests in the queue
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Function to get a connection from the pool
async function getConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Got a connection from the pool.');
        return connection;
    } catch (error) {
        console.error('Error getting connection from pool:', error.message);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

// Function to execute queries
async function executeQuery(sql, params) {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('Error executing query:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release(); // Release the connection back to the pool
            console.log('Connection released.');
        }
    }
}

// Export the functions
module.exports = {
    getConnection, // If you need direct connection management (e.g., for transactions)
    executeQuery   // For simple query execution
};
