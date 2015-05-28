<?php

// ?convoid=1&justconvo

if (isset($_GET['convoid']) and isset($_GET['justconvo']))
{
    if (isset($_GET['convoid']) and myconvo($_GET['convoid']) == true)
    {
        $chatdata = loadDB('conversations\\' . $_GET['convoid']);
        if (empty($chatdata))
        {
            echo '<h1>This conversation has been removed by the creator.</h1>';
            exit;
        }

        if (!isset($_GET['all']))
        {
            $chatdata['messages'] = array_slice($chatdata['messages'], -20);
        }

        foreach($chatdata['messages'] as $message)
        {
            echo '['.$message['time'].'] <a href="./?act=3duser&user='.$message['from'].'"><img class="head" src="'.$HeadAPI.'?player='.$message['from'].'&size=16"></a> <<span style="color:rgb(0, 183, 190);">' . $message['from'] . '</span>> ' . $message['message'] . '<br />';
        }
    }
    else
    {
        echo '<center>This conversation has been removed by the creator.</center>';
    }

    exit;
}

//
// submit chat

if (isset($_POST['chat']) and !empty($_POST['chat']) and myconvo($_GET['convoid']))
{
    $chatdata = loadDB('conversations\\' . $_GET['convoid']);
    $num = count($chatdata['messages']);
    $num = $num + 1;
    //foreach user update view status
    foreach($chatdata['users'] as $user)
    {
        if($user !== username())
        {
            $userdata = loadDB('users\\'.$user);
            $userdata['conversations'][$_GET['convoid']]['new'] = true;
            putDB($userdata,'users\\'.$user);
        }
    }
    //
    $chatdata['messages'][$num]['message'] = strip_tags($_POST['chat']);
    $chatdata['messages'][$num]['from'] = username();
    $chatdata['messages'][$num]['time'] = date('H:i');
    putDB($chatdata, 'conversations\\' . $_GET['convoid']);
    exit;
}

//

?>
<link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
<script type="text/javascript" src="dpnd/js/jquery.min.js"></script>
<script>

</script>
<center>
<?php

// If Convoid is set and not $all/JustConvo is set

$userinfo = loadDB('users\\' . username());

