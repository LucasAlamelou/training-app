/*
* Insert dans la table user Attention ici mot de passe non hash
*/
INSERT INTO user (email, password)
 VALUES ('admin@admin.com', 'admin'),
        ('user1@user.com', 'user1');

/*
* Insert dans la table member attention première création index à 1 et 2
*/
INSERT INTO member (firstName, lastName, dateOfBirth, adress, zipCode, city, country, userId)
 VALUES ('Lucas', 'Alamelou', '1999/07/17', '1 rue de paris', 75000, 'Paris', 'France', 1),
        ('User1', 'User1', '1999/07/17', '1 rue de paris', 75000, 'Paris', 'France', 2);

INSERT INTO healthMember (weight, height, hourSleep, memberId)
 VALUES (75, 185, '5:00', 1),
        (60, 175, '8:00', 2);       

INSERT INTO performanceMember (vo2max, seuilLactateFC, seuilLactate, fcRest, fcMax, vma, favoriteSport, memberId)
 VALUES (60, 171, '3:50', 44, 190, 18, 'Course à pied', 1),
        (null, null, null, 45, 200, null, 'Natation', 2);

/*
* Insert dans la table type d'entrainement
*/
INSERT INTO typeOfTraining (name)
 VALUES ('Course à pied'),
        ('Natation'),
        ('Vélo de route'),
        ('Trail'),
        ('Escalade');

/*
* Insert dans les tables d'entrainement
*/
INSERT INTO training (name, note, along, city, country, idTypeOfTraining, idMember)
 VALUES ('Course à pied Paris', null, '1:30', 'Paris', 'France', 1, 1),
        ('Natation Paris', null, '2:00', 'Paris', 'France', 2, 2);

INSERT INTO metricHealthTraining (fcMoy, fcMax, idTraining)
 VALUES (150, 190, 1),
        (160, null, 2);

INSERT INTO metricTraining (km, moyPerKm, speedMoy, speedMax, idTraining)
 VALUES (12.46, '00:05:30', 12.00, 14.30, 1 ),
        (3.4, null, null, null, 2 );

INSERT INTO metricOptionalTraining (hikeUp, hikeDown, moyForSwim, idTraining)
 VALUES (150, 135, null, 1 ),
        (null, null, '00:01:40', 2 );
     
