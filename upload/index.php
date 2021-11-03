<html lang="en">

<head>
    <title>Kumar Shubham | My Photo Gallery</title>

    <?php include('../meta.php'); ?>

    <!-- overide the meta-shortcut-icon -->
    <link rel="shortcut icon" href="../images/user.png" />

    <!-- links for css styles -->
    <link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../css/croppie.css" rel="stylesheet" type="text/css" />
    <link href="style.css" rel="stylesheet" type="text/css" />

    <!-- link for font-icon -->
    <link rel="stylesheet" href="../others/fontawesome/css/fontawesome-all.min.css">

    <!-- link for font -->
    <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Homemade+Apple&display=swap" rel="stylesheet">
</head>

<body>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#" onclick="window.location.reload(true);">My Photo Gallary</a>
            </div>
            <ul class="nav navbar-nav">
                <li><a href="../index.php"> <i class="fa fa-arrow-left"></i> Back to Gallary</a></li>
                <!-- <li class="active"><a href="#">Upload</a></li> -->
            </ul>
        </div>
    </nav>
    <div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">Image Upload</div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-12 col-md-4 text-center">
                        <div id="upload-placeholder"></div>
                    </div>
                    <div class="col-xs-12 col-md-4 center-col" style="padding-top:30px;">
                        <div class="uploader">
                            <input id="file-upload" type="file" name="fileUpload" accept="image/*" />

                            <label for="file-upload" id="file-drag">
                                <img id="file-image" src="#" alt="Preview" class="hidden">
                                <div id="start">
                                    <i class="fa fa-download" aria-hidden="true"></i>
                                    <div>Select a file or drag here</div>
                                    <div id="notimage" class="hidden">Please select an image</div>
                                </div>
                            </label>
                        </div>

                        <br />
                        <p id="display-info">
                            Filename: <strong id="filename"></strong><br>
                            Size: <strong id="filesize"></strong>
                        </p>
                        <button id="file-upload-btn" class="btn btn-primary upload-result">Upload
                            Image</button>
                        <br>
                        <div class="progress-container" id="uploading-progress-bar">
                            <progress id="progressBar" value="0" max="100"></progress>
                            <p id="progress-value"></p>
                        </div>

                        <p class="text-primary" id="preview-progress">Generating preview <i
                                class="fa fa-spinner fa-spin"></i></p>
                        <p class="text-success" id="preview-sucess">Preview generated!</p>
                        <p class="text-success" id="preview-details">
                            New filename: <strong id="preview-filename"></strong>
                            <br>
                            Preview size: <strong id="preview-size"></strong>
                        </p>

                        <p class="text-primary" id="optimizing-progress">Optimizing image <i
                                class="fa fa-spinner fa-spin"></i></p>
                        <p class="text-success" id="optimizing-sucess">Image optimized, new image size <span
                                id="new-image-size"></span></p>

                        <p class="text-primary" id="uploading-progress">Uploading <i class="fa fa-spinner fa-spin"></i>
                        </p>
                        <p class="text-success" id="uploading-sucess">Uploaded!</p>
                        <p class="text-danger" id="uploading-failed">Uploading failed!</p>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div id="preview"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer>
        <p>&copy;Copyright 2020 All Rights Reserved | Developed by <a href="http://www.kumarshubham.in">Shubham</a> for
            Photo Gallery </p>
    </footer>

    <!-- links for js scripts -->
    <script src="../js/jquery-3.2.1.min.js" type="text/javascript"></script>
    <script src="../js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../js/croppie.js" type="text/javascript"></script>
    <script src="app.js" type="text/javascript"></script>

    <!-- hide all the other items/popups -->
    <div style="display: none !important">
</body>

</html>