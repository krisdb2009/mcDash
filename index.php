<?php
//PreProcessPreIndex

//
?>
<?php require('dpnd/function.lib.php'); ?>
<?php
//PostProcessPreIndex

//
?>
<!DOCTYPE html>
<!--
Author: krisdb2009 from Below Average
URL: http://belowaverage.org/mcDash/
Email: krisdb2009@belowaverage.org
Credits: Please see <?php echo URL(); ?>/dpnd/About%20These%20Files.txt
Project Name: mcDash
Project Release Version: <?php echo $version; ?>

Project Description: A functional, elegant, intuitive way to allow a player access the Minecraft server from the server's website.
Project Development: July 4th 2014 -> Current Date.
Need help? Message me on skype, (dylan.bickerstaff), Shoot me an email.
-->
<head>
    <meta charset="utf-8">
    <title><?php if(isset($settings['Title'])) echo $settings['Title']; else echo 'mcDash'; ?></title>
    <link media="all" rel="stylesheet" type="text/css" href="dpnd/css/all.css">
    <script type="text/javascript" src="dpnd/js/jquery.min.js"></script>
    <script type="text/javascript" src="dpnd/js/jquery.main.js"></script>
    <script type="text/javascript" src="dpnd/js/jquery-ui.min.js"></script>
    <svg style="position:absolute;z-index:-100;" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
            <filter id="blur" x="0" y="0">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
            </filter>
        </defs>
    </svg>
    <!-- This script was designed by Below Average -->
</head>
<body>
<div id="baph"
     inf="<?php echo 'url='.URL().'&version='.$version.'&env='.PHP_OS.'&phpver='.phpversion().'&id='.$baphID; ?>">
    <!-- Not Responding... --></div>
