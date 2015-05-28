<br><br><br>
<div style="color:black;font-size:40px;">
    <?php
$bal = sendjson('players.name.bank.balance','"'.username().'"');
$cur = sendjson('economy.currency.name','""');
$bal = json_decode($bal);
$cur = json_decode($cur);
if(!isset($cur[0]->success) and !isset($bal[0]->success))
    {
    echo 'N/A';
    exit;
    }
    echo $cur[0]->success.'(s)';
    echo '<br><br><br><br>';
    echo round($bal[0]->success, 2);

    ?>
</div>