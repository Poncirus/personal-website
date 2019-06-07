/********************************
    load navbar automatically
********************************/
$(document).ready(function () {
    // load navbar
    $("#navbar").load("/template-navbar/navbar.html", function () {
        // set current tag
        if (!!$("#navbar").attr("current-page")) {
            $("#navbar .nav-item").each(function () {
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

        // set username
        var username = getUsernameCookie();
        if(username != ""){
            $("#sign-in").html(username);
            $("#sign-in").attr("href", "#"); 
        }

        /******************************************************************
        function blow is from Bootstrap examples - Offcanvas - offcanvas.js
        ******************************************************************/
        $('[data-toggle="offcanvas"]').on('click', function () {
            $('.offcanvas-collapse').toggleClass('open')
        })
    });
});


function getUsernameCookie()
{
  var name = "username=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

