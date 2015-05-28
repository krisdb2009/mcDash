<?php
header('Cache-Control: max-age=31556926'); //This guys keeps our thumbnails from overloading the server...
//
// Thumber class copyleft ( )) 2008 by peter chylewski <peter@boring.ch>
// version 0.1
//
//	released under the gnu license v3 <http://www.gnu.org/licenses/gpl.html>
//
//	please drop me  a note if you like it, have comments/suggestions/wishes,
//	found bugs, etc.
//

// --------------------------------------------------------------------------
// define paths
// --------------------------------------------------------------------------

define('PATH_TO_THUMBS', './thumbs/');
define('PATH_TO_LOGS', './logs/');

// --------------------------------------------------------------------------
// activate error handling
// --------------------------------------------------------------------------

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 0);
//Causes errors in IIS7, Awaiting fix. -> ini_set('error_log', PATH_TO_LOGS . 'thumber_errors.log');
ini_set('log_errors', 1);

// --------------------------------------------------------------------------
// instantiate the Thumber class
// --------------------------------------------------------------------------

$thumber = new Thumber();

class Thumber
{

    var $pathToImage, $pathToThumb;
    var $imageType;
    var $imageWidth, $imageHeight;
    var $fitIntoBox;
    var $thumbWidth, $thumbHeight;

    function __construct()
    {
        $this->logic();
    }

    private function logic()
    {

        // --------------------------------------------------------------------------
        // what this program should do
        // --------------------------------------------------------------------------

        $this->pathToImage = isset($_GET['img']) ? $_GET['img'] : '';
        if (!file_exists($this->pathToImage))
        {
            trigger_error('input image not found  at '.$this->pathToImage, 1024);
            exit;
        }
        $this->thumbWidth = @$_GET['w'];
        $this->thumbHeight = @$_GET['h'];

        $this->info();
        $this->calculateThumbDimensions();
        $this->serveThumb();

    }

    function info()
    {

        // --------------------------------------------------------------------------
        // determine the dimensions and the file type of the original image
        // --------------------------------------------------------------------------

        $types = array(
            1 => 'gif',
            2 => 'jpg',
            3 => 'png',
            4 => 'swf',
            5 => 'psd',
            6 => 'bmp',
            7 => 'tiff(intel byte order)',
            8 => 'tiff(motorola byte order)',
            9 => 'jpc',
            10 => 'jp2',
            11 => 'jpx',
            12 => 'jb2',
            13 => 'swc',
            14 => 'iff',
            15 => 'wbmp',
            16 => 'xbm'
        );

        $info = getimagesize($this->pathToImage);
        $this->imageWidth = $info[0];
        $this->imageHeight = $info[1];
        $this->imageType = $types[$info[2]];
    }

    function serveThumb()
    {

        // --------------------------------------------------------------------------
        // if the thumbnails image already exists, serve it;
        // otherwise generate one
        // --------------------------------------------------------------------------

        //$this->generateThumb(); return;

        if (file_exists($this->pathToThumb))
        {
            $uri = 'http://'.$_SERVER['SERVER_NAME'].rtrim(dirname($_SERVER['PHP_SELF']), '/').ltrim($this->pathToThumb, '.');
            header('Location: '.$uri);
            header('Content-Length: '.filesize($this->pathToThumb));
            exit;
        }
        else
        {
            if (file_exists($this->pathToImage))
            {
                $this->generateThumb();
            }
        }

    }

    function generateThumb()
    {

        // --------------------------------------------------------------------------
        // create an image from the input image
        // --------------------------------------------------------------------------

        switch ($this->imageType)
        {
            case 'jpg':
                $image = @imagecreatefromjpeg($this->pathToImage);
                break;
            case 'gif':
                $image = @imagecreatefromgif($this->pathToImage);
                break;
            case 'png':
                $image = @imagecreatefrompng($this->pathToImage);
                break;
        }

        // --------------------------------------------------------------------------
        // create the thumbnail image and paste in the original in its new
        // dimensions
        // --------------------------------------------------------------------------

        $thumbImage = imagecreatetruecolor($this->thumbWidth, $this->thumbHeight);
        imagecopyresampled($thumbImage, $image, -1, -1, 0, 0, $this->thumbWidth + 2, $this->thumbHeight + 2, $this->imageWidth, $this->imageHeight);

        // --------------------------------------------------------------------------
        // spit it out
        // --------------------------------------------------------------------------

        switch ($this->imageType)
        {
            case 'jpg':
                imagejpeg($thumbImage, $this->pathToThumb, 60);
                header("Content-type: image/jpeg");
                imagejpeg($thumbImage, NULL, 60);
                break;
            case 'gif':
                imagegif($thumbImage, $this->pathToThumb);
                header("Content-type: image/gif");
                imagegif($thumbImage, NULL);
                break;
            case 'png':
                header("Content-type: image/png");
                imagepng($thumbImage, $this->pathToThumb);
                imagepng($thumbImage, NULL);
                break;
        }

        imagedestroy($image);
        imagedestroy($thumbImage);
    }

    function calculateThumbDimensions()
    {

        $this->fitIntoBox = false;

        if ($this->fitIntoBox == true)
        {
            $aspectRatio = $this->imageWidth / $this->imageHeight;
            if ($this->imageWidth > $this->imageHeight)
            {
                $sizeRatio = $this->thumbWidth / $this->imageWidth;
                $this->thumbHeight = ceil($this->imageWidth * $sizeRatio / $aspectRatio);
            }
            else
            {
                $sizeRatio = $this->thumbHeight / $this->imageHeight;
                $this->thumbWidth = ceil($this->imageHeight * $sizeRatio / $aspectRatio);
            }

        }
        else
        {

            // --------------------------------------------------------------------------
            // if the width has not been given, calculate it from the height
            // if the height has not been given, calculate it from the width
            // --------------------------------------------------------------------------

            if (!isset($this->thumbWidth))
            {
                $sizeRatio = $this->imageHeight / $this->thumbHeight;
                $this->thumbWidth = ceil($this->imageWidth / $sizeRatio);
            }
            else if (!isset($this->thumbHeight))
            {
                $sizeRatio = $this->imageWidth / $this->thumbWidth;
                $this->thumbHeight = ceil($this->imageHeight / $sizeRatio);
            }

        }

        // --------------------------------------------------------------------------
        // now that we know the definitive dimensions of our thumbnail,
        // why not use those to label the file properly?
        // --------------------------------------------------------------------------

        $pathParts = pathinfo($this->pathToImage);

        $this->pathToThumb = PATH_TO_THUMBS
            .$pathParts['filename']
            .'_'.$this->thumbWidth
            .'_'.$this->thumbHeight
            .'.'.$pathParts['extension'];
    }

} // class Thumber


?>