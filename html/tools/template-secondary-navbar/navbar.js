/******************************************
    load secondary-navbar automatically
******************************************/
$(document).ready(function () {
    // load secondary-navbar
    $("#secondary-navbar").load("/tools/template-secondary-navbar/navbar.html", function () {
        //set current tag
        if (!!$("#secondary-navbar").attr("current-page")) {
            $("#secondary-navbar .nav-link").each(function () {
                if (!!$(this).attr("tag")) {
                    // tag in navbar.html == current-page
                    if ($(this).attr("tag") == $("#secondary-navbar").attr("current-page")) {
                        $(this).addClass("active");
                    }
                }
            })
        } else {
            alert("do not set current-page");
        }
    });
});

