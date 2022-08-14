CREATE DATABASE  IF NOT EXISTS `vacations_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations_app`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacations_app
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followed_vacations`
--

DROP TABLE IF EXISTS `followed_vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followed_vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vac_id` int NOT NULL,
  `user_id` int NOT NULL,
  `follow_status` varchar(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `vac_id_idx` (`vac_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vac_id` FOREIGN KEY (`vac_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followed_vacations`
--

LOCK TABLES `followed_vacations` WRITE;
/*!40000 ALTER TABLE `followed_vacations` DISABLE KEYS */;
INSERT INTO `followed_vacations` VALUES (47,59,2,'follow','2022-08-08 12:00:07'),(48,4,2,'follow','2022-08-08 12:00:46'),(49,5,2,'follow','2022-08-08 12:00:54'),(50,60,2,'follow','2022-08-08 12:00:56'),(51,1,2,'follow','2022-08-08 12:01:05'),(52,3,2,'follow','2022-08-08 12:01:07'),(53,2,2,'follow','2022-08-08 12:01:09'),(54,56,2,'follow','2022-08-08 12:01:30'),(55,6,2,'follow','2022-08-08 12:01:32'),(66,59,43,'follow','2022-08-10 17:32:09'),(67,60,43,'follow','2022-08-10 17:32:10'),(68,67,43,'follow','2022-08-10 17:32:13'),(69,88,43,'follow','2022-08-10 17:32:16'),(70,87,43,'unfollow','2022-08-10 17:33:07'),(71,5,43,'follow','2022-08-10 19:50:35');
/*!40000 ALTER TABLE `followed_vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(15) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `user_name` varchar(16) NOT NULL,
  `password` char(32) NOT NULL,
  `role` varchar(10) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'shay','dvir','shayd','c4ca4238a0b923820dcc509a6f75849b','admin','shayd@gmail.com'),(2,'chen ','f','ff','b59c67bf196a4758191e42f76670ceba',NULL,'hgj@gg.com'),(43,'david','davidi','david','202cb962ac59075b964b07152d234b70',NULL,'davidi@gmail.com'),(44,'aviv','avivi','avivi','81dc9bdb52d04dc20036dbd8313ed055',NULL,'avivi@gmail.com'),(45,'roi','roi','roi','376d4fbab658b63ef8b7da3c6fc3ad17',NULL,'roi@hotmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(500) DEFAULT NULL,
  `destination` varchar(30) NOT NULL,
  `image` varchar(10000) DEFAULT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `price` int DEFAULT NULL,
  `ammount_of_followers` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Maldives, officially the Republic of Maldives, is an archipelagic state located in Southern Asia, situated in the Indian Ocean. It lies southwest of Sri Lanka and India, about 750 kilometres from the Asian continent\'s mainland','Maldives','https://pix8.agoda.net/hotelImages/13801511/-1/d96744f1a91a5db0678462eedd46756c.jpg?ca=11&ce=1&s=1024x','2023-12-20','2027-12-20',2000,1),(2,'Panama is a country on the isthmus linking Central and South America. The Panama Canal, a famous feat of human engineering, cuts through its center, linking the Atlantic and Pacific oceans to create an essential shipping route. In the capital, Panama City, modern skyscrapers, casinos and nightclubs contrast with colonial buildings in the Casco Viejo district and the rainforest of Natural Metropolitan Park','Panama','https://www.researchgate.net/profile/Ahmed-Mohmed-2/post/Why_do_we_need_a_vacation_How_often_do_you_need_a_vacationWhat_are_the_benefits_of_vacationsDo_vacations_make_you_happier/attachment/5e079b76cfe4a777d4fedc26/AS%3A841148566339584%401577556854285/image/vacation-final.jpg','2022-06-27','2022-07-09',3000,1),(3,'Unguja, also known as Zanzibar Island, is the main island in the Tanzanian archipelago of Zanzibar. Stone Town, part of Zanzibar City, is an old trade center, with mosques and winding lanes. The 1883 House of Wonders is a former sultan’s palace with a clock tower. The Old Fort now houses a cultural center and a stone amphitheater. Underground aqueducts fed hot water to the late-19th-century Hamamni Persian Baths','Zanzibar','https://www.incimages.com/uploaded_files/image/1920x1080/getty_167167350_9706479704500183_94071.jpg','2022-06-27','2022-07-09',10000,1),(4,'Morocco, a North African country bordering the Atlantic Ocean and Mediterranean Sea, is distinguished by its Berber, Arabian and European cultural influences. Marrakesh’s medina, a mazelike medieval quarter, offers entertainment in its Djemaa el-Fna square and souks (marketplaces) selling ceramics, jewelry and metal lanterns. The capital Rabat’s Kasbah of the Udayas is a 12th-century royal fort overlooking the water','Morocco','https://images.unsplash.com/photo-1517315403381-a12569a9da85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDE4Nzd8MHwxfHNlYXJjaHwxfHxNb3JvY2NvfGVufDB8fHx8MTY1Nzk5ODQyMA&ixlib=rb-1.2.1&q=80&w=400','2022-05-15','2022-05-30',25000,1),(5,'Brazil, officially the Federative Republic of Brazil, is the largest country in both South America and Latin America. At 8.5 million square kilometers and with over 214 million people, Brazil is the world\'s fifth-largest country by area and the seventh most populous','Brazil','https://images.unsplash.com/photo-1483729558449-99ef09a8c325?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDE4Nzd8MHwxfHNlYXJjaHwxfHxCcmF6aWx8ZW58MHx8fHwxNjU3OTk4NDUx&ixlib=rb-1.2.1&q=80&w=400','2022-01-10','2022-01-20',15000,2),(6,'Thailand is a Southeast Asian country. It\'s known for tropical beaches, opulent royal palaces, ancient ruins and ornate temples displaying figures of Buddha. In Bangkok, the capital, an ultramodern cityscape rises next to quiet canalside communities and the iconic temples of Wat Arun, Wat Pho and the Emerald Buddha Temple (Wat Phra Kaew). Nearby beach resorts include bustling Pattaya and fashionable Hua Hin','Thailand','https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDE4Nzd8MHwxfHNlYXJjaHwxfHxUaGFpbGFuZHxlbnwwfHx8fDE2NTc5OTg0ODM&ixlib=rb-1.2.1&q=80&w=400','2021-01-05','2021-01-31',10000,1),(56,'Romania is a southeastern European country known for the forested region of Transylvania, ringed by the Carpathian Mountains. Its preserved medieval towns include Sighişoara, and there are many fortified churches and castles, notably clifftop Bran Castle, long associated with the Dracula legend. Bucharest, the country’s capital, is the site of the gigantic, Communist-era Palatul Parlamentului government building','Romania','https://images.unsplash.com/photo-1534371020656-6b85825f2b1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDE4Nzd8MHwxfHNlYXJjaHwxfHxSb21hbmlhfGVufDB8fHx8MTY2MDA2MzMyMA&ixlib=rb-1.2.1&q=80&w=400','2022-02-02','2022-03-03',2000,1),(59,'Berlin, Germany’s capital, dates to the 13th century. Reminders of the city\'s turbulent 20th-century history include its Holocaust memorial and the Berlin Wall\'s graffitied remains. Divided during the Cold War, its 18th-century Brandenburg Gate has become a symbol of reunification. The city\'s also known for its art scene and modern landmarks like the gold-colored, swoop-roofed Berliner Philharmonie, built in 1963','Berlin','https://www.researchgate.net/profile/Ahmed-Mohmed-2/post/Why_do_we_need_a_vacation_How_often_do_you_need_a_vacationWhat_are_the_benefits_of_vacationsDo_vacations_make_you_happier/attachment/5e079b76cfe4a777d4fedc26/AS%3A841148566339584%401577556854285/image/vacation-final.jpg','2021-01-05','2022-01-20',10000,2),(60,'Amsterdam is the Netherlands’ capital, known for its artistic heritage, elaborate canal system and narrow houses with gabled facades, legacies of the city’s 17th-century Golden Age. Its Museum District houses the Van Gogh Museum, works by Rembrandt and Vermeer at the Rijksmuseum, and modern art at the Stedelijk. Cycling is key to the city’s character, and there are numerous bike paths','Amsterdam','https://images.unsplash.com/photo-1534351590666-13e3e96b5017?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDE4Nzd8MHwxfHNlYXJjaHwxfHxhbXN0ZXJkYW18ZW58MHx8fHwxNjU5NDY1Mjcw&ixlib=rb-1.2.1&q=80&w=400','2022-01-01','2022-01-02',12000,2),(67,'Hawaii is a state in the Western United States, located in the Pacific Ocean about 2,000 miles from the U.S. mainland. It is the only U.S. state outside North America, the only state that is an archipelago, and the only state in the tropics.','Hawai','https://images.unsplash.com/photo-1649226900522-3679fd4f801b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDE4Nzd8MHwxfHNlYXJjaHwxfHxIYXdhaXxlbnwwfHx8fDE2NjAwNjUyMDM&ixlib=rb-1.2.1&q=80&w=400','2022-01-01','2022-10-10',25000,1),(87,'Madrid, Spain\'s central capital, is a city of elegant boulevards and expansive, manicured parks such as the Buen Retiro. It’s renowned for its rich repositories of European art, including the Prado Museum’s works by Goya, Velázquez and other Spanish masters. The heart of old Hapsburg Madrid is the portico-lined Plaza Mayor, and nearby is the baroque Royal Palace and Armory, displaying historic weaponry','Madrid','https://images.unsplash.com/photo-1509845350455-fb0c36048db1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDE4Nzd8MHwxfHNlYXJjaHwxfHxNYWRyaWR8ZW58MHx8fHwxNjYwMTQ2NDI0&ixlib=rb-1.2.1&q=80&w=400','2022-08-24','2022-08-28',2000,0),(88,'Barcelona, the cosmopolitan capital of Spain’s Catalonia region, is known for its art and architecture. The fantastical Sagrada Família church and other modernist landmarks designed by Antoni Gaudí dot the city. Museu Picasso and Fundació Joan Miró feature modern art by their namesakes. City history museum MUHBA, includes several Roman archaeological sites','Barcelona','https://images.unsplash.com/photo-1464790719320-516ecd75af6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDE4Nzd8MHwxfHNlYXJjaHwxfHxCYXJjZWxvbmF8ZW58MHx8fHwxNjYwMTQ2NDYx&ixlib=rb-1.2.1&q=80&w=400','2022-08-15','2022-08-23',4000,1);
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-11 19:29:40
