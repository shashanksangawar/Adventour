CREATE DATABASE ADVENTOUR;
-- 1.
CREATE TABLE users(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    PasswordHash VARCHAR(100) NOT NULL,
    RegistrationDate DATE NOT NULL
);

-- Algorithm Related --
-- 8.
CREATE TABLE user_preference(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    Category VARCHAR(100) NOT NULL,
    SubCategory VARCHAR(100) NOT NULL,
    FOREIGN KEY (UserId) REFERENCES users(ID),
); 

-- 4.
CREATE TABLE activities(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    DestinationId INT NOT NULL,
    Description VARCHAR(255) NOT NULL,
    FOREIGN KEY (DestinationId) REFERENCES destinations(ID),
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
    PricePerNight VARCHAR(100) NOT NULL,
    FOREIGN KEY (DestinationId) REFERENCES destinations(ID),
); 

-- 5.
-- For this only
-- Not Confirmed --
CREATE TABLE packages(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    DestinationId INT NOT NULL,
    ActivityId INT NOT NULL,
    AccommodationId INT,
    PackageValidity VARCHAR(100) NOT NULL, 
    StartDate Date NOT NULL,
    EndDate Date NOT NULL,
    Description VARCHAR(255) NOT NULL,
    FOREIGN KEY (DestinationId) REFERENCES destinations(ID),
    FOREIGN KEY (ActivityId) REFERENCES activities(ID),
    FOREIGN KEY (AccommodationId) REFERENCES accomodations(ID)
); 
-- PackageValidity is only used for displaying package time period for example; 3 Days 4 Nights

-- 6.
CREATE TABLE bookings(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    PackageId INT NOT NULL,
    UserId INT NOT NULL,
    Description VARCHAR(255) NOT NULL,
    CheckIn Date NOT NULL,
    CheckOut Date NOT NULL,
    FOREIGN KEY (PackageId) REFERENCES packages(ID),
    FOREIGN KEY (UserId) REFERENCES users(ID)
);

-- 7.
CREATE TABLE user_reviews(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    BookingId INT NOT NULL,
    Comment VARCHAR(255) NOT NULL,
    Rating VARCHAR(5) NOT NULL,
    ReviewDate Date NOT NULL,
    FOREIGN KEY (BookingId) REFERENCES bookings(ID),
    FOREIGN KEY (UserId) REFERENCES users(ID)
);