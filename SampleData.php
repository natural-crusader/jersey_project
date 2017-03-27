<?php
// error_reporting(0);
error_reporting(E_ALL); ini_set('display_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
/** put connection data into Jersey_Project then run to create table and populate with data **/

require_once('Jersey_Project.php');

$db = new Jersey_Project();

// this would go into a migrate script based on current version

if(!$db->createTable()) {
	echo 'error creating user table';
	exit();
}

// create table if does not exist
// add data 

$users = [
	['user_id'=>'1283', 'name'=>'John Smith', 'access_ct'=>7],
	['user_id'=>'2373', 'name'=>'Paul Jones', 'access_ct'=>9],
	['user_id'=>'2484', 'name'=>'Luane Jackson', 'access_ct'=>3],
	['user_id'=>'3873', 'name'=>'Rita Birtles', 'access_ct'=>1],
	['user_id'=>'9398', 'name'=>'Brad Johnson', 'access_ct'=>2],
	['user_id'=>'8477', 'name'=>'Celena Ricter', 'access_ct'=>12],
	['user_id'=>'9248', 'name'=>'Nick Zuloha', 'access_ct'=>17],
	['user_id'=>'5384', 'name'=>'Peter Drucker', 'access_ct'=>22],
	['user_id'=>'1827', 'name'=>'Bill Lewis', 'access_ct'=>5]
];

foreach ($users as $user) {
	$db->UserInsert($user);
}

echo 'Done';