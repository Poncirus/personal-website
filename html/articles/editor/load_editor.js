/********************************
    load editor automatically
********************************/

var editor;

var Article = new Object();
Article.Tags = [];
Article.CreateTime = "";

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
    var id = getUrlParam("id");
    if (id == null) {
        loadEditor("# <title>");
        $("#secondary-navbar").attr("current-page", "New Article");
        Article.ID = "";
        loadTags([]);
    } else {
        $.post("/go/get-article",
            {
                id: id
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

                Article = json.Article;
                if (Article.Tags == null) {
                    Article.Tags = [];
                }

                $("#title").val(Article.Title);
                $("#description").val(Article.Description);
                md = Article.Markdown;

                loadEditor(md);
                loadTags(Article.Tags);
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
        path: "/node_modules/editor.md/lib/",

        // image upload
        imageUpload    : true,
        imageFormats   : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL : "/go/image-upload",
    });

    // set editor z-index
    $("#editor").css("z-index", 1030);
}
