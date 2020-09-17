<?php
// Check connection
$conn = oci_connect('HEK', 'H880707K', 'oracledbscan.utm.my/SMUTM');
if (!$conn) {
    $e = oci_error();
    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
}
?>