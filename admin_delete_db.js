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

const accomodations = (serial) => 
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
            const query = 'DELETE FROM packages WHERE AccommodationId = ?';
            
            connection.query(query, [serial], (queryError, results) => 
            {
                connection.release();

                if (queryError) 
                {
                    reject({'returncode': 1, 'message': queryError, 'output': []});
                    return;
                }

                const query = 'DELETE FROM accomodations WHERE Id = ?';
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
};

const activities = (serial) => 
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
            const query = 'DELETE FROM packages WHERE ActivityId = ?';
            
            connection.query(query, [serial], (queryError, results) => 
            {
                connection.release();

                if (queryError) 
                {
                    reject({'returncode': 1, 'message': queryError, 'output': []});
                    return;
                }

                const query = 'DELETE FROM activities WHERE Id = ?';
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
};

const packages = (serial) => 
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
            const query = 'DELETE FROM packages WHERE Id = ?';
            
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
};

const algorithm = (serial) => 
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
            const query = 'DELETE FROM algo WHERE Id = ?';
            
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
};

module.exports = { destinations, accomodations, activities, packages, algorithm }