-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2023 at 08:55 PM
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
  `o_datum` datetime NOT NULL DEFAULT current_timestamp(),
  `endpreis` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `anzahl` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `o_datum`, `endpreis`, `u_id`, `anzahl`) VALUES
(95, '2023-06-17', 7500, 3, 3),
(96, '2023-06-17', 5600, 3, 3),
(97, '2023-06-17', 3800, 3, 2),
(98, '2023-06-17', 3700, 3, 3),
(99, '2023-06-17', 6400, 3, 4);

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

INSERT INTO `produkte` (`id`, `firma`, `name`, `bild`, `preis`, `kurzbeschreibung`, `text`, `bewertung`) VALUES
(1, 'Apple', 'iPhone X', '../../backend/products/iphone.jpg', '800.00', '.........', '................', 1),
(2, 'Samsung', 'Galaxy S9', '../../backend/products/s9.jpg', '1100.00', '.....', '..........', 2),
(3, 'Apple', 'Iphone 12', '../../backend/products/iphone.jpg', '1800.00', '.........', '................', 0),
(4, 'Samsung', 'Galaxy S20', '../../backend/products/s9.jpg', '1500.00', '.....', '..........', 3),
(5, 'Apple', 'iPhone 13', '../../backend/products/iphone.jpg', '800.00', '.........', '................', 0),
(6, 'Samsung', 'Galaxy S21', '../../backend/products/s9.jpg', '1100.00', '.....', '..........', 5),
(7, 'Apple', 'iPhone 14 Pro', '../../backend/products/iphone.jpg', '1800.00', '.........', '................', 4),
(8, 'Samsung', 'Galaxy S22 Ultra', '../../backend/products/s9.jpg', '1500.00', '.....', '..........', 5);

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

INSERT INTO `user` (`id`, `anrede`, `vorname`, `nachname`, `username`, `email`, `password`, `adresse`, `plz`, `ort`, `zahlung`, `status`, `admin`) VALUES
(1, 'keine Angabe', 'Admin', 'Admin', 'admin', 'admin@admin.at', '$2y$10$PJ2c1Q6hn6Vm2wTILPZeguuZbz0Xf.cRROIPMAzmJtVI4VntlPIvG', 'Adminstraße 6', 1234, 'Wien', 'AT00 1200 0000 0000 0000', 1, 1),
(2, 'Herr', 'Kevin', 'Xhunga', 'wi21b025', 'wi21b025@technikum-wien.at', '$2y$10$PJ2c1Q6hn6Vm2wTILPZeguuZbz0Xf.cRROIPMAzmJtVI4VntlPIvG', 'Musteradresse', 1100, 'Wien', 'AT00 1200 0000 0000 0000', 1, 1),
(3, 'keine Angabe', 'Test', 'User', 'user', 'user@mail.com', '$2y$10$.VCIiip3DEAXnmAhqK4/hOib1kAZrrbGMoPlJcxKdsrPs4grmtPtu', 'Heimstraße 12', 1234, 'Wien', 'AT00 1200 0000 0000 0000', 1, 0),
(4, 'Frau', 'Nahid', 'Nourani', 'wi21b089', 'wi21b089@technikum-wien.at', '$2y$10$vx2u.jt2Hwb3hevnLu4E1uU8I4HlI8MxuXL6602GSFpLVnqDcgVaW', 'Heimstraße 12', 1234, 'Wien', 'AT00 1200 0000 0000 0000', 1, 0),
(5, 'Herr', 'Hadi', 'Heydari', 'wi21b085', 'wi21b085@technikum-wien.at', '$2y$10$7.MsEeMM8UMTvXfX8IBhUuElyzpcRaAytjhnz7gQjtGkH9HddzIm6', 'Heimstraße 12', 1234, 'Wien', 'AT00 1200 0000 0000 0000', 1, 0);

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
-- Dumping data for table `verlauf`
--

INSERT INTO `verlauf` (`id`, `order_id`, `produkt_id`, `menge`, `preis`) VALUES
(1, 95, 2, 3, 1100),
(2, 95, 1, 3, 800),
(3, 95, 3, 1, 1800),
(4, 96, 1, 2, 800),
(5, 96, 2, 2, 1100),
(6, 96, 3, 1, 1800),
(7, 97, 1, 2, 800),
(8, 97, 2, 2, 1100),
(9, 98, 1, 1, 800),
(10, 98, 2, 1, 1100),
(11, 98, 3, 1, 1800),
(12, 99, 1, 2, 800),
(13, 99, 2, 2, 1100),
(14, 99, 3, 1, 1800),
(15, 99, 5, 1, 800);

--
-- Triggers `verlauf`
--
DROP TRIGGER IF EXISTS `ORDER_ANZAHL`;
DELIMITER $$
CREATE TRIGGER `ORDER_ANZAHL` AFTER DELETE ON `verlauf` FOR EACH ROW UPDATE orders SET anzahl = (SELECT count(menge) FROM verlauf WHERE orders.id = verlauf.order_id)
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `ORDER_ANZAHL_insert`;
DELIMITER $$
CREATE TRIGGER `ORDER_ANZAHL_insert` AFTER INSERT ON `verlauf` FOR EACH ROW UPDATE orders SET anzahl = (SELECT count(menge) FROM verlauf WHERE orders.id = verlauf.order_id)
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `SUM`;
DELIMITER $$
CREATE TRIGGER `SUM` AFTER DELETE ON `verlauf` FOR EACH ROW UPDATE orders SET endpreis = (SELECT sum(preis*menge) FROM verlauf WHERE orders.id = verlauf.order_id)
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `SUM_insert`;
DELIMITER $$
CREATE TRIGGER `SUM_insert` AFTER INSERT ON `verlauf` FOR EACH ROW UPDATE orders SET endpreis = (SELECT sum(preis*menge) FROM verlauf WHERE orders.id = verlauf.order_id)
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `produkte`
--
ALTER TABLE `produkte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `verlauf`
--
ALTER TABLE `verlauf`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
