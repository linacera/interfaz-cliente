BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `room` (
	`room_id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`room_name`	TEXT NOT NULL
);
INSERT INTO `room` VALUES (1,'Living');
INSERT INTO `room` VALUES (2,'Bedroom');
INSERT INTO `room` VALUES (3,'Kitchen');
INSERT INTO `room` VALUES (4,'Bathroom');
CREATE TABLE IF NOT EXISTS `device` (
	`device_id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`device_name`	TEXT NOT NULL,
	`room_id`	INTEGER NOT NULL,
	FOREIGN KEY(`room_id`) REFERENCES `room`(`room_id`)
);
INSERT INTO `device` VALUES (1,'Light',1);
INSERT INTO `device` VALUES (2,'Television',1);
INSERT INTO `device` VALUES (3,'Lamp',1);
CREATE TABLE IF NOT EXISTS `action` (
	`action_id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`action_name`	TEXT NOT NULL,
	`device_id`	INTEGER NOT NULL,
	FOREIGN KEY(`device_id`) REFERENCES `device`(`device_id`)
);
COMMIT;
