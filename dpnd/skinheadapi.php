<?php
//ALL CODE IS FOR USE ON THE WHO'SONLINE SCRIPT ONLY! Modified for mcDash
if (isset($_GET['player'])) //if player is set
{
    if (isset($_GET['size'])) //If the size is not set user 150px
    {
        $size = $_GET['size'];
    }
    else
    {
        $size = 150;
    }
    header("Content-Type: image/png"); //PNG content header
    header("Cache-Control: max-age=2592000"); //Cache this baby as long as you can
    @$skin = imagecreatefrompng('http://skins.minecraft.net/MinecraftSkins/'.$_GET['player'].'.png'); //Grab the image from Mojang
    if (empty($skin)) // if the skin is not set, use steve
    {
        $skin = imagecreatefrompng('images/Steve.png');
    }
    if (!isset($_GET['skinonly'])) //if the client only wants the skin, skip this part
    {
        $headsmall = imagecreatetruecolor(8, 8);
        imagecopy($headsmall, $skin, 0, 0, 8, 8, 8, 8);
        $skin = imagecreatetruecolor($size, $size);
        imagecopyresized($skin, $headsmall, 0, 0, 0, 0, $size, $size, 8, 8);
    }
    imagealphablending($skin, false); //make sure transparency works
    imagesavealpha($skin, true); // ^
    imagepng($skin); //Outup image
    imagedestroy($skin); //Release the image from memory
}
?>