<?php
$mysqli = new mysqli("oracledbscan.utm.my","HEK","H880707K","SMUTM");

// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}
?>