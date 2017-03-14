<?php 

header('Content-Type: application/json');

/** normally we would have some security in here so not anyone can access the API such as session variables **/

require_once('Jersey_Project.php');
require_once('User.php');

if(isset($_REQUEST['id'])) {
	// update the user's access and DT
	$db = new Jersey_Project();
	$user = User::loadByID((int) $_REQUEST['id'], $db);

	$user->incrementAccess();
	$user->updateTime();

	if ($user->save($db)) {
		// success
		$data = array('count' => $user->access_count, 'modify' => $user->modify_dt);
		echo json_encode($data);

	} else {
		// false
		echo json_encode(array('error'=>'Error updating User'));
	}
	exit();
} else {
	echo json_encode(array('error'=>'Error getting data'));
}