INSERT INTO training (name, note, along, city, country, idTypeOfTraining, idMember)
 VALUES ('Course à pied Paris', null, '1:30', 'Paris', 'France', 1, 1),
        ('Natation Paris', null, '2:00', 'Paris', 'France', 2, 2);

INSERT INTO metricHealthTraining (fcMoy, fcMax, idTraining)
 VALUES (150, 190, 3),
        (160, null, 4);

INSERT INTO metricTraining (km, moyPerKm, speedMoy, speedMax, idTraining)
 VALUES (12.46, '00:05:30', 12.00, 14.30, 3 ),
        (3.4, null, null, null, 4 );

INSERT INTO metricOptionalTraining (hikeUp, hikeDown, moyForSwim, idTraining)
 VALUES (150, 135, null, 3 ),
        (null, null, '00:01:40', 4);

-- Test du delete sur table training en cascade
DELETE FROM metricOptionalTraining where idTraining = 3;
DELETE FROM training where id = 3;

-- Modification apporter en cours de route --
ALTER TABLE user
ADD hash varchar(200),
ADD salt varchar(200),
DROP COLUMN password;

ALTER TABLE  user
MODIFY email varchar(200) NOT NULL;

ALTER TABLE healthMember
CHANGE id idHealthMember INT NOT NULL AUTO_INCREMENT;

ALTER TABLE performanceMember
CHANGE id idPerformanceMember INT NOT NULL AUTO_INCREMENT;

ALTER TABLE typeOfTraining
CHANGE name nameSport varchar(100) NOT NULL;

ALTER TABLE metricHealthTraining
CHANGE id idMetricHealthTraining INT NOT NULL AUTO_INCREMENT;

ALTER TABLE metricTraining
CHANGE id idMetricTraining INT NOT NULL AUTO_INCREMENT;

ALTER TABLE metricOptionalTraining
CHANGE id idMetricOptionalTraining INT NOT NULL AUTO_INCREMENT;

ALTER TABLE training
ADD date DATE;

ALTER TABLE training
MODIFY date DATE NOT NULL;

SELECT * FROM training t
    LEFT JOIN typeOfTraining tp ON tp.id = t.idTypeOfTraining
    LEFT JOIN metricTraining mt ON mt.idTraining = t.id
    LEFT JOIN metricHealthTraining mht ON mht.idTraining = t.id
    LEFT JOIN metricOptionalTraining mot ON mot.idTraining = t.id
         WHERE t.idMember = 8 ORDER BY t.date DESC ;

ALTER TABLE user
ADD roles json NOT NULL;

UPDATE user SET roles ='["ROLE_ADMIN", "ROLE_USER"]' where user.id = 21;
UPDATE user SET roles ='["ROLE_ADMIN"]' where user.id = 1;

ALTER TABLE fonctionnalites
    DROP name,
    ADD text text NOT NULL;

ALTER TABLE fonctionnalites
    ADD isActive boolean NOT NULL default true;

INSERT INTO fonctionnalites (text, date)
    VALUES ('test', '2023-04-09');

ALTER TABLE fonctionnalites
    DROP text,
    ADD description text NOT NULL;


ALTER TABLE fonctionnalites
    ADD name varchar(60) NOT NULL;

ALTER TABLE user
    ADD emailVerify boolean NOT NULL default false;

UPDATE user SET emailVerify =1 where user.id > 0;
