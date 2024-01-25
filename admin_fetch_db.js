// <---- Required Libraries ---->
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'ADVENTOUR',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});

const destinations = () =>
{
    return new Promise((resolve, reject) => 
    {
        pool.getConnection((err, connection) => 
        {
            if (err) 
            {
              reject({'returncode': 1, 'message': err, 'output': []});
              return;
            }
            const query = 'SELECT Id, Name FROM destinations;';
            connection.query(query, (queryError, results) => {
            connection.release();
    
            if (queryError) {
                reject({'returncode': 1, 'message': queryError, 'output': []});
                return;
            }
    
            if (results.length > 0) 
            {
                // Destinations Fetched
                resolve({'returncode': 0, 'message': 'Fetched destinations', 'output': results});
            } 
            else 
            {
                // No Destinations are available
                reject({'returncode': 1, 'message': 'No destinations found', 'output': []});
            }
            });
        });
    });
};

const activities = () =>
{
    return new Promise((resolve, reject) => 
    {
        pool.getConnection((err, connection) => 
        {
            if (err) 
            {
              reject({'returncode': 1, 'message': err, 'output': []});
              return;
            }
            const query = 'SELECT Id, Name FROM activities;';
            connection.query(query, (queryError, results) => {
            connection.release();
    
            if (queryError) {
                reject({'returncode': 1, 'message': queryError, 'output': []});
                return;
            }
    
            if (results.length > 0) 
            {
                // Destinations Fetched
                resolve({'returncode': 0, 'message': 'Fetched activities', 'output': results});
            } 
            else 
            {
                // No Destinations are available
                reject({'returncode': 1, 'message': 'No activities found', 'output': []});
            }
            });
        });
    });
};

const accomodations = () =>
{
    return new Promise((resolve, reject) => 
    {
        pool.getConnection((err, connection) => 
        {
            if (err) 
            {
              reject({'returncode': 1, 'message': err, 'output': []});
              return;
            }
            const query = 'SELECT Id, Name FROM accomodations;';
            connection.query(query, (queryError, results) => {
            connection.release();
    
            if (queryError) {
                reject({'returncode': 1, 'message': queryError, 'output': []});
                return;
            }
    
            if (results.length > 0) 
            {
                // Destinations Fetched
                resolve({'returncode': 0, 'message': 'Fetched accomodations', 'output': results});
            } 
            else 
            {
                // No Destinations are available
                reject({'returncode': 1, 'message': 'No accomodations found', 'output': []});
            }
            });
        });
    });
};

const packages = () =>
{
    return new Promise((resolve, reject) => 
    {
        pool.getConnection((err, connection) => 
        {
            if (err) 
            {
              reject({'returncode': 1, 'message': err, 'output': []});
              return;
            }
            const query = 'SELECT Id, Name FROM packages;';
            connection.query(query, (queryError, results) => {
            connection.release();
    
            if (queryError) {
                reject({'returncode': 1, 'message': queryError, 'output': []});
                return;
            }
    
            if (results.length > 0) 
            {
                // Destinations Fetched
                resolve({'returncode': 0, 'message': 'Fetched accomodations', 'output': results});
            } 
            else 
            {
                // No Destinations are available
                reject({'returncode': 1, 'message': 'No accomodations found', 'output': []});
            }
            });
        });
    });
};

module.exports = { destinations, accomodations, activities, packages };