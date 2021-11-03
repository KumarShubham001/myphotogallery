console.clear();
console.log(`
██╗  ██╗███████╗██╗     ██╗      ██████╗     ██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
██║  ██║██╔════╝██║     ██║     ██╔═══██╗    ██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
███████║█████╗  ██║     ██║     ██║   ██║    ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
██╔══██║██╔══╝  ██║     ██║     ██║   ██║    ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
██║  ██║███████╗███████╗███████╗╚██████╔╝    ╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝      ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

> Hi there,
> I enjoy making acquaintances with folks who share my interests. Please contact me, as we may be able to assist each other.
> Cheers till then,
> Kumar Shubham
> mailto: hello@kumarshubham.in`);

// total items to be shown before loadmore button
const x = 12;    // 12
const inc = 8;  // 8
let currTotalVisibleImages = 0;

// For slideshow feature
let imageArr = [];
let currIndex = 0;

// initialize the images in the array
function initImageArr(images) {
    this.imageArr = images.reverse();
}

// pre-loader
$(window).load(function () {
    $(".se-pre-con").fadeOut("slow");
    $('#custom-nav-dark').hide();
    $('#custom-nav-light').show();
});

// opent close the overlay
function closeOverlay() {
    $('#page-overlay').css("display", "none");
}

// open the overlay for full image view
function openOverlay(img) {

    // find the index of the image in the array and set it globally
    this.currIndex = this.imageArr.indexOf(img);

    loc = "images/uploads/img/" + img.split('.')[0] + '.jpeg';
    $('#overlay-img').attr("src", loc);
    $('#overlay-img').hide();
    $(".overlay-img-loader").show();
    $('#page-overlay').css("display", "flex");

    $('#overlay-img').load(function () {
        $(".overlay-img-loader").hide();
        $('#overlay-img').show();
    });
}

// slideshow-previous event
function previousImage(value) {
    let newIndex = this.currIndex - value;

    if (newIndex < 0) {
        newIndex = this.currTotalVisibleImages - 1;
    }

    this.openOverlay(this.imageArr[newIndex]);
}

// slideshow-next event
function nextImage(value) {
    let newIndex = this.currIndex + value;

    if (newIndex >= this.currTotalVisibleImages) {
        newIndex = 0;
    }

    this.openOverlay(this.imageArr[newIndex]);
}

// init the lazyloading images
function loadImages() {

    if (!this.imageArr || !(this.imageArr.length > 0)) {
        $('#galleryList').hide();
        $('#nogalleryList').show();
        return;
    }

    $('#galleryList').show();
    $('#nogalleryList').hide();

    if (x >= this.imageArr.length) {
        $('.loadmore-container').hide();
    } else {
        $('.loadmore-container').show();
    }

    this.currTotalVisibleImages = x;
    if (this.currTotalVisibleImages > this.imageArr.length) {
        this.currTotalVisibleImages = this.imageArr.length;
    }

    let html = '';
    for (let i = 0; i < this.currTotalVisibleImages; i++) {
        html = html +
            `<div class="image-container" id="item">` +
            `<img class="image" src="images/uploads/thumb/` + this.imageArr[i] + `" />` +
            `<div class="overlay flex perfect-center" onclick="openOverlay('` + this.imageArr[i] + `')">` +
            `<i class="fa fa-search"></i>` +
            `</div>` +
            `</div>`;
    }

    document.getElementById('galleryList').innerHTML = html;
}

function loadmore() {
    let prevItemIndex = this.currTotalVisibleImages;

    this.currTotalVisibleImages = this.currTotalVisibleImages + inc;
    if (this.currTotalVisibleImages > this.imageArr.length) {
        this.currTotalVisibleImages = this.imageArr.length;
    }

    let html = '';
    for (let i = prevItemIndex; i < this.currTotalVisibleImages; i++) {
        html = html +
            `<div class="image-container" id="item">` +
            `<img class="image" src="images/uploads/thumb/` + this.imageArr[i] + `" />` +
            `<div class="overlay flex perfect-center" onclick="openOverlay('` + this.imageArr[i] + `')">` +
            `<i class="fa fa-search"></i>` +
            `</div>` +
            `</div>`;
    }

    document.getElementById('galleryList').innerHTML += html;

    if (this.currTotalVisibleImages == this.imageArr.length)
        $('.loadmore-container').hide();
}

// show or hide the dark-navbar on scroll
$(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
        $('#custom-nav-dark').show();
        $('#custom-nav-light').hide();
    } else {
        $('#custom-nav-dark').hide();
        $('#custom-nav-light').show();
    }
});

// send button animation
$(function () {
    $("#sendBtn").click(function () {

        if (!$("#sendBtn").hasClass("sendBtn")) {
            return false;
        }

        $("#sendBtn").removeClass("sendBtn");
        $("#sendBtn").addClass("onclic");

        $.ajax({
            url: "mail.php",
            type: "POST",
            data: {
                "name": $('#name_field').val(),
                "from_email": $('#email_field').val(),
                "message": $('#message').val()
            },
            success: function (data) {
                validate();
            }
        });
    });

    function validate() {
        setTimeout(function () {
            $("#sendBtn").removeClass("onclic");
            $("#sendBtn").addClass("validate");
            callback();
        }, 1000);
    }

    function callback() {
        setTimeout(function () {
            $("#sendBtn").removeClass("validate");
            $("#sendBtn").addClass("sendBtn");
        }, 3000);
    }
});
