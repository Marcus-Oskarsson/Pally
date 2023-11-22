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
('John', 'Doe', 'John.Doe@mail.com', '070-1234567', '19900101-1234', 'password123', 'Street 1', 'City', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 12345),
('Jane', 'Doe', 'Jane.Doe@mail.com', '073-1234567', '19910101-1234', 'password', 'Street2', 'Prague', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 12345),
('Jane', 'Smith', 'jane.smith@email.com', '555-5678', '987-65-4321', 'password', '456 Oak St', 'Townton', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 67890),
('Bob', 'Johnson', 'bob.johnson@email.com', '555-8765', '543-21-0987', 'password', '789 Pine St', 'Villagetown', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 54321),
('Alice', 'Williams', 'alice.williams@email.com', '555-4321', '876-54-3210', 'password', '321 Elm St', 'Hamletville', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 98765),
('Michael', 'Davis', 'michael.davis@email.com', '555-9876', '654-32-1098', 'password', '987 Maple St', 'Suburbia', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 10987),
('Emily', 'Jones', 'emily.jones@email.com', '555-3456', '321-09-8765', 'password', '654 Birch St', 'Metropolis', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 54320),
('David', 'Taylor', 'david.taylor@email.com', '555-6543', '210-98-7654', 'password', '876 Cedar St', 'Cityburg', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 87654),
('Sophia', 'Clark', 'sophia.clark@email.com', '555-8765', '789-01-2345', 'password', '234 Oak St', 'Villageton', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 34567),
('William', 'White', 'william.white@email.com', '555-2345', '890-12-3456', 'password', '567 Pine St', 'Townsville', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 65432),
('Olivia', 'Miller', 'olivia.miller@email.com', '555-7654', '901-23-4567', 'password', '890 Elm St', 'Hamletburg', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 43210),
('Ethan', 'Brown', 'ethan.brown@email.com', '555-1234', '012-34-5678', 'password', '123 Maple St', 'Suburbville', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 21098),
('Ava', 'Moore', 'ava.moore@email.com', '555-4321', '345-67-8901', 'password', '456 Birch St', 'Cityopolis', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 56789),
('Liam', 'Johnson', 'liam.johnson@email.com', '555-8765', '678-90-1234', 'password', '789 Cedar St', 'Villageburg', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 89012),
('Emma', 'Anderson', 'emma.anderson@email.com', '555-2345', '901-23-4567', 'password', '234 Oak St', 'Hamletton', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 12345);

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
VALUES('Summer Music Fest', 'https://cms.goteborg.com/uploads/2021/06/Olstugan-tullen-majorna-43-1-scaled.jpg', 'Slottsskogen, Gothenburg', 'info@summermusicfest.com', '2024-06-15', 15),
('Tech Startup Workshop', 'https://selected.sesamers.com/content/images/2020/11/October---Image-by-Dan-Taylor---dan@dantaylorphotography.com-1.jpg', 'Stockholm Exhibition Center', 'info@technewbs.com', '2023-12-05', 15),
('Food Truck Rally', 'https://images.squarespace-cdn.com/content/v1/56a551ed5dc6de5c96035a74/147f4fe9-abce-42f4-b1e0-d4d6a3dd780b/AFM+305+FOCO_FTR_avatar_2023_960x960.jpg', 'Malmo Harborfront Market', 'hello@foodtrucksweden.com', '2024-04-11', 15),
('Craft Beer Festival', 'https://www.mashed.com/img/gallery/the-best-beer-festivals-in-america/l-intro-1652450986.jpg', 'Helsingborg Brewery Square', 'brew@craftbeerfest.com', '2024-03-18', 1),
('Outdoor Movie Night', 'https://blog.realmanage.com/hubfs/outdoor%20movie%20night.jpg', 'Visby Botanical Gardens', 'info@visbygarden.se', '2024-06-28', 1),
('Comedy Night', 'https://resources.mynewsdesk.com/image/upload/ar_16:9,c_fill,dpr_auto,f_auto,g_auto,q_auto:good,w_746/urkxovvyjajdmwze4r4a', 'Gothenburg Comedy Club', 'hello@rawcomedyclub.se', '2023-12-16', 1);

INSERT INTO userEvent(userId, eventId)
VALUES(2, 1);
