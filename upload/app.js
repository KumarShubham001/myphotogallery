var filename = "";
var imageUploaded = "";
var image;
var thumb;
var maxImageSize = 2097152; // 2 mb
var originalImage;

init();

// Hide all the progresses and statuses
function init() {
    $('#display-info').hide();
    $('#uploading-progress-bar').hide();
    $('#preview-progress').hide();
    $('#preview-sucess').hide();
    $('#preview-details').hide();
    $('#optimizing-progress').hide();
    $('#optimizing-sucess').hide();
    $('#uploading-progress').hide();
    $('#uploading-sucess').hide();
    $('#uploading-failed').hide();
}

// Initially disable the upload button
$('#file-upload-btn').attr('disabled', true);

// init the placeholder for upload
$uploadCrop = $('#upload-placeholder').croppie({
    enableExif: true,
    viewport: {
        width: 300,
        height: 200,
        type: 'square'
    },
    boundary: {
        width: 300,
        height: 300
    },
});

// if we select an image then immediately load the placeholder image
$('#file-upload').on('change', function () {
    init();
    $('#uploading-sucess').hide();
    var reader = new FileReader();
    reader.onload = function (e) {
        $uploadCrop.croppie('bind', {
            url: e.target.result
        }).then(function () {
            this.filename = Math.trunc(e.timeStamp);
            this.image = e.target.result;

            $('#file-upload-btn').attr('disabled', false);
        });
    }
    reader.readAsDataURL(this.files[0]);
    originalImage = this.files[0];
    displayInfo(this.files[0]);
    $('#display-info').show();
});

