-- USER
DROP TABLE IF EXISTS donations_consent CASCADE;
DROP TABLE IF EXISTS donations_readings CASCADE;
DROP TABLE IF EXISTS donations_metadata CASCADE;
DROP TABLE IF EXISTS property CASCADE;
DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE IF NOT EXISTS users(
	user_id INT PRIMARY KEY AUTO_INCREMENT, 
	name VARCHAR(200), 
	surname VARCHAR(200), 
	username VARCHAR(200),
	DNI VARCHAR(200), 
	email VARCHAR(200), 
	password VARCHAR(200), 
    type VARCHAR(200)
);

INSERT INTO users (user_id, name, surname, username, DNI, email, password, type) 
VALUES 
    (1, 'Pol', 'Lopez', 'pol', '54172433D', 'pol@example.com', '123Abc*', 'Donor'),
    (2, 'Carlos', 'Romero', 'carla', '54224211E', 'carla@example.com', '123Abc*', 'Donor'),
    (3, 'Claudia', 'Garcia', 'claudia', '54164322D', 'claudia@example.com', '123Abc*', 'Education'),
    (4, 'Marta', 'Alvarez', 'marta', '54777727F', 'marta@example.com', '123Abc*', 'Research'),
    (5, 'Candela', 'Alvarez', 'cande', '54166134F', 'cande@gmail.com', '123Abc*', 'Research'),
    (6, 'Vladimir', 'Estivill', 'vladimir', '54177163D', 'vladimir@gmail.com', '123Abc*', 'Donor');

