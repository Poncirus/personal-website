/********************************
    editor action
********************************/

$(document).ready(function () {
    addButton("success", "editButton", "edit");
    addButton("danger", "deleteButton", "delete");
});

function editButton() {
    $(location).prop('href', '../editor?id=' + getUrlParam("id"));
}

function deleteButton() {
    // check sign
    if (getUsernameCookie() == null || getPasswordCookie() == null) {
        // set modal
        $("#modal-title").text("Fail");
        $("#modal-body").text("Please sign in");

        // show modal
        $("#result").modal('show');
        return;
    }

    // post
    $.post("/go/delete-article",
        {
            username: getUsernameCookie(),
            password: getPasswordCookie(),
            id: getUrlParam("id")
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

            // set result
            setResult(json);

            if (json.Result == "Success") {
                $('#result').on('hidden.bs.modal', function (e) {
                    $(location).prop('href', '../article-list');
                })
            }
            return;
        });
}

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