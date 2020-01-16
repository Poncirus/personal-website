/********************************
    load tags & tags action
********************************/

function loadTags(tags) {
    $.get("/go/get-tags",
        function (data, status) {
            // request not success
            if (status != "success") {
                console.log("request not success")
                return;
            }
            // parse data to json object
            var json = JSON.parse(data);

            if (json.Result != "Success") {
                console.log("tags request not success")
                return;
            }

            var html = "";
            for (const i in json.Tags) {
                if (json.Tags.hasOwnProperty(i)) {
                    const a = json.Tags[i];
                    html = html + getTagHtml(a);
                }
            }

            $("#tags").html(html);

            for (const i in tags) {
                if (tags.hasOwnProperty(i)) {
                    const a = tags[i];
                    $("#tags [tag='" + a + "'").addClass("active");
                }
            }
        });
}

function getTagHtml(tag) {
    return "<label class='btn btn-sm btn-outline-secondary mr-1' tag='" + tag + "' onchange=\"tagButton('" + tag + "')\"> \
                <input type='checkbox'>" + tag + " \
            </label>";
}

function tagButton(tag) {
    var pos = Article.Tags.indexOf(tag);
    if (pos == -1) {
        Article.Tags.push(tag);
    } else {
        Article.Tags.splice(pos, 1);
    }
}

function addTag() {
    var tag = $("#new-tag").val();
    $("#new-tag").val("");
    Article.Tags.push(tag);

    var html = $("#tags").html();
    html += getTagHtml(tag);
    $("#tags").html(html);

    $("#tags [tag='" + tag + "'").addClass("active");
}