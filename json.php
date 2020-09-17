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
			CENTER_OF_EXCELLENCE LIKE '%".$q_caps."%'
			OR
			KEYWORDS LIKE '%".$q."%'
			AND rownum <= 10";
	
	$stid = oci_parse($conn, $query);
	oci_execute($stid);

	if(oci_num_rows($stid) > 0){
		$nama = $_GET['q'];
				$query = "select *
				from 
					VIEWTABLE.VW_SKUNK_RESEARCHER_PROFILE
				where 
					NAMA LIKE '%".$q."%' AND
					rownum <= 10";
	}

	oci_fetch_all($stid, $result,  null, null, OCI_FETCHSTATEMENT_BY_ROW);

	// while($r = oci_fetch_assoc($sql)) {
	// 	$rows[] = $r;
	// }
	// $result = oci_fetch_assoc($stid);	
	// echo $query."<br>";
	// echo "<pre>\n";
	// var_dump($result);
	// echo "</pre>\n";

	
	// $result -> $mysqli -> query($sql);

	// // Fetch all
	// $result -> fetch_all(MYSQLI_ASSOC);

	
	// if(!$results){
	// 	echo "no results";
	// 	die();
	// }

	// if (isset($_GET['debug'])){
	// 	foreach($results as $key => $row){
	// 		$temp .= $row['JAWATAN_GILIRAN'] . " / ";
	// 	}
	// 	$temp = rtrim($temp," / ");
	// 	$results[0]['JAWATAN_GILIRAN'] = $temp;
	// }

	// if($_GET['q'] == 'staff_details'){
	// 	if(count($results) > 1){
	// 		foreach($results as $key => $row){
	// 			$temp .= $row['JAWATAN_GILIRAN'] . " / ";
	// 		}
	// 		$temp = rtrim($temp," / ");
	// 		$results[0]['JAWATAN_GILIRAN'] = $temp;
	// 	}
	// }

	// foreach($results as $key => $row){
	// 	unset($results[$key]['GAMBAR']);
	// }

	header("Content-type: application/json");

	echo json_encode($result);
?>
