<span style="color:black;font-size:40px;"><br><br><br>
    <?php

$ver = sendjson('system.getJavaMemoryUsage','""');
$ver = json_decode($ver);
if(!isset($ver[0]->success))
{
	echo 'Server is offline.';
	exit;
}

echo round($ver[0]->success).' MB';

?>
</span>