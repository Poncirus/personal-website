/********************************
    load navbar automatically
********************************/
$(document).ready(function () {
    // load navbar
    $("#navbar").load("/template-navbar/navbar.html", function () {
        //set current tag
        if (!!$("#navbar").attr("current-page")) {
            $(".nav-item").each(function () {
                if (!!$(this).attr("tag")) {
                    // tag in navbar.html == current-page
                    if ($(this).attr("tag") == $("#navbar").attr("current-page")) {
                        $(this).addClass("active");
                    }
                }
            })
        } else {
            alert("do not set current-page");
        }

        /******************************************************************
        function blow is from Bootstrap examples - Offcanvas - offcanvas.js
        ******************************************************************/
        $('[data-toggle="offcanvas"]').on('click', function () {
            $('.offcanvas-collapse').toggleClass('open')
        })
    });
});

