-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema electricdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `electricdb` ;

-- -----------------------------------------------------
-- Schema electricdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `electricdb` DEFAULT CHARACTER SET utf8 ;
USE `electricdb` ;

-- -----------------------------------------------------
-- Table `electric_bill`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `electric_bill` ;

CREATE TABLE IF NOT EXISTS `electric_bill` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cost` DECIMAL(10,3) NOT NULL,
  `year` INT NOT NULL,
  `wattage` INT NOT NULL,
  `manager_first_name` VARCHAR(45) NOT NULL,
  `manager_last_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO electric@localhost;
 DROP USER electric@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'electric'@'localhost' IDENTIFIED BY 'watt';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'electric'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `electric_bill`
-- -----------------------------------------------------
START TRANSACTION;
USE `electricdb`;
INSERT INTO `electric_bill` (`id`, `cost`, `year`, `wattage`, `manager_first_name`, `manager_last_name`) VALUES (1, 34978.67, 1998, 2234234, 'Roger', 'Holleman');
INSERT INTO `electric_bill` (`id`, `cost`, `year`, `wattage`, `manager_first_name`, `manager_last_name`) VALUES (2, 98808.42, 1999, 6435345, 'Roger', 'Holleman');
INSERT INTO `electric_bill` (`id`, `cost`, `year`, `wattage`, `manager_first_name`, `manager_last_name`) VALUES (3, 187934.95, 2000, 9123535, 'Nina', 'Chapman');
INSERT INTO `electric_bill` (`id`, `cost`, `year`, `wattage`, `manager_first_name`, `manager_last_name`) VALUES (4, 135975.67, 2001, 7801555, 'Hope', 'Letitia');
INSERT INTO `electric_bill` (`id`, `cost`, `year`, `wattage`, `manager_first_name`, `manager_last_name`) VALUES (5, 45003.95, 2002, 4124675, 'Hope', 'Letitia');

COMMIT;