// upload-image-button event handler
$('#file-upload-btn').on('click', function (ev) {
    if ($('#file-upload').val() != "") {

        // If already uploaded image is there, dont re-upload it
        if (imageUploaded != filename) {

            // get the thumbnail image of the original image then compress it
            // {
            //     width: 1200,
            //     height: 800
            // }
            $uploadCrop.croppie('result', {
                type: 'canvas',
                size: 'original',
                quality: 1,
                format: "png",
            }).then(function (croppedImage) {

                // now compress the cropped image
                var thumbSize = {
                    width: 600,
                    height: 400
                }, img = new Image();

                img.src = croppedImage;

                img.onerror = function () {
                    URL.revokeObjectURL(this.src);
                    reject("Cannot load image");
                };

                img.onload = function () {
                    URL.revokeObjectURL(this.src);

                    var canvas = document.createElement("canvas");
                    canvas.width = thumbSize.width;
                    canvas.height = thumbSize.height;

                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, thumbSize.width, thumbSize.height);

                    canvas.toBlob(function (blob) {
                        var reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = function () {
                            thumb = reader.result;

                            // ---------------------------------------------------------------
                            // show the cropped image preview
                            // ---------------------------------------------------------------

                            $('#preview-progress').show();

                            setTimeout(() => {
                                html = '<img style="height: 100%; width: 100%" src="' + thumb + '" />';
                                $("#preview").html(html);
                                $('#preview-progress').hide();
                                $('#preview-sucess').show();
                                $('#preview-details').show();
                                $('#preview-filename').text(String(filename));

                                // calculate the size of the thumbnail image
                                const base64Str = thumb.substr(22);
                                const decodedStr = atob(base64Str);
                                $('#preview-size').text(String(readableBytes(decodedStr.length)));
                            }, 500);

                            // ---------------------------------------------------------------
                            // upload the main image first then if it is successful, 
                            // upload the thumbnail
                            // ---------------------------------------------------------------

                            // start the loader
                            $('#uploading-progress').show();
                            $('#uploading-progress-bar').show();

                            // disable the upload button and file upload input
                            $('#file-upload-btn').attr('disabled', true);
                            $('#file-upload').attr('disabled', true);

                            // compress/optimize the image before uploading it
                            var MIME_TYPE = "image/jpeg"; //image/png, image/webp

                            $('#optimizing-progress').show();
                            $('#optimizing-sucess').hide();

                            var blobURL = URL.createObjectURL(originalImage);
                            var img = new Image();
                            img.src = blobURL;

                            // Handle the failure properly
                            img.onerror = function () {
                                URL.revokeObjectURL(this.src);
                                console.log("ERR while compressing. Cannot load image.");
                                $('#uploading-failed').show();
                            };

                            img.onload = function () {
                                var newWidth = img.width,
                                    newHeight = img.height,
                                    quality = 1 - Number((0.5 / 18918281 * originalImage.size).toFixed(2));
                                ;

                                URL.revokeObjectURL(this.src);

                                var canvas = document.createElement("canvas");
                                canvas.width = newWidth;
                                canvas.height = newHeight;
                                var ctx = canvas.getContext("2d");
                                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                                canvas.toBlob(function (blob) {
                                    // Handle the compressed image. Upload or save it in local state
                                    $('#optimizing-progress').hide();
                                    $('#optimizing-sucess').show();
                                    $('#new-image-size').text(readableBytes(blob.size));

                                    this.image = blob;

                                    var reader = new FileReader();
                                    reader.readAsDataURL(blob);
                                    reader.onloadend = function () {
                                        this.image = reader.result;

                                        // ---------------------------------------------------------------
                                        // now upload the image
                                        // ---------------------------------------------------------------
                                        $.ajax({
                                            url: "ajaxpro.php",
                                            type: "POST",
                                            data: {
                                                "image": this.image,
                                                "filename": filename,
                                                "location": "img"
                                            },
                                            xhr: function () {
                                                $('#progressBar').attr('value', 0)
                                                $('#progress-value').text('');

                                                var xhr = new window.XMLHttpRequest();
                                                xhr.upload.addEventListener("progress", function (evt) {
                                                    if (evt.lengthComputable) {
                                                        console.log('Uploaded Image: ' + evt.loaded);

                                                        var percentComplete = (evt.loaded / evt.total) * 100;

                                                        // Upload progress bar visibility code here
                                                        $('#progressBar').attr('value', Math.round(percentComplete));
                                                        $('#progress-value').text(Math.round(percentComplete) + "% uploaded (" + String(readableBytes(evt.loaded)) + ")...");
                                                    }
                                                }, false);
                                                return xhr;
                                            },
                                            success: function (data) {

                                                // ---------------------------------------------------------------
                                                // on success, upload the thumbnail
                                                // ---------------------------------------------------------------

                                                $.ajax({
                                                    url: "ajaxpro.php",
                                                    type: "POST",
                                                    data: {
                                                        "image": thumb,
                                                        "filename": filename,
                                                        "location": "thumb"
                                                    },
                                                    xhr: function () {
                                                        $('#progressBar').attr('value', 0)
                                                        $('#progress-value').text('');

                                                        var xhr = new window.XMLHttpRequest();
                                                        xhr.upload.addEventListener("progress", function (evt) {
                                                            if (evt.lengthComputable) {
                                                                console.log('Uploaded thumbnail: ' + evt.loaded);

                                                                var percentComplete = (evt.loaded / evt.total) * 100;

                                                                // Upload progress bar visibility code here
                                                                $('#progressBar').attr('value', Math.round(percentComplete));
                                                                $('#progress-value').text(Math.round(percentComplete) + "% uploaded (" + String(readableBytes(evt.loaded)) + ")...");
                                                            }
                                                        }, false);
                                                        return xhr;
                                                    },
                                                    success: function (data) {

                                                        // ---------------------------------------------------------------
                                                        // SUCCESS
                                                        // ---------------------------------------------------------------

                                                        imageUploaded = filename;
                                                        $('#uploading-progress').hide();
                                                        $('#uploading-progress-bar').hide();
                                                        $('#uploading-sucess').show();

                                                        // enable the file-upload-button and file input box
                                                        $('#file-upload-btn').attr('disabled', false);
                                                        $('#file-upload').attr('disabled', false);
                                                    }
                                                });
                                            },
                                            fail: function (xhr, textStatus, errorThrown) {
                                                $('#uploading-progress').hide();
                                                $('#uploading-progress-bar').hide();

                                                $('#uploading-failed').show();

                                                // enable the file-upload-button and file input box
                                                $('#file-upload-btn').attr('disabled', false);
                                                $('#file-upload').attr('disabled', false);
                                            }
                                        });
                                        // ---------------------------------------------------------------
                                    }

                                }, MIME_TYPE, quality);
                            };
                        };
                    }, "image/png", 0.2);
                }
            });
        } else {
            alert('Please select a new image.')
            return false;
        }
    } else {
        alert('Please select an image.');
        return false;
    }
});

// display the image info
function displayInfo(file) {
    $('#filename').text(String(file.name));
    $('#filesize').text(String(readableBytes(file.size)));
}

// make the readable size of the image
function readableBytes(bytes) {
    var i = Math.floor(Math.log(bytes) / Math.log(1024)),
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}