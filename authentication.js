// <---- Required Libraries ---->
const mysql = require('mysql2');
const crypto = require('crypto');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'ADVENTOUR',
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0
});

const register = (username, email, password, registration_date) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject({'returncode': 1, 'message': err, 'output': []});
        return;
      }

      const hashedEnteredPassword = crypto.createHash('sha256').update(password).digest('hex');
      const query = 'INSERT INTO users (UserName, Email, PasswordHash, RegistrationDate) VALUES (?, ?, ?, ?)';
      
      connection.query(query, [username, email, hashedEnteredPassword, registration_date], (queryError, results) => {
        connection.release();

        if (queryError) {
          reject({'returncode': 1, 'message': queryError, 'output': []});
          return;
        }

        resolve({'returncode': 0, 'message': 'User registration successful', 'output': results});
      });
    });
  });
};

const login = (username, password) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject({'returncode': 1, 'message': 'Error connecting to MariaDB', 'output': []});
          return;
        }

        const hashedEnteredPassword = crypto.createHash('sha256').update(password).digest('hex'); 
        const query = 'SELECT * FROM users WHERE UserName = ? AND PasswordHash = ?';
        connection.query(query, [username, hashedEnteredPassword], (queryError, results) => {
          connection.release();
  
          if (queryError) {
            reject({'returncode': 1, 'message': queryError, 'output': []});
            return;
          }
  
          if (results.length > 0) {
            // User authenticated successfully
            resolve({'returncode': 0, 'message': 'Authentication successful', 'output': results[0]});
          } else {
            // User not found or incorrect credentials
            reject({'returncode': 1, 'message': 'Authentication failed', 'output': []});
          }
        });
      });
    });
  };
  
  const admin_register = (username, email, password, registration_date) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject({'returncode': 1, 'message': err, 'output': []});
          return;
        }
  
        const hashedEnteredPassword = crypto.createHash('sha256').update(password).digest('hex');
        const query = 'INSERT INTO admins (UserName, Email, PasswordHash, RegistrationDate) VALUES (?, ?, ?, ?)';
        
        connection.query(query, [username, email, hashedEnteredPassword, registration_date], (queryError, results) => {
          connection.release();
  
          if (queryError) {
            reject({'returncode': 1, 'message': queryError, 'output': []});
            return;
          }
  
          resolve({'returncode': 0, 'message': 'User registration successful', 'output': results});
        });
      });
    });
  };
  
  const admin_login = (username, password) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject({'returncode': 1, 'message': 'Error connecting to MariaDB', 'output': []});
          return;
        }
  
        const hashedEnteredPassword = crypto.createHash('sha256').update(password).digest('hex'); 
        const query = 'SELECT * FROM admins WHERE UserName = ? AND PasswordHash = ?';
        connection.query(query, [username, hashedEnteredPassword], (queryError, results) => {
          connection.release();
  
          if (queryError) {
            reject({'returncode': 1, 'message': queryError, 'output': []});
            return;
          }
  
          if (results.length > 0) {
            // User authenticated successfully
            resolve({'returncode': 0, 'message': 'Authentication successful', 'output': results[0]});
          } else {
            // User not found or incorrect credentials
            reject({'returncode': 1, 'message': 'Authentication failed', 'output': []});
          }
        });
      });
    });
  };

module.exports = { login, register, admin_register, admin_login };