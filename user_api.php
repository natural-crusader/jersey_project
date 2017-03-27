<?php 

header('Content-Type: application/json');

/** normally we would have some security in here so not anyone can access the API such as session variables **/

require_once('Jersey_Project.php');

/* update a user with update or get all users with get_users */

if(isset($_REQUEST['command'])) 
	{
		$db = new Jersey_Project();

		switch ($_REQUEST['command']) 
			{
				case 'update':
					$params = isset($_REQUEST['params']) ? $_REQUEST['params'] : [];
					if(isset($params['id']))
						{
							$user['user_id'] = (int) $params['id'];
							if($db->UserUpdate($user))
								{
									$data = array(
										'user_id'=> $user['user_id'], 
										'modify_dt' => $user['modify_dt'], 
										'access_ct' => $user['access_ct']);

									echo json_encode($data);
									exit;
								} else {
									echo json_encode(['error' => 'Could not update']);
									exit;
								}
						}
					break;
				case 'get_users':
					$rows = $db->UserRows();
					echo json_encode(['results' => ['user_list' => $rows]]);
					exit;
					break;
			}
	}
echo json_encode(['error'=>'Error']);
exit;
