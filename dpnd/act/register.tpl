<?php session_start(); ?>
<link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
<center>
<?php
  if(isloggedin() == false)
  {
    if (!empty($_POST['mcuser']) and !isset($_GET['regkey']))
    {
      if(onmc($_POST['mcuser']) == true)
      {
        $code = rand(10000, 99999);
        $_SESSION['mcuser'] = $_POST['mcuser'];
        $_SESSION['secretcode'] = $code;
        sendjson('players.name.send_message', '"' . $_POST['mcuser'] . '", "A user has just attempted to register you on our website! The secret register code is \"' . $code . '\""');
        echo '
        <script type="text/javascript">
        window.location.href = \'./?act=register\';
        </script>
        ';
      }
      else
      {
        echo '
        <form id="window" method="post">
        Please make sure you are online on the Minecraft server to receive the secret register code!
        <input type="hidden" name="mcuser" value="'.$_POST['mcuser'].'"/><br>
        <button>Try Agian!</button>
        </form>
        ';
      }
    }
    elseif(isset($_POST['regkey']) and isset($_POST['password']) and $_POST['regkey'] == $_SESSION['secretcode'])
    {
      include('dpnd/passwordhashing.lib.php');
      $db = loadDB('users\\'.$_SESSION['mcuser']);
      $db['session'] = password_hash($_POST['password'], PASSWORD_BCRYPT);
      $_SESSION['login'] = $_SESSION['mcuser'];
      unset($_SESSION['secretcode']);
      putDB($db, 'users\\'.$_SESSION['mcuser']);
      sendjson('players.name.send_message', '"'.$_SESSION['mcuser'].'","You have successfully registered on our website!"');
      sendjson('chat.broadcast', '"'.$_SESSION['mcuser'].' has registered on our website! Register here '.str_replace('?act=register','',URL()).'"');
      unset($_SESSION['mcuser']);
      echo '
      <br>
      <center><h1>Pairing Minecraft account</h1>
      <audio autoplay>
      <source src="dpnd/images/login.mp3" type="audio/mp3">
      </audio>
      <img src="dpnd/images/load.gif"/></center>
      <script type="text/javascript">
      setTimeout(function() { 
      window.parent.window.location.href = \'./\';
      }, 5000);
      </script>
      ';
      exit;
    }
    elseif(isset($_POST['regkey']) and $_POST['regkey'] !== $_SESSION['secretcode'])
    {
      unset($_SESSION['mcuser']);
      unset($_SESSION['secretcode']);
      echo '
      <script type="text/javascript">
      window.location.href = \'./?act=register\';
      </script>
      ';
    }
    elseif(isset($_SESSION['secretcode']))
    {
      echo '
        <br>
        <h1>Verify your user!</h1>
        <h5>Your secret code was messaged to you on the Minecraft server.</h5>
        <form id="window" method="post">
        <input type="text" name="regkey" placeholder="Secret Code!" required autocomplete="off"><br>
        <input type="password" name="password" placeholder="Your new password!" required autocomplete="off"><br>
        <button>Next</button> | <a target="_top" href="./">Cancel</a>
        </form>';
    }
    else
    {
      unset($_SESSION['mcuser']);
      unset($_SESSION['secretcode']);
      echo '
      <br>
      <h1>Register / Change Password</h1>
      <form id="window" method="post">
      <input type="text" name="mcuser" placeholder="Minecraft Username" required autocomplete="off"><br>
      <button>Next</button> | <a target="_top" href="./">Cancel</a>
      </form>';
    }
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
<?php session_write_close(); ?>