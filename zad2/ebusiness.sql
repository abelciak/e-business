-- phpMyAdmin SQL Dump
-- version 4.0.10.10
-- http://www.phpmyadmin.net
--
-- Host: dhosting.pl
-- Czas wygenerowania: 16 Kwi 2019, 19:48
-- Wersja serwera: 10.0.27-MariaDB-cll-lve
-- Wersja PHP: 5.3.23-dh103

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Baza danych: `ebusiness`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orderDetails`
--

CREATE TABLE IF NOT EXISTS `orderDetails` (
  `orderDetailId` int(11) NOT NULL,
  `productId` varchar(15) NOT NULL,
  `orderDetailQuantity` int(11) NOT NULL,
  PRIMARY KEY (`orderDetailId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `orderId` int(11) NOT NULL,
  `orderDate` date NOT NULL,
  `requiredDate` date NOT NULL,
  `shippedDate` date DEFAULT NULL,
  `orderStatus` varchar(15) NOT NULL,
  `comments` text,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`orderId`),
  KEY `orders_ibfk_1` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `productId` varchar(15) NOT NULL,
  `productName` varchar(70) NOT NULL,
  `productDescription` text NOT NULL,
  `productStatus` int(2) NOT NULL,
  `productPrice` decimal(10,2) NOT NULL,
  PRIMARY KEY (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `userFirstName` varchar(50) NOT NULL,
  `userLastName` varchar(50) NOT NULL,
  `userPhone` varchar(50) NOT NULL,
  `userAddress` varchar(50) NOT NULL,
  `userCity` varchar(50) NOT NULL,
  `userZIPCode` varchar(50) DEFAULT NULL,
  `userStatus` int(2) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `orderDetails`
--
ALTER TABLE `orderDetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderDetailId`) REFERENCES `orders` (`orderId`);

--
-- Ograniczenia dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
