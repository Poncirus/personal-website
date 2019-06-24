/********************************
    load editor automatically
********************************/

var editor;

$(document).ready(function () {
    //calculate height
    if(document.body.clientWidth > 1000){
        var hoffset = 250;
    } else {
        var hoffset = 300;
    }

    // load editor
    var height = document.body.clientHeight - hoffset;
    editor = editormd("editor", {
        width: "100%",
        height: height,
        markdown: "# <Title>",
        htmlDecode: "style,script,iframe,sub,sup|on*",  // html support
        path: "/node_modules/editor.md/lib/" 
    });

    // set editor z-index
    $("#editor").css("z-index", 1030);
});