/********************************
    editor action
********************************/

originTitle = ""

$("#edit").click(function () {
    $(location).prop('href', '../edit-article?title=' + getUrlParam("title"));
});

$("#delete").click(function () {
    // post
    $.post("/go/delete-article",
        {
            username: getUsernameCookie(),
            password: getPasswordCookie(),
            title: getUrlParam("title")
        },
        function (data, status) {
            // request not success
            if (status != "success") {
                setResult(data, "{Result: 'Fail', Str: 'Connection Fail'}");
                return;
            }
            // parse data to json object
            var json = JSON.parse(data);

            // set result
            setResult(json);

            if (json.Result == "Success") {
                $('#result').on('hidden.bs.modal', function (e) {
                    $(location).prop('href', '../article-list');
                })
            }
            return;
        });

    // cancel first save flag
    firstSaveFlag = false;
});

/*******************************************************************
    func:   setResult
    brief:  set modal and show
    args:   alertJson - alert json data
*******************************************************************/
function setResult(alertJson) {
    const str = alertJson.Str;
    const status = alertJson.Result;

    // set modal
    $("#modal-title").text(status);
    $("#modal-body").text(str);

    // show modal
    $("#result").modal('show');
}