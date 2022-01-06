
-- user זה מילה שמורה לכן שם ככה
CREATE TABLE users (
	email varchar(50) PRIMARY KEY NOT NULL,
	pass varchar(50) NOT NULL,
    fullName varchar(50) NOT NULL,
    isAdmin boolean NOT NULL
);

CREATE TABLE tasks (
	id SERIAL PRIMARY KEY NOT NULL,	 
    userEmail varchar(50)  NOT NULL references users(email),
    name varchar(200) NOT NULL,
    startDate TIMESTAMP NOT NULL,
    endTime TIMESTAMP NOT NULL,
    isComplete boolean,
    isRelevent  boolean
);




--DROP TABLE commentVotes , postVotes , usersComments , usersPosts , users;

