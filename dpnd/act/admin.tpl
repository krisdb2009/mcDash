<?php
//CONFIG GENERATOR v1.0
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
    <style>
    body {
      -webkit-animation: myfirst 0.5s; /* Chrome, Safari, Opera */
      animation: myfirst 0.5s;
    }

    /* Chrome, Safari, Opera */
    @-webkit-keyframes myfirst {
      from {background: white;}
      to {background: transparent;}
    }

    /* Standard syntax */
    @keyframes myfirst {
      from {background: white;}
      to {background: transparent;}
    }
    </style>
        <br>
        <center><h1>Applying Changes</h1>
        <img src="dpnd/images/load.gif"/></center>
        <script type="text/javascript">
        setTimeout(function() { 
        window.location.href = \'./?act=admin\';
        }, 1000);
        </script>';
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
  <p id="'.$setting.'">
  '.$desc.': <input placeholder="Not Set" type="text" value="'.$setval.'" name="'.$setting.'">
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
  <p id="'.$setting.'">
  '.$desc.':<span class="radio '.$setting.'"><input id="'.$setting.'1" type="radio" name="'.$setting.'" value="true" '.$on.'><label for="'.$setting.'1">On</label><input id="'.$setting.'2" type="radio" name="'.$setting.'" value="false" '.$off.'><label for="'.$setting.'2">Off</label><input id="'.$setting.'3" type="radio" name="'.$setting.'" value=""><label for="'.$setting.'3">Reset</label></span>
    <button>Save All</button>
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

?>
<h1 style="color:white;font-size:24px;">Admin Settings</h1>
<link media="all" rel="stylesheet" type="text/css" href="dpnd/css/jquery-ui.css" />
<style>
body {
	font-family: "Trebuchet MS", "Helvetica", "Arial",  "Verdana", "sans-serif";
	font-size: 66.5%;
}
* {
outline:none;
}
.ui-widget-content {
background:white;
}
b {
	color:black;
}
p {
  color:rgb(53, 53, 53);
  padding:3px;
  background-color:rgba(0, 0, 0, 0.05);
  border:1px solid rgb(176, 176, 176);
  -webkit-transition: 0.3s; /* For Safari 3.1 to 6.0 */
  transition: 0.3s;
}
.fieldsmall {
	color:rgb(53, 53, 53);
	display:inline-block;
	-webkit-transition: 0.3s; /* For Safari 3.1 to 6.0 */
    transition: 0.3s;
}
p:hover {
  background-color:rgba(0, 0, 0, 0.1);
}
hr {
  border:0;
  border-bottom:1px solid rgb(176, 176, 176);
}
li {
	-webkit-transition: 0.3s; /* For Safari 3.1 to 6.0 */
    transition: 0.3s;
}
fieldset {
  border:1px solid rgb(176, 176, 176);
  background-color:rgba(0, 0, 0, 0.05);
}
.fieldsmall input {
  width:100%;
  display:inline-block;
}
.fieldsmall:hover {
  background-color:rgba(0, 0, 0, 0.1);
}
body {
  -webkit-animation: myfirst 0.3s; /* Chrome, Safari, Opera */
  animation: myfirst 0.3s;
}
@-webkit-keyframes myfirst {
  from {opacity: 0;}
  to {opacity: 1;}
}
@keyframes myfirst {
  from {opacity: 0;}
  to {opacity: 1;}
}
</style>
<script type="text/javascript" src="dpnd/js/jquery.min.js"></script>
<script type="text/javascript" src="dpnd/js/jquery-ui.min.js"></script>
<script>
  $(function() {
    $( "#tabs" ).tabs();
  });
