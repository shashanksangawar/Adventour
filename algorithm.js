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

// function variable_isNull(variable)
// {
//   if (variable===undefined || variable==='' || variable===0 || variable===[] || variable==={})
//   {
//     return true
//   }
//   else
//   {
//     return false
//   }
// }

const algorithm = (category, sub_category, season) =>
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
            const query = 'SELECT PackageId FROM algo WHERE Category=? AND SubCategory=? AND Season=?;';
            connection.query(query,[category, sub_category, season], (queryError, results) => {
            connection.release();
    
            if (queryError) {
                reject({'returncode': 1, 'message': queryError, 'output': []});
                return;
            }
    
            if (results.length > 0) 
            {
              PacakgeIds = [];
              results.forEach((item, index) => {
                  PacakgeIds.push(item.PackageId);
              });

              // Create placeholders for the IN clause based on the length of PacakgeIds
              const placeholders = PacakgeIds.map(() => '?').join(', ');

              const query = `
                  SELECT * FROM packages p
                  LEFT JOIN destinations d ON p.DestinationId = d.Id
                  WHERE p.Id IN (${placeholders}) OR d.Id IN (${placeholders});
              `;

              // Flatten the array of PackageIds
              const flattenedPackageIds = PacakgeIds.concat(PacakgeIds);
              connection.query(query,flattenedPackageIds, (queryError, results) => {
              connection.release();
      
              if (queryError) {
                  reject({'returncode': 1, 'message': queryError, 'output': []});
                  return;
              }
      
              if (results.length > 0) 
              {
                console.log(results);
                  // Destinations Fetched
                  resolve({'returncode': 0, 'message': 'Fetched destinations', 'output': results});
              } 
              else 
              {
                  // No Destinations are available
                  reject({'returncode': 1, 'message': 'No destinations found as per your info', 'output': []});
              }
              });  
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

module.exports = { algorithm };