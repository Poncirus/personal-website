/********************************
    load editor automatically
********************************/

var editor;

$(document).ready(function () {
    // load title and description
    var title = getUrlParam("title");
    var md = "";

    $.get("/go/get-article?title=" + title,
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

            $("#title").html(json.Title);
            $("#description").html(json.Description);
            md = json.Markdown;

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
                readOnly: true,
                onload: function() {
                    this.previewing();  // preview
                }
            });

            // set editor z-index
            $("#editor").css("z-index", 1030);
        })


});