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

const destinations = (name, country, region, description, imageBuffer) => 
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
            const base64Image = imageBuffer.toString('base64');
            const query = 'INSERT INTO destinations (Name, Country, Region, Description, Image) VALUES (?, ?, ?, ?, ?)';
            
            connection.query(query, [name, country, region, description, base64Image], (queryError, results) => 
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


const accomodations = (name, destination_id, description, price_per_night) => 
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
            


            const query = 'INSERT INTO accomodations (Name, DestinationId, Description, PricePerNight) VALUES (?, ?, ?, ?);';
            
            connection.query(query, [name, destination_id, description, price_per_night], (queryError, results) => 
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

const activities = (name, destination_id, description) => 
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
            


            const query = 'INSERT INTO activities (Name, DestinationId, Description) VALUES (?, ?, ?);';
            
            connection.query(query, [name, destination_id, description], (queryError, results) => 
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

const packages = (guide, name, type, destination_id, activity_id, accomodation_id, package_validity, start_date, end_date, price ,package_status, description) => 
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

            const query = 'INSERT INTO packages ( Guide, Name, Type, DestinationId, ActivityId, AccommodationId, PackageValidity, StartDate, EndDate, Price, Status, Description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
            connection.query(query, [guide, name, type, destination_id, activity_id, accomodation_id, package_validity, start_date, end_date, price, package_status, description], (queryError, results) => 
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

module.exports = { destinations, accomodations, activities, packages }