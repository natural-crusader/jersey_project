<?php
require_once('DB.php');

class Jersey_Project extends DB {
	private $host = '127.0.0.1';
	private $user = 'root';
	private $pass = '';
	private $db = 'jersey';

	function __construct() {
		parent::__construct($this->host, $this->user, $this->pass, $this->db);
	}
}