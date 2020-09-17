<?php
	include "dbconnection.php";
	$sql = "select * from VIEWTABLE.VW_SKUNK_RESEARCHER_PROFILE where rownum <= 10";

	$result -> $mysqli -> query($sql);

	// Fetch all
	$result -> fetch_all(MYSQLI_ASSOC);

	
	if(!$results){
		echo "no results";
		die();
	}

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

	echo json_encode($results);
?>
