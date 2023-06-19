-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Erstellungszeit: 19. Jun 2023 um 12:12
-- Server-Version: 5.7.34
-- PHP-Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `mobiltechdb`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `o_datum` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `endpreis` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `anzahl` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `orders`
--

INSERT INTO `orders` (`id`, `o_datum`, `endpreis`, `u_id`, `anzahl`) VALUES
(95, '2023-06-17 00:00:00', 7500, 3, 3),
(96, '2023-06-17 00:00:00', 5600, 3, 3),
(97, '2023-06-17 00:00:00', 3800, 3, 2),
(98, '2023-06-17 00:00:00', 3700, 3, 3),
(99, '2023-06-17 00:00:00', 6400, 3, 4);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `produkte`
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
  `bewertung` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `produkte`
--

INSERT INTO `produkte` (`id`, `firma`, `name`, `bild`, `preis`, `kurzbeschreibung`, `text`, `bewertung`) VALUES
(1, 'Apple', 'iPhone SE', '../../backend/products/IMG-648f7b744e8f27.39350841.jpg', '549.00', 'Apple Smartphone »iPhone SE (2022), 5G«, 64GB, Polarstern, 11,94 cm/4,7 Zoll, 12 MP Kamera', '4,7&quot; Retina HD Display (11,94 cm Diagonale)\r\nFortschrittliches Ein‐Kamera-System mit 12 MP Weitwinkel-Kamera, Smart HDR 4, Fotografische Stile, Porträtmodus und 4K Video bis zu 60 fps\r\n7 MP FaceTime HD Kamera mit Smart HDR 4, Fotografische Stile, Porträtmodus und 1080p Videoaufnahme\r\nA15 Bionic Chip für superschnelle Performance\r\n5G Mobilfunk', 1),
(2, 'Samsung', 'Galaxy A54', '../../backend/products/IMG-648f7af226d335.52656728.jpg', '449.00', 'Samsung Smartphone »Galaxy A54 5G 128GB«, grün, 16,31 cm/6,4 Zoll, 128 GB Speicherplatz, 50 MP Kamera', '16,31 cm / 6,4&quot; Super AMOLED Touchscreen Display, 2340 x 1080 Pixel\r\n50 MP + 32 MP + 12 MP + 5 MP Kamera mit Autofokus und Fotolicht\r\nAndroid 13, One UI 5.1, KNOX 3.9, 128GB int. Speicher, erweiterbar mit microSD-Karte auf 1000GB\r\nAkku: Lithium-Ionen, 5000 mAh\r\n5G, NFC, WLAN, Bluetooth, Gorilla-Glas\r\nBeim Streamen chillen, kreative Stories posten und immer den direkten Draht zu deinen Freunden haben: Für vieles, was dir die Welt bedeutet, brauchst du ein starkes Smartphone an deiner Seite. Ein Smartphone wie das Galaxy A54 5G. Genieße auf dem klaren FHD+-Display alles, was dich inspiriert. Selbst in sehr hellen Umgebungen kannst du entspannt in deine Inhalte eintauchen. Mit seinem schlanken Design ist das Galaxy A54 5G nicht nur dein attraktiver Begleiter, sondern liegt auch angenehm in deiner Hand. Du willst selbst kreativ werden und anderen deinen Lifestyle präsentieren? Dann nutzte die Möglichkeiten der hochauflösenden Kamera. Die detailstarken Fotos und actionreichen Videos warten nur darauf, geteilt zu werden. Apropos teilen: Der leistungsstarke Akku sorgt dafür, dass du am Ball bleibst, wenn es in deiner Community spannend wird. Damit bist du bereit für den nächsten Live-Stream oder die gemeinsame Gaming-Session. Wie bunt deine Welt sein darf, bestimmst du selbst. Setze auf zeitlose Eleganz oder zeige dein Gespür für natürliche, trendige Farben.', 2),
(3, 'Apple', 'iPhone 12', '../../backend/products/IMG-648f7c1a3aa876.54750485.jpg', '699.99', 'Apple Smartphone »iPhone 12, 5G«, 64GB, purple, 15,5 cm/6,1 Zoll, 12 MP Kamera', '15,5 cm (6.1 Zoll) 2532 x 1170 Pixel\r\n12 MP/12 MP\r\nohne Strom-Adapter und Kopfhörer\r\nMagSafe für schnelleres Laden - Gleich mitbestellen\r\n', 0),
(4, 'Samsung', 'Galaxy S23', '../../backend/products/IMG-648f7c938c1eb1.47899855.jpg', '969.99', 'Samsung Smartphone »Galaxy S23, 256 GB«, LIGHT PINK, 15,39 cm/6,1 Zoll, 256 GB Speicherplatz, 50 MP Kamera', '15,39 cm / 6,1&quot; Dynamic AMOLED Touchscreen Display, 2340 x 1080 Pixel\r\n50 MP + 12 MP + 10 MP mit Autofokus und Fotolicht\r\nAndroid 13, 256 GB int. Speicher\r\nGesprächszeit bis zu 35 Std. (4G), Akku: Li-Ion, 3900 mAh, Netzadapter nicht im Lieferumfang, bitte separat bestellen\r\n5G, LTE, NFC, WLAN, Bluetooth, Gorilla-Glas', 3),
(5, 'Apple', 'iPhone 13 pro', '../../backend/products/IMG-648f7d20082713.13910897.jpg', '1792.99', 'Apple Smartphone »iPhone 13 Pro, 1 TB«, Alpingrün, 15,4 cm/6,1 Zoll, 12 MP Kamera', '15,4 cm / 6,1&quot; OLED Touchscreen Display, 2532 x 1170 Pixel\r\n12 Megapixel Kamera mit 15-fach Zoom\r\niOS 15\r\nAkku: Lithium-Ionen\r\n', 0),
(6, 'Samsung', 'Galaxy S21', '../../backend/products/IMG-648f7dbae1eda6.81313725.jpg', '749.00', 'Samsung Smartphone »Galaxy S21 FE 5G«, Graphite, 16,29 cm/6,4 Zoll, 128 GB Speicherplatz, 12 MP Kamera', '16,29 cm / 6,4&quot; Dynamic AMOLED Touchscreen Display, 2340 x 1080 Pixel\r\n12 MP + 12 MP + 8 MP Kamera mit Autofokus und 30-fach Zoom\r\nAndroid 12.0,OneUI 4.1,Knox 3.8, 128GB int. Speicher\r\nGesprächszeit bis zu 37 Std. (4G), Akku: Lithium-Ionen (Li-Ion), 4500 mAh, Ladeadapter nicht im Lieferumfang enthalten\r\n5G, NFC, WLAN, Bluetooth, Gorilla-Glas Victus', 5),
(7, 'Apple', 'iPhone 14 Pro', '../../backend/products/IMG-648f7e345b8094.12353971.jpg', '1159.00', 'iPhone 14 Pro, 128 GB, Gold', '6,1&quot; All‑Screen OLED Display\r\nSuper Retina XDR Display\r\nProMotion Technologie mit adaptiven Bildwiederhol­raten bis 120 Hz\r\nA16 Bionic Chip\r\n6‑Core CPU mit 2 Performance-Kernen und 4 Effizienz-Kernen\r\n', 4),
(8, 'Samsung', 'Galaxy S22 Ultra', '../../backend/products/IMG-648f7e9cad5278.15294823.jpg', '699.00', 'Samsung Smartphone »Galaxy S22«, grün, 15,39 cm/6,1 Zoll, 128 GB Speicherplatz, 50 MP Kamera', '6,1&quot; FHD+ Dynamic AMOLED 2X Infinity-O Flat-Display\r\nIntelligente Triple-Kamera: 50 MP Weitwinkelobjektiv + 10 MP Teleobjektiv+ 12 MP Ultra-Weitwinkelobjektiv\r\n3.700 mAh Akku mit 25 W Super Schnellladen\r\nWireless PowerShare\r\n8K Videoaufnahme mit Single Take und Regieansicht', 5),
(11, 'Huawei', 'P50 Pro', '../../backend/products/IMG-648f7f369c7be3.24131445.jpg', '1172.20', 'Huawei Smartphone »P50 Pro«, schwarz, 16,69 cm/6,6 Zoll', 'Dual-Matrix-Kamera\r\n6,6-Zoll-Bildschirm\r\nHUAWEI XD Optics\r\nHUAWEI XD Fusion Pro-Bild-Engine\r\nDas vereinfachte, geometrische Design des HUAWEI P50 Pro hebt die Dual-Matrix-Kamera des Smartphones wirklich hervor. Der große Bildschirm und der Akku passen in ein kompaktes Gehäuse und das HUAWEI P50 Pro ist leichter als die Vorgängergeneration, weshalb es besser in der Hand liegt. Der 6,6-Zoll-Bildschirm? wurde individuell abgestimmt, um dir eine lebensechte Welt zu zeigen. Es unterstützt eine Bildschirmaktualisierungsrate von 120 Hz? und eine Berührungsabtastrate von 300 Hz? wodurch ein reibungsloses Seherlebnis geboten wird. Die HUAWEI XD Optics ermöglicht die Smartphone-Fotografie mit besserer Klarheit, während die aktualisierte HUAWEI XD Fusion Pro-Bild-Engine dabei hilft, umfassende Bilddetails zu reproduzieren. Die Hauptkamera-Matrix zeigt dir eine Welt voller echter Farben und die SuperZoom-Matrix ist in der Lage, Bilder in wunderschöner Klarheit aufzunehmen unabhängig von der Entfernung. Lieferumfang: 1x HUAWEI P50 Pro schwarz 256GB VERFÜGBAR AB FEBRUAR 2022!', 0),
(12, 'Xiaomi', 'Redmi A2 ', '../../backend/products/IMG-648f846c556b40.38729307.jpg', '100.99', 'Xiaomi Smartphone »Redmi A2 2GB+32GB«, Hellblau, 16,6 cm/6,52 Zoll, 32 GB Speicherplatz, 8 MP Kamera', '16,56 cm (6,52 Zoll) HD+ DotDrop-Display\r\nRiesiger 5.000 mAh Akku für lange Nutzungsdauer\r\nMTK Helio G36 Octa-Core-Prozessor mit bis zu 2,2 GHz\r\n8 MP AI-Dual-Kamera und 5 MP Selfie-Kamera\r\n2 GB RAM und 32 GB interner Speicher', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
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
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `admin` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`id`, `anrede`, `vorname`, `nachname`, `username`, `email`, `password`, `adresse`, `plz`, `ort`, `zahlung`, `status`, `admin`) VALUES
(1, 'keine Angabe', 'Admin', 'Admin', 'admin', 'admin@admin.at', '$2y$10$PJ2c1Q6hn6Vm2wTILPZeguuZbz0Xf.cRROIPMAzmJtVI4VntlPIvG', 'Adminstraße 6', 1234, 'Wien', 'AT00 1200 0000 0000 0000', 1, 1),
(2, 'Herr', 'Kevin', 'Xhunga', 'wi21b025', 'wi21b025@technikum-wien.at', '$2y$10$PJ2c1Q6hn6Vm2wTILPZeguuZbz0Xf.cRROIPMAzmJtVI4VntlPIvG', 'Musteradresse', 1100, 'Wien', 'AT00 1200 0000 0000 0000', 1, 1),
(3, 'keine Angabe', 'Test', 'User', 'user', 'user@mail.com', '$2y$10$.VCIiip3DEAXnmAhqK4/hOib1kAZrrbGMoPlJcxKdsrPs4grmtPtu', 'Heimstraße 12', 1234, 'Wien', 'AT00 1200 0000 0000 0000', 1, 0),
(4, 'Frau', 'Nahid', 'Nourani', 'wi21b089', 'wi21b089@technikum-wien.at', '$2y$10$vx2u.jt2Hwb3hevnLu4E1uU8I4HlI8MxuXL6602GSFpLVnqDcgVaW', 'Heimstraße 12', 1234, 'Wien', 'AT00 1200 0000 0000 0000', 1, 0),
(5, 'Herr', 'Hadi', 'Heydari', 'wi21b085', 'wi21b085@technikum-wien.at', '$2y$10$7.MsEeMM8UMTvXfX8IBhUuElyzpcRaAytjhnz7gQjtGkH9HddzIm6', 'Heimstraße 12', 1234, 'Wien', 'AT00 1200 0000 0000 0000', 1, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `verlauf`
--

DROP TABLE IF EXISTS `verlauf`;
CREATE TABLE `verlauf` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `produkt_id` int(11) NOT NULL,
  `menge` int(11) NOT NULL,
  `preis` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `verlauf`
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
-- Trigger `verlauf`
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
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `u_id` (`u_id`);

--
-- Indizes für die Tabelle `produkte`
--
ALTER TABLE `produkte`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email` (`username`,`email`);

--
-- Indizes für die Tabelle `verlauf`
--
ALTER TABLE `verlauf`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `produkt_id` (`produkt_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT für Tabelle `produkte`
--
ALTER TABLE `produkte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `verlauf`
--
ALTER TABLE `verlauf`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`id`);

--
-- Constraints der Tabelle `verlauf`
--
ALTER TABLE `verlauf`
  ADD CONSTRAINT `verlauf_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `verlauf_ibfk_2` FOREIGN KEY (`produkt_id`) REFERENCES `produkte` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
