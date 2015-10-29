<?php
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
//   krisdb2009 processor rev 0.0         //
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

//Begin with starting script general procedures for security and library initializing.

//Start Session
@session_start(); //I silenced this because whenever Garbage Collection runs it outputs an error. (No harmful effects that I know of)
session_write_close();
//

//======================================================
//CLEAN ALL USER INPUT FOR SAFTY AND THE GLORY OF SATAN
//======================================================
function clean($var)
{
    if(is_array($var))
    {
        $var = array_map("clean", $var);
    }
    else
    {
        $var = htmlentities(strip_tags($var), ENT_QUOTES);
    }
    return $var;
}

foreach($_GET as $key => $value)
{
    $_GET[$key] = clean($value);
}
foreach($_POST as $key => $value)
{
    $_POST[$key] = clean($value);
}
foreach($_COOKIE as $key => $value)
{
    $_COOKIE[$key] = clean($value);
}
//======================================================


//======================================================
//Call shaledatamanager and the configs...
//======================================================
require(__DIR__.'/../config.php');
require(__DIR__.'/shaledatamanager.lib.php');
$settings = loadDB('settings');
$version = file_get_contents(__DIR__.'/version');
//======================================================


//======================================================
//Inject Hack server variables depending on the settings
//======================================================
if(isset($settings['BungeeServers']) and !empty($settings['BungeeServers']) and isset($_SESSION['server']))
{
    foreach($settings['BungeeServers'] as $rawdata)
    {
        if(explode(';',$rawdata)[0] == $_SESSION['server'])
        {
            $jsondata = explode(':',explode(';',$rawdata)[1]);
            if(isset($jsondata[0]) and isset($jsondata[1]))
            {
                $jsonAPIaddress = $jsondata[0];
                $jsonAPIport = $jsondata[1];
            }
            break;
        }
    }
}
//======================================================


//======================================================
//Injection Hack for Multiple Admins. Delete this if desired.
//======================================================
if(isloggedin() and isset($settings['OtherAdmins']) and !empty($settings['OtherAdmins']) and username() !== $AdminUsername)
{
    foreach($settings['OtherAdmins'] as $val)
    {
        if(username() == $val)
        {
            $AdminUsername = fixname($val);
            break;
        }
    }
}
//======================================================


//======================================================
//Create Variable for HeadAPI Choices
//======================================================
if(isset($settings['headAPI']) and $settings['headAPI'] == true)
{
    $HeadAPI = 'dpnd/skinheadapi.php';
}
else
{
    $HeadAPI = 'https://'.$baAPIdomain.'/API/SKINHEAD/';
}
//======================================================


//======================================================
//Call the action library if its needed.
//======================================================
if(isset($_GET['act']))
{
    require('act.lib.tpl');
}
//======================================================


//======================================================
//jsonAPI functions
//======================================================
function generate_jsonapi_key($username, $password, $api_method_or_stream_name)
{
    return hash('sha256', $username.$api_method_or_stream_name.$password);
}

