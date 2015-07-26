//init
$(function() {
    $( "#tabs" ).tabs();
});
$(function() {
    var selectedTabId = sessionStorage.getItem("selectedTab");
    selectedTabId = selectedTabId === null ? 0 : selectedTabId;
    $("#tabs").tabs({
        active: selectedTabId,
        activate : function( event, ui ) {
            selectedTabId = $("#tabs").tabs("option", "active");
            sessionStorage.setItem("selectedTab", selectedTabId);
        }
    });
});
//Define cache
window['cache'] = {};
//
//Functions
function showPackPage(value)
{
    $( "#dialog" ).html('<div class="packbutt"><img class="icon" src="dpnd/images/ajax.gif"> Loading...</div><div id="dbody"></div>');
    $.getJSON("//"+$.API+"/API/mcDash/packages/?json&location=" + window.GlobIndexLocation + "&id=" + value, function(data){
        $( ".packbutt" ).html('<img class="icon" src="//'+$.API+'/API/mcDash/packages/?icon&id=' + value + '&location=' + window.GlobIndexLocation + '">' + data.name + '<span onclick="promptInstall(&quot;' + window.GlobIndexLocation + '&quot;,&quot;' + value + '&quot;);" class="but">Install</span><span id="prop">' + data.timestamp + '<br>Downloads: ' + data.downloads + '</span>' + "<span>" + data.description + '</span>');
    });
    $.get("//"+$.API+"/API/mcDash/packages/?page&location=" + window.GlobIndexLocation + "&id=" + value, function(data) {
        $( "#dialog #dbody" ).html(data);
    });
    $( "#dialog" ).append('<button onclick="shiftPack(0);">Go Back</button>');
    reloadUI();
}
function installPackage(location, value)
{
    $("#dialog").dialog("option", "width", 300);
    $("#dialog").dialog("open");
    $("#dialog").html('<center><img src="./dpnd/images/ajax.gif"/></center>');
    $.ajax({ 
        type: 'GET', 
         url: './dpnd/pakm.lib.php', 
        data: { package: '', location: location, install: '', name:  value }, 
        dataType: 'json',
        success: function(data) {
            $( "#dialog" ).html( "" );
            count = 0;
            $.each(data, function(index, value){
                count = count + 1;
                $( "#dialog" ).append(count + ': <i>' + value + '</i><br>' );
            });
        },
        error: function(jqXHR, exception) {
            $( "#dialog" ).html( jqXHR.responseText + '<hr><h3>Please report this error to krisdb2009@'+$.API+' or Skype: dylan.bickerstaff</h3>'); 
        }                              
    });
    $("#dialog").on("dialogclose", function( event, ui ){
        window.location.reload();
    });
}
function promptInstall(location, value)
{
    $("#dialog").dialog( "option", "width", 300 );
    $("#dialog").dialog("open");
    $("#dialog").html('<center><h1>Are you sure?!</h1></center><span class="ui-icon ui-icon-alert" style="float:left; margin:0 5px 0 0;"></span><p class="warnp">This package, and any other package can cause instablility and conflict with other installed plugins.</p><br><hr><button onclick="shiftPack(0)">Go Back</button> <button onclick="installPackage(&quot;' + location + '&quot;,&quot;' + value + '&quot;)">Continue</button>');
    reloadUI();
}
function reloadUI()
{
    $("#dialog").append('<script>$(function(){$(".button, button").button();});</script>');
    $("#dialog").css('height','auto')
}
function drawCol(data, value)
{
    $( "#dialog [package='" + value +"']" ).html('<img class="icon" src="//'+$.API+'/API/mcDash/packages/?icon&id=' + value + '&location=' + window.GlobIndexLocation + '">' + data.name + '<span onclick="promptInstall(&quot;' + window.GlobIndexLocation + '&quot;,&quot;' + value + '&quot;);" class="but">Install</span><span onclick="showPackPage(&quot;' + value + '&quot;);" class="but">Details</span><span id="prop">' + data.timestamp + '<br>Downloads: ' + data.downloads + '</span>' + "<span>" + data.description + '</span>');
}
function shiftPack(shiftamm)
{
    $("#dialog").dialog( "option", "width", 800 );
    $("#dialog").html('');
    window.pcount = window.pcount + shiftamm;
    window.count = 0;
    $.each(window.GlobIndexPack.packages, function(index, value){
        window.count = window.count + 1;
        if(window.count > window.pcount - 10)
        {
            $( "#dialog" ).append('<div class="packbutt" package="' + value + '"><img class="icon" src="dpnd/images/ajax.gif"> Loading...</div>' );
            if(window['cache'][value])
            {
                drawCol(window['cache'][value], value);
            }
            else
            {
                $.getJSON("//"+$.API+"/API/mcDash/packages/?json&location=" + window.GlobIndexLocation + "&id=" + value, function(data){
                    window['cache'][value] = data;
                    drawCol(data, value);
                });
            }
        }
        if(window.count >= window.pcount)
        {
            return false;
        } 
    });
    $( "#dialog" ).append('<br>');
    if(window.pcount > 10)
    {
        $( "#dialog" ).append('<button onclick="shiftPack(-10);"><<</button>');
    }
    if(window.pcount < window.GlobIndexPackCount)
    {
        $( "#dialog" ).append('<button onclick="shiftPack(10);">>></button>');
    }
    $("#dialog").append('  Page: ' + window.pcount /  10 + ' | Total: ' + window.GlobIndexPackCount);
    reloadUI();
}
//Document Ready Actions
$(document).ready(function() {
    $.get("./?act=getAPI", function( data ) {
        $.API = data;
    });
    $(window).resize(function(){
        $( "#dialog" ).dialog( "option", "position", { my: "top", at: "top", of: window, minHeight: 'auto', resizable: false });
    });
    $('.runUpdater').click(function(){
        $( "#dialog-confirm" ).dialog( "open" );
        $( "#dialog-confirm" ).html( '<center><h1>WARNING!</h1></center><span class="ui-icon ui-icon-alert" style="float:left; margin:0 5px 0 0;"></span><p class="warnp">If you modified any files in this script, the updater <b>can</b> change them back to default. Check <a target="_TOP" href="ftp://'+$.API+'/mcDash/patches">The FTP server</a> for any modified files."</p>' );
    });
    $('.checkUpdates').click(function(){
    $( "#dialog" ).dialog( "open" );
    $("#dialog").dialog("option", "width", 300);
    $( "#dialog" ).html( '<center><img src="./dpnd/images/ajax.gif"/></center>' );
    $.ajax({ 
            type: 'GET', 
            url: './dpnd/pakm.lib.php',
            data: { update: '', check: '' }, 
            dataType: 'json',
            success: function(data) {
                $( "#dialog" ).html( "" );
                $.each(data, function(index, value){
                    $( "#dialog" ).html( "" );
                    count = 0;
                    $.each(data, function(index, value){
                        count = count + 1;
                        $( "#dialog" ).append(count + ': <i>' + value + '</i><br>' );
                    });
                });
            },
            error: function(jqXHR, exception) {
                $( "#dialog" ).html( jqXHR.responseText + '<hr><h3>Please report this error to krisdb2009@'+$.API+' or Skype: dylan.bickerstaff</h3>'); 
            }          
        });
    });
    $(function() {
        $( "#dialog" ).dialog({
          position: { my: "top", at: "top", of: window },
          autoOpen: false,
          modal: true,
          show: {
            effect: "fade",
            duration: 300
          },
          hide: {
            effect: "fade",
            duration: 300
          }
        });
    });
    $(function() {
        $( "#dialog-confirm" ).dialog({
            resizable: false,
            autoOpen: false,
            height: 230,
            modal: true,
            buttons: {
                "Apply Updates": function() {
                    $( this ).dialog( "close" );
                    $( "#dialog" ).dialog( "open" );
                    $( "#dialog" ).html( '<center><img src="./dpnd/images/ajax.gif"/></center>' );
                    $.ajax({ 
                        type: 'GET', 
                        url: './dpnd/pakm.lib.php', 
                        data: { update: '' }, 
                        dataType: 'json',
                        success: function(data) {
                            $( "#dialog" ).html( "" );
                            count = 0;
                            $.each(data, function(index, value){
                                count = count + 1;
                                $( "#dialog" ).append(count + ': <i>' + value + '</i><br>' );
                            });
                        },
                        error: function(jqXHR, exception) {
                            $( "#dialog" ).html( jqXHR.responseText + '<hr><h3>Please report this error to krisdb2009@'+$.API+' or Skype: dylan.bickerstaff</h3>'); 
                        }                     
                    });
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            },
            show: {
                effect: "fade",
                duration: 300
            },
            hide: {
                effect: "fade",
                duration: 300
            }
        });
    });
    $(function() {
        $( ".button, button" ).button()
    });
    $('.installList').click(function(){
        window.GlobIndexLocation = $(this).attr("location");
        window.GlobIndexDomain = $(this).attr("apidomain");
        $("#dialog").dialog("open");
        $("#dialog").html( '<center><img src="./dpnd/images/ajax.gif"/></center>' );
        $.ajax({ 
            type: 'GET', 
            url: '//'+$.API+'/API/mcDash/packages/', 
            data: { package: '', location: window.GlobIndexLocation, list: '' }, 
            dataType: 'json',
            success: function(data) {
                $("#dialog").dialog("option", "width", 300);
                if(data.packages.length !== 0) {
                    $("#dialog").html("");
                    window.pcount = 0;
                    window.GlobIndexPack = data;
                    window.GlobIndexPackCount = Object.keys(data.packages).length;
                    shiftPack(10);
                }
                else {
                    $("#dialog").html("<center><h1>Empty =(</h1><hr><p>No packages available in: " + window.GlobIndexLocation + "</p></center>");
                }
            },
            error: function(jqXHR, exception) {
                $( "#dialog" ).html( jqXHR.responseText + '<hr><h3>Please report this error to krisdb2009@'+$.API+' or Skype: dylan.bickerstaff</h3>'); 
            }        
        });
    });
    $('.plugsett').click(function(){
        var id = $(this).attr("pid");
        var loc = $(this).attr("loc");
        $("#dialog").dialog("open");
        $("#dialog").dialog("option", "width", 600);
        $("#dialog").html('<iframe id="plugsettiframe" src="?act=pluginsettings&location='+loc+'&plugin=' + id + '"></iframe>');
    });
    $('.plugunins').click(function(){
        var id = $(this).attr("pid");
        var loc = $(this).attr("loc");
        $("#dialog").dialog("open");
        $("#dialog").dialog("option", "width", 300);
        $("#dialog").html('<h3>You are about to uninstall: <i>'+id+'</i></h3><hr><a class="button" href="?act=admin&deletepack&name='+id+'&location='+loc+'">Continue</a>');
        reloadUI();
    });
    reloadUI();
});