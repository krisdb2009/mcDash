<br><br><br><br>Bukkit Version:<br><br>
<div style="color:black;font-size:20px;">
    <?php
    $ver = sendjson('server.bukkit.version', '""');
    $ver = json_decode($ver);
    if(!isset($ver[0]->success))
    {
        echo 'Server is offline.';
        exit;
    }
    echo $ver[0]->success;

    ?>
</div>