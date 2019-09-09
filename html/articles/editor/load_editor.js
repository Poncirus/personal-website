/********************************
    load editor automatically
********************************/

var editor;

$(document).ready(function () {
    // check login status
    if (getUsernameCookie() == null || getPasswordCookie() == null) {
        $('#result').on('hidden.bs.modal', function (e) {
            $(location).prop('href', '/sign-in');
        })

        var json = JSON.parse('{"Result":"Fail", "Str":"Please log in"}');
        setResult(json);
        return;
    }

    // load article
    var title = getUrlParam("title");
    if (title == null) {
        loadEditor("# <title>");
        $("#secondary-navbar").attr("current-page", "New Article");
    } else {
        $.post("/go/get-article?title=",
        {
            title: title
        },
        function (data, status) {
            // request not success
            if (status != "success") {
                return;
            }
            // parse data to json object
            var json = JSON.parse(data);

            if (json.Result != "Success") {
                return;
            }

            $("#title").val(json.Title);
            $("#description").val(json.Description);
            md = json.Markdown;

            loadEditor(md);
        });
    }

});

function loadEditor(md) {
    // calculate height
    if (document.body.clientWidth > 1000) {
        var hoffset = 250;
    } else {
        var hoffset = 300;
    }

    // load editor
    var height = document.body.clientHeight - hoffset;
    editor = editormd("editor", {
        width: "100%",
        height: height,
        markdown: md,
        htmlDecode: "style,script,iframe,sub,sup|on*",  // html support
        path: "/node_modules/editor.md/lib/"
    });

    // set editor z-index
    $("#editor").css("z-index", 1030);
}
