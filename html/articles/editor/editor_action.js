/********************************
    editor action
********************************/

ID = getUrlParam("id") != null ? getUrlParam("id") : null;

$(document).ready(function () {
    addButton("success", "saveButton", "save");
    addButton("danger", "deleteButton", "delete");
});

function saveButton() {
    var title = $("#title").val();
    if (title == "") {
        var json = JSON.parse('{"Result":"Fail", "Str":"Title cannot be empty"}');
        setResult(json);
        return;
    }

    Article.Title = title;
    Article.Description = $("#description").val();
    Article.Markdown = editor.getMarkdown();

    createTime = Article.CreateTime != "" ? "\"" + Article.CreateTime + "\"" : "";

    // post
    $.post("/go/save-article",
        {
            username: getUsernameCookie(),
            password: getPasswordCookie(),
            id: Article.ID,
            title: Article.Title,
            description: Article.Description,
            markdown: Article.Markdown,
            tags: Article.Tags,
            createTime: createTime
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
                Article.ID = json.ID;
            }

            // set result
            setResult(json);
            return;
        });
}

function deleteButton() {
    if (Article.ID == "") {
        return;
    }

    // post
    $.post("/go/delete-article",
        {
            username: getUsernameCookie(),
            password: getPasswordCookie(),
            id: Article.ID
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

function tagButton(tag) {
    var pos = Article.Tags.indexOf(tag);
    if (pos == -1) {
        Article.Tags.push(tag);
    } else {
        Article.Tags.splice(pos, 1);
    }
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
