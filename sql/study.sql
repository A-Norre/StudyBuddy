DROP DATABASE IF EXISTS study;

CREATE DATABASE study;

USE study;





DROP TABLE IF EXISTS question;
CREATE TABLE question
(
	`id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `topic` VARCHAR(20),
	`course` VARCHAR(20),
	`quest` VARCHAR(100),
	`answer` VARCHAR(100)
);




INSERT INTO question
VALUES
    (1, 'Mathematics', 'Mathematics 1', '100 + 20 = ?', '120'),
	(2, 'Mathematics', 'Mathematics 1', '80 + 20 = ?', '100'),
    (3, 'Mathematics', 'Mathematics 2', '50 - 40 = ?', '10'),
	(4, 'Mathematics', 'Mathematics 2', '40 - 20 = ?', '20'),
    (5, 'Geography', 'Geograpy 1', 'What is the capital in Sweden?', 'Stockholm'),
    (6, 'Chemistry', 'Chemistry A', 'In the periodic table, what does Au stand for?', 'Gold')
    
;

USE study;

DROP PROCEDURE IF EXISTS fetch_topic;

DELIMITER ;;

CREATE PROCEDURE fetch_topic (
	asked VARCHAR(20)
)
BEGIN
    SELECT 
		*
	FROM question WHERE topic = asked GROUP BY course;
END;;

DELIMITER ;

USE study;

DROP PROCEDURE IF EXISTS fetch_course;

DELIMITER ;;

CREATE PROCEDURE fetch_course (
	asked VARCHAR(20)
)
BEGIN
    SELECT 
		course
	FROM question WHERE topic = asked GROUP BY course;
END;;

DELIMITER ;

USE study;

DROP PROCEDURE IF EXISTS fetch_question;

DELIMITER ;;

CREATE PROCEDURE fetch_question (
	asked VARCHAR(20)
)
BEGIN
    SELECT 
		id,
        topic,
		course,
        quest,
        answer
	FROM question WHERE course = asked;
END;;

DELIMITER ;


USE study;

DROP PROCEDURE IF EXISTS add_question;

DELIMITER ;;

CREATE PROCEDURE add_question (
    add_topic VARCHAR(20),
    add_course VARCHAR(20),
    add_quest VARCHAR(100),
    add_answer VARCHAR(100)
)
BEGIN
    INSERT INTO question (topic, course, quest, answer)
    VALUES (add_topic, add_course, add_quest, add_answer);
END;;

DELIMITER ;


USE study;

DROP PROCEDURE IF EXISTS add_topic;

DELIMITER ;;

CREATE PROCEDURE add_topic (
	new_topic VARCHAR(20)
)
BEGIN
    INSERT INTO question (topic)
    VALUES (new_topic);
END;;

DELIMITER ;



USE study;

DROP PROCEDURE IF EXISTS add_course;

DELIMITER ;;

CREATE PROCEDURE add_course (
	new_topic VARCHAR(20),
    new_course VARCHAR(20)
)
BEGIN
    INSERT INTO question (topic, course)
    VALUES (new_topic, new_course);
END;;

DELIMITER ;



USE study;

DROP PROCEDURE IF EXISTS grab_question;

DELIMITER ;;

CREATE PROCEDURE grab_question (
	asked INT
)
BEGIN
    SELECT 
		topic,
		course,
        quest,
        answer
	FROM question WHERE id = asked;
END;;

DELIMITER ;


USE study;

DROP PROCEDURE IF EXISTS edit_question;

DELIMITER ;;

CREATE PROCEDURE edit_question (
    edit_topic VARCHAR(20),
	edit_course VARCHAR(20),
    edit_question VARCHAR(100),
    edit_answer VARCHAR(100),
    edit_id INT
)
BEGIN
    UPDATE question SET
		topic = edit_topic,
        course = edit_course,
        quest = edit_question,
        answer = edit_answer
	WHERE id = edit_id;
END;;

DELIMITER ;


USE study;

DROP PROCEDURE IF EXISTS delete_question;

DELIMITER ;;

CREATE PROCEDURE delete_question (
    del_id INT
)
BEGIN
	DELETE FROM question WHERE id = del_id;
END;;

DELIMITER ;


USE study;

DROP PROCEDURE IF EXISTS delete_question_all;

DELIMITER ;;

CREATE PROCEDURE delete_question_all (
    del_topic VARCHAR(20)
)
BEGIN
	DELETE FROM question WHERE topic = del_topic;
END;;

DELIMITER ;