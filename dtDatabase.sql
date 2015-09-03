-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema dtdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dtdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dtdb` DEFAULT CHARACTER SET latin1 ;
USE `dtdb` ;

-- -----------------------------------------------------
-- Table `dtdb`.`survey_answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dtdb`.`survey_answer` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `question_id` INT(11) NULL DEFAULT NULL COMMENT '',
  `answer_id` INT(11) NULL DEFAULT NULL COMMENT '',
  `answer` VARCHAR(100) NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB
AUTO_INCREMENT = 54
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `dtdb`.`survey_question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dtdb`.`survey_question` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `question` VARCHAR(100) NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `dtdb`.`user_profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dtdb`.`user_profile` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `user_id` VARCHAR(100) NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB
AUTO_INCREMENT = 216
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `dtdb`.`user_survey_answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dtdb`.`user_survey_answer` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `user_id` VARCHAR(100) NULL DEFAULT NULL COMMENT '',
  `question_id` INT(11) NULL DEFAULT NULL COMMENT '',
  `answer_id` INT(11) NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
