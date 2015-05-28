$(document).ready(function () {

    function resetImageMagPopup() {
        $('.galThumb').magnificPopup({
            delegate: 'a',
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile mfp-fade',
            image: {
                verticalFit: true,
            },
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300,
                opener: function (element) {
                    return element.find('img');
                }
            }
        });
    }

    resetImageMagPopup();

    function resetIframeMagPopup() {
        $('.iframe').magnificPopup({
            type: 'iframe',
            closeBtnInside: false,
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true
        });
    }

    resetIframeMagPopup();

    $(".succes").click(function () {
        $(this).slideUp(300);
    });
    $(".error").click(function () {
        $(this).slideUp(300);
    });
    $(".warning").click(function () {
        $(this).slideUp(300);
    });


    $("#upldbttn").click(function () {
        $("#upld").submit();
        $("#upld").hide();
        $("#placemrk").replaceWith("<img style='margin-top:-5px;' src='dpnd/images/upload.gif'/>");
        $("#upldh1").replaceWith("<h1 id='upldh1' style='display:inline-block;float:right;'>Hold on a second, <?PHP echo username(); ?></h1>");
    });

    $("#galpagespinner").spinner({
        stop: function (e, ui) {
            $('#submitGalPageForm').submit();
        }
    });


    //Scroll Loader For Gallery
    var track_load = 1; //total loaded record group(s)
    var loading = false; //to prevents multipal ajax loads
    var done = false; //keeps the page loading
    var total_groups = 1000; //total record group(s)
    var load_ammount = 20; //total record group(s)

    function loadmoreimages() {
        if (done == false && loading == false) //there's more data to load
        {
            loading = true; //prevent further ajax loading
            $('.animation_image img').show(); //show loading image
            //load data from the server using a HTTP POST request
            $.post('./?act=loadgal', {'pagenum': track_load, 'ammount': load_ammount}, function (data) {
                if (data == '') {
                    done = true;
                    $('.animation_image').hide();
                    $("#gall").append('<center><h2>No more images to load...</h2></center>');
                }
                $("#gall").append(data); //append received data into the element
                //hide loading image
                $('.animation_image img').hide(); //hide loading image once data is received
                track_load++; //loaded group increment
                loading = false;
                resetImageMagPopup();
                resetIframeMagPopup();
            }).fail(function (xhr, ajaxOptions, thrownError) { //any errors?
                alert(thrownError); //alert with HTTP error
                $('.animation_image img').hide(); //hide loading image
                loading = false;
            });
        }
    }

    //load dem images when the class is active
    var intervloadmoreimg = setInterval(initialloadmoreimages, 100)

    function initialloadmoreimages() {
        if ($("#LiveGalleryButton").hasClass("active")) {
            loadmoreimages();
            clearInterval(intervloadmoreimg);
        }
    }

    $('#loadmoreimages').click(function () {
        loadmoreimages();
    });
    $(window).scroll(function () { //detect page scroll
        if ($(window).scrollTop() + $(window).height() == $(document).height() && $("#LiveGalleryButton").hasClass("active"))  //user scrolled to bottom of the page?
        {
            loadmoreimages();
        }
    });
    //

    //other stuff
    setInterval(update, 1000);

    $(".thechatbar").on("keydown", function (e) {
        if (e.which == 13) {
            submitForm();
        }
    });
    function update() {
        if ($("#LiveChatButton").hasClass("active")) {
            $("#chatwd").load("./?act=getchat");
        }
    }

    //Right here we submit the form via jquery
    function submitForm() {
        $.ajax({
            type: 'POST',
            url: 'index.php?act=postmcchat',
            data: $('#ChatForm').serialize(),
            success: function (response) {
                $(".thechatbar,#submitlivcht").removeAttr("disabled");
                $('.thechatbar').val('');
                $(".thechatbar").focus();
            },
            beforeSend: function () {
                $(".thechatbar,#submitlivcht").attr("disabled", "disabled");
            }
        });
        return false;
    }
});