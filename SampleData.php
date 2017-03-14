<?php

/** put connection data into Jersey_Project then run to create table and populate with data **/

require_once('Jersey_Project.php');
require_once('User.php');

$db = new Jersey_Project();

// this would go into a migrate script based on current version

$query = 'CREATE TABLE IF NOT EXISTS `User` (`_id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `user_id` INT NULL, `name` VARCHAR(255) NULL, `access_count` INT NULL DEFAULT 0, `modify_dt` TIMESTAMP NULL, PRIMARY KEY (`_id`), UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC)) ENGINE = InnoDB;';

$results = $db->rawQuery($query);

if(!$results) {
	echo 'error creating user table';
	exit();
}

// create table if does not exist
// add data 

$users = [
	['user_id'=>'1283', 'name'=>'John Smith', 'access_count'=>7, 'modify_dt'=>date("Y-m-d H:i:s")],
	['user_id'=>'2373', 'name'=>'Paul Jones', 'access_count'=>9, 'modify_dt'=>date("Y-m-d H:i:s")],
	['user_id'=>'2484', 'name'=>'Luane Jackson', 'access_count'=>3, 'modify_dt'=>date("Y-m-d H:i:s")],
	['user_id'=>'3873', 'name'=>'Rita Birtles', 'access_count'=>1, 'modify_dt'=>date("Y-m-d H:i:s")],
	['user_id'=>'9398', 'name'=>'Brad Johnson', 'access_count'=>0, 'modify_dt'=>date("Y-m-d H:i:s")],
	['user_id'=>'8477', 'name'=>'Celena Ricter', 'access_count'=>12, 'modify_dt'=>date("Y-m-d H:i:s")],
	['user_id'=>'9248', 'name'=>'Nick Zuloha', 'access_count'=>17, 'modify_dt'=>date("Y-m-d H:i:s")],
	['user_id'=>'5384', 'name'=>'Peter Drucker', 'access_count'=>22, 'modify_dt'=>date("Y-m-d H:i:s")],
	['user_id'=>'1827', 'name'=>'Bill Lewis', 'access_count'=>5, 'modify_dt'=>date("Y-m-d H:i:s")]
];

foreach ($users as $user) {
	$u = User::withObject($user);
	echo $u->save($db);
}

echo 'Done';