</script>
<form method="post">
<div id="tabs">
  <ul>
    <li><a href="#tabs-1"><b>General</b> Configuration</a></li>
	<li><a href="#tabs-4">"<b>Player Profiles</b>" Settings</a></li>
    <li><a href="#tabs-2">"<b>Gallery</b>" Page Settings</a></li>
    <li><a href="#tabs-5">"<b>Live Chat</b>" Page Settings</a></li>
    <li><a href="#tabs-3">"<b>Players</b>" Page Settings</a></li>
    <li><a href="#tabs-6">"<b>Feed</b>" Page Settings</a></li>
    <li><a href="#tabs-7">"<b>Plugins</b>" Page Settings</a></li>
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
	listForm('BannerLinks','<center><b>Banner Links</b>:<br> Example: "Homepage;http://belowaverage.ga/"<br> <i>";" is used as a seperator.</i></center>');
	textForm('Title','<b>Website Tab Title</b> - Default: (mcDash)');
	booleanForm('headAPI','<b>Use internal "Built In" HeadAPI</b> - Default:(Off - <i>Uses BelowAverage\'s HeadAPI</i>)');
	booleanForm('forceOnlineLogin','<b>Only allow logins if mcDash can check the MC ban list</b> - Default:(Off)');
    booleanForm('messagesenabled','<b>Enable the Messaging feature</b> - Default:(On)');
    booleanForm('baJsonProxy','<b>Port blocking by hosts can lead to jsonAPI not working. Use our proxy(belowaverage.ga) over port 80 to fix this.</b> - Default:(Off)');
	?>
	</fieldset>
    <script>
    $('.runUpdater').click(function(){
        $( "#dialog-confirm" ).dialog( "open" );
        $( "#dialog-confirm" ).html( '<center><h1>WARNING!</h1></center><span class="ui-icon ui-icon-alert" style="float:left; margin:0 5px 0 0;"></span><p>If you modified any files in this script, the updater <b>can</b> change them back to default. Check <a target="_TOP" href="ftp://belowaverage.ga/mcDash/patches">The FTP server</a> for any modified files."</p>' );
    });
    $('.checkUpdates').click(function(){
    $( "#dialog" ).dialog( "open" );
    $( "#dialog" ).html( '<center><img src="./dpnd/images/ajax.gif"/></center>' );
    $.ajax({ 
            type: 'GET', 
            url: './dpnd/upd8r.lib.php', 
            data: { check: '' }, 
            dataType: 'json',
            success: function(data) {
                $( "#dialog" ).html( "" );
                $.each(data, function(index, value){
                    $( "#dialog" ).html( "" );
                    count = 0;
                    $.each(data, function(index, value){
                        count = count + 1;
                        $( "#dialog" ).append(count + ': <i>' + value + '</i><br>' );
                    });
                });
            }   
        });
    });
    $(function() {
        $( "#dialog" ).dialog({
          autoOpen: false,
          modal: true,
          show: {
            effect: "fade",
            duration: 300
          },
          hide: {
            effect: "fade",
            duration: 300
          }
        });
    });
    $(function() {
    $( "#dialog-confirm" ).dialog({
          resizable: false,
          autoOpen: false,
          height: 230,
          modal: true,
          buttons: {
            "Apply Updates": function() {
                $( this ).dialog( "close" );
                $( "#dialog" ).dialog( "open" );
                $( "#dialog" ).html( '<center><img src="./dpnd/images/ajax.gif"/></center>' );
                $.ajax({ 
                    type: 'GET', 
                    url: './dpnd/upd8r.lib.php', 
                    data: { update: '' }, 
                    dataType: 'json',
                    success: function(data) {
                        $( "#dialog" ).html( "" );
                        count = 0;
                        $.each(data, function(index, value){
                            count = count + 1;
                            $( "#dialog" ).append(count + ': <i>' + value + '</i><br>' );
                        });
                    },
                    error: function(jqXHR, exception) {
                        $( "#dialog" ).html( jqXHR.responseText + '<hr><h3>Please report this error to krisdb2009@belowaverage.ga or Skype: dylan.bickerstaff</h3>'); 
                    }                     
                });
            },
            Cancel: function() {
              $( this ).dialog( "close" );
            }
          },
          show: {
            effect: "fade",
            duration: 300
          },
          hide: {
            effect: "fade",
            duration: 300
          }
        });
      });
      $(function() {
        $( ".button, button" )
          .button()
      });
    </script>
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
        booleanForm('liveChat-readonly','<b>Cannot chat in game, Read only</b> - Default:(Off)');
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
        booleanForm('plugins-enabled','<b>Enable the Plugins page</b> - Default:(On)');
		?>
	</fieldset>
  </div>
</div>
<div id="dialog" title="Updater">
  Loading...
</div>
<div id="dialog-confirm" title="Updater">
  Loading...
</div>
</form>