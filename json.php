<?php
	include "dbconnection.php";
	$limit = 4;
	if( $_GET['q']!='' ){
		$q_caps = strtoupper($_GET['q']);
		$q = $_GET['q'];
	}
	if( isset($_GET['limit']) ){
		$limit = 999;
	}
	$q_caps = str_replace(" ", "%", $q_caps);
	$q_caps = str_replace("%20", "%", $q_caps);
	
	$nama = $q;
	$query = "select *
		from
			VIEWTABLE.VW_SKUNK_RESEARCHER_PROFILE
		where
			NAMA LIKE '%".$q_caps."%'
			OR
			KEYWORDS LIKE '%".$q."%'
			OR
			RESEARCH_GROUP LIKE '%".$q_caps."%'
			OR
			CENTER_OF_EXCELLENCE LIKE '%".$q_caps."%'
			AND rownum <= ".$limit;
	
	$stid = oci_parse($conn, $query);
	oci_execute($stid);

	oci_fetch_all($stid, $result,  null, null, OCI_FETCHSTATEMENT_BY_ROW);


	header("Content-type: application/json");

	echo json_encode($result);
?>
