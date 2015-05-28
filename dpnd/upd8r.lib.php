<?php
//krisdb2009
//Below Average//Upd8r//1.0//

//API: ?check ?update[&version] (Not implimented yet)

//Quick Prerequisites//
ini_set('max_execution_time', 300); //5 Minutes
require('function.lib.php');
if(!(isloggedin() and username() == $AdminUsername))
{
    header('location: ../');
    exit;
}
//===================//

//=========================//
//      Configuration      //
//=========================//
$FTPupdateRoot    = '/mcDash/patches/';
$FTPhost          = 'belowaverage.ga';
$FTPuser          = 'anonymous';
$FTPpass          = '';
$PatchExtension   = 'zip'; //Must always be a zip file. Any extension will work
$ScriptRoot       = '../';
$ScriptVersion    = $version;
$RunMe            = 'RunMe'; //Capable of moving files and renaming them after patch.
$ChangeLogFile    = 'InThisPatch'; //Raw Text
//=========================//

//FUNCTIONS
function discoverUpdates($FTP, $FTPupdateRoot, $PatchExtension, $ScriptVersion)
{
    $updates = ftp_nlist($FTP, $FTPupdateRoot);
    $updates = str_replace(array($FTPupdateRoot,'.'.$PatchExtension), '', $updates);
    foreach($updates as $key => $val)
    {
        if($val <= $ScriptVersion)
        {
            $updates[$key] = null;
            unset($updates[$key]);
        }
    }
    asort($updates, 1);
    return $updates;
}
//
  
if(isset($_GET['update']) or isset($_GET['check']))
{
    $log = array();  //Create log array
    
    array_push($log, 'Running script version: '.$ScriptVersion);
    
    $FTP = ftp_connect($FTPhost); //Connect to update server
    array_push($log, 'Connected to FTP server: '.$FTPhost); //Report to log array
    ftp_login($FTP, $FTPuser, $FTPpass); //Login to update server
    array_push($log, 'Logged into FTP server. User: ('.$FTPuser.') Pass: ('.$FTPpass.')');

    $updates = discoverUpdates($FTP, $FTPupdateRoot, $PatchExtension, $ScriptVersion);
    array_push($log, 'Discovered '.count($updates).', Update(s)');
    foreach($updates as $update)
    {
        array_push($log, 'Found: '.$update);
    }
    if(isset($_GET['update']))
    {
        foreach($updates as $update) //For every update copy and replace the files while runing the run me and echoing the changeme log
        {
            array_push($log, 'Starting update: '.$update);
            ftp_get($FTP, "TEMPUPDATEFILES.zip", $FTPupdateRoot.$update.'.'.$PatchExtension, FTP_BINARY);
            array_push($log, 'Downloaded update files');
            if(is_file($ScriptRoot.'/'.$RunMe))
            {
                unlink($ScriptRoot.'/'.$RunMe);
                array_push($log, 'Cleaning up last failed update.');
            }
            $zip = new ZipArchive;
            $zip->open('TEMPUPDATEFILES.zip');
            $zip->extractTo($ScriptRoot);
            $zip->close();
            array_push($log, 'Extracted Update Files (Installed Update)');
            unlink('TEMPUPDATEFILES.zip');
            array_push($log, 'Cleaning up a bit...');
            if(is_file($ScriptRoot.'/'.$RunMe))
            {
                array_push($log, 'Running post installation script');
                include($ScriptRoot.'/'.$RunMe);
                unlink($ScriptRoot.'/'.$RunMe);
                array_push($log, 'Cleaning up a bit...');
            }
            array_push($log, 'Finished update: '.$update);
        } 
        array_push($log, 'No more updates to install. Finished.');\
        array_push($log, 'The script version now is: '.end($updates));
    }
    ftp_close($FTP);
    echo json_encode($log);
}
else
{
    header('location: ../');
}
?>