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

const destinations = (serial) => 
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
            const query = 'DELETE FROM packages WHERE DestinationId = ?';
            
            connection.query(query, [serial], (queryError, results) => 
            {
                connection.release();

                if (queryError) 
                {
                    reject({'returncode': 1, 'message': queryError, 'output': []});
                    return;
                }

                const query = 'DELETE FROM accomodations WHERE DestinationId = ?';
                connection.query(query, [serial], (queryError, results) => 
                {
                    connection.release();

                    if (queryError) 
                    {
                        reject({'returncode': 1, 'message': queryError, 'output': []});
                        return;
                    }
                    const query = 'DELETE FROM activities WHERE DestinationId = ?';
                    connection.query(query, [serial], (queryError, results) => 
                    {
                        connection.release();

                        if (queryError) 
                        {
                            reject({'returncode': 1, 'message': queryError, 'output': []});
                            return;
                        }
                        const query = 'DELETE FROM destinations WHERE Id = ?';
                        connection.query(query, [serial], (queryError, results) => 
                        {
                            connection.release();

                            if (queryError) 
                            {
                                reject({'returncode': 1, 'message': queryError, 'output': []});
                                return;
                            }
                            resolve({'returncode': 0, 'message': 'Successful', 'output': results});
                        });
                    });
                });
            });
        });
    });
};


module.exports = { destinations }
// module.exports = { destinations, accomodations, activities, packages, algorithm }