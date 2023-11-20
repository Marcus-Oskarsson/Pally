DROP TABLE IF EXISTS userfriend;
DROP TABLE IF EXISTS userevent;
DROP TABLE IF EXISTS friend;
DROP TABLE IF EXISTS userInfo;
DROP TABLE IF EXISTS eventInfo;

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
  eventDate DATE NOT NULL
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
('John', 'Doe', 'John.Doe@mail.com', '070-1234567', '19900101-1234', 'password123', 'Street 1', 'City', NULL, 12345),
('Jane', 'Doe', 'Jane.Doe@mail.com', '073-1234567', '19910101-1234', 'password', 'Street2', 'Prague', NULL, 12345),
('Jane', 'Smith', 'jane.smith@email.com', '555-5678', '987-65-4321', 'password', '456 Oak St', 'Townton', NULL, 67890),
('Bob', 'Johnson', 'bob.johnson@email.com', '555-8765', '543-21-0987', 'password', '789 Pine St', 'Villagetown', NULL, 54321),
('Alice', 'Williams', 'alice.williams@email.com', '555-4321', '876-54-3210', 'password', '321 Elm St', 'Hamletville', NULL, 98765),
('Michael', 'Davis', 'michael.davis@email.com', '555-9876', '654-32-1098', 'password', '987 Maple St', 'Suburbia', NULL, 10987),
('Emily', 'Jones', 'emily.jones@email.com', '555-3456', '321-09-8765', 'password', '654 Birch St', 'Metropolis', NULL, 54320),
('David', 'Taylor', 'david.taylor@email.com', '555-6543', '210-98-7654', 'password', '876 Cedar St', 'Cityburg', NULL, 87654),
('Sophia', 'Clark', 'sophia.clark@email.com', '555-8765', '789-01-2345', 'password', '234 Oak St', 'Villageton', NULL, 34567),
('William', 'White', 'william.white@email.com', '555-2345', '890-12-3456', 'password', '567 Pine St', 'Townsville', NULL, 65432),
('Olivia', 'Miller', 'olivia.miller@email.com', '555-7654', '901-23-4567', 'password', '890 Elm St', 'Hamletburg', NULL, 43210),
('Ethan', 'Brown', 'ethan.brown@email.com', '555-1234', '012-34-5678', 'password', '123 Maple St', 'Suburbville', NULL, 21098),
('Ava', 'Moore', 'ava.moore@email.com', '555-4321', '345-67-8901', 'password', '456 Birch St', 'Cityopolis', NULL, 56789),
('Liam', 'Johnson', 'liam.johnson@email.com', '555-8765', '678-90-1234', 'password', '789 Cedar St', 'Villageburg', NULL, 89012),
('Emma', 'Anderson', 'emma.anderson@email.com', '555-2345', '901-23-4567', 'password', '234 Oak St', 'Hamletton', NULL, 12345);

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

INSERT INTO eventInfo(eventName, eventImage, eventStreet, eventEmail, eventDate)
VALUES('Party', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 'Street 1', 'party@mail.info', '2023-11-18'),
('Party 2', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 'Street 2', 'party@mail.info', '2023-11-18'),
('Party 3', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 'Street 3', 'party@mail.info', '2023-11-18'),
('Party 4', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 'Street 4', 'party@mail.info', '2023-11-18'),
('Party 5', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 'Street 5', 'party@mail.info', '2023-11-18');

INSERT INTO userEvent(userId, eventId)
VALUES(2, 1);
