<link rel="stylesheet" type="text/css" href="dpnd/css/login.css">
<center>
    <br><br>
    <h1>All Likes</h1>
    <div style="width:100px;max-height:400px;overflow-y:scroll;" id="window">
        <?php
        $feed = loadDB('feed');
        if(!empty($feed[$_GET['postid']]['likes']))
        {
            foreach($feed[$_GET['postid']]['likes'] as $like)
            {
                echo '<a href="./?act=3duser&user='.$like.'" class="iframe"><img style="vertical-align:middle;" title="'.$like.'" style="margin:3px;" src="'.$HeadAPI.'?player='.$like.'&size=30"/> - '.$like.'</a><br><br>';
            }
        }
        else
        {
            echo 'This post has no likes or does not exist...';
        }
        ?>
    </div>
</center>