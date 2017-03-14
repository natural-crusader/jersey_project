<?php 
require_once('User.php');
require_once('Jersey_Project.php');

$project = new Jersey_Project();

$users = User::getUsers($project);

?>

<!DOCTYPE HTML5>
<html>
<head>
	<link href='css/style.css' rel="stylesheet" type="text/css" />
</head>
<body>
<div>
	<h3>Users</h3>
	
	<div class='column5 header'>
		<span class='user_id'>User ID</span>
		<span class='name'>Name</span>
		<span class='access'>Access Ct</span>
		<span class='modify'>Last Access</span>
		<span class='button'></span>
	</div>

<?php $i=0; foreach($users as $user): ?>
	<div id='row_<?php echo $user->_id?>' class='column5 <?php echo $i%2 == 0 ? '' : 'odd'?>'>
		<span class='user_id'><?php echo $user->user_id?></span>
		<span class='name'><?php echo $user->name?></span>
		<span class='access'><?php echo $user->access_count?></span>
		<span class='modify'><?php echo $user->modify_dt?></span>
		<span class='button'><button data-id ='<?php echo $user->_id?>' class='modify-btn'>Update</button></span>
	</div>
<?php $i++; endforeach; ?>

</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src='js/project.js' type='text/javascript'></script>
</body>