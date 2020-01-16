/********************************
    load editor automatically
********************************/

var editor;

$(document).ready(function () {
    // load title and description
    var id = getUrlParam("id");
    var md = "";

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

            var article = json.Article

            $("#title").html(article.Title);
            $("#description").html(article.Description);
            $("#time").html("Created: " + parseTime(article.CreateTime) + " &nbsp; Modified: " + parseTime(article.LastModification));

            var tag = "";
            for (i in article.Tags) {
                tag += " &nbsp; " + article.Tags[i];
            }
            $("#tags").html(tag);

            md = article.Markdown;

            // calculate height
            if (document.body.clientWidth > 1000) {
                var hoffset = 230;
            } else {
                var hoffset = 240;
            }

            // load editor
            var height = document.body.clientHeight - hoffset;
            editor = editormd("editor", {
                width: "100%",
                height: height,
                markdown: md,
                htmlDecode: "style,script,iframe,sub,sup|on*",  // html support
                path: "/node_modules/editor.md/lib/",
                readOnly: true,
                onload: function () {
                    this.previewing();  // preview
                }
            });

            // set editor z-index
            $("#editor").css("z-index", 1025);
        })


});