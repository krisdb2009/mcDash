<?php
//======================================================
//Actions go down here! (pre defined actions / procedures called via get request
//======================================================


//?act=login
if($_GET['act'] == 'login')
{
    include('act/login.tpl');
    exit;
}
//
//?act=register
if($_GET['act'] == 'register')
{
    include('act/register.tpl');
    exit;
}
//

//?act=logout
if($_GET['act'] == 'logout')
{
    session_start();
    $_SESSION['login'] = null;
    session_write_close();
    echo '
        <link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
        <center><br>
          <h1>Logging out</h1>
          <img src="dpnd/images/load.gif"/></center>
          <audio autoplay>
            <source src="dpnd/images/logout.mp3" type="audio/mp3">
          </audio>
          <script type="text/javascript">
            setTimeout(function() {
            window.parent.window.location.href = \'./\';
            }, 1500);
          </script>
        </center>
     ';
    exit;
}
//

//?act=plugin&plugin=NAMEOFPLUGIN  //  runs plugin by including it.
if($_GET['act'] == 'plugin' and isset($_GET['plugin']))
{
    if(!isset($settings['plugins-enabled']) or $settings['plugins-enabled'] !== 'false')
    {
        if(file_exists('plugins/'.$_GET['plugin'].'/index.tpl'))
        {
            require('plugins/'.$_GET['plugin'].'/index.tpl');
        }
        else
        {
            echo '<center><h1>The plugin was not loaded correctly...</h1>';
        }
    }
    exit;
}
//

//?act=postmcchat
if($_GET['act'] == 'postmcchat' and isloggedin() and isset($_POST['chat']))
{
    if((!isset($settings['liveChat-enabled']) or $settings['liveChat-enabled'] !== 'false') and (!isset($settings['liveChat-readonly']) or $settings['liveChat-readonly'] !== 'true'))
    {
        if(isset($_POST['chat']) and !empty($_POST['chat']) and $_POST['chat'] !== '')
        {
            sendchat($_POST['chat']);
        }
    }
}
//

//?act=loadgal
if($_GET['act'] == 'loadgal')
{
    if((isset($_POST['pagenum']) and isset($_POST['ammount'])) and (!isset($settings['gallery-Enable']) or $settings['gallery-Enable'] == 'true'))
    {
		showGallery($_POST['ammount'], $_POST['pagenum']);
    }
    exit;
}
//

//?act=loadusers
if($_GET['act'] == 'loadusers')
{
    if(isset($_POST['pagenum']) and isset($_POST['ammount']) and isset($_POST['search']) and (!isset($settings['players-enabled']) or $settings['players-enabled'] == 'true'))
    {
        showusers($_POST['search'], $_POST['ammount'], $_POST['pagenum']);
    }
    exit;
}
//

//?act=admin
if($_GET['act'] == 'admin' and username() == $AdminUsername)
{
    include('act/admin.tpl');
    exit;
}
elseif($_GET['act'] == 'admin')
{
    echo '<center><h1>Session Error</h1></center>';
    exit;
}
//

//?act=uploadgal
if(($_GET['act'] == 'uploadgal' and isloggedin() and isset($_FILES['image'])) and (!isset($settings['gallery-Enable']) or $settings['gallery-Enable'] !== 'false'))
{
	if(!(isset($settings['gallery-OnlyAdminUpload']) and $settings['gallery-OnlyAdminUpload'] == 'true' and (username() !== $AdminUsername)))
	{
		if(isset($settings['gallery-MaxUplSize']))
		{
			$size = $settings['gallery-MaxUplSize'];
		}
		else
		{
			$size = 10485760;
		}
		if(isset($settings['gallery-FileTypes']) and isset($_FILES['image']))
		{
			$message = upload($_FILES['image'], 'DB/usergallery', $settings['gallery-FileTypes'], 'gallery', $size);
		}
		elseif(isset($_FILES['image']) and isset($_FILES['image']))
		{
			$message = upload($_FILES['image'], 'DB/usergallery', array("jpeg", "jpg", "png", "gif"), 'gallery', $size);
		}
	}
    header('location: ./?active=tab-2&message='.$message);
    exit;
}
//

//?act=changepass
if($_GET['act'] == 'changepass')
{
    session_start();
    $_SESSION['login'] = null;
    session_write_close();
    echo '
    <link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
    <center><br>
      <h1>Logging out</h1>
      <img src="dpnd/images/load.gif"/></center>
      <audio autoplay>
        <source src="dpnd/images/logout.mp3" type="audio/mp3">
      </audio>
      <script type="text/javascript">
        setTimeout(function() { 
      window.location.href = \'./?act=register\';
        }, 1500);
      </script>
    </center>
  ';
    exit;
}
//

//act=getchat
if($_GET['act'] == 'getchat')
{
    if(isset($settings['liveChat-historylength']))
    {
        $amm = $settings['liveChat-historylength'];
    }
    else
    {
        $amm = 25;
    }
    $chatstream = (json_decode(sendjson('streams.chat.latest', '"'.$amm.'"')));
    if(isset($chatstream) and isset($chatstream[0]->success))
    {
        foreach($chatstream[0]->success as $chatline)
        {
            echo '<a href="?act=3duser&user='.$chatline->player.'" class="iframe chatlinelink"><img title="'.$chatline->player.'" src="'.$HeadAPI.'?player='.$chatline->player.'&size=16"><<span class="livechatname">'.$chatline->player.'</span></a>> '.clean($chatline->message).'<br>';
        }
        echo '<script>$.resetIframeMagPopup();</script>';
    }
    else
    {
        echo '<center><h1>Minecraft server is Offline</h1><br>Chat will be temporarily unavalible until service is restored on the Minecraft Server.</center>';
    }
    exit;
}
//

