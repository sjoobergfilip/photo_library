# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: eu-cdbr-west-03.cleardb.net (MySQL 5.6.47-log)
# Database: heroku_b728bd85fda2fea
# Generation Time: 2020-06-02 18:19:30 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table albums
# ------------------------------------------------------------

DROP TABLE IF EXISTS `albums`;

CREATE TABLE `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;

INSERT INTO `albums` (`id`, `title`, `user_id`)
VALUES
	(1,'Fotbollsbilder',5),
	(2,'Bandybilder',5),
	(3,'Övriga Sportbilder',6),
	(4,'Manchester United',7),
	(18,'Ett nytt album',7),
	(19,'Ett nytt album igen',7),
	(20,'Ett nytt album igen haha',7),
	(21,'Vetlanda Igen och igen',5);

/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table albums_photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `albums_photos`;

CREATE TABLE `albums_photos` (
  `album_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `albums_photos` WRITE;
/*!40000 ALTER TABLE `albums_photos` DISABLE KEYS */;

INSERT INTO `albums_photos` (`album_id`, `photo_id`)
VALUES
	(20,18),
	(4,18),
	(3,19),
	(21,20),
	(3,20),
	(3,21);

/*!40000 ALTER TABLE `albums_photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;

INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `user_id`)
VALUES
	(17,'Utan album','https://cdn.pixabay.com/photo/2014/04/14sdf12/44/sfsadfasdfstsdfadium-323795_1280.jpg','mitt vackra hem igen',5),
	(18,'Fikastund','https://cdn.pixabay.com/photo/2014/04/14/12/44/stadium-323795_1280.jpg','titta vad trevligt vi har det',7),
	(19,'Funny picture','https://cdn.pixabay.com/photo/2015/03/14/19/45/suit-673697_1280.jpg','Detta är Old Trafford',6),
	(20,'Funny car','https://cdn.pixabay.com/photo/2015/03/14/19/45/suit-6713697_1280.jpg','This was funny',6),
	(21,'Funny dog','https://cdn.pixabay.com/photo/2015/03/14/19/45/suit-671f3697_1280.jpg','This was funny',6);

/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`)
VALUES
	(5,'filips@gmail.com','$2b$10$rM2qjuASStj7fdwD9zn6d.nZ.FcTDlANf4cmH3VyP9qMLXpGjIpxe','Fil','Sjö'),
	(6,'johans@mail.com','$2b$10$Dl5PorlrRdPe.QcMbPwAn.NZHcjhDGL5gUzFIoSros8DN.obpC0gq','Johan','Johan'),
	(7,'test@mail.com','$2b$10$iKCbV1f1Hk5am/0hT4jWquDMqatcd6.qnPkHjqEahsd8b8Bz33xIy','Bengt','Bengtsson'),
	(8,'vetlanda@mail.com','$2b$10$n.zuvyoC0v0nQMBvs1JDB.BqCQCSZUNaxQ13V1h73aD4x5u.wUNei','Vetlanda','Vetlandasson');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
