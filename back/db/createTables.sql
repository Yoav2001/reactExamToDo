
-- user זה מילה שמורה לכן שם ככה
CREATE TABLE users (
	
	email varchar(50) PRIMARY KEY NOT NULL,
	pass varchar(50) NOT NULL,
    full_name varchar(50) NOT NULL,
    isAdmin boolean NOT NULL
);

CREATE TABLE tasks (
	
	task_id SERIAL PRIMARY KEY NOT NULL,	 
    task_email_user varchar(50)  NOT NULL references users(email),
    task_name varchar(200) NOT NULL,
    startDate TIMESTAMP NOT NULL,
    endTime TIMESTAMP NOT NULL,
    isComplete boolean,
    isRelevent  boolean
);




--DROP TABLE commentVotes , postVotes , usersComments , usersPosts , users;



-- תרגיל react

-- עליכם לכתוב אפליקציית todo (לא מקורי במיוחד אני יודע).

-- מטרת האפליקצייה היא לעקוב אחרי משימות לביצוע, ונדרשת תמיכה בפעולות הבאותL

-- תצוגה של כלל המשימות (ברור)
-- הוספה של משימה
-- סימון של משימה כ"הושלמה"
-- סימון של משימה כ"לא רלוונטית"
-- הגדרת זמן יעד למשימה
-- אזהרה במידה והזמן הנוכחי עקף את יעד המשימה
-- מחיקה של משימה

-- על האתר להיות מעוצב באופן נעים לעין.
-- יש לוודא על חלוקה ברורה של קוד לפי קומפוננטים (מי שיכתוב קובץ שיעבור את ה1000 שורות יוכל לבלות 1000 יום בתורנויות שירותים).

-- בונוס
-- במידה ואתם כבר יודעים nodejs אתם יכולים להוסיף api שיעבוד עם האתר.
-- במידה ואתם גם יודעים SQL אתם יכולים גם להוסיף מסד נתונים לאתר שישמור פתקים ואפילו משתמשים.