if(isset($_GET['convoid']) and !isset($_GET['all']) and !isset($_GET['all']))
{
    $userinfo['conversations'][$_GET['convoid']]['new'] = false;
    putDB($userinfo,'users\\' . username());
    $userinfo = loadDB('users\\' . username());
    if(isset($_GET['delete'])) //This is what happens if you delete the conversation from your list
    {
        if(myconvo($_GET['convoid']))
        {
            $chatdata = loadDB('conversations\\' . $_GET['convoid']);
            if (!empty($chatdata)) //dont bother doing anything if its already deleted...
            {
                $num = count($chatdata['messages']);
                $num = $num + 1;
                foreach($chatdata['users'] as $usid => $user) //find and remove user from chat data
                {
                    if($user == username())
                    {
                        unset($chatdata['users'][$usid]);
                        break;
                    }
                }
                $chatdata['messages'][$num]['from'] = 'Server';
                $chatdata['messages'][$num]['time'] = date('H:i');
                $chatdata['messages'][$num]['message'] = username() . ' has left the chat.';
                putDB($chatdata, 'conversations\\' . $_GET['convoid']);
            }

            if ($userinfo['conversations'][$_GET['convoid']]['owner'] == username()) //if your the convo owner then delete the whole thing
            {
                dropDB('conversations\\' . $_GET['convoid']);
            }
        }
        unset($userinfo['conversations'][$_GET['convoid']]);
        putDB($userinfo, 'users\\' . username());

        // before exiting, show something and redirect

        echo '<br>
        <center><h1>You have left this conversation.</h1>
        <img src="dpnd/images/load.gif"/></center>
        <script type="text/javascript">
        setTimeout(function() { 
        window.location.href = \'./?act=viewmessages\';
        }, 1000);
        </script>
        ';
        exit;
    }
     
     
    elseif(isset($_GET['adduser']) and isset($_GET['convoid'])) //Add a user to the chat
    {
        $error = null;
        $p1 = loadDB('users\\'.username());
        $convo = loadDB('conversations\\' . $_GET['convoid']);
        if($p1['conversations'][$_GET['convoid']]['owner'] == username())
        {
            if (isset($_POST['username']) and !empty($_POST['username']) and strtolower($_POST['username']) !== strtolower(username()) and isregistered($_POST['username']) == true and !in_array(fixname($_POST['username']), $convo['users']))
            {    
                $p2 = loadDB('users\\'.$_POST['username']);
                $title = $p1['conversations'][$_GET['convoid']]['title'];
                $owner = $p1['conversations'][$_GET['convoid']]['owner'];
                $p2['conversations'][$_GET['convoid']]['title'] = $title;
                $p2['conversations'][$_GET['convoid']]['owner'] = $owner;
                $p2['conversations'][$_GET['convoid']]['new'] = true;
                $cnum = count($convo['messages']);
                $cnum = $cnum + 1;
                $convo['messages'][$cnum]['from'] = 'Server';
                $convo['messages'][$cnum]['time'] = date('H:i');
                $convo['messages'][$cnum]['message'] = fixname($_POST['username']) . ' has been added to the chat by '.username();
                sendjson('players.name.send_message', '"'.fixname($_POST['username']).'","'.username().' on our website has added you to their conversation! To read it click here: '.str_replace('&new','',URL()).'"');
                array_push($convo['users'], fixname($_POST['username']));
                putDB($p2, 'users\\' . fixname($_POST['username']));
                putDB($convo, 'conversations\\' . $_GET['convoid']);
                echo '
                <center><h1>Adding User</h1>
                <img src="dpnd/images/load.gif"/></center>
                <script type="text/javascript">
                setTimeout(function() { 
                window.location.href = \'./?act=viewmessages&convoid=' . $_GET['convoid'] . '\';
                }, 1000);
                </script>
                ';
                exit;
            }
            elseif (isset($_POST['username']) and !empty($_POST['username']) and strtolower($_POST['username']) == strtolower(username()))
            {
                $error = 'You cannot add yourself.';
            }
            elseif (isset($_POST['username']) and !empty($_POST['username']) and $_POST['username'] !== username() and isregistered($_POST['username']) !== true)
            {
                $error = $_POST['username'].' is not registered on the site!';
            }
            elseif (isset($_POST['username']) and !empty($_POST['username']) and $_POST['username'] !== username() and in_array(fixname($_POST['username']), $convo['users']))
            {
                $error = fixname($_POST['username']) . ' is already in the chat.';
            }
            echo '
                <h1>Add a user to the chat.</h1>
                <h5 style="text-shadow:0px 0px 15px white;color:red;">' . $error . '</h5>
                <form id="window" method="post">
                <input type="text" id="query" name="username" placeholder="Username" required autocomplete="off"><br />
                <button>Add</button> | <a href="./?act=viewmessages&convoid='.$_GET['convoid'].'">Cancel</a>
                </form>
                ';
            exit;
        }
        else
        {
            echo '<h1>403 No Permissions</h1>';
            exit;
        }
    }
    
    
    elseif(isset($_GET['allusers'])) //elseif do this junk if it all is also set
    {
        if(myconvo($_GET['convoid']))
        {
            echo '
            <div id="window">
            <a href="?act=viewmessages&convoid=' . $_GET['convoid'] . '">Back</a><br /><br />
            ';
            $users = loadDB('conversations\\' . $_GET['convoid']);
            foreach($users['users'] as $user)
            {
                echo '<a href="./?act=3duser&user=' . $user . '"><img style="vertical-align:middle;" src="'.$HeadAPI.'?player='.$user.'&size=26"/> ' . $user . '</a>, ';
            }

            echo '
            and <a target="_TOP" href="/">Server</a>.
            </div>
            ';
            exit;
        }
    }
    if (isset($userinfo['conversations'][$_GET['convoid']]) and $userinfo['conversations'][$_GET['convoid']]['owner'] == username())
    {
        $leavedelete = 'Delete Chat';
        $add = '| <a href="?act=viewmessages&adduser&convoid='.$_GET['convoid'].'">Add</a>';
    }
    else
    {
        $leavedelete = 'Leave Chat';
        $add = NULL;
    }
    echo '
    <div id="window">
    <a href="./?act=viewmessages">Back</a> '.$add.' | <a href="?act=viewmessages&all&convoid=' . $_GET['convoid'] . '">Chat History</a> | <a href="?act=viewmessages&allusers&convoid=' . $_GET['convoid'] . '">All Users</a> | <a href="?act=viewmessages&convoid=' . $_GET['convoid'] . '&delete">' . $leavedelete . '</a><br /><br />
    <div id="chatwd1">Loading Chat</div>
    <script>
    $(document).ready(function() {
    $("#chatwd1").load("./?act=viewmessages&justconvo&convoid=' . $_GET['convoid'] . '");
    $("#chatwd1").animate({ scrollTop: $(\'#chatwd1\')[0].scrollHeight}, 1000);
    setInterval(update, 1000);
    });
    function update() {
    $("#chatwd1").load("./?act=viewmessages&justconvo&convoid=' . $_GET['convoid'] . '");
    $("#chatwd1").animate({ scrollTop: $(\'#chatwd1\')[0].scrollHeight}, 1000);
    }
    function submitForm() {
    $.ajax({type:\'POST\', url: \'?act=viewmessages&convoid='.$_GET['convoid'].'\', cache : false, data:$(\'#ChatForm\').serialize(), success: function(response) {
    $(".chatformin,#button2").removeAttr("disabled");
    $(\'#chat\').val(\'\');
    $("#chat").focus();
    },
    beforeSend: function() {
    $(".chatformin,#button2").attr("disabled","disabled");
    }});
    return false;
    }
    </script>
    <form id="ChatForm" onsubmit="return submitForm();">
    <textarea autocomplete="off" class="chatformin" id="chat" type="text" name="chat" autofocus></textarea><br />
    <input id="button2" type="submit" value="Submit">
    </form>
    <script>
    $(".chatformin").on("keydown", function(e) {
    if (e.which == 13) {
        submitForm();
    }
    });
    </script>
    ';
    echo '
    </div>
    ';
}
elseif(isset($_GET['all'])) //elseif do this junk if it all is also set
{
    echo '
    <div id="window">
    <a href="?act=viewmessages&convoid=' . $_GET['convoid'] . '">Back</a><br /><br />
    <div style="height:380px;overflow-y:scroll;" id="chatwd1">Loading Chat</div>
    <script>
    $(document).ready(function() {
    $("#chatwd1").load("./?act=viewmessages&justconvo&all&convoid=' . $_GET['convoid'] . '");
    });
    </script>
    ';
    echo '
    </div>
    ';
}
elseif(isset($_GET['new'])) //elseif do this only if new isset
{
    $error = null;
    if (isset($_POST['username']) and isset($_POST['title']) and !empty($_POST['username']) and strtolower($_POST['username']) !== strtolower(username()) and isregistered($_POST['username']) == true)
    {
        $p1 = $userinfo;
        $p2 = loadDB('users\\' . $_POST['username']);
        $num = 0;
        while (file_exists('dpnd\DB\conversations\\' . $num . '.dat'))
        {
            $num++;
        }

        $p1['conversations'][$num]['title'] = (strlen($_POST['title']) > 70) ? substr($_POST['title'], 0, 70) . '...' : $_POST['title'];
        $p2['conversations'][$num]['title'] = (strlen($_POST['title']) > 70) ? substr($_POST['title'], 0, 70) . '...' : $_POST['title'];
        $p1['conversations'][$num]['owner'] = username();
        $p2['conversations'][$num]['owner'] = username();
        $p1['conversations'][$num]['new'] = true;
        $p2['conversations'][$num]['new'] = true;
        $convo['messages']['1']['message'] = username() . ' Started the chat and added ' . fixname($_POST['username']) . '. The subject is ' . $_POST['title'];
        $convo['messages']['1']['from'] = 'Server';
        $convo['messages']['1']['time'] = date('H:i');
        $convo['users'] = array();
        array_push($convo['users'], username() , fixname($_POST['username']));
        putDB($p1, 'users\\' . username());
        putDB($p2, 'users\\' . fixname($_POST['username']));
        putDB($convo, 'conversations\\' . $num);
        echo '<br>
        <center><h1>Creating Conversation</h1>
        <img src="dpnd/images/load.gif"/></center>
        <script type="text/javascript">
        setTimeout(function() { 
        window.location.href = \'./?act=viewmessages&convoid=' . $num . '\';
        }, 1000);
        </script>
        ';
        sendjson('players.name.send_message', '"'.fixname($_POST['username']).'","'.username().' has added you to their conversation! To read it click here and login: '.str_replace('&new','',URL()).'"');
        exit;
    }
    elseif(isset($_POST['username']) and !empty($_POST['username']) and strtolower($_POST['username']) == strtolower(username()))
    {
        $error = 'You cannot send yourself a message...';
    }
    elseif(isset($_POST['username']) and !empty($_POST['username']) and $_POST['username'] !== username() and isregistered($_POST['username']) !== true)
    {
        $error = $_POST['username'] . ' is not registered on the site!';
    }
    if(isset($_GET['autouser']))
    {
        $au = $_GET['autouser'];
    }
    else
    {
        $au = null;
    }
    if(isset($_GET['autouser']))
    {
        $auser = $_GET['autouser'];
    }
    else
    {
        $auser = null;
    }
    echo '<br>
        <h1>New Conversation With?</h1>
        <h5 style="text-shadow:0px 0px 15px white;color:red;">' . $error . '</h5>
        <form id="window" method="post">
        <input value="'.$auser.'" type="text" id="query" name="username" placeholder="Username" required autocomplete="off"><br />
        <input type="text" name="title" placeholder="Subject" required autocomplete="off"><br />
        <button>Begin</button> | <a href="./?act=viewmessages">Cancel</a>
        </form>
        ';
    exit;
}

else

// else display the front page of the chat

{
    echo '
<div id="window">
<a id="button2" style="margin-bottom:10px;" href="?act=viewmessages&new">New <span id="chatico"></span></a>
';
    if (isset($userinfo['conversations']) and !empty($userinfo['conversations']))
    {
        //FIND UNREAD CONVO'S
        $unreadconvos = array();
        foreach($userinfo['conversations'] as $conID => $convo)
        {
            if($convo['new'] == true)
            {
                array_push($unreadconvos, $conID);
            }
        }
        //
        //List unread convo's
        if(!empty($unreadconvos)) { echo '<center>Unread Conversations</center><div id="convos">'; }
        $num = 0;
        foreach(array_reverse($userinfo['conversations'], true) as $convoID => $properties)
        {
            if(in_array($convoID,$unreadconvos) == true)
            {
                if($num++ % 2 == 0)
                {
                    $class = 'light';
                }
                else
                {
                    $class = null;
                }
                echo '<a href="?act=viewmessages&convoid=' . $convoID . '" id="messagetile'.$class.'">' . $properties['title'] .'<span id="vmuname">'. $properties['owner'].'</span></a>';
            }
        }
        if(!empty($unreadconvos)) { echo '</div><br>All Conversations'; }
        //
        //list all convos
        echo '<div id="convos">';
        $num = 0;
        foreach(array_reverse($userinfo['conversations'], true) as $convoID => $properties)
        {
            if(in_array($convoID,$unreadconvos) == false)
            {
                if($num++ % 2 == 0)
                {
                    $class = 'light';
                }
                else
                {
                    $class = null;
                }
                echo '<a href="?act=viewmessages&convoid=' . $convoID . '" id="messagetile'.$class.'">' . $properties['title'] .'<span id="vmuname">'. $properties['owner'].'</span></a>';
            }
            
        }
        echo '</div>';
    }
    else
    {
        echo '<br>Nothing in your inbox, Try making a new conversation.<br><br>';
    }
}

?>
</div>