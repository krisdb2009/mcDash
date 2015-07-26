<?php
$directory = "dpnd/DB/users/";
$array = glob($directory . "{*.dat}", GLOB_BRACE);
usort($array, create_function( '$b, $a', 'return filemtime($a) - filemtime($b);'));
$array = str_replace('.dat','',$array);
$array = str_replace($directory,'',$array);
$int = 0;
if(!empty($array))
{
    foreach($array as $name)
    {
        echo '<a href="./?act=3duser&user='.$name.'" class="iframe"><img width="30px" height="30px" title="'.$name.'" style="margin:3px 3px 1px 3px;" src="'.$HeadAPI.'?player='.$name.'&size=30"/></a>';
        if($int++ + 1 >= 40) break;
    }
    echo '
        <script>
        $.resetIframeMagPopup();
        </script>
    ';
}
else
{
    echo '<h1>Nobody has ever registered.</h1>';
}

?>