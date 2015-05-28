<link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
<center>
<?php
$error = null;
include('dpnd/passwordhashing.lib.php');
if(isset($_POST['username']) and isset($_POST['password']))
{
	$db = loadDB('users\\'.$_POST['username']);
	if(isset($db['session']) and password_verify($_POST['password'],$db['session']))
	{
		$banned = json_decode(sendjson('players.banned.names','[]'));
		if(!isset($banned[0]->success))
		{
			echo '<span style="color:red;font-size:20px;">Checking ban list failed, because the Minecraft server is offline.</span>';
			$banned = array();
			if(isset($settings['forceOnlineLogin']) and ($settings['forceOnlineLogin'] == 'true'))
			{
				echo '<br><br><span style="color:red;font-size:20px;">Logins are not available due to the Minecraft Server being offline.</span>';
				exit;
			}
		}
		else
		{
			$banned = $banned[0]->success;
		}
		if(!in_array(fixname($_POST['username']),$banned))
		{
			if(fixname($_POST['username']) == $_POST['username'])
			{
				session_start();
				$_SESSION['login'] = fixname($_POST['username']);
				session_write_close();
				echo '<br>
				<center><h1>Welcome '.username().'</h1>
					<img src="dpnd/images/load.gif"/></center>
				<audio autoplay>
					<source src="dpnd/images/login.mp3" type="audio/mp3">
				</audio>
				<script type="text/javascript">
					setTimeout(function () {
						window.parent.window.location.href = \'./\';
					}, 4000);
				</script>
				';
				exit;
			}
			else
			{
				$error = 'Username input is case sensitive.';
			}
		}
		else
		{
			$error = 'You are banned from the Minecraft server!';
		}
    }
    else
    {
		$error = 'Please check your password!';
    }
}
if(isloggedin() == false)
{
	if(!empty($settings['BigLogo'])) { $logoh = $settings['BigLogo']; } else { $logoh = './dpnd/images/large-logo.png'; }
	echo '
	<br>
	<img src="'.$logoh.'" id="logo"/>
	<h5 style="text-shadow:0px 0px 15px white;color:red;">'.$error.'</h5>
		<form id="window" method="post">
			<input type="text" name="username" placeholder="Username" required autocomplete="off"><br>
			<input type="password" name="password" placeholder="Password" required autocomplete="off"><br>
			<button>Login</button>
			| <a href="./?act=register">Register / Forgot Password</a> | <a target="_top" href="./">Cancel</a>
	</form>
	<audio>
	<source src="dpnd/images/login.mp3" type="audio/mp3">
	</audio>
	';
}
else
{
	echo '
	<script type="text/javascript">
		window.parent.window.location.href = \'./\'
	</script>
	';
}
?>