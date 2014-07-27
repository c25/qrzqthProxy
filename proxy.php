<?php

$site = $_GET['site'];
$method = $_GET['method'];

if ($site === 'qth') {
	$url = 'http://www.hamqth.com/xml.php?';

	if ($method === 'login') {
		$url = $url . 'u=' . $_GET['u'] . '&p=' . $_GET['p'];
	} else if ($method === 'lookup') {
		$url = $url . 'id='. $_GET['k'] . '&callsign=' . $_GET['call'] . '&prg=qrzqthProxy';
	}
} else if ($site === 'qrz') {
	$url = 'http://xmldata.qrz.com/xml/current/?';

	if ($method === 'login') {
		$url = $url . 'username=' . $_GET['u'] . ';password=' . $_GET['p'];
	} else if ($method === 'lookup'){
		$url = $url . 's=' . $_GET['k'] . ';callsign=' . $_GET['call'];

	}
}

if ($url !== null) {

	echo(file_get_contents($url));

} else {
	echo('You did not tell me what to do!');
}

?>