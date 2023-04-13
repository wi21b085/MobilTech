-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2023 at 07:14 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mobiltechdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `o_datum` date NOT NULL DEFAULT current_timestamp(),
  `endpreis` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `anzahl` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produkte`
--

DROP TABLE IF EXISTS `produkte`;
CREATE TABLE `produkte` (
  `id` int(11) NOT NULL,
  `firma` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `bild` varchar(255) DEFAULT NULL,
  `preis` decimal(10,2) NOT NULL,
  `kurzbeschreibung` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `bewertung` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produkte`
--
-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `anrede` varchar(255) NOT NULL,
  `vorname` varchar(255) NOT NULL,
  `nachname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `plz` int(11) NOT NULL,
  `ort` varchar(255) NOT NULL,
  `zahlung` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `admin` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--
-- --------------------------------------------------------

--
-- Table structure for table `verlauf`
--

DROP TABLE IF EXISTS `verlauf`;
CREATE TABLE `verlauf` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `produkt_id` int(11) NOT NULL,
  `menge` int(11) NOT NULL,
  `preis` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `verlauf`
--
DROP TRIGGER IF EXISTS `ORDER_ANZAHL`;
DELIMITER $$
CREATE TRIGGER `ORDER_ANZAHL` AFTER DELETE ON `verlauf` FOR EACH ROW UPDATE orders SET anzahl = (SELECT sum(menge) FROM verlauf WHERE orders.id = verlauf.order_id)
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `ORDER_ANZAHL_insert`;
DELIMITER $$
CREATE TRIGGER `ORDER_ANZAHL_insert` AFTER INSERT ON `verlauf` FOR EACH ROW UPDATE orders SET anzahl = (SELECT sum(menge) FROM verlauf WHERE orders.id = verlauf.order_id)
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `SUM`;
DELIMITER $$
CREATE TRIGGER `SUM` AFTER DELETE ON `verlauf` FOR EACH ROW UPDATE orders SET endpreis = (SELECT sum(preis) FROM verlauf WHERE orders.id = verlauf.order_id)
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `SUM_insert`;
DELIMITER $$
CREATE TRIGGER `SUM_insert` AFTER INSERT ON `verlauf` FOR EACH ROW UPDATE orders SET endpreis = (SELECT sum(preis) FROM verlauf WHERE orders.id = verlauf.order_id)
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `u_id` (`u_id`);

--
-- Indexes for table `produkte`
--
ALTER TABLE `produkte`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email` (`username`,`email`);

--
-- Indexes for table `verlauf`
--
ALTER TABLE `verlauf`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `produkt_id` (`produkt_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produkte`
--
ALTER TABLE `produkte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `verlauf`
--
ALTER TABLE `verlauf`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `verlauf`
--
ALTER TABLE `verlauf`
  ADD CONSTRAINT `verlauf_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `verlauf_ibfk_2` FOREIGN KEY (`produkt_id`) REFERENCES `produkte` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
