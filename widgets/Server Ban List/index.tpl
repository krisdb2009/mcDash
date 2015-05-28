<?php
$onl = sendjson('players.banned.names','""');
$onl = json_decode($onl);
$int = 0;
if(isset($onl[0]->success) and !empty($onl[0]->success))
{
    foreach(shuffle($onl[0]->success) as $name)
    {
        echo '<a href="./?act=3duser&user='.$name.'" class="iframe"><img width="30px" height="30px" title="'.$name.'" style="margin:3px;" src="'.$HeadAPI.'?player='.$name.'&size=30"/></a>';
        if($int++ + 1 >= 100) break;
    }
    echo '
        <script>
            $.resetIframeMagPopup();
        </script>
    ';
}
elseif(isset($onl[0]->success))
{
    echo '<h1>Nobody is banned.</h1>';
}
else
{
    echo '<h1>Server is offline.</h1>';
}
?>