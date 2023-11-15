DROP TABLE IF EXISTS friend;
DROP TABLE IF EXISTS userInfo;
DROP TABLE IF EXISTS userEvent;
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

INSERT INTO userInfo (userFirstName, userLastName, userEmail, userPhoneNumber, userPersonalNumber, userPassword, userStreet, userCity, userZipCode) VALUES('John', 'Doe', 'John.Doe@mail.com', '070-1234567', '19900101-1234', 'password123', 'Street 1', 'City', 12345),
('Jane', 'Doe', 'Jane.Doe@mail.com', '073-1234567',
'19910101-1234', 'password', 'Street2', 'Prague', 12345);

INSERT INTO friend(user1Id, user2Id)
VALUES (1, 2);

INSERT INTO eventInfo(eventName, eventStreet, eventEmail, eventDate)
VALUES('Party', 'Street 1', 'party@mail.info', '2023-11-18');

INSERT INTO userEvent(userId, eventId)
VALUES(2, 1);
```
