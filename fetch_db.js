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
            const query = 'SELECT * FROM destinations;';
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
            const query = 'SELECT * FROM activities;';
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
            const query = 'SELECT * FROM accomodations;';
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
            const query = "SELECT * FROM packages;";
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

const group_packages = () =>
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
            const query = "SELECT * FROM packages WHERE Type = 'Group';";
            connection.query(query, (queryError, results) => {
            connection.release();
    
            if (queryError) {
                reject({'returncode': 1, 'message': queryError, 'output': []});
                return;
            }
    
            if (results.length > 0) 
            {
                const query = "SELECT Id FROM packages WHERE Type = 'Group';";
                connection.query(query, (queryError, results1) => 
                {
                    connection.release();
    
                    if (queryError) 
                    {
                        reject({'returncode': 1, 'message': queryError, 'output': []});
                        return;
                    }
        
                    if (results1.length > 0) 
                    {
                        results.forEach((item,index) =>
                        {

                            id_value =results1[index]
                            value = id_value.Id;
                            item.PackageID = value;

                        });
                        // Destinations Fetched
                        resolve({'returncode': 0, 'message': 'Fetched', 'output': results});
                    } 
                    else 
                    {
                        // No Destinations are available
                        reject({'returncode': 1, 'message': 'No Packages found', 'output': []});
                    }
                });} 
            else 
            {
                // No Destinations are available
                reject({'returncode': 1, 'message': 'No accomodations found', 'output': []});
            }
            });
        });
    });
};

const solo_packages = () =>
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
            const query = "SELECT * FROM packages WHERE Type = 'Solo';";
            connection.query(query, (queryError, results) => {
            connection.release();
    
            if (queryError) {
                reject({'returncode': 1, 'message': queryError, 'output': []});
                return;
            }
    
            if (results.length > 0) 
            {
                const query = "SELECT Id FROM packages WHERE Type = 'Solo';";
                connection.query(query, (queryError, results1) => 
                {
                    connection.release();
    
                    if (queryError) 
                    {
                        reject({'returncode': 1, 'message': queryError, 'output': []});
                        return;
                    }
        
                    if (results1.length > 0) 
                    {
                        results.forEach((item,index) =>
                        {

                            id_value =results1[index]
                            value = id_value.Id;
                            item.PackageID = value;

                        });
                        // Destinations Fetched
                        resolve({'returncode': 0, 'message': 'Fetched', 'output': results});
                    } 
                    else 
                    {
                        // No Destinations are available
                        reject({'returncode': 1, 'message': 'No Packages found', 'output': []});
                    }
                });    
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

const female_packages = () =>
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
            const query = "SELECT * FROM packages p, destinations d WHERE p.Type = 'Female' AND d.Id=p.DestinationId;";
            connection.query(query, (queryError, results) => {
            connection.release();
    
            if (queryError) {
                reject({'returncode': 1, 'message': queryError, 'output': []});
                return;
            }
    
            if (results.length > 0) 
            {
                const query = "SELECT Id FROM packages WHERE Type = 'Female';";
                connection.query(query, (queryError, results1) => 
                {
                    connection.release();
    
                    if (queryError) 
                    {
                        reject({'returncode': 1, 'message': queryError, 'output': []});
                        return;
                    }
        
                    if (results1.length > 0) 
                    {
                        results.forEach((item,index) =>
                        {

                            id_value =results1[index]
                            value = id_value.Id;
                            item.PackageID = value;

                        });
                        // Destinations Fetched
                        resolve({'returncode': 0, 'message': 'Fetched', 'output': results});
                    } 
                    else 
                    {
                        // No Destinations are available
                        reject({'returncode': 1, 'message': 'No Packages found', 'output': []});
                    }
                });
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

const algorithm = () =>
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
            const query = "SELECT * FROM algo;";
            connection.query(query, (queryError, results) => {
            connection.release();
    
            if (queryError) {
                reject({'returncode': 1, 'message': queryError, 'output': []});
                return;
            }
    
            if (results.length > 0) 
            {
                const query = "SELECT Id FROM packages WHERE Type = 'Female';";
                connection.query(query, (queryError, results1) => 
                {
                    connection.release();
    
                    if (queryError) 
                    {
                        reject({'returncode': 1, 'message': queryError, 'output': []});
                        return;
                    }
        
                    if (results1.length > 0) 
                    {
                        results.forEach((item,index) =>
                        {

                            id_value =results1[index]
                            value = id_value.Id;
                            item.PackageID = value;

                        });
                        // Destinations Fetched
                        resolve({'returncode': 0, 'message': 'Fetched', 'output': results});
                    } 
                    else 
                    {
                        // No Destinations are available
                        reject({'returncode': 1, 'message': 'No Packages found', 'output': []});
                    }
                });
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

module.exports = { destinations, accomodations, activities, packages, group_packages, solo_packages, female_packages, algorithm };