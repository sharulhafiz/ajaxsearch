<?php
	include "dbconnection.php";
	
	if( $_GET['q']!='' ){
		$q_caps = strtoupper($_GET['q']);
		$q = $_GET['q'];
	}
	
	$nama = $q;
	$query = "select *
		from
			VIEWTABLE.VW_SKUNK_RESEARCHER_PROFILE
		where
			NAMA LIKE '%".$q_caps."%'
			OR
			RESEARCH_GROUP LIKE '%".$q_caps."%'
			OR
			CENTER_OF_EXCELLENCE LIKE '%".$q_caps."%'
			OR
			KEYWORDS LIKE '%".$q."%'
			AND rownum <= 10";
	
	$stid = oci_parse($conn, $query);
	oci_execute($stid);

	oci_fetch_all($stid, $result,  null, null, OCI_FETCHSTATEMENT_BY_ROW);


	header("Content-type: application/json");

	echo json_encode($result);
?>
