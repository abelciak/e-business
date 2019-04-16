DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
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

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `productId` varchar(15) NOT NULL,
  `productName` varchar(70) NOT NULL,
  `productDescription` text NOT NULL,
  `productStatus` int(2) NOT NULL,
  `productPrice` decimal(10,2) NOT NULL,
  PRIMARY KEY (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `orderDate` date NOT NULL,
  `requiredDate` date NOT NULL,
  `shippedDate` date DEFAULT NULL,
  `orderStatus` varchar(15) NOT NULL,
  `comments` text,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`orderId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `orderDetails`;
CREATE TABLE `orderDetails` (
  `orderDetailId` int(11) NOT NULL,
  `productId` varchar(15) NOT NULL,
  `orderDetailQuantity` int(11) NOT NULL,
  PRIMARY KEY (`orderDetailId`),
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderDetailId`) REFERENCES `orders` (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
