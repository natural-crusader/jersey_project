<?php
error_reporting(0);
//error_reporting(E_ALL); ini_set('display_errors', 1);
//mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
/** This app should access a MySQL database 
*/

class DB {
	public $link;

	function __construct($host, $user, $pass, $db) {
		$this->link = new mysqli($host, $user, $pass, $db);
		if($this->link->connect_errno) {
			echo 'Error: Unable to connect to MySQL. ' . $this->link->connect_error;
		    exit();
		}
	}

	/* 
		$credentials = {host, user, pass, db}
	*/
	public static function getConnection($credentials){
		$instance = new self();
		$instance->link = new mysqli($credentials['host'], $credentials['user'], $credentials['pass'], $credentials['db']);
        return $instance;
	}

	public function rawQuery($query) {
		if(!$this->link) return false;
		if($this->link->query($query) === true) {
			return true;	
		}
		return false;
	}

	// load by id
	public function load($object) {
		if(!$this->link) return false;

		if(isset($object->_id)) {
			$id = (int) $object->_id;
			$table = get_class($object);
			$query = "select * from {$table} where _id = {$id}";
			if ($result = $this->link->query($query,  MYSQLI_USE_RESULT)) {
				$obj = $result->fetch_assoc();
				$result->close();
				return $obj;
			} else {
				return false;
			}
		}
	}

	/* Save the object, insert or update depending on value of _id */
	public function save($object) {
		if(!$this->link) return false; // no connection
		
		$data = get_object_vars($object);

		// remove id if null for insert vs update
		if($object->_id == null) unset($data['_id']);
		
		$class = get_class($object);
		$table = $class::TABLE;

		if($object->_id == null){
			$r_columns = array_keys($data);
			$columns = "`".implode('`, `', array_keys($data))."`";
			$r_value = [];
			foreach(array_values($data) as $d) {
				// escaping values - we don't know if they are user input or not
				$r_value[] = mysqli_escape_string($this->link, $d);
			}
			$values = "'".implode("', '", array_values($r_value))."'";

			$query = "insert into {$table} ({$columns}) values ({$values})";
		} else {
			$query = "update {$table} set ";
			foreach($data as $key=>$value) {
				// escaping values - we don't know if they are user input or not
				$query.="$key='".mysqli_escape_string($this->link, $value)."',";
			}
			$query = substr($query, 0, -1);
			$query.=" where _id = {$data['_id']} limit 1";
		}
		
		if($this->link->query($query) === true)
			return true;
		return false;
	}

	public function getItems($class) {
		if(!$this->link) return false;
		$table = $class::TABLE;
		$query = "select * from {$table}";
		if ($result = $this->link->query($query,  MYSQLI_USE_RESULT)) {
			$results = [];
			while ($obj = $result->fetch_object()) {
				$results[] = $obj;
		    }
			$result->close();
			return $results;
		}
		
		return false;
	}

	function __destruct() {
		$this->link->close();
	}
}