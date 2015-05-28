<link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
<?php
//Submit actions
if(!empty($_POST) and !isset($_GET['deleteaccount']))
{
  $Ppost = loadDB('users\\'.username());
  if(isset($Ppost['profile']))
  {
      $post = $Ppost['profile'];
  }
  else
  {
      $post = array();
  }
  foreach($_POST as $key => $val)
  {
    $post[$key] = $val;
  }
  function filtarr($arr)
  {
  if(is_array($arr))
  {
    return array_filter($arr);
  }
  else
  {
    return $arr;
  }
  }
  $post = array_filter(array_map('filtarr', $post));
  $Ppost['profile'] = $post;
  putDB($Ppost,'users\\'.username());
  echo '<link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
        <br>
        <center><h1>Applying Changes</h1>
        <img src="dpnd/images/load.gif"/></center>
        <script type="text/javascript">
        setTimeout(function() { 
        window.location.href = \'./?act=settings\';
        }, 500);
        </script>';
  exit;
}
//
$data = loadDB('users\\'.username());
if(isset($data['profile']))
{
    $data = $data['profile'];
}
else
{
    $data = array();
}
//Make a setting thing here///////////////////////////////////////////////////////////////////////////////////////////////////////
function textForm($setting,$desc)
{
  global $data;
  $setval = null;
  if(isset($data[$setting]))
  {
    $setval = $data[$setting];
  }
  echo '
  <p id="'.$setting.'">
  '.$desc.': <input class="clear" placeholder="Not Set" type="text" value="'.$setval.'" name="'.$setting.'">
  <button>Save All</button>
  </p>
  ';
}
function booleanForm($setting,$desc)
{
  global $data;
  $setval = null;
  if(isset($data[$setting]))
  {
    $setval = $data[$setting];
  }
  if($setval == 'true')
  {
  $on = 'checked';
  $off = null;
  }
  elseif($setval == 'false')
  {
  $on = null;
  $off = 'checked';
  }
  else
  {
  $on = null;
  $off = null;
  }
  echo '
  <p id="'.$setting.'">
  '.$desc.': On:<input class="clear" type="radio" name="'.$setting.'" value="true" '.$on.'> Off:<input class="clear" type="radio" name="'.$setting.'" value="false" '.$off.'> Reset:<input class="clear" type="radio" name="'.$setting.'" value=""> - <button>Save All</button>
  </p>
  ';
}
function listForm($setting,$desc)
{
  global $data;
  echo '<fieldset class="fieldsmall" id="'.$setting.'"><legend>'.$desc.'</legend>';
  if(!isset($data[$setting]))
  {
    $data[$setting] = array();
  }
  foreach(array_merge($data[$setting], array('','')) as $key => $val)
  {
    echo '<input placeholder="Not Set" type="text" value="'.$val.'" name="'.$setting.'['.$key.']"><br>';
  }
  echo '<br><button>Save All</button></fieldset>';
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if(isset($_GET['deleteaccount']) and !isset($_POST['agree']))
{
	echo '
	<br>
<link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
<h1>You are about to delete your account! Continue?</h1>
<center>
    <form id="window" method="post">
        <input id="hover" type="submit" value="Yes" name="agree"/><br>
        <input id="hover" type="submit" value="No" name="agree"/><br>
</center>
</form>
</center>
';
exit;
}
if(isset($_GET['deleteaccount']) and isset($_POST['agree']) and $_POST['agree'] == 'Yes')
{
dropDB('users\\'.username());
echo '
<br>
<center><h1>Removing Account</h1>
    <img src="dpnd/images/load.gif"/></center>
<script type="text/javascript">
    setTimeout(function () {
        window.location.href = \'./?act=logout\';
    },  500);
</script>
';
exit;
}
elseif(isset($_GET['deleteaccount']) and isset($_POST['agree']) and $_POST['agree'] == 'No')
{
}
?>
<style>
body {
    color:gray;
}
span {
    color:black;
}
h3 {
    color:black;
    font-weight:normal;
}
</style>
<center>
    <form style="margin-top:0px;" id="window" method="post">
        <a href="./?act=changepass">Change Password</a> | <a href="./?act=settings&deleteaccount">Delete Account</a>
        <hr>
        <h3>Profile Settings</h3>
        <hr>
            <div style="text-align:right;">
                <?php
                    booleanForm('pp-3duser','<span><b>3D User</b> Feature</span>');
                    booleanForm('pp-currentinventory','<span><b>Current Inventory</b> Feature</span>');
                    booleanForm('pp-stealskin','<span><b>Steal Skin</b> Feature</span>');
                    booleanForm('pp-status','<span><b>Online/Offline</b> Status</span>');
                    booleanForm('pp-currenthealth','<span><b>Current Health</b> Status</span>');
                    booleanForm('pp-currenthunger','<span><b>Current Hunger</b> Status</span>');
                    booleanForm('pp-lastplayed','<span><b>Last Played</b> Status</span>');
                    booleanForm('pp-firstjoined','<span><b>First Joined</b> Status</span>');
                    booleanForm('pp-currentexperience','<span><b>Current Experience</b> Status</span>');
                    booleanForm('pp-currentworld','<span><b>Current World</b> Status</span>');
                    booleanForm('pp-gamemode','<span><b>Game Mode</b> Status</span>');
                    booleanForm('pp-level','<span><b>Level</b> Status</span>');
                    booleanForm('pp-location','<span><b>Location</b> Status</span>');
                    booleanForm('pp-iteminhand','<span><b>Item In Hand</b> Status</span>');
                ?>
            </div>
    </form>
</center>