<?php 

header('Content-Type: application/json');

/** normally we would have some security in here so not anyone can access the API such as session variables **/

require_once('Jersey_Project.php');

class user_api {

	public static function update($params = [])
		{
			$db = new Jersey_Project(); // typically use a singletone and have a persistent connection per session

			$user = [];
			$user['user_id'] = (int) $params['id'];
			if($db->UserUpdate($user))
				{
					$data = array(
						'user_id'=> $user['user_id'], 
						'modify_dt' => $user['modify_dt'], 
						'access_ct' => $user['access_ct']);

					echo json_encode($data);
				} else {
					echo json_encode(['error' => 'Could not update']);
				}
		}

	public static function get_users($parms = null)
		{
			$db = new Jersey_Project(); // typically use a singletone and have a persistent connection per session
			$rows = $db->UserRows();
			echo json_encode(['results' => ['user_list' => $rows]]);
		}
}



/* update a user with update or get all users with get_users */

if(isset($_REQUEST['command'])) 
	{
		user_api::$_REQUEST['command']($_REQUEST['params']);
	}

