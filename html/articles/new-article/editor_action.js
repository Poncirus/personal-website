/********************************
    editor action
********************************/

var firstSaveFlag = true;

$("#save").click(function () {
    var title = $("#title").val();
    var description = $("#description").val();

    var md = editor.getMarkdown();

    // post
    $.post("/go/save-md",
        {
            username: getUsernameCookie(),
            password: getPasswordCookie(),
            title: title,
            description: description,
            markdown: md,
            first: firstSaveFlag
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