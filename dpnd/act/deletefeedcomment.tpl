<?php
//Version 1.0 Deleting Post - krisdb2009
$feed = loadDB('feed');
if(isset($feed[$_GET['pid']]['comments'][$_GET['cid']]['owner']) and ((username() == $feed[$_GET['pid']]['comments'][$_GET['cid']]['owner']) or (username() == $AdminUsername)) and !isset($_POST['confirm']))
{
    echo '
    <br>
    <link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
    <h1>Are you sure you want to delete this comment?</h1>
    <center>
    <form id="window" method="post">
    <input id="hover" type="submit" value="Yes" name="confirm"/><br>
    </center>
    </form>
    </center>
    ';
}
elseif(isset($_POST['confirm']) and $_POST['confirm'] == 'Yes' and isloggedin() and ((username() == $feed[$_GET['pid']]['comments'][$_GET['cid']]['owner']) or (username() == $AdminUsername)))
{
    $feed[$_GET['pid']]['comments'][$_GET['cid']] = null;
    unset($feed[$_GET['pid']]['comments'][$_GET['cid']]);
    putDB($feed,'feed');
    echo '
        <br>
        <link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
        <center>
        <h1>Deleting Post</h1>
        <img src="dpnd/images/load.gif"/>
        </center>
        <script type="text/javascript">
            setTimeout(function () {
            window.parent.window.location.href = \'./?active=tab-4&feedmessage=6\';
            }, 0);
        </script>
    ';
}
else
{
    echo '<center><h1 style="color:white">Session Timeout. Please Login</h1></center>';
}