//act=delete&delete=*FILEPATH*
if($_GET['act'] == 'delete' and isset($_GET['delete']))
{
    include('act/delete.tpl');
    exit;
}
//

//act=feeddelete&id=*
if($_GET['act'] == 'feeddelete' and isset($_GET['id']))
{
    if(!isset($settings['feed-enabled']) or $settings['feed-enabled'] !== 'false')
    {
        include('act/feeddelete.tpl');
    }
    exit;
}
//

//act=like&post
if($_GET['act'] == 'like' and isset($_GET['post']))
{
    if(!isset($settings['feed-enabled']) or $settings['feed-enabled'] !== 'false')
    {
        if(isloggedin() == true)
        {
            $info = loadDB('feed');
            if(isset($info[$_GET['post']]['likes']) and is_array($info[$_GET['post']]['likes']) and in_array(username(), $info[$_GET['post']]['likes']))
            {
                $unval = array_search(username(), $info[$_GET['post']]['likes']);
                unset($info[$_GET['post']]['likes'][$unval]);
                putDB($info, 'feed');
                echo 'Like';
            }
            elseif(isset($info[$_GET['post']]))
            {
                if(empty($info[$_GET['post']]['likes']))
                {
                    $info[$_GET['post']]['likes'] = array();
                }
                array_unshift($info[$_GET['post']]['likes'], username());
                putDB($info, 'feed');
                echo 'Unlike';
            }
            else
            {
                echo '403 FORBIDDEN - Do this again and you will be added to the ban-list.';
                header('location: ./');
            }
        }
        else
        {
            echo 'Please Login to like this post.';
        }
    }
    exit;
}
//

//act=feedpost
if($_GET['act'] == 'feedpost' and !empty($_POST['postcon']) and isloggedin())
{
    if(!isset($settings['feed-enabled']) or $settings['feed-enabled'] !== 'false')
    {
        if(isset($settings['feed-maxCharacters']))
        {
            $amm = $settings['feed-maxCharacters'];
        }
        else
        {
            $amm = 5000;
        }
        if(strlen($_POST['postcon']) <= $amm) //MAX POST CHARACTERS
        {
            $info = loadDB('feed');
            $topID = 0;
            if(is_array($info))
            {
                foreach($info as $key => $val)
                {
                    if($topID < $key)
                    {
                        $topID = $key;
                    }
                }
            }
            $topID = $topID + 1;
            $info[$topID]['owner'] = username();
            $info[$topID]['time'] = time();
            $info[$topID]['val'] = $_POST['postcon'];
            if(isset($settings['feed-maxPosts']))
            {
                $maxpos = $settings['feed-maxPosts'];
            }
            else
            {
                $maxpos = 30;
            }
            if(count($info) > $maxpos) //Max posts
            {
                $info[min(array_keys($info))] = null;
                unset($info[min(array_keys($info))]);
            }
            putDB($info, 'feed');
            $_GET['active'] = 'tab-4';
            $_GET['feedmessage'] = '4';
            //header('location: ./?active=tab-4&feedmessage=4');
        }
        else
        {
            $_GET['active'] = 'tab-4';
            $_GET['feedmessage'] = '5';
            //header('location: ./?active=tab-4&feedmessage=5');
        }
    }
}
//

//act=dash&widget=*NAME*
if($_GET['act'] == 'dash' and isset($_GET['widget']))
{
    if(file_exists('widgets/'.$_GET['widget'].'/index.tpl'))
    {
        include('widgets/'.$_GET['widget'].'/index.tpl');
    }
    else
    {
        echo 'Failed to load widget.';
    }
    exit;
}
//

//act=3duser&user=*NAME*
if($_GET['act'] == '3duser' and isset($_GET['user']))
{
    include('act/3duser.tpl');
    exit;
}
//

//act=whoelseliked&postid=*ID*
if($_GET['act'] == 'whoelseliked' and isset($_GET['postid']))
{
    if(!isset($settings['feed-enabled']) or $settings['feed-enabled'] !== 'false')
    {
        include('act/whoelseliked.tpl');
    }
    exit;
}
//

//?act=viewmessages
if($_GET['act'] == 'viewmessages' and isloggedin() == true)
{
    if(!isset($settings['messagesenabled']) or $settings['messagesenabled'] !== 'false')
    {
        include('act/viewmessages.tpl');
    }
    exit;
}
elseif($_GET['act'] == 'viewmessages')
{
    echo '<h1>Error: You are not allowed to access this.</h1>';
    exit;
}
//

//?act=settings
if($_GET['act'] == 'settings' and isloggedin() == true)
{
    include('act/usersettings.tpl');
    exit;
}
elseif($_GET['act'] == 'settings')
{
    echo '<h1>Error: You are not allowed to access this.</h1>';
    exit;
}
//


//======================================================
?>