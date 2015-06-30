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
        if(file_exists('apps/'.$_GET['plugin'].'/index.tpl') and strpos($_GET['plugin'], '~disabled') == false)
        {
            require('apps/'.$_GET['plugin'].'/index.tpl');
        }
        else
        {
            echo '<center><h1>The app was not loaded correctly...</h1>';
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
      <h1>Logging out to change password...</h1>
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

//act=pluginsettings&plugin&location
if($_GET['act'] == 'pluginsettings' and isset($_GET['location']) and isset($_GET['plugin']) and isloggedin() and username() == $AdminUsername)
{
    if(is_file($_GET['location'].'/'.$_GET['plugin'].'/settings.tpl'))
    {
        include($_GET['location'].'/'.$_GET['plugin'].'/settings.tpl');
        exit;
    }
    else
    {
        echo '<center><h1>Cannot find any settings...</h1>';
        exit;
    }
}  
//

//act=getchat
if($_GET['act'] == 'getchat')
{
    if(!isset($settings['liveChat-enabled']) or $settings['liveChat-enabled'] !== 'false')
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
                echo '<div id="scomment"><a href="?act=3duser&user='.$chatline->player.'" class="iframe" title="View Profile"><img src="'.$HeadAPI.'?size=16&player='.$chatline->player.'"></a><span>&lt;'.date("M d&#183;g:ia", $chatline->time).'&#183;</span><a href="?act=3duser&user='.$chatline->player.'" class="iframe" title="View Profile">'.$chatline->player.'</a><span>&gt;</span> '.$chatline->message.'</div>';
            }
            echo '<script>$.resetIframeMagPopup();</script>';
        }
        else
        {
            echo '<center><h1>Minecraft server is Offline</h1><br>Chat will be temporarily unavailable until service is restored on the Minecraft Server.</center>';
        }
    }
    exit;
}
//

//act=switchserver
if($_GET['act'] == 'switchserver')
{
    if(isset($settings['BungeeServers']) and !empty($settings['BungeeServers']))
    {
        if(isset($_POST['confirm']))
        {
            session_start();
            $_SESSION['server'] = $_POST['confirm'];
            session_write_close();
            echo '
            <link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
            <center><br>
              <h1>Switching to server: '.$_POST['confirm'].'</h1>
              <img src="dpnd/images/load.gif"/></center>
              <script type="text/javascript">
                setTimeout(function() { 
                    window.parent.$.magnificPopup.close();
                    window.parent.$(".servername").text("'.$_POST['confirm'].'");
                }, 1000);
                setTimeout(function() { 
                    document.write("");
                    document.close();
                }, 2000);
              </script>
            </center>
            ';
            exit;
        }
        echo '
        <br>
        <link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
        <h1>Select a server.</h1>
        <center>
        <form id="window" method="post">
        <input id="hover" type="submit" value="Default" name="confirm"/><br>
        ';
        foreach($settings['BungeeServers'] as $rawdata)
        {
            $name = explode(';',$rawdata)[0];
            if(isset($name))
            {
                echo '<input id="hover" type="submit" value="'.$name.'" name="confirm"/><br>';   
            } 
        }
        echo '
        </center>
        </form>
        ';
        exit;   
    }
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
                echo 'Error';
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

//Post a feed comment ?act=feedcomment
if($_GET['act'] == 'feedcomment' and !empty($_POST['postcon']) and isset($_POST['id']) and isloggedin())
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
            $data = loadDB('feed');
            if(isset($data[$_POST['id']]))
            {
                if(!isset($data[$_POST['id']]['comments']))
                {
                    $data[$_POST['id']]['comments'] = array();
                }
                $info = $data[$_POST['id']]['comments'];
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
                $data[$_POST['id']]['comments'] = $info;
                putDB($data, 'feed');   
            }
            else
            {
                echo 'doesnotexist';
            }
        }
    }
    exit;
}
elseif($_GET['act'] == 'feedcomment' and !empty($_POST['postcon']))
{
    echo 'denied';
    exit;
}
elseif($_GET['act'] == 'feedcomment')
{
    echo 'missing';
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
        }
        else
        {
            $_GET['active'] = 'tab-4';
            $_GET['feedmessage'] = '5';
        }
    }
}
//

//View all feed comments act=viewfeedcomments&id=*&amount=*
if($_GET['act'] == 'viewfeedcomments' and isset($_GET['id']))
{
    $data = loadDB('feed');
    if(isset($data[$_GET['id']]['comments']) and !empty($data[$_GET['id']]['comments']) and is_array($data[$_GET['id']]['comments']))
    {
        $count = 0;
        foreach($data[$_GET['id']]['comments'] as  $cid => $comment)
        {
            $count++;
            if(isset($_GET['amount']) and ($count <= count($data[$_GET['id']]['comments']) - $_GET['amount']))
            {
                continue;
            }
            $inject = null;
            if($comment['owner'] == username() or username() == $AdminUsername)
            {
                $inject = '[<a title="Delete" class="iframe" href="?act=deletefeedcomment&pid='.$_GET['id'].'&cid='.$cid.'">X</a>]';
            }
            echo '<div id="scomment"><a href="?act=3duser&user=' . $comment['owner'] . '" class="iframe" title="View Profile"><img src="' . $HeadAPI . '?size=16&player=' . $comment['owner'] . '"></a><span>'.$inject.'&lt;'.date("M d&#183;g:ia", $comment['time']).'&#183;</span><a href="?act=3duser&user=' . $comment['owner'] . '" class="iframe" title="View Profile">' . $comment['owner'] . '</a><span>&gt;</span> ' . $comment['val'] . '</div>';
        }
    }
    else
    {
        echo 'notfound';
    }
    exit;
}
//

//?act=deletefeedcomment&pid=&cid= // pid is post id, cid is comment id
if($_GET['act'] == 'deletefeedcomment' and isset($_GET['pid']) and isset($_GET['cid']))
{
    include('act/deletefeedcomment.tpl');
    exit;
}
//

//act=dash&widget=*NAME*
if($_GET['act'] == 'dash' and isset($_GET['widget']))
{
	if(!isset($settings['enableDash']) or $settings['enableDash'] !== 'false')
	{
		if(file_exists('widgets/'.$_GET['widget'].'/index.tpl') and strpos($_GET['widget'], '~disabled') == false)
		{
			include('widgets/'.$_GET['widget'].'/index.tpl');
		}
		else
		{
			echo 'Failed to load widget.';
		}
		exit;
	}
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