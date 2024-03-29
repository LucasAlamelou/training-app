/* 
* A excuter dans dataGrip
* Crée la base de donnée
*/
CREATE DATABASE IF NOT EXISTS training_app_dev;

/* 
* Créer les tables user, member, healthMember, performanceMember
* Avec une relation one to one
*/
CREATE TABLE IF NOT EXISTS user
(
    id INT  NOT NULL AUTO_INCREMENT,
    email varchar(200) NOT NULL,
    hash varchar(200) NOT NULL,
    salt varchar(200) NOT NULL,
    roles json NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
)DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS member
(
    id INT NOT NULL AUTO_INCREMENT,
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL,
    dateOfBirth DATE NOT NULL,
    adress varchar(255) NULL,
    zipCode INT NULL,
    city varchar(255) NULL,
    country varchar(100) NULL,
    userId INT,
    PRIMARY KEY (id),
    CONSTRAINT FK_User_Key_Forgein FOREIGN KEY(userId) REFERENCES user(id) ON DELETE CASCADE
)DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS healthMember
(
    idHealthMember INT NOT NULL AUTO_INCREMENT,
    weight INT NULL,
    height INT NULL,
    hourSleep TIME NULL,
    memberId INT,
    PRIMARY KEY (idHealthMember),
    FOREIGN KEY (memberId) REFERENCES member(id)
)DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS performanceMember
(
    idPerformanceMember INT NOT NULL AUTO_INCREMENT,
    vo2max INT NULL,
    seuilLactateFC INT NULL,
    seuilLactate varchar(100) NULL,
    fcRest INT NULL,
    fcMax INT NULL,
    vma FLOAT NULL,
    favoriteSport varchar(100) NOT NULL,
    memberId INT,
    PRIMARY KEY (idPerformanceMember),
    FOREIGN KEY (memberId) REFERENCES member(id)
)DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB;

/* 
* Créer la table typeOfTraining
*/
CREATE TABLE IF NOT EXISTS typeOfTraining
(
    id INT NOT NULL AUTO_INCREMENT,
    nameSport varchar(100) NOT NULL,
    PRIMARY KEY (id)
)DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB;

/* 
* Créer les training, metricTraining, metricHealthTraining, metricOptionalTraining
* Avec une relation one to one
* La table training est liée à member
*/
CREATE TABLE IF NOT EXISTS training
(
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    note varchar(250) NULL,
    along TIME NULL,
    city varchar(100) NULL,
    country varchar(100) NULL,
    date DATE NOT NULL,
    idTypeOfTraining INT NOT NULL,
    idMember INT,
    PRIMARY KEY (id),
    FOREIGN KEY (idMember) REFERENCES member(id) ON DELETE SET NULL,
    FOREIGN KEY (idTypeOfTraining) REFERENCES typeOfTraining(id)
)DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS metricTraining
(
    idMetricTraining INT NOT NULL AUTO_INCREMENT,
    km FLOAT NULL,
    moyPerKm TIME NULL,
    speedMoy FLOAT NULL,
    speedMax FLOAT NULL,
    idTraining INT NOT NULL,
    PRIMARY KEY (idMetricTraining),
    FOREIGN KEY (idTraining) REFERENCES training(id) ON DELETE CASCADE
)DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS metricHealthTraining
(
    idMetricHealthTraining INT NOT NULL AUTO_INCREMENT,
    fcMoy INT NULL,
    fcMax INT NULL,
    idTraining INT NOT NULL,
    PRIMARY KEY (idMetricHealthTraining),
    FOREIGN KEY (idTraining) REFERENCES training(id) ON DELETE CASCADE
)DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS metricOptionalTraining
(
    idMetricOptionalTraining INT NOT NULL AUTO_INCREMENT,
    hikeUp INT NULL,
    hikeDown INT NULL,
    cadenceMoy INT NULL,
    cadenceMax INT NULL,
    moyForSwim TIME NULL,
    idTraining INT NOT NULL,
    PRIMARY KEY (idMetricOptionalTraining),
    FOREIGN KEY (idTraining) REFERENCES training(id) ON DELETE CASCADE
)DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS fonctionnalites
(
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(60) NOT NULL,
    description text NOT NULL,
    date DATE NOT NULL,
    updateDate DATE NULL,
    isActive boolean NOT NULL default false,
    PRIMARY KEY (id)
)DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB;