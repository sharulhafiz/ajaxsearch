<?php
$mysqli = new mysqli("oracledbscan.utm.my:1521","HEK","H880707K","SMUTM");

// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}
?>