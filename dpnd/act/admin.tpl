<?php
//Submit actions
if(!empty($_POST))
{
    $post = loadDB('settings');
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
    putDB($post,'settings');
    echo '<link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
            <br>
            <center><h1>Applying Changes</h1>
            <img src="dpnd/images/load.gif"/></center>
            <script type="text/javascript">
            setTimeout(function() { 
            window.location.href = \'./?act=admin\';
            }, 500);
            </script>';
    exit;
}
if(isset($_GET['togglepack']) and isset($_GET['name']) and isset($_GET['location'])) //toggle packages disabled or not
{
    if(strpos($_GET['name'], '~disabled') !== false) //if disabled
    {
        $newname = str_replace('~disabled', '', $_GET['name']);
        rename($_GET['location'].'/'.$_GET['name'], $_GET['location'].'/'.$newname);
        header('location: ./?act=admin');
        exit;
    }
    if(strpos($_GET['name'], '~disabled') == false) //if enabled
    {
        $newname = $_GET['name'].'~disabled';
        rename($_GET['location'].'/'.$_GET['name'], $_GET['location'].'/'.$newname);
        header('location: ./?act=admin');
        exit;
    }
}
if(isset($_GET['deletepack']) and isset($_GET['name']) and isset($_GET['location'])) //remove packages
{
    $dir = $_GET['location'].'/'.$_GET['name'];
    array_map('unlink', glob("$dir/*.*"));
    rmdir($dir);
    header('location: ./?act=admin');
    exit;
}
//
$data = loadDB('settings');
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
        <p class="w" id="'.$setting.'">
        '.$desc.': <span class="right"><input placeholder="Not Set" type="text" value="'.$setval.'" name="'.$setting.'">
        <button>Save All</button></span>
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
        $on = 'checked="checked"';
        $off = null;
    }
    elseif($setval == 'false')
    {
        $on = null;
        $off = 'checked="checked"';
    }
    else
    {
        $on = null;
        $off = null;
    }
    echo '
      <p class="w" id="'.$setting.'">
      '.$desc.': <span class="right"><span class="radio '.$setting.'"><input id="'.$setting.'1" type="radio" name="'.$setting.'" value="true" '.$on.'><label for="'.$setting.'1">On</label><input id="'.$setting.'2" type="radio" name="'.$setting.'" value="false" '.$off.'><label for="'.$setting.'2">Off</label><input id="'.$setting.'3" type="radio" name="'.$setting.'" value=""><label for="'.$setting.'3">Reset</label></span>
        <button>Save All</button></span>
      </p>
      <script>
      $(function() {
        $( ".radio.'.$setting.'" ).buttonset();
      });
      </script>
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
function configPack($loc)
{
    foreach(glob($loc.'/*') as $apploc)
    {
        $app = str_replace($loc.'/', '', $apploc);
        $prettyname = str_replace('~disabled', ' <b>Disabled</b>', $app);
        if(strpos($app, '~disabled') == false)
        {
            $endis = 'Disable';
        }
        else
        {
            $endis = '<b>Enable</b>';
        }
        echo '<fieldset>';
        echo '<legend>'.$prettyname.'</legend>';
        echo '<a class="button plugsett" pid="'.$app.'" loc="'.$loc.'">Settings</a><a href="?act=admin&togglepack&name='.$app.'&location='.$loc.'" class="button">'.$endis.'</a><a pid="'.$app.'" loc="'.$loc.'" class="button plugunins" style="float:right;">Uninstall</a>';
        echo '</fieldset><br>';
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

?>
<html>
<head>
<link media="all" rel="stylesheet" type="text/css" href="dpnd/css/jquery-ui.css" />
<link media="all" rel="stylesheet" type="text/css" href="dpnd/css/admin.css" />
<script type="text/javascript" src="dpnd/js/jquery.min.js"></script>
<script type="text/javascript" src="dpnd/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="dpnd/js/jquery.admin.js"></script>
</head>
<body>
<h1 style="color:white;font-size:24px;">Admin Settings</h1>
<form method="post">
<div id="tabs">
  <ul>
    <li><a href="#tabs-1"><b>General</b> Configuration</a></li>
    <li><a href="#tabs-7"><b>Packages</b> Configuration</a></li>
    <li><a href="#tabs-4">"<b>Player Profiles</b>" Settings</a></li>
    <li><a href="#tabs-2">"<b>Gallery</b>" Page Settings</a></li>
    <li><a href="#tabs-5">"<b>Live Chat</b>" Page Settings</a></li>
    <li><a href="#tabs-3">"<b>Players</b>" Page Settings</a></li>
    <li><a href="#tabs-6">"<b>Feed</b>" Page Settings</a></li>
  </ul>
  <div id="tabs-1">
    <fieldset><legend>Update mcDash</legend>
    <a class="checkUpdates button">Check For Updates</a> <a class="runUpdater button">Run Updater</a> - mcDash Version: <?php echo $version; ?>
    </fieldset>
    <br>
    <fieldset>
    <?php
    textForm('BigLogo','<b>Big Logo URL</b> - Default: (./dpnd/images/logo.png)');
    textForm('SmallLogo','<b>Small Logo URL</b> - Default: (./dpnd/images/large-logo.png)');
    textForm('Banner','<b>Banner URL</b> - Default: (../images/bg-controls.png)');
    listForm('BungeeServers','<center><b>Additional Servers</b>:<br> (FriendlyName;ServerIP:Port) Example: "Hub Server;1.2.3.4:25565"<br> <i>";" is used as a seperator.<br>All servers must use the same jsonAPI username and password that is set up in the config.php.<br>The original (Default) server that is setup in the config.php will be named "Main Server"</i></center>');
    listForm('BannerLinks','<center><b>Banner Links</b>:<br> Example: "Homepage;http://'.$baAPIdomain.'/"<br> <i>";" is used as a seperator.</i></center>');
    listForm('OtherAdmins','<center><b>Additional Admins</b>:<br> Give users the same permissions<br>on mcDash as you.<br></center>');
    textForm('Title','<b>Website Tab Title</b> - Default: (mcDash)');
    textForm('defaultTab','<b>Default tab "page" to open, E.g.(tab-1/tab-6)</b> - Default: (tab-1)');
    booleanForm('headAPI','<b>Use internal "Built In" HeadAPI</b> - Default:(Off - <i>Uses BelowAverage\'s HeadAPI</i>)');
    booleanForm('forceOnlineLogin','<b>Only allow logins if mcDash can check the MC ban list</b> - Default:(Off)');
    booleanForm('messagesenabled','<b>Enable the Messaging feature</b> - Default:(On)');
    booleanForm('baJsonProxy','<b>Port blocking by hosts can lead to jsonAPI not working. Use our proxy('.$baAPIdomain.') over port 80 to fix this.</b> - Default:(Off)');
    ?>
    </fieldset>
  </div>
  <div id="tabs-2">
    <fieldset>
    <?php
    booleanForm('gallery-Enable','<b>Enable the Gallery page.</b> - Default:(On)');
    booleanForm('gallery-OnlyAdminUpload','<b>Only allow Admins to upload to the gallery</b> - Default:(Off)');
    textForm('gallery-MaxUplSize','<b>Max upload size</b> (<i>In Bytes</i>) - Default: (10485760)');
    listForm('gallery-FileTypes','<center><b>File Types</b>:<br> 1 per box, eg.: "png"<br> Default:<i> "jpeg, jpg, png, gif"</i></center>');
    ?>
    </fieldset>
  </div>
  <div id="tabs-3">
    <fieldset>
    <?php
    booleanForm('players-enabled','<b>Enable the Players page</b> - Default:(On)');
    textForm('players-updateTime','<b>Time the players list should be updated</b> - Default: (900)');
    ?>
    </fieldset>
  </div>
  <div id="tabs-4">
    <fieldset>
        <h3>By default all are On.</h3>
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
    </fieldset>
  </div>
  <div id="tabs-5">
    <fieldset>
        <?php
        booleanForm('liveChat-enabled','<b>Enable the Live Chat page</b> - Default:(On)');
        booleanForm('liveChat-readonly','<b>Read only chat</b> - Default:(Off)');
        textForm('liveChat-historylength','<b>How much chat history is displayed</b> - Default: (25)');
        ?>
    </fieldset>
  </div>
  <div id="tabs-6">
    <fieldset>
        <?php
        booleanForm('feed-enabled','<b>Enable the Feed page</b> - Default:(On)');
        textForm('feed-maxPosts','<b>Maximum amount of posts in the feed</b> - Default: (30)');
        textForm('feed-maxCharacters','<b>Maximum amount of characters per post</b> - Default: (5000)');
        ?>
    </fieldset>
  </div>
  <div id="tabs-7">
    <fieldset>
        <?php
        booleanForm('enableDash','<b>Enable the Dashboard page (Widgets)</b> - Default:(On)');
        booleanForm('apps-enabled','<b>Enable the Apps page</b> - Default:(On)');
        ?>
        <center><h3>Package Manager</h3></center>
        <fieldset>
            <center>
                <a class="installList button" apidomain="<?php echo $baAPIdomain; ?>" location="/apps/">Install Apps</a>
                <a class="installList button" apidomain="<?php echo $baAPIdomain; ?>" location="/widgets/">Install Widgets</a>
            </center>
        </fieldset>
        <h3>Installed Widgets</h3>
        <?php configPack('widgets'); ?>
        <h3>Installed Apps</h3>
        <?php configPack('apps'); ?>
    </fieldset>
  </div>
</div>
<div id="dialog" title="Package Manager">
</div>
<div id="dialog-confirm" title="Package Manager">
</div>
</form>
</body>
</html>