-- PROPERTY
CREATE TABLE IF NOT EXISTS property(
	property_id INT PRIMARY KEY AUTO_INCREMENT, 
	user_id INT,
    propertyName VARCHAR(200),
	size INT, 
    buildingAge INT, 
    district VARCHAR(200), 
    quantity INT, 
    ages VARCHAR(200), 
    income INT, 
    remoteWorkers VARCHAR(200), 
    workingSchedules VARCHAR(200), 
    description TEXT, 
    appliances VARCHAR(1000), 
    electricConsumption INT, 
    gasConsumption INT, 
    waterConsumption INT,
	CONSTRAINT fk_user_id_property FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO property (user_id, propertyName, size, buildingAge, district, quantity, ages, income, remoteWorkers, workingSchedules, description, appliances, electricConsumption, gasConsumption, waterConsumption) 
VALUES
	(1, 'Sunny Villa', 120, 10, '28001', 4, '21-35,36-50', 55000, 'yes', 'Morning,Afternoon', 'Modern villa with family of 4.', 'Fridge,Microwave,Gas Stove,Washing Machine,TV,Air Conditioning,Garden', 4500, 3000, 1500),
	(1, 'City Studio', 45, 5, '28002', 1, '21-35', 28000, 'no', 'Full Day', 'Compact city studio.', 'Fridge,Microwave,Electric Stove,Lamps', 1800, 4000, 800),
	(1, 'Eco Cabin', 60, 15, '28050', 2, '36-50', 36000, 'yes', 'Afternoon,No Work', 'Eco-friendly weekend cabin.', 'Fridge,Gas Oven,Gas Hot Water,Wood Stove', 900, 1200, 500),
	(2, 'Cozy Flat', 75, 20, '08015', 2, '80+', 42000, 'no', 'Full Day,Night', 'Small flat for couple.', 'Fridge,Dish Washer,Electric Oven,Lamps', 3000, 1000, 1000),
	(2, 'Weekend House', 95, 12, '08016', 3, '0-20,50-65', 39000, 'yes', 'Morning', 'Used on weekends.', 'Fridge,Microwave,Washing Machine,Garden', 2500, 2000, 1300),
	(2, 'Downtown Loft', 60, 8, '08003', 1, '66-80', 32000, 'yes', 'Afternoon,Full Day', 'Trendy loft in downtown.', 'Fridge,TV,Computer,Electric Stove', 2200, 6000, 900),
	(3, 'Student Housing', 95, 5, '46023', 5, '0-20,21-35', 35000, 'yes', 'Morning,Afternoon,Full Day', 'Shared housing for students.', 'Fridge,TV,Computer,Electric Stove,Washing Machine', 5200, 0, 2200),
	(3, 'Shared Flat', 80, 4, '46020', 4, '21-35', 30000, 'yes', 'Full Day,Night', 'Shared flat with 4 students.', 'Fridge,Lamps,Microwave,Dish Washer', 3700, 5000, 1700),
	(3, 'Campus Studio', 35, 2, '46010', 1, '21-35', 18000, 'no', 'Morning', 'Small on-campus studio.', 'Fridge,Microwave,Electric Hot Water', 1200, 1000, 500),
	(4, 'Green Home', 130, 12, '03012', 3, '36-50,50-65', 61000, 'yes', 'Morning,Afternoon', 'Sustainable family home.', 'Fridge,Dish Washer,TV,Air Conditioning,Garden,Lamps', 2500, 100, 900),
	(4, 'Smart Apartment', 85, 6, '03013', 2, '21-35', 45000, 'yes', 'Full Day', 'Smart home systems.', 'Fridge,TV,Computer,Lamps,Electric Heating Radiators', 2800, 5000, 1100),
	(4, 'Research Retreat', 70, 20, '03020', 1, '50-65', 35000, 'no', 'No Work', 'Retreat space for writing.', 'Fridge,Gas Stove,Gas Oven,Terrace with Plants', 1400, 1800, 700),
	(5, 'Family House', 150, 18, '29004', 6, '0-20,21-35,36-50', 72000, 'no', 'Full Day,No Work', 'Multigenerational family home.', 'Fridge,Washing Machine,Dryer,Gas Central Heating,Swimming Pool', 6000, 4000, 3500),
	(5, 'City Apartment', 90, 10, '29002', 3, '21-35,36-50', 52000, 'yes', 'Morning,Afternoon', 'Daily apartment in city.', 'Fridge,Dish Washer,Electric Oven,Lamps,TV', 3300, 2000, 1600),
	(5, 'Beach House', 110, 22, '29001', 4, '0-20,50-65', 48000, 'no', 'No Work', 'Used on holidays.', 'Fridge,Gas Oven,Gas Hot Water,Terrace with Plants,Garden', 2500, 2200, 1400),
    (6, 'Flat', 90, 25, '08823', 2, '0-20,21-35', 48000, 'no', 'Full Day,No Work', 'City Flat, daily use.', 'Fridge,Washing Machine,Dryer,Gas Central Heating,Swimming Pool', 700, 60, 1),
	(6, 'Vacation House', 150, 10, '92340', 2, '0-20,21-35', 48000, 'yes', 'Morning,Afternoon', 'House in the beach for vacations.', 'Fridge,Dish Washer,Electric Oven,Lamps,TV', 200, 20, 1);

SELECT * FROM users;
SELECT * FROM property;

CREATE TABLE IF NOT EXISTS donations_metadata (
  donation_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  property_id INT,
  consume_type VARCHAR(200),
  filename VARCHAR(200),
  upload_time DATE DEFAULT (CURRENT_DATE),
  CONSTRAINT fk_user_id_donations FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_property_id_donations FOREIGN KEY (property_id) REFERENCES property(property_id)
);

CREATE TABLE IF NOT EXISTS donations_readings (
  reading_id INT PRIMARY KEY AUTO_INCREMENT,
  donation_id INT,
  timer_hours INT,
  timer_day INT,
  timer_month INT,
  timer_year INT,
  meter_reading DECIMAL(10,6),
  CONSTRAINT fk_donations_id_readings FOREIGN KEY (donation_id) REFERENCES donations_metadata(donation_id)
);

CREATE TABLE IF NOT EXISTS donations_consent (
  consent_id INT PRIMARY KEY AUTO_INCREMENT,
  donation_id INT,
  consents TEXT,
  consent_date DATE DEFAULT (CURRENT_DATE),
  CONSTRAINT fk_donations_id_consents FOREIGN KEY (donation_id) REFERENCES donations_metadata(donation_id)
);


SELECT * FROM donations_metadata;
SELECT * FROM donations_readings;
SELECT * FROM donations_consent;



