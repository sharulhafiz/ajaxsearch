<?php
	include "dbconnection.php";
	
	if( $_GET['q']!='' ){
		$q_caps = strtoupper($_GET['q']);
		$q = $_GET['q'];
	}
	if( isset($_GET['limit']) ){
		$limit = 999;
	} else {
		$limit = 4;
	}
	
	$nama = $q;
	$query = "select DISTINCT SUB_JUDUL, URL from VIEWTABLE.VW_SKUNK_RESEARCH_PUBLICATION where SUB_JUDUL LIKE '%".$q_caps."%' AND rownum <= ".$limit;
	
	$stid = oci_parse($conn, $query);
	oci_execute($stid);

	oci_fetch_all($stid, $result,  null, null, OCI_FETCHSTATEMENT_BY_ROW);


	header("Content-type: application/json");

	echo json_encode($result);
?>
