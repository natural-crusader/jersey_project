<?php

/** This app should access a MySQL database 
*/

class DB {
	private $link; // database connection link
	static $dtformat_both = "Y-m-d H:i:s"; // format for database storage

	/**
	 * Creates a link the the desired database and provides interface for accessing said database.
	 *
	 * @param string $host 
	 *   The host of the database
	 * @param string $user
	 *   The username for the database
	 * @param string $pass
	 *   The password for the database
	 * @param string $db
	 *   The database identifier
	 *
	 * @return DB class item or exit on fail
	 *  
	 */
	function __construct($host, $user, $pass, $db) {
		$this->link = new mysqli($host, $user, $pass, $db);
		if($this->link->connect_errno) {
			echo 'Error: Unable to connect to MySQL. ' . $this->link->connect_error;
		    exit();
		}
	}

	protected function _CreateTable($sql) 
		{
			return $this->link->query($sql) === true;
		}

	/**
	 * inserts data into a table
	 *
	 * @param string $table 
	 *   The table to insert into
	 * @param assoc $data
	 *   columns and values to insert
	 *
	 * @return true on successful insertion else false on fail
	 *  
	 */
	protected function TableInsert($table, $data) 
		{
			$keys = array_keys($data);
			$keys_str = '`'.implode('`,`', $keys).'`';
			
			$values = array_values($data);
			$values_str = "'".implode("','", $values)."'";

			$sql = "insert into {$table} ($keys_str) values ($values_str)";

			if($this->link->query($sql) === true)
				return true;
			return false;
		}

	/**
	 * update access count and modify datetime of a user row
	 *
	 * @param string $table 
	 *   The table to insert into
	 * @param assoc $user
	 *   must contain user_id and modify_dt to udpate
	 *   you can pass in a value of raw sql by using assoc with ['raw'=> value]
	 * @param assoc $where
	 *   column => id, value => id
	 * @return new access_ct on successful update else false on fail
	 *  
	 */
	protected function TableUpdate($table, $user, $where) 
		{
			$sql = "update `{$table}` set ";
			foreach($user as $key=>$value)
				{
					if(is_array($value))
						{
							$sql.="{$key} = {$value['raw']},";
						} else 
						{
							$sql.= "{$key} = '{$value}',";
						}
				}

			$sql = substr($sql, 0, -1);

			$sql .= " where {$where['column']} = '{$where['value']}'";
			
			if($this->link->query($sql) === true) {
				// get the new access_ct
				return true;
			}
			return false;
		}

	/**
	 * forms an SQL string ready to be queried
	 *
	 * @param string $table 
	 *   table to run the sql select on
	 * @param assoc $options
	 *   options of the select statement
	 * @param assoc $columns
	 *   mapping of keys to columns
	 * 
	 * @return selected items from the table
	 *  
	 */
	protected function TableSelect($table, $options_assoc, $columns_assoc)
		{
			$select_columns = implode(',', $columns_assoc);
			$select_options = '';
			if($options_assoc && !empty($options_assoc)) 
				{
					$select_options = 'where';
					foreach($options_assoc as $key => $value) 
						{
							$select_options .= " {$key} = '{$value}',";
						}
					$select_options = substr($select_options, 0, -1);
				}

			return "select {$select_columns} from {$table} {$select_options};";
		}

	/**
	 * Creates a link the the desired database and provides interface for accessing said database.
	 *
	 * @param string $table 
	 *   table to run the sql select on
	 * @param assoc $options
	 *   options of the select statement
	 * @param assoc $columns
	 *   mapping of keys to columns
	 * 
	 * @return selected items from the table
	 *  
	 */
	protected function QueryResultRows($sql_str) 
		{
			$results = [];
			
			if ($result = $this->link->query($sql_str,  MYSQLI_USE_RESULT)) 
				{
					while ($assoc = $result->fetch_assoc()) 
						$results[] = $assoc;

					$result->close();
			    }

			return $results;
		}

	/**
	 * close the object database link on destroy / exit
	 */
	function __destruct() {
		$this->link->close();
	}
}