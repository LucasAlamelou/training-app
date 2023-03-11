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

ALTER TABLE user
ADD hash varchar(200),
ADD salt varchar(200),
DROP COLUMN password;