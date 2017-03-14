<?php

/** table called ‘user’ 
	that has the following columns: 
	user_id, name, access_count, modify_dt. 
*/

class User{
	const TABLE = 'User';

	public $_id;
	public $user_id;
	public $name;
	public $access_count;
	public $modify_dt;

	public function save($db_connection) {
		return $db_connection->save($this);
	}

	public function incrementAccess() {
		$this->access_count++;
	}

	public function updateTime() {
		$this->modify_dt = date("Y-m-d H:i:s");
	}
	
	public static function withObject($object) {
		$instance = new self();
        $instance->fill($object);
        return $instance;
	}

	public static function loadByID($id, $db_connection) {
		if($id == 0) return false;
		$instance = new self();
		$instance->_id = $id;
		$obj = $db_connection->load($instance);
		$instance->fill($obj);
		return $instance;
	}

	public static function getUsers($db_connection) {
		return $db_connection->getItems(__CLASS__);
	}

	protected function fill($object) {
		$keys = array_keys(get_class_vars(__CLASS__));
		foreach($object as $key=>$value) {
			if(in_array($key, $keys))
				$this->$key = $value;
		}
	}
}
