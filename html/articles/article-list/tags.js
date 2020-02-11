/********************************
    load tags & tags action
********************************/

$(document).ready(function () {
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

            var html = "<div class='btn-group-toggle' data-toggle='buttons'>";
            for (const i in json.Tags) {
                if (json.Tags.hasOwnProperty(i)) {
                    const a = json.Tags[i];
                    html = html + getTagHtml(a);
                }
            }
            html += "</div>";

            $("#tags").html(html);
        })
});

function getTagHtml(tag) {
    return "<label class='btn btn-sm btn-outline-secondary mr-2 mb-2' tag='" + tag + "' onchange=\"tagModify('" + tag + "')\"> \
                <input type='checkbox'>" + tag + " \
            </label>";
}

var TagSelected = [];

function tagSearch() {
    $.post("/go/tag-search",
        {
            tags: TagSelected
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

            renderArticle(json.Articles);
        });
}

function tagModify(tag) {
    var pos = TagSelected.indexOf(tag);
    if (pos == -1) {
        TagSelected.push(tag);
    } else {
        TagSelected.splice(pos, 1);
    }
    tagSearch();
}

function tagClear() {
    TagSelected = [];
    $("#tags label").removeClass("active");
}

$("#tag-clear").click(function(){
    tagClear();
    tagSearch();
});