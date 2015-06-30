<?php
//Hi developers! Welcome agian. Here is a quick tutorial.
//Using jsonAPI you can make your plugins request or perform anything on this page: http://mcjsonapi.com/apidocs/
// JsonString = sendjson('method.name', '"argument","array"');
//Any other function used in mcDash is available to use in the functions.lib.php file.
//Since this file is include() from that file. All the functions there work here.

//Lets get started!

if(isset($_POST['testbuy']) and isloggedin() and onmc(username()))
{
    sendjson('players.name.inventory.give_item', '"'.username().'","260","1","0"');
    sendjson('players.name.bank.withdraw', '"'.username().'","1"');//If there is a money system it will subtract 1 value. Before you do transactions like this it wouldent hurt to check their bank before calling any more methods. players.name.bank.has will show current funds. If they dont have enough exit the php script. So you dont get ripped off =) Im too lazy to do this in the demo however...
    $error = 'You Bought One Apple!!';
}
elseif(!isloggedin())
{
    $error = 'ERROR: YOU ARE NOT LOGGED IN';
}
elseif(!onmc(username()))
{
    $error = 'ERROR: YOU ARE NOT ON MC';
}
?>
<style>
body {
    background-color:white;
}
</style>
<body>
<h1>Below Average Test Store App!</h1>
<h3>Hi Developers! Wanna learn how to write your own plugins?! Ok Cool!</h3>
<hr>
<?php if(isset($error)) echo $error; ?>
<form method="post">
    <input type="hidden" name="testbuy" value="null"/>
    <input type="submit" value="Buy 1 Apple" />
</form>
</body>