<?php
//Version 1.0 Deleting - krisdb2009
	if(myfile($_GET['delete']) ==  true and isloggedin() == true and empty($_POST['confirm']))
	{
		echo '
			<link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
<br>
<h1>Are you sure you want to delete this file?</h1>
<center>
    <form id="window" method="post">
        <input id="hover" type="submit" value="Yes" name="confirm"/>
</center>
</form>
</center>
';
}
elseif(myfile($_GET['delete']) ==  true and isloggedin() == true and $_POST['confirm'] == 'Yes')
{
deletemyfile($_GET['delete']);
echo '
<br>
<link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
<center>
    <h1>Deleting</h1>
    <img src="dpnd/images/load.gif"/>
</center>
<script type="text/javascript">
    setTimeout(function () {
        window.parent.window.location.href = \'./?active=tab-2&deleted\';
    }, 0);
</script>
';
}
else
{
echo '
<br>
<link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
<center>
    <h1>Session Timeout, Please Login.</h1>
    <img src="dpnd/images/load.gif"/>
</center>
<script type="text/javascript">
    setTimeout(function () {
        window.parent.window.location.href = \'./\';
    }, 0);
</script>
';
exit;
}
?>