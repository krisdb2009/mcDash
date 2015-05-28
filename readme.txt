##################################################################################
Developers: krisdb2009, UmbraCharon
Testers: nikkiluvzcoffee

Recommended PHP environment: 5.4 to 5.5 and up.

Project name: mcDash
Description: Allows members of a Minecraft server to share and view information about each other, themselves and the server.
Version: 1.1.0 (NOT READY)
##################################################################################

#####
Help#
#####

--------------------------------------------------
   Problem              |              Solution
--------------------------------------------------
                        |
Warning:                | Your Minecraft server is not responding to mcDash's requests.
file_get_contents():    | You must make sure the correct ports are forwarded, and the
failed to open stream:  | JSONAPI details are correct in the mcDash config and the 
No connection could     | Minecraft server jsonapi plugin is installed and configured
be made because the     | correctly.
target machine          |
actively refused it.    |
                        |
--------------------------------------------------
                        |
Users cannot            | You must be running a PHP version lower than 5.4
login to the            | Please upgrade your PHP handler to the latest version
website using their     | If you are running on a HOST ask them to upgrade.
correct credentials     | Otherwise find a new server to run the mcDash script.
                        |
--------------------------------------------------
                        |
Uploaded photo          | Your PHP Web server lacks the GD library plugin.
thumbnails are not      | This error is weird because GD is included in 
showing up at all, just | the latest versions of PHP, Ask your host if it
a broken image link icon| has been disabled for some reason. Otherwise try
                        | installing the library http://php.net/manual/en/image.installation.php
                        |
--------------------------------------------------