<div id="shade"></div>
<div id="wrapper">
    <div id="content">
        <div class="c1">
            <div style="<?php if (!empty($settings['Banner']))
            {
                echo 'background:url(./dpnd/images/glass.png), url('.$settings['Banner'].');';
            } ?>" class="controls">
                <nav class="links">
                    <ul>
                        <?php if (isloggedin() == true and (!isset($settings['messagesenabled']) or $settings['messagesenabled'] !== 'false')) { ?>
                            <li>
                                <a href="?act=viewmessages" class="ico1 iframe">Messaging <?php if(numberofnewmessages() !== 0) {echo '<span class="num">'.numberofnewmessages().'</span>';} ?></a>
                            </li>
                        <?php } ?>
                        <?php if($AdminUsername == username()) { ?>
                            <li><a href="?act=admin" class="ico2 iframe">Admin Settings </a></li>
                        <?php } ?>
                        <?php if(isset($settings['BannerLinks']) and is_array($settings['BannerLinks']))
                        {
                            foreach($settings['BannerLinks'] as $link)
                            {
                                $kvlink = explode(';', $link);
                                echo '<li><a href="'.@$kvlink[1].'" class="ico3">'.@$kvlink[0].'</a></li>';
                            }
                        }
                        ?>
                    </ul>
                </nav>
                <div class="profile-box">
                    <?php if(isset($settings['BungeeServers'])) { ?>
                    <span class="profile" style="margin-right:7px;">
                        <a href="./?act=switchserver" class="section iframe">
                            <span class="text-box">
                                Change server:
                                <strong class="servername name"><?php if(isset($_SESSION['server'])) echo $_SESSION['server']; else echo 'Default'; ?></strong>
                            </span>
                        </a>
                    </span>
                    <?php } ?>
                    <span class="profile">
                        <?php
                            if(isloggedin() == true)
                            {
                                echo '
                                <a href="./?act=3duser&user='.username().'" class="section iframe">
                                    <img class="image" src="'.$HeadAPI.'?player='.username().'&size=26" alt="image description" width="26" height="26" />
                                    <span class="text-box">
                                        Welcome
                                        <strong class="name">'.username().'</strong>
                                    </span>
                                </a>
                                ';
                            }
                            else
                            {
                                echo '
                                <a href="./?act=login" class="section iframe">
                                    <img class="image" src="'.$HeadAPI.'?player=steve&size=26" alt="image description" width="26" height="26" />
                                    <span class="text-box">
                                        Welcome Stranger!
                                        <strong class="name">Login / Register</strong>
                                    </span>
                                </a>
                                ';
                            }
                        ?>
                    </span>
                    <a href="<?php if(isloggedin() == true)  echo './?act=logout'; else echo './?act=login'; ?>" class="btn-on iframe">log</a>
                </div>
            </div>
            <div class="tabs">
                <?php if(!isset($settings['enableDash']) or $settings['enableDash'] !== 'false') { ?>
                <div id="tab-1" class="tab">
                    <article>
                        <div class="text-section">
                            <h1>Dashboard</h1>

                            <p>These widgets are an overview of you and the server.</p>
                        </div>
                        <center>
                            <?php
                            showWidgets();
                            ?>
                        </center>
                    </article>
                </div>
                <?php } ?>
                <?php if(!isset($settings['gallery-Enable']) or $settings['gallery-Enable'] !== 'false') { ?>
                    <div id="tab-2" class="tab">
                        <article>
                            <div class="text-section">
                                <h1 style="display:inline-block;">Gallery</h1>
                                <?php if(isloggedin() == true) { ?>
                                    <div style="float:right;margin-left:10px;margin-right:10px;">
                                        <form id="upld" style="" action="./?act=uploadgal" method="POST" enctype="multipart/form-data">
                                            <input type="file" name="image"/>
                                            <input type="hidden" name="active" value="tab-2"/>
                                            <input id="upldbttn" value="Upload" type="submit"/>
                                        </form>
                                        <span id="placemrk"></span>
                                    </div>
                                    <img style='display:none;' src='dpnd/images/upload.gif'/>
                                    <h1 id="upldh1" style="display:inline-block;float:right;">Upload</h1>
                                <?php } ?>
                            </div>
                            <ul class="states">
                                <?php
                                if(!empty($_GET['message']))
                                {
                                    if ($_GET['message'] == 'Success')
                                    {
                                        echo '<li class="succes">Your photo has been uploaded to the gallery!</li>';
                                    }
                                    else
                                    {
                                        echo '<li class="error">Image Upload Issue : '.$_GET['message'].'</li>';
                                    }
                                }
                                if(isset($_GET['deleted']))
                                {
                                    echo '<li class="succes">Your image was permanently removed from the server.</li>';
                                }
                                ?>
                            </ul>
                        </article>
                        <center id="gall">
                        </center>
                        <div class="animation_image" align="center">
                            <img style="display:none;" src="dpnd/images/ajax.gif"><br>
                            <button id="loadmoreimages">Load More...</button>
                        </div>
                    </div>
                <?php } ?>
                <?php if(!isset($settings['apps-enabled']) or $settings['apps-enabled'] !== 'false') { ?>
                    <div id="tab-3" class="tab">
                        <article>
                            <div class="text-section">
                                <h1>Apps</h1>
                                <p>Extra mcDash features.</p>
                            </div>
                            <ul class="states">
                            </ul>
                        </article>
                        <center>
                            <?php showPlugins(); ?>
                        </center>
                    </div>
                <?php } ?>
                <?php if(!isset($settings['feed-enabled']) or $settings['feed-enabled'] !== 'false') { ?>
                    <div id="tab-4" class="tab">
                        <article>
                            <div class="text-section">
                                <h1>User Feed</h1>

                                <p>Recent overview of what the players are talking about.</p>
                            </div>
                            <ul class="states">
                                <?php
                                if(isset($_GET['feedmessage']))
                                {
                                    if($_GET['feedmessage'] == 1)
                                    {
                                        echo '<li class="succes">You Liked a post.</li>';
                                    }
                                    if($_GET['feedmessage'] == 2)
                                    {
                                        echo '<li class="warning">You Unliked a post.</li>';
                                    }
                                    if($_GET['feedmessage'] == 3)
                                    {
                                        echo '<li class="error">Please login to like a post</li>';
                                    }
                                    if($_GET['feedmessage'] == 4)
                                    {
                                        echo '<li class="succes">Shared!</li>';
                                    }
                                    if($_GET['feedmessage'] == 5)
                                    {
                                        echo '<li class="error">Max characters. Exceeded</li>';
                                    }
                                    if($_GET['feedmessage'] == 6)
                                    {
                                        echo '<li class="succes">Post deleted!</li>';
                                    }
                                }
                                ?>
                            </ul>
                            <?php if(isloggedin())
                                {
                                   echo '
                                   <center>
                                     <form action="./?act=feedpost" method="post">
                                       <input type="hidden" name="act" value="feedpost">
                                       <textarea name="postcon" class="feedformin" placeholder="                                                       Hey '.username().', Tell us what\'s up."></textarea>
                                       <button>Share</button>
                                     </form>
                                   </center>
                                   <br><br>
                                   '; 
                                }
                                showfeed();
                            ?>
                        </article>
                    </div>
                <?php } ?>
                <?php if(!isset($settings['liveChat-enabled']) or $settings['liveChat-enabled'] !== 'false') { ?>
                    <div id="tab-5" class="tab">
                        <article>
                            <div class="text-section">
                                <h1>Server Chat</h1>
                            </div>
                            <ul class="states">
                                <?php
                                if(isloggedin() == false and (!isset($settings['liveChat-readonly']) or $settings['liveChat-readonly'] !== 'true')) //if islogged in and livechat-readonly is true
                                {
                                    echo '<li class="warning">Warning: You must be logged in to send a message!</li>';
                                }
                                ?>
                            </ul>
                            <center>
                                <fieldset id="chatfs">
                                    <legend>Minecraft Server Live Chat</legend>
                                    <div id="chatwd">
                                        <center><h1>Loading Chat</h1><br><img src="dpnd/images/ajax.gif"/><br><br>
                                        </center>
                                    </div>
                                </fieldset>
                                <?php if(isloggedin() and (!isset($settings['liveChat-readonly']) or $settings['liveChat-readonly'] !== 'true')) { ?>
                                    <form id="ChatForm" onsubmit="return false;">
                                        <textarea autocomplete="off" class="feedformin thechatbar" type="text" name="chat" autofocus></textarea>
                                        <button id="ChatFormSubmit">Submit</button>
                                    </form>
                                <?php } ?>
                            </center>
                        </article>
                    </div>
                <?php } ?>
                <?php if(!isset($settings['players-enabled']) or $settings['players-enabled'] !== 'false') { ?>
                    <div id="tab-6" class="tab">
                        <article>
                            <div class="text-section">
                                <h1>Players</h1>

                                <p>All players on the server. <i>Sorted by time users first joined.</i></p>
                                <input id="playerinstsearch" placeholder="Search for users." type="text"/>
                            </div>
                            <ul class="states">
                            </ul>
                            <CENTER id="userAjax">
                            </CENTER>
                            <div class="animation_image_players" align="center">
                                <img style="display:none;" src="dpnd/images/ajax.gif"><br>
                                <button id="loadmoreplayers">Load More...</button>
                            </div>
                        </article>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
    <aside id="sidebar">
        <a href="./"><img class="logo" width="50" height="50" src="<?php if(!empty($settings['SmallLogo'])) {echo $settings['SmallLogo'];} else {echo './dpnd/images/logo.png';} ?>"></img></a>
        <ul class="tabset buttons">
            <?php if(!isset($settings['enableDash']) or $settings['enableDash'] !== 'false') { ?>
            <li id="DashBoard" <?php echo amIactive('tab-1') ?>>
                <a href="#tab-1" class="ico1"><span>Dashboard</span><em></em></a>
                <span class="tooltip"><span>Dashboard Widgets</span></span>
            </li>
            <?php } ?>
            <?php if(!isset($settings['gallery-Enable']) or $settings['gallery-Enable'] !== 'false') { ?>
                <li id="LiveGalleryButton" <?php echo amIactive('tab-2') ?>>
                    <a href="#tab-2" class="ico2"><span>Gallery</span><em></em></a>
                    <span class="tooltip"><span>Gallery</span></span>
                </li>
            <?php } ?>
            <?php if(!isset($settings['feed-enabled']) or $settings['feed-enabled'] !== 'false') { ?>
                <li id="UserFeedButton" <?php echo amIactive('tab-4') ?>>
                    <a href="#tab-4" class="ico3"><span>Feed</span><em></em></a>
                    <span class="tooltip"><span>Feed</span></span>
                </li>
            <?php } ?>
            <?php if(!isset($settings['apps-enabled']) or $settings['apps-enabled'] !== 'false') { ?>
                <li <?php echo amIactive('tab-3') ?>>
                    <a href="#tab-3" class="ico4"><span>Apps</span><em></em></a>
                    <span class="tooltip"><span>Apps</span></span>
                </li>
            <?php } ?>
            <?php if(!isset($settings['liveChat-enabled']) or $settings['liveChat-enabled'] !== 'false') { ?>
                <li id="LiveChatButton" <?php echo amIactive('tab-5') ?>>
                    <a href="#tab-5" class="ico6">
                        <span>Live Chat</span><em></em>
                    </a>
                    <!--<span class="num">11</span>-->
                    <span class="tooltip"><span>Live Server Chat</span></span>
                </li>
            <?php } ?>
            <?php if(@$settings['players-enabled'] !== 'false') { ?>
                <li id="LivePlayersButton" <?php echo amIactive('tab-6') ?>>
                    <a href="#tab-6" class="ico7"><span>Players</span><em></em></a>
                    <span class="tooltip"><span>Players</span></span>
                </li>
            <?php } ?>
        </ul>
        <?php if(isloggedin()) { ?>
            <ul class=" buttons">
                <li>
                    <a href="./?act=settings" class="ico8 iframe"><span>Player Settings</span><em></em></a>
                    <span class="tooltip"><span>Player Settings</span></span>
                </li>
            </ul>
        <?php } ?>
        <span class="shadow"></span>
    </aside>
</div>
</body>
</html>