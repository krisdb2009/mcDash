<?php
//krisdb2009
//Below Average//pakm//1.2//

//API: ?update[&check]/[&version] - ?package[&name]&[&install]&[&location]/[&list]&[&location]

//Quick Prerequisites//
ini_set('max_execution_time', 300); //5 Minutes
require('function.lib.php');
if(!(isloggedin() and username() == $AdminUsername))
{
    echo '<h1>403 Access Denied</h1>';
    exit;
}
//===================//

//=========================//
//      Configuration      //
//=========================//
$FTPpackageRoot   = '/mcDash/packages/';
$FTPupdateRoot    = '/mcDash/patches/';
$FTPhost          = 'belowaverage.ga';
$FTPuser          = 'anonymous';
$FTPpass          = '';
$PatchExtension   = 'zip'; //Must always be a zip format. Any extension will work.
$ScriptRoot       = '../';
$ScriptVersion    = $version;
$RunMe            = 'RunMe'; //Capable of moving files and renaming them after package install.
//=========================//

//FUNCTIONS
function discoverPackages($FTP, $FTPupdateRoot, $PatchExtension, $ScriptVersion = null)
{
    $packages = ftp_nlist($FTP, $FTPupdateRoot);
    $packages = str_replace(array($FTPupdateRoot,'.'.$PatchExtension), '', $packages);
    foreach($packages as $key => $val)
    {
        if(($ScriptVersion !== null) and $val <= $ScriptVersion)
        {
            $packages[$key] = null;
            unset($packages[$key]);
        }
    }
    asort($packages, 1);
    return $packages;
}
//
if(isset($_GET['package']) and isset($_GET['location']))
{
    $log = array();  //Create log array
    
    array_push($log, 'Running script version: '.$ScriptVersion);
    
    $FTP = ftp_connect($FTPhost) or die("Couldn't connect to $FTPhost");
    array_push($log, 'Connected to FTP server: '.$FTPhost); //Report to log array
    if(@ftp_login($FTP, $FTPuser, $FTPpass))
    {
        array_push($log, 'Logged into FTP server. User: ('.$FTPuser.') Pass: ('.$FTPpass.')');
    }
    else
    {
        die('Could not connect to the FTP server with - User: ('.$FTPuser.') Pass: ('.$FTPpass.')');
    }
    //
    if(isset($_GET['list']))
    {
        $location = $_GET['location'];
        array_push($log, 'Looking for packages...');
        $packages = discoverPackages($FTP, $FTPpackageRoot.$location, $PatchExtension);
        array_push($log, 'Discovered '.count($packages).' package(s).');
        $log = array('log' => $log, 'packages' => $packages);
    }
    if(isset($_GET['name']) and isset($_GET['install']))
    {
        $install = $_GET['name'];
        $location = $_GET['location'];
        array_push($log, 'Starting package install: '.$location.$install);
        if(ftp_get($FTP, "TEMPINSTALLFILES.zip", $FTPpackageRoot.$location.$install.'.'.$PatchExtension, FTP_BINARY))
        {
            array_push($log, 'Downloaded package files');
        }
        else
        {
            die('Failed to download files.');
        }
        if(is_file($ScriptRoot.'/'.$RunMe))
        {
            unlink($ScriptRoot.'/'.$RunMe);
            array_push($log, 'Cleaning up last failed install.');
        }
        $zip = new ZipArchive;
        $zip->open('TEMPINSTALLFILES.zip');
        $zip->extractTo($ScriptRoot);
        $zip->close();
        array_push($log, 'Extracted Package Files (Installed Package)');
        unlink('TEMPINSTALLFILES.zip');
        array_push($log, 'Cleaning up a bit...');
        if(is_file($ScriptRoot.'/'.$RunMe))
        {
            array_push($log, 'Running post installation script');
            include($ScriptRoot.'/'.$RunMe);
            unlink($ScriptRoot.'/'.$RunMe);
            array_push($log, 'Cleaning up a bit...');
        }
        array_push($log, 'Finished install: '.$location.$install);
    }
    ftp_close($FTP);
    echo json_encode($log);
}
  
if(isset($_GET['update']) or (isset($_GET['update']) and isset($_GET['check'])))
{
    $log = array();  //Create log array
    
    array_push($log, 'Running script version: '.$ScriptVersion);
    
    $FTP = ftp_connect($FTPhost) or die("Couldn't connect to $FTPhost"); //Connect to update server
    array_push($log, 'Connected to FTP server: '.$FTPhost); //Report to log array
    if(@ftp_login($FTP, $FTPuser, $FTPpass))
    {
        array_push($log, 'Logged into FTP server. User: ('.$FTPuser.') Pass: ('.$FTPpass.')');
    }
    else
    {
        die('Could not connect to the FTP server with - User: ('.$FTPuser.') Pass: ('.$FTPpass.')');
    }

    $updates = discoverPackages($FTP, $FTPupdateRoot, $PatchExtension, $ScriptVersion);
    array_push($log, 'Discovered '.count($updates).', Update(s)');
    foreach($updates as $update)
    {
        array_push($log, 'Found: '.$update);
    }
    if(isset($_GET['update']) and !isset($_GET['check']))
    {
        foreach($updates as $update) //For every update copy and replace the files while runing the run me and echoing the changeme log
        {
            array_push($log, 'Starting update: '.$update);
            if(ftp_get($FTP, "TEMPUPDATEFILES.zip", $FTPpackageRoot.$location.$install.'.'.$PatchExtension, FTP_BINARY))
            {
                array_push($log, 'Downloaded update files');
            }
            else
            {
                die('Failed to download files.');
            }
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
        array_push($log, 'No more updates to install. Finished.');
        array_push($log, 'The script version now is: '.end($updates));
    }
    ftp_close($FTP);
    echo json_encode($log);
}

if(empty($_GET))
{
    echo '403 Access Denied.';
    exit;
}
?>