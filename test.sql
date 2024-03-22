-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for test
CREATE DATABASE IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `test`;

-- Dumping structure for table test.marketing
CREATE TABLE IF NOT EXISTS `marketing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table test.marketing: ~3 rows (approximately)
INSERT INTO `marketing` (`id`, `Name`) VALUES
	(1, 'Alfandy'),
	(2, 'Mery'),
	(3, 'Danang');

-- Dumping structure for table test.penjualan
CREATE TABLE IF NOT EXISTS `penjualan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transaction_number` varchar(50) DEFAULT NULL,
  `marketing_Id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `cargo_fee` int DEFAULT NULL,
  `total_balance` int DEFAULT NULL,
  `grand_total` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `marketing_Id` (`marketing_Id`),
  CONSTRAINT `FK_penjualan_marketing` FOREIGN KEY (`marketing_Id`) REFERENCES `marketing` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table test.penjualan: ~12 rows (approximately)
INSERT INTO `penjualan` (`id`, `transaction_number`, `marketing_Id`, `date`, `cargo_fee`, `total_balance`, `grand_total`) VALUES
	(1, 'TRX001', 1, '2023-05-22', 25000, 3000000, 3025000),
	(2, 'TRX002', 3, '2023-05-22', 25000, 320000, 345000),
	(3, 'TRX003', 1, '2023-05-22', 0, 65000000, 65000000),
	(4, 'TRX004', 1, '2023-05-23', 10000, 70000000, 70010000),
	(5, 'TRX005', 2, '2023-05-23', 10000, 80000000, 80010000),
	(6, 'TRX006', 3, '2023-05-23', 12000, 44000000, 44012000),
	(7, 'TRX007', 1, '2023-06-01', 0, 75000000, 75000000),
	(8, 'TRX008', 2, '2023-06-02', 0, 85000000, 85000000),
	(9, 'TRX009', 2, '2023-06-01', 0, 175000000, 175000000),
	(10, 'TRX010', 3, '2023-06-01', 0, 75000000, 75000000),
	(11, 'TRX011', 2, '2023-06-01', 0, 750020000, 750020000),
	(12, 'TRX012', 3, '2023-06-01', 0, 130000000, 12000000);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
