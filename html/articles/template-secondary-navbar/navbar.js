/******************************************
    load secondary-navbar automatically
******************************************/
$(document).ready(function () {
    // load secondary-navbar
    $("#secondary-navbar").load("/articles/template-secondary-navbar/navbar.html", function () {
        // load function bar
        $("#function-bar").html(FunctionBarHtml);
        
        // set current tag
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
            if ($("#secondary-navbar").attr("current-page") != "") {
                alert("do not set current-page");
            }
        }
    });
});

var FunctionBarHtml = "";

function addButton(type, func, text) {
    FunctionBarHtml += "<button type='button' class='btn btn-" + type + " btn-sm px-3 mr-3' onclick='" + func + "()'>" + text + "</button>";
}