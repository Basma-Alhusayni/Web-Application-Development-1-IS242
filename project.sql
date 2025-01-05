-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 09, 2024 at 08:56 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
CREATE TABLE IF NOT EXISTS `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemname` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description` varchar(500) NOT NULL,
  `price` varchar(500) NOT NULL,
  `cata` varchar(500) NOT NULL,
  `image` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `itemname`, `description`, `price`, `cata`, `image`) VALUES
(1, 'Sterilized cat food', 'This is a sterilized cat food by Horayra 1.5KG', '70 SAR', 'Food', 'catfood1.png'),
(2, 'Baby and mother cat food', 'This is a baby and mother cat food by Horayra 1.5KG', '65 SAR', 'Food', 'catfood2.png'),
(3, 'Kitten cat food', 'This is a kitten cat food by Horayra 1.5KG', '55 SAR', 'Food', 'catfood3.png'),
(4, 'Cat litter', 'This is a cat litter by Dr. Elseys', '42 SAR', 'Litter', 'catlitter.png'),
(5, 'Dog food', 'This is a dog food by Orijen 8CANS', '48 SAR', 'Food', 'dogfood.png'),
(6, 'Hair brush', 'This is a hair brush for all pets', '15 SAR', 'Grooming', 'grooming.png'),
(7, 'Bed', 'This is a bed for all pets', '60 SAR', 'Beds', 'beds.png'),
(8, 'Toys', 'This is a collection of toys for all pets', '20 SAR', 'Toys', 'toys.png');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `custname` varchar(50) NOT NULL,
  `total` float NOT NULL,
  `ordate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `paymentOption` varchar(500) NOT NULL,
  `note` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `role` varchar(500) NOT NULL,
  `age` int NOT NULL,
  `dob` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `age`, `dob`) VALUES
(23, 'ali', '1111', 'ali@gmail.com', 'admin', 22, '0000-00-00'),
(31, 'admin', '0', 'admin@gmail.com', 'admin', 21, '0000-00-00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
