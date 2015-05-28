<?php

$onl = sendjson('players.online.names','""');
$onl = json_decode($onl);

if(!empty($onl[0]->success))
{
foreach($onl[0]->success as $name)
{
echo '<a href="./?act=3duser&user='.$name.'" class="iframe"><img width="30px" height="30px" title="'.$name.'" style="margin:3px;"
                                                                 src="'.$HeadAPI.'?player='.$name.'&size=30"/></a>';
}
echo '
<script>
$.resetIframeMagPopup();
</script>
';
}
else
{
echo '<h1>Nobody is online.</h1>';
}

?>