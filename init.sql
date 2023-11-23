DROP TABLE IF EXISTS userevent;
DROP TABLE IF EXISTS friend;
DROP TABLE IF EXISTS eventInfo;
DROP TABLE IF EXISTS userInfo;

CREATE TABLE userInfo (
   userId SERIAL PRIMARY KEY,
   userFirstName TEXT NOT NULL,
   userLastName TEXT NOT NULL,
   userEmail TEXT UNIQUE NOT NULL,
   userPhoneNumber TEXT NOT NULL,
   userPersonalNumber TEXT NOT NULL,
   userPassword TEXT NOT NULL,
   userStreet TEXT NOT NULL,
   userCity TEXT NOT NULL,
   userImgUrl TEXT,
   userZipCode INT NOT NULL
);

CREATE TABLE friend (
  friendId SERIAL PRIMARY KEY,
  user1Id INT NOT NULL,
  user2Id INT NOT NULL,
  FOREIGN KEY (user1Id) REFERENCES userInfo(userId),
  FOREIGN KEY (user2Id) REFERENCES userInfo(userId)
);


CREATE TABLE eventInfo(
  eventId SERIAL PRIMARY KEY,
  eventName TEXT NOT NULL,
  eventImage TEXT NOT NULL,
  eventStreet TEXT NOT NULL,
  eventEmail TEXT NOT NULL,
  eventDate DATE NOT NULL,
  eventCreator INT NOT NULL,
  FOREIGN KEY (eventCreator) REFERENCES userInfo(userId)
);

CREATE TABLE userEvent(
  userEventId SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  eventId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES userInfo(userId),
  FOREIGN KEY (eventId) REFERENCES eventInfo(eventId)
);

CREATE INDEX IF NOT EXISTS idx_userEvent_userId ON userEvent(userId);
CREATE INDEX IF NOT EXISTS idx_userInfo_userId ON userInfo(userId);

INSERT INTO userInfo (userFirstName, userLastName, userEmail, userPhoneNumber, userPersonalNumber, userPassword, userStreet, userCity, userImgUrl, userZipCode)
VALUES
('John', 'Doe', 'John.Doe@mail.com', '070-1234567', '19900101-1234', 'password123', 'Street 1', 'City', 'https://b.stablecog.com/50547582-01c8-47d4-a06d-6a769fa56f39.jpeg', 12345),
('Jane', 'Doe', 'Jane.Doe@mail.com', '073-1234567', '19910101-1234', 'password', 'Street2', 'Prague', 'https://b.stablecog.com/642ee0b3-6f5c-4e9d-9405-961cf942b12e.jpeg', 12345),
('Jane', 'Smith', 'jane.smith@email.com', '555-5678', '987-65-4321', 'password', '456 Oak St', 'Townton', 'https://b.stablecog.com/79e639f6-5091-4f9a-97b7-e3d00ac6a9a0.jpeg', 67890),
('Bob', 'Johnson', 'bob.johnson@email.com', '555-8765', '543-21-0987', 'password', '789 Pine St', 'Villagetown', 'https://b.stablecog.com/8bea64a1-11a4-449d-bd2f-49b85bea69a5.jpeg', 54321),
('Alice', 'Williams', 'alice.williams@email.com', '555-4321', '876-54-3210', 'password', '321 Elm St', 'Hamletville', 'https://b.stablecog.com/316a2454-303e-4a61-b627-a432f571d497.jpeg', 98765),
('Michael', 'Davis', 'michael.davis@email.com', '555-9876', '654-32-1098', 'password', '987 Maple St', 'Suburbia', 'https://b.stablecog.com/ce3765a8-fb0c-42a4-8d58-1aa62722dd1d.jpeg', 10987),
('Emily', 'Jones', 'emily.jones@email.com', '555-3456', '321-09-8765', 'password', '654 Birch St', 'Metropolis', 'https://b.stablecog.com/a76d85d1-2788-48b3-a382-04d6c084b8a8.jpeg', 54320),
('David', 'Taylor', 'david.taylor@email.com', '555-6543', '210-98-7654', 'password', '876 Cedar St', 'Cityburg', 'https://b.stablecog.com/78014130-c316-4e8f-afd1-b142967779ca.jpeg', 87654),
('Sophia', 'Clark', 'sophia.clark@email.com', '555-8765', '789-01-2345', 'password', '234 Oak St', 'Villageton', 'https://b.stablecog.com/41263668-95a6-404b-9266-5cea8fcb1012.jpeg', 34567),
('William', 'White', 'william.white@email.com', '555-2345', '890-12-3456', 'password', '567 Pine St', 'Townsville', 'https://b.stablecog.com/5d449f52-1b2d-4247-9da5-59a4ecf1b8dd.jpeg', 65432),
('Olivia', 'Miller', 'olivia.miller@email.com', '555-7654', '901-23-4567', 'password', '890 Elm St', 'Hamletburg', 'https://b.stablecog.com/a01871a8-3f7e-40c5-a275-dbc37b662bcb.jpeg', 43210),
('Ethan', 'Brown', 'ethan.brown@email.com', '555-1234', '012-34-5678', 'password', '123 Maple St', 'Suburbville', 'https://b.stablecog.com/f7d359f5-685c-4761-a07a-d4540da1fc4a.jpeg', 21098),
('Ava', 'Moore', 'ava.moore@email.com', '555-4321', '345-67-8901', 'password', '456 Birch St', 'Cityopolis', 'https://b.stablecog.com/fa0e8da4-3e4c-443a-bf2c-8097f218c846.jpeg', 56789),
('Liam', 'Johnson', 'liam.johnson@email.com', '555-8765', '678-90-1234', 'password', '789 Cedar St', 'Villageburg', 'https://b.stablecog.com/d59e6374-0237-43cc-873e-3ab6c41d9da9.jpeg', 89012),
('Emma', 'Anderson', 'emma.anderson@email.com', '555-2345', '901-23-4567', 'password', '234 Oak St', 'Hamletton', 'https://b.stablecog.com/f0f0912e-1405-4833-9621-b37f3d8923ae.jpeg', 12345);

INSERT INTO friend(user1Id, user2Id)
VALUES
(1, 2),
(1, 4),
(1, 6),
(1, 8),
(1, 10),
(1, 12),
(1, 14),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7);

INSERT INTO eventInfo(eventName, eventImage, eventStreet, eventEmail, eventDate, eventCreator)
VALUES('Summer Color Fest', 'https://images.unsplash.com/photo-1496024840928-4c417adf211d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Slottsskogen, Gothenburg', 'info@summermusicfest.com', '2024-06-15', 1),
('After Work Tullen', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 'Utlandagatan 14', 'info@technewbs.com', '2023-12-05', 2),
('Food Truck Rally', 'https://images.unsplash.com/photo-1619683815335-2b5b130a1baf?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Malmo Harborfront Market', 'hello@foodtrucksweden.com', '2024-04-11', 3),
('Tomorrowland Afterparty 2024', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Tomorrowland 4', 'party@mail.info', '2023-11-18', 4),
('Garden Party Majorna', 'https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Street 5', 'party@mail.info', '2023-11-18', 5);

INSERT INTO userEvent(userId, eventId)
VALUES(2, 1);
