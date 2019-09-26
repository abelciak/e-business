-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `orderDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `productId` bigint(15) NOT NULL,
  `orderQuantity` int(11) NOT NULL,
  `shippedDate` datetime DEFAULT '1970-01-01 00:00:00',
  `orderStatus` int(1) NOT NULL DEFAULT '0',
  `userId` varchar(40) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE `products` (
  `productId` bigint(15) NOT NULL,
  `productName` varchar(70) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `productDescription` text CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `productPrice` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `products`
--

INSERT INTO `products` (`productId`, `productName`, `productDescription`, `productPrice`) VALUES
(2, 'Pióro wieczne', 'Idealny pomysł na prezent z okazji zdania matury, ukończenia studiów lub awansu .', 140.99),
(3, 'Smycz reklamowa 20mm', 'Smycz, które uchodzi za jeden z najpopularniejszych gadżetów firmowych.', 2.74),
(16, 'Koszulka z nadrukiem', '100% bawełna (Belcoro®), do codziennego noszenia.', 45.95),
(21, 'Filiżanka z łyżeczką', 'Symbolem luksusu i elegancji od dawna jest już filiżanka. Produkt wykonany z porcelany.', 20.00),
(22, 'Kalendarz 2020', 'Kalendarz książkowy, organizer z wytłoczonym logiem Twojej firmy dla Twoich pracowników', 10.99);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `fullname` varchar(100) NOT NULL,
  `userID` varchar(40) NOT NULL,
  `providerID` varchar(40) NOT NULL,
  `email` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `orders_ibfk_2` (`productId`),
  ADD KEY `orders_ibfk_1` (`userId`);

--
-- Indeksy dla tabeli `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);


--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT dla tabeli `products`
--
ALTER TABLE `products`
  MODIFY `productId` bigint(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
