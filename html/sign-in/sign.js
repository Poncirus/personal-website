/********************************
    sign action
********************************/

$("#sign").click(function () {
    var username = $("#username").val();
    var password = $("#password").val();

    // sha256
    var shaPassword = sha256(password);

    // post
    $.post("/go/sign-in",
        {
            username: username,
            password: shaPassword
        },
        function (data, status) {
            // request not success
            if (status != "success") {
                setResult(data, "Connection Fail");
                return;
            }

            // parse data to json object
            var json = JSON.parse(data);

            if (json.Status == "Success") {
                var remenber = $("remember").val();
                if (remember) {
                    Cookies.set('username', username, { expires: 365 });
                    Cookies.set('password', shaPassword, { expires: 365 });
                } else {
                    Cookies.set('username', username);
                    Cookies.set('password', shaPassword);
                }

                window.history.go(-1);
                return;
            }

            // set result
            setResult(json);
            return;
        });
});


/*******************************************************************
    func:   setResult
    brief:  set modal and show
    args:   alertJson - alert json data
*******************************************************************/
function setResult(alertJson) {
    const str = alertJson.Str;
    const status = alertJson.Status;

    // set modal
    $("#modal-title").html(status);
    $("#modal-body").html(str);

    // show modal
    $("#result").modal('show');
}