function sendjson($func, $args) //Will cache ALL requests.
{
    global $jsonAPIaddress;
    global $jsonAPIport;
    $index = md5($jsonAPIaddress.$jsonAPIport.$func.$args);
    $jcache = loadDB('cache\jsonapi');
    if(is_array($jcache))
    {
        foreach($jcache as $key => $call)
        {
            if($jcache[$key]['time'] < (time() - 60)) //time here
            {
                unset($jcache[$key]);
            }
        }
    }
    if(isset($jcache[$index]) and ($jcache[$index]['time'] > (time() - 1))) //time here
    {
        $result = $jcache[$index]['result'];
    }
    else
    {
        global $jsonAPIusername;
        global $jsonAPIpassword;
        $ctx = stream_context_create(array('http' => array('timeout' => 5)));
        $rawURL = rawurlencode('
            [
                {
                  "name": "'.$func.'",
                  "key": "'.generate_jsonapi_key($jsonAPIusername, $jsonAPIpassword, $func).'",
                  "username": "'.$jsonAPIusername.'",
                  "arguments": ['.$args.']
                }
            ]
        ');
        global $settings;
        if(!isset($settings['baJsonProxy']) or $settings['baJsonProxy'] !== 'true')
        {
            $result = @file_get_contents('http://'.$jsonAPIaddress.':'.$jsonAPIport.'/api/2/call?json='.$rawURL, 0, $ctx);
        }
        else
        {
            $result = @file_get_contents('http://'.$baAPIdomain.'/API/mcDash/jsonProxy/?jsonAPIaddress='.$jsonAPIaddress.'&jsonAPIport='.$jsonAPIport.'&json='.$rawURL, 0, $ctx);
        }
        if($result == false)
        {
            if(isset($jcache[$index]['result']))
            {
                $result = $jcache[$index]['result'];
            }
            else
            {
                $result = null;
            }
        }
        else
        {
            $jcache[$index]['time'] = time();
            $jcache[$index]['result'] = $result;
            putDB($jcache, 'cache\jsonapi');
        }
    }
    return $result;
}
//======================================================


//======================================================
//Show Gallery showGallery(number of images to pull,page number);
//======================================================
function showGallery($num, $page = 1)
{
    if($page == '' or ($page < 1))
    {
        $page = 1;
    }
    $int = 0;
    $images = loadDB('uploads');
    if(isset($images['uploads']) and is_array($images['uploads']))
    {
        $images['uploads'] = array_reverse($images['uploads']);
        foreach($images['uploads'] as $image)
        {
            if(isset($image['category']) and $image['category'] == 'gallery')
            {
                $int++;
                if($int <= ($num * $page) and $int > (($num * $page) - $num))
                {
                    echo '<div style="display:inline-block;" title="Uploaded by: '.$image['user'].', on '.date("Y-m-d, g:i a", $image['time']).'"><span class="galThumb"><a href="dpnd/'.$image['path'].'"><h3>'.$image['user'].'</h3><img src="dpnd/thumb.lib.php?img=../dpnd/'.$image['path'].'&h=150" /><div class="magnify"></div></a></span>';
                    if(myfile($image['path']) == true)
                    {
                        echo '<a href="?act=delete&delete='.$image['path'].'" class="iframe delete"><span class="glyphicon glyphicon-remove"></span></a>';
                    }
                    echo '</div>';
                }
            }
        }
    }
}
//======================================================


//======================================================
//Show Apps showPlugins();
//======================================================
function showPlugins()
{
    $directory = "apps/";
    $dirs = glob($directory."*", GLOB_ONLYDIR);
    foreach($dirs as $dir)
    {
        $name = str_replace($directory, '', $dir);
        if(strpos($name, '~disabled') !== false) //skip if disabled
        {
            continue;  
        }
        echo '<a href="?act=plugin&plugin='.$name.'" class="plugin iframe"><h3>'.$name.'</h3><img src="'.$dir.'/thumbnail.png"/><div class="magnify"></div></a>';
    }
}
//======================================================


//======================================================
//Shows current page URL()
//======================================================
function URL()
{
    $pageURL = 'http';
    if($_SERVER["HTTPS"] == "on")
    {
        $pageURL .= "s";
    }
    $pageURL .= "://";
    if(!($_SERVER["SERVER_PORT"] == "80" or $_SERVER["SERVER_PORT"] == "443"))
    {
        $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
    }
    else
    {
        $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
    }
    return $pageURL;
}
//======================================================


//======================================================
//fixname($uncapname) returns names to proper case
//======================================================
function fixname($name)
{
    foreach(glob('dpnd/DB/users/*.dat') as $path)
    {
        if(!strcasecmp(basename($path, '.dat'), $name))
        {
            $namef = basename($path, '.dat');
            break;
        }
    }
    return $namef;
}

//======================================================


//======================================================
//Show Widgets showWidgets();
//======================================================
function showWidgets()
{
    $directory = "widgets/";
    $dirs = glob($directory."*", GLOB_ONLYDIR);
    $num = 0;
    foreach($dirs as $dir)
    {
        $name = str_replace($directory, '', $dir);
        if(strpos($name, '~disabled') !== false)
        {
            continue;
        }
        echo '<fieldset class="dash"><legend>'.$name.'</legend><div class="wrap wid'.$num.'"><center><br><img src="dpnd/images/widgets.gif"/></center></div></fieldset>';
        $num++;
    }
    $num = 0;
    foreach($dirs as $dir)
    {
        if(strpos($dir, '~disabled') !== false)
        {
            continue;
        }
        if(file_exists('./'.$dir.'/refreshdelay.setting'))
        {
            $refreshdelay = file_get_contents('./'.$dir.'/refreshdelay.setting');
        }
        else
        {
            $refreshdelay = 2000;
        }
        $name = str_replace($directory, '', $dir);
        echo '
      <script>
      $(document).ready(function() {
      $(".wid'.$num.'").load("./?act=dash&widget='.urlencode($name).'");
        function widrefresh'.$num.'() {
          if( $("#DashBoard").hasClass( "active" ))
          {
            $(".wid'.$num.'").load("./?act=dash&widget='.urlencode($name).'");
          }
        }
        setInterval(widrefresh'.$num.', '.$refreshdelay.');
      });
      </script>
    ';
        $num++;
    }
}
//======================================================


//======================================================
//Show Users - showusers($search)
//======================================================
function showusers($searchword = null, $num, $page = 1)
{
    if($page == '' or ($page < 1))
    {
        $page = 1;
    }
    $int = 0;
    global $settings;
    global $HeadAPI;
    $users = loadDB('cache\users');
    if(!isset($settings['players-updateTime']))
    {
        $rloadtime = 900;
    }
    else
    {
        $rloadtime = $settings['players-updateTime'];
    }
    if(!isset($users['time']) or $users['time'] < (time() - $rloadtime)) //15 minutes has passed since it was last reloaded
    {
        $RecentConnect = json_decode(sendjson('streams.connections.limit', '"500"'),true);
        if(isset($RecentConnect[0]['success']) and is_array($RecentConnect[0]['success']))
        {
            foreach($RecentConnect[0]['success'] as $userdat)
            {
                if(isset($users['users']) and is_array($users['users']) and !in_array($userdat['player'],$users['users']))
                {
                    array_unshift($users['users'],$userdat['player']);
                }
                elseif(!isset($users['users']))
                {
                    $users['users'] = array();
                }
            }
            $users['time'] = time();
            putDB($users,'cache\users');
        }
    }
    if(!empty($searchword))
    {
        $data = $users['users'];
        $users['users'] = array();
        foreach($data as $user)
        {
            if(strpos(strtolower($user), strtolower($searchword)) !== false)
            {
                array_push($users['users'],$user);
            }
        }
    }
    if(isset($users['users']) and is_array($users['users']))
    {
        foreach($users['users'] as $user)
        {
            $int++;
            if($int <= ($num * $page) and $int > (($num * $page) - $num))
            {
                echo '<a class="iframe" href="?act=3duser&user='.$user.'" id="link"><div id="player">'.$user.'<img id="head" src="'.$HeadAPI.'?player='.$user.'&size=150"/></div></a>';
            }
        }
    }
}

//======================================================


//======================================================
//Show Feed - showfeed()
//======================================================
function showfeed()
{
    global $HeadAPI;
    $count = 0;
    $feed = loadDB('feed');
    if(!empty($feed))
    {
        $feed = array_reverse($feed, true);
        foreach($feed as $id => $val)
        {
            $count++;
            if($count & 1)
            {
                $leftorright = 'left';
            }
            else
            {
                $leftorright = 'right';
            }
            if(isset($val['likes']) and in_array(username(), $val['likes']))
            {
                $likedis = 'Unlike';
            }
            else
            {
                $likedis = 'Like';
            }
            echo '
            <fieldset cid="'.$id.'" class="feed '.$leftorright.'">
            <legend><a class="iframe" href="./?act=3duser&user='.$val['owner'].'"><img src="'.$HeadAPI.'?player='.$val['owner'].'&size=26"><span> - '.$val['owner'].'</span></a></legend>';
            global $AdminUsername;
            if((isloggedin() and $val['owner'] == username()) or (username() == $AdminUsername))
            {
                echo '<a href="?act=feeddelete&id='.$id.'" class="iframe del">Delete</a>';
            }
            echo '
                <div class="feedposted body">
                  '.$val['val'].'
                </div>
                <hr>
                <div class="likes">
            ';
            if(isloggedin())
            {
                echo '
                <form class="likeFeed" onsubmit="return false">
                    <input name="act" value="like" type="hidden">
                    <input name="post" value="'.$id.'" type="hidden">
                    <button>'.$likedis.'</button>
                </form>
                ';
            }
            if(!empty($val['likes']))
            {
                $likecounter = 0;
                if(isloggedin()) { echo '| '; }
                echo 'Likes: ';
                $numlikes = count($val['likes']);
                foreach($val['likes'] as $usr)
                {
                    if($likecounter < 5)
                    {
                        $likecounter++;
                        echo ' <a class="iframe" href="./?act=3duser&user='.$usr.'"><img title="'.$usr.'" src="'.$HeadAPI.'?player='.$usr.'&size=16"></a> ';
                    }
                    else
                    {
                        $numlikesm5 = $numlikes - 5;
                        echo ' And <a class="iframe" href="?act=whoelseliked&postid='.$id.'">'.$numlikesm5.' more</a>...';
                        break;
                    }
                }
            }
            $showhide = 'display:none;';
            $showhideSAC = null;
            if(isset($feed[$id]['comments']) and !empty($feed[$id]['comments']))
            {
                $showhide = null;
                if(count($feed[$id]['comments']) <= 3)
                {
                    $showhideSAC = 'display:none;';
                }
            }
            echo '
            <span id="userfeedtime">'.date("M d, g:ia", $val['time']).'</span>
            &nbsp;
            </div>
            <div style="'.$showhide.'" id="commcontain">
                <div class="sallcomm" id="'.$id.'" style="'.$showhideSAC.'">Show all comments</div>
            </div>
            ';
            if(isloggedin())
            {
                echo '
                <form class="commentFeed" onsubmit="return false">
                    <input type="hidden" name="id" value="'.$id.'">
                    <textarea required id="commentta" placeholder="Write a comment..." name="postcon"></textarea>
                    <button class="commentbutt">Comment</button>
                </form>
                ';
            }
            echo '</fieldset>';
        }
    }
    else
    {
        echo '<center><h1>Nothing Here</h1></center>';
    }
}

//======================================================


//======================================================
//Upload Something - upload('nameofuploadform','this/location',array("jpeg","jpg","png"))
//======================================================
function upload($file, $location, $type, $category = null, $maxbytes = 10485760)
{
    if(isset($file))
    {
        if($file['size'] !== 0)
        {
            if(isloggedin() !== false)
            {
                $errors = array();
                $file_size = $file['size'];
                $file_tmp = $file['tmp_name'];
                $file_type = $file['type'];
                @$file_ext = strtolower(end(explode('.', $file['name']))); //gives error for no reason
                $extensions = $type;
                $file_name = rand(0000000000, 9999999999).'.'.$file_ext;
                if(in_array($file_ext, $extensions) === false)
                {
                    $errors[] = "Extension not allowed";
                }
                if($file_size > $maxbytes)
                {
                    $mb = round(($maxbytes / 1024) / 1024, 2);
                    $fs = round(($file_size / 1024) / 1024, 2);
                    $errors[] = 'Max file size exceeded. '.$mb.'MB, Your image was: '.$fs.'MB';
                }
                if(empty($errors) == true)
                {
                    if(file_exists(__DIR__.'/'.$location.'/'.$file_name))
                    {
                        while(file_exists(__DIR__.'/'.$location.'/'.$file_name))
                        {
                            $file_name = rand(0000000000, 9999999999).'.'.$file_ext;
                        }
                    }
                    if(!file_exists(__DIR__.'/'.$location.'/'.$file_name))
                    {
                        @mkdir(__DIR__.'/'.$location, 0777, true);
                        $filepath = __DIR__.'/'.$location.'/'.$file_name;
                        move_uploaded_file($file_tmp, $filepath);
                        $db = loadDB('uploads');
                        $db['uploads'][$file_name] = array('path' => $location.'/'.$file_name, 'user' => username(), 'time' => time());
                        if($category !== null)
                        {
                            $db['uploads'][$file_name]['category'] = $category;
                        }
                        putDB($db, 'uploads');
                        return "Success";
                    }
                    else
                    {
                        return 'File already exists...';
                    }
                }
                else
                {
                    foreach($errors as $error)
                    {
                        return $error;
                    }
                }
            }
            else
            {
                return 'Please login to upload content!';
            }
        }
        else
        {
            return 'The file is either too big, or no file is selected.';
        }
    }
}

//======================================================


//======================================================
//Returns true if online the MC server onmc('player')
//======================================================
function onmc($player)
{
    $playersonline = json_decode(sendjson('players.online.names', '""'), true);
    if(isset($playersonline[0]['success']))
    {
        foreach($playersonline[0]['success'] as $player1)
        {
            if($player1 == $player)
            {
                return true;
            }
        }
    }
    else
    {
        return false;
    }
}

//======================================================


//======================================================
//Returns item name from id mcitemname('id','type',boolean) If boolean == true return img format eg (1-0)
//======================================================
function mcitemname($id = 0, $type = 0, $imgform = false)
{
    $dat = json_decode(file_get_contents('dpnd/mcitems.json'), true);
    foreach($dat as $item)
    {
        if($item['type'] == $id and $item['meta'] == $type)
        {
            if($imgform == false)
            {
                return $item['name'];
            }
            elseif($imgform == true)
            {
                return $item['type'].'-'.$item['meta'];
            }
            break;
        }
    }
    foreach($dat as $item)
    {
        if($item['type'] == $id and $item['meta'] == 0)
        {
            if($imgform == false)
            {
                return $item['name'];
            }
            elseif($imgform == true)
            {
                return $item['type'].'-'.$item['meta'];
            }
            break;
        }
    }
}

//======================================================


//======================================================
//Returns true if user is already registered isregistered(username);
//======================================================
function isregistered($username)
{
    if(is_file('dpnd/DB/users/'.$username.'.dat'))
    {
        return true;
    }
    else
    {
        return false;
    }
}

//======================================================


//======================================================
//Returns true if the file belongs in your uploads array myfile($fileAndDirectory)
//======================================================
function myfile($fileAndDirectory)
{
    global $AdminUsername;
    if(isloggedin() == true and file_exists(realpath(__DIR__.'/'.$fileAndDirectory)))
    {
        $db = loadDB('uploads');
        if(isset($db['uploads']))
        {
            foreach($db['uploads'] as $upload)
            {
                if($upload['path'] == $fileAndDirectory and $upload['user'] == username())
                {
                    return true;
                    break;
                }
            }
        }
    }
    if(isloggedin() == true and $AdminUsername == username())
    {
        $db = loadDB('uploads');
        foreach($db['uploads'] as $upload)
        {
            if($upload['path'] == $fileAndDirectory)
            {
                return true;
            }
        }
    }
}

//======================================================


//======================================================
//deletemyfile($fileAndDirectory) Deletes a file that belongs to you (Force meaning without any concent)
//======================================================
function deletemyfile($fileAndDirectory, $force = false)
{
    if(isloggedin() == true and file_exists(__DIR__.'/'.$fileAndDirectory) or $force == true)
    {
        if(myfile($fileAndDirectory) or $force == true)
        {
            $db = loadDB('uploads');
            foreach($db['uploads'] as $key => $val)
            {
                if($val['path'] == $fileAndDirectory)
                {
                    unset($db['uploads'][$key]);
                    break;
                }
            }
            putDB($db, 'uploads');
            unlink(__DIR__.'/'.$fileAndDirectory);
            return 'Success';
        }
    }
}

//======================================================


//======================================================
//Sets a page default on reload amIactive(pageID);
//======================================================
function amIactive($page)
{
    global $settings;
    if(isset($settings['defaultTab']))
    {
        $defactiv = $settings['defaultTab'];
    }
    else
    {
        $defactiv = 'tab-1';
    }
    if((!empty($_GET['active']) and $page == $_GET['active']) or (!empty($_POST['active']) and $page == $_POST['active']))
    {
        return 'class="active"';
    }
    elseif($page == $defactiv and empty($_GET['active']) and empty($_POST['active']))
    {
        return 'class="active"';
    }
}

//======================================================


//======================================================
//Brings back number new of messages WIP
//======================================================
function numberofnewmessages()
{
    $userinfo = loadDB('users\\'.username());
    $unreadconvos = array();
    if(isset($userinfo['conversations']) and is_array($userinfo['conversations']))
    {
        foreach($userinfo['conversations'] as $conID => $convo)
        {
            if($convo['new'] == true)
            {
                array_push($unreadconvos, $conID);
            }
        }
    }
    return count($unreadconvos);
}

//======================================================


//======================================================
//test if it is my conversation myconvo(idnumber)
//======================================================
function myconvo($id)
{
    if(isloggedin())
    {
        $userdata = loadDB('users\\'.username());
        $convodata = loadDB('conversations\\'.$id);
        $CASE1 = null;
        $CASE2 = null;
        foreach($userdata['conversations'] as $convo => $thesender)
        {
            if($convo == $id)
            {
                $CASE1 = true;
                break;
            }
        }
        if(isset($convodata['users']))
        {
            foreach($convodata['users'] as $user)
            {
                if($user == username())
                {
                    $CASE2 = true;
                    break;
                }
            }
        }
        if($CASE1 == true and $CASE2 == true)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

//======================================================


//======================================================
//isloggedin() Retruns true if you are logged in
//======================================================
function isloggedin()
{
    if(username() !== false)
    {
        return true;
    }
    else
    {
        return false;
    }
}

//======================================================


//======================================================
//username() returns current logged in username
//======================================================
function username()
{
    if(isset($_SESSION['login']))
    {
        return $_SESSION['login'];
    }
    else
    {
        return false;
    }
}

//======================================================


//======================================================
//sendchat(''); Sends chat to a minecraft server as the logged in user
//======================================================
function sendchat($message)
{
    $message = substr($message, 0, 100); //Limits to minecraft specs at 100 characters
    if(username() == false)
    {
        return 'Please login to chat!';
    }
    else
    {
        sendjson('chat.with_name', '"'.str_replace("\'", "'", addslashes(html_entity_decode($message, ENT_QUOTES))).'", "'.username().'"');
    } 
}
//======================================================
?>
