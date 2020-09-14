CREATE SCHEMA `raspi`;

CREATE TABLE `raspi`.`sensors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` datetime DEFAULT current_timestamp(),
  `temperature` double DEFAULT NULL,
  `humidity` double DEFAULT NULL,
  `pm2.5` double DEFAULT NULL,
  `pm10` double DEFAULT NULL,
  `co2` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
