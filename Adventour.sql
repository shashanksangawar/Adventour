CREATE DATABASE ADVENTOUR;

-- 1.
CREATE TABLE users(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    PasswordHash VARCHAR(100) NOT NULL,
    RegistrationDate DATE NOT NULL
);

-- Search Related --
-- 2.
CREATE TABLE destinations(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Country VARCHAR(100) NOT NULL,
    Region VARCHAR(100) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    Image LONGBLOB NOT NULL
);

-- 3.
CREATE TABLE accomodations(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    DestinationId INT NOT NULL,
    Description VARCHAR(255) NOT NULL,
    PricePerNight DECIMAL(10, 2) NOT NULL, -- Adjust the precision and scale as needed
    FOREIGN KEY (DestinationId) REFERENCES destinations(ID)
); 

-- 4.

CREATE TABLE activities(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    DestinationId INT NOT NULL,
    Description VARCHAR(255) NOT NULL,
    FOREIGN KEY (DestinationId) REFERENCES destinations(ID)
);

-- 5.
-- For this only
-- Not Confirmed --
CREATE TABLE packages(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Guide VARCHAR(100) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Type VARCHAR(100) NOT NULL, 
    DestinationId INT NOT NULL,
    ActivityId INT NOT NULL,
    AccommodationId INT,
    PackageValidity VARCHAR(100) NOT NULL, 
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Status VARCHAR(100) NOT NULL, 
    Description VARCHAR(255) NOT NULL,
    FOREIGN KEY (DestinationId) REFERENCES destinations(ID) ON DELETE CASCADE,
    FOREIGN KEY (ActivityId) REFERENCES activities(ID) ON DELETE CASCADE,
    FOREIGN KEY (AccommodationId) REFERENCES accomodations(ID) ON DELETE SET NULL
);
-- PackageValidity is only used for displaying package time period for example; 3 Days 4 Nights

-- 6.
CREATE TABLE bookings(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    PackageId INT NOT NULL,
    UserId INT NOT NULL,
    CheckIn DATE NOT NULL,
    CheckOut DATE NOT NULL,
    FOREIGN KEY (PackageId) REFERENCES packages(ID),
    FOREIGN KEY (UserId) REFERENCES users(ID)
);

-- 7.
CREATE TABLE user_reviews(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    BookingId INT NOT NULL,
    Comment VARCHAR(255) NOT NULL,
    Rating VARCHAR(5) NOT NULL,
    ReviewDate DATE NOT NULL,
    FOREIGN KEY (BookingId) REFERENCES bookings(ID)
);
-- 8.
CREATE TABLE algo (
    Id INT AUTO_INCREMENT PRIMARY KEY,    
    PackageId INT,
    Category VARCHAR(100) NOT NULL, 
    SubCategory VARCHAR(100) NOT NULL, 
    Season VARCHAR(100) NOT NULL, 
    FOREIGN KEY (PackageId) REFERENCES packages(ID) ON DELETE CASCADE
);

-- 9.
CREATE TABLE admins(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    PasswordHash VARCHAR(100) NOT NULL,
    RegistrationDate DATE NOT NULL
);