// <---- Required Libraries ---->
const { response } = require('express');
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

const confirm_booking = (name, check_in, check_out, package_id, package_validity) => 
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

            // Step 1: Retrieve UserId based on UserName
            const selectQuery = 'SELECT Id FROM users WHERE UserName = ?';
            connection.query(selectQuery, [name], (selectError, userResults) => {
                if (selectError)
                {
                    connection.release();
                    reject({ 'returncode': 1, 'message': selectError, 'output': [] });
                    return;
                }

                if (userResults.length === 0) 
                {
                    connection.release();
                    reject({ 'redirect': 'localhost:5000/', 'returncode': 1, 'message': 'User not found', 'output': [] });
                    // reject({ 'returncode': 1, 'message': 'User not found', 'output': [] });
                    return;
                }

                const userId = userResults[0].Id;

                // Step 2: Insert into bookings
                const insertQuery = 'INSERT INTO bookings (PackageId, UserId, CheckIn, CheckOut) VALUES (?, ?, ?, ?)';
                connection.query(insertQuery, [package_id, userId, check_in, check_out, package_validity], (queryError, results) => {
                    connection.release();

                    if (queryError) {
                        reject({'returncode': 1, 'message': queryError, 'output': []});
                        return;
                    }

                    resolve({'returncode': 0, 'message': 'Successful', 'output': results});
                });
            });
        });
    });
};

const booking_info = (packageId) =>
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
            const query = "SELECT * FROM packages p, destinations d WHERE p.Id = ? AND d.Id=p.DestinationId;";
            connection.query(query, [packageId], (queryError, results) => {
            connection.release();
    
            if (queryError) {
                reject({'returncode': 1, 'message': queryError, 'output': []});
                return;
            }
    
            if (results.length > 0) 
            {
                results.forEach((item,index) => {item.PackageID = packageId; })
                resolve({'returncode': 0, 'message': 'Fetched', 'output': results});
            } 
            else 
            {
                // No Destinations are available
                reject({'returncode': 1, 'message': 'No Packages found', 'output': []});
            }
            });
        });
    });
};

module.exports = { confirm_booking, booking_info }