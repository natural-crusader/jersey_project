<?php
require_once 'DB.php';

/*
 * Methods for accessing the application database
 * All database access hsoudl go through this class
 */

class Jersey_Project extends DB 
	{
		private $host = '127.0.0.1';
		private $user = 'root';
		private $pass = '';
		private $db = 'jersey';

		function __construct() 
			{
				parent::__construct($this->host, $this->user, $this->pass, $this->db);
			}

		/**
		 * Returns a reference to the named property, which doesn't exist if this method is being called.
		 * If an unsupported property is requested; no property assignment is made.
		 *
		 * @param string $name 
		 *   The name of the property being gotten.
		 *
		 * @return mixed
		 *   The return value is property-dependent.
		 *   If initialization of a supported value fails, it is given the value false.
		 *   Null is a signal value indicating that an unsupported property was requested; no property assignment is made in this case.
		 */
		function & __get($name)
			{
				switch ($name)
					{
						case 'now_ts':
							$this->now_ts = time(); //kgiftos: get from database when we have more than one web server
							break;
						case 'now_dt':
							$this->now_dt = gmdate(self::$dtformat_both, $this->now_ts);
							break;
						default:
							$this->$name = null;
					}
				
				return $this->$name;
			}
		/**
		 * Sets the value of the named property, which doesn't exist if this method is being called.
		 * If an unsupported property is given; it is simply set as if this method didn't exist.
		 * 
		 * @param string $name
		 * @param mixed $value
		 */
		function __set($name, $value)
			{
				switch ($name)
					{		
						default:
							$this->$name = $value;
					}
			}
		
		/**
		 * Inserts a row into the user table.
		 *
		 * @param array of assoc $user (for multiple users or a single one)
		 *   An input/output parameter.
		 *   On input: An associative array of at least all required columns in user table.
		 *   On output: If successful, user_id is added.
		 *
		 * @return mixed 
		 *   Returns false if a password was given and there was a problem related to that.
		 *   Otherwise, as returned by TableInsert().
		 */
		function UserInsert($users)
			{
				return $this->TableInsert('User', $users);
			}
		
		/**
		 * Returns user rows.
		 * 
		 * @param mixed $select_options
		 *   As defined by MySqlDb->SqlTableSelect().
		 * 
		 * @return mixed
		 *   As returned by QueryResultRows().
		 */
		function UserRows($select_options=null)
			{
				$columns_assoc = 
					[
						'user_id' => 'User.user_id',
						'name' => 'User.name',
						'modify_dt' => 'User.modify_dt',
						'access_ct' => 'User.access_ct'
					];
				
				return $this->QueryResultRows($this->TableSelect('User', $select_options, $columns_assoc));
			}
		
		/**
		 * Updates the give user's access_ct and modify_dt
		 * 
		 * @param assoc $user
		 *   reference to user that must contain user_id [optional name] to update the access_ct and modify_dt
		 *  
		 * @return boolean 
		 *   false=failure, true=success
		 */
		function UserUpdate(&$user)
			{
				$user['modify_dt'] = $this->now_dt;
				$user['access_ct'] = ['raw' => 'access_ct + 1'];

				if($this->TableUpdate('User', $user, ['column'=>'user_id', 'value'=>$user['user_id']])) 
					{
						$row = $this->QueryResultRows($this->TableSelect('User', ['user_id' => $user['user_id']], ['access_ct' => 'user.access_ct']));
					
						$user['access_ct'] = $row[0]['access_ct'];
						return true;
					}			
				return false;
			}

		/**
		 * Creates the table if not exists -- typically in a migration script based on version control
		 */
		function CreateUserTable() {
			$sql = <<<EOT
CREATE TABLE IF NOT EXISTS `User` 
	(
		`user_id` INT NOT NULL, 
		`name` VARCHAR(255) NULL, 
		`access_ct` INT NULL DEFAULT 0,  
		`modify_dt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP, 
		UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC), 
		PRIMARY KEY (`user_id`)
	) 
	ENGINE = InnoDB;
EOT;
			return $this->rawSQL($sql);
		}

	}