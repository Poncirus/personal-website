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
                var json = JSON.parse('{"Result":"Fail", "Str":"Connection Fail"}');
                setResult(json);
                return;
            }
            // parse data to json object
            var json = JSON.parse(data);

            if (json.Result == "Success") {
                if ($("#remember").prop('checked')) {
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
    const status = alertJson.Result;
    const str = alertJson.Str;

    // set modal
    $("#modal-title").text(status);
    $("#modal-body").text(str);

    // show modal
    $("#result").modal('show');
}