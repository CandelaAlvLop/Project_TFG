-- USER
DROP TABLE IF EXISTS data_consent;
DROP TABLE IF EXISTS dataset CASCADE;
DROP TABLE IF EXISTS authentication_key;
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
    (5, 'Candela', 'Alvarez', 'cande', '54175127F', 'cande@gmail.com', '123Abc*', 'Research');

-- PROPERTY
CREATE TABLE IF NOT EXISTS property(
	property_id INT PRIMARY KEY AUTO_INCREMENT, 
	user_id INT,
    propertyName VARCHAR(200),
	size INT, 
    buildingAge INT, 
    district INT, 
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

SELECT * FROM users;
SELECT * FROM property;

-- AUTHENTICATION KEY
CREATE TABLE IF NOT EXISTS authentication_key(
	key_id INT PRIMARY KEY NOT NULL, 
	user_id INT,
	token INT, 
	expiration TIMESTAMP,
	CONSTRAINT fk_user_id_auth FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- DATASET
CREATE TABLE IF NOT EXISTS dataset(
	data_id INT PRIMARY KEY NOT NULL, 
	property_id INT,
	type VARCHAR(200), 
	timestamp TIMESTAMP,
	CONSTRAINT fk_property_id FOREIGN KEY (property_id) REFERENCES property(property_id)
);

-- DATA CONSENT
CREATE TABLE IF NOT EXISTS data_consent(
	consent_id INT PRIMARY KEY NOT NULL, 
	data_id INT,
	valid BOOLEAN, 
	timestamp TIMESTAMP,
	CONSTRAINT fk_data_id FOREIGN KEY (data_id) REFERENCES dataset(data_id)
);
