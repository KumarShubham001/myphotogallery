<?php
$dir = "images/uploads/thumb/";

$imageList = [];

// Open a directory, and read its contents
if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
            if ($file != '.' && $file != '..')
                array_push($imageList, $file);
        }
        closedir($dh);
    }
}
?>

<!DOCTYPE HTML>
<html lang="en" class="no-js" xmlns="http://www.w3.org/1999/xhtml">

<head>

    <title>Kumar Shubham | My Photo Gallery</title>

    <?php include('./meta.php'); ?>

    <?php include('./link.php'); ?>

</head>

<body>
    <div class="se-pre-con"></div>

    <!-- overlay for image slideshow -->
    <div id="page-overlay" class="page-overlay flex">
        <div class="" style="width: 20%"></div>

        <div class="flex perfect-center" style="width: 60%">
            <div>
                <div class="overlay-img-loader">Loading...</div>
                <img id="overlay-img" class="overlay-img">
            </div>
        </div>
        <div class="" style="width: 20%; padding-top: 40px;">
            <div class="slash" onclick="closeOverlay()">
            </div>
        </div>

        <!-- directional keys -->
        <span onclick="previousImage(1)" class="slideshow-direction slideshow-direction-left"><i
                class="fa fa-angle-left"></i></span>
        <span onclick="nextImage(1)" class="slideshow-direction slideshow-direction-right"><i
                class="fa fa-angle-right"></i></span>
    </div>

    <!-- nav bar -->
    <?php include('modules/navbar.php'); ?>

    <!-- parallax -->
    <?php include('modules/parallax.php'); ?>

    <section id="intro">
        <div class="title flex perfect-center w100 h100">
            <p class="text-center">
                <strong>
                    Here are some of my works,
                </strong>
            </p>
        </div>
    </section>

    <!-- flexbox for image gallery -->
    <section id="flexbox-gallery">

        <!-- gallery images will be niserted inside div#galleryList -->
        <div class="flexbox" id="galleryList"></div>
        <div class="flexbox" id="nogalleryList">
            <h3>No images found, please visit after some time!</h3>
        </div>
    </section>

    <!-- load more button -->
    <div class="loadmore-container flex perfect-center">
        <div id="loadMore" onclick="loadmore()">Show more</div>
        <!-- <div id="loadMore"><i class="fa fa-plus"></i> Load more</div> -->
    </div>

    <!-- contact form -->
    <?php include('modules/contact.php'); ?>

    <!-- My kit -->
    <?php include('modules/myKit.php'); ?>

    <!-- footer -->
    <?php include('modules/footer.php'); ?>


    <!-- links for js scripts -->
    <script src="js/jquery-3.2.1.min.js" type="text/javascript"></script>
    <script src="js/bootstrap.min.js" type="text/javascript"></script>
    <script src="js/scroll.min.js" type="text/javascript"></script>
    <script src="js/parallax.min.js" type="text/javascript"></script>
    <script src="js/disable.min.js" type="text/javascript"></script>
    <script src="js/app.min.js" type="text/javascript"></script>

    <!-- init the carousel -->
    <script>
    var arr = <?php echo json_encode($imageList); ?>;
    initImageArr([...arr]);
    loadImages();
    </script>

    <div style="display:none!important">
</body>

</html>