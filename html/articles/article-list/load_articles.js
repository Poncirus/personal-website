/********************************
    load articles
********************************/

$(document).ready(function () {
    $.get("/go/get-article-list",
        function (data, status) {
            // request not success
            if (status != "success") {
                console.log("request not success")
                return;
            }
            // parse data to json object
            var json = JSON.parse(data);

            if (json.Result != "Success") {
                console.log("request not success")
                return;
            }

            renderArticle(json.Articles);
        })
});

function renderArticle(articleJson) {
    var html = "";
    for (const i in articleJson) {
        if (articleJson.hasOwnProperty(i)) {
            const a = articleJson[i];
            html = html + getArticleHtml(a);
        }
    }

    $("#articles").html(html);

    // remove border-bottom of the last
    $("#articles .border-bottom:last").removeClass("border-bottom");
}

function getArticleHtml(info) {
    var href = "'../article?id=" + info.ID + "'";
    var tag = "";
    for (i in info.Tags) {
        tag += " &nbsp; " + info.Tags[i];
    }
    return "<div class='text-muted small py-2 px-2 border-bottom border-gray' style='transform: rotate(0);'> \
                <div class='row'> \
                    <div class='col-12 col-md-6'> \
                        <h5 class='text-dark font-weight-bold'>" + info.Title + "</h5> \
                    </div> \
                    <div class='d-none d-md-block col-md-6 text-right'> \
                        Created: " + parseTime(info.CreateTime) + " &nbsp; Modified: " + parseTime(info.LastModification) + " \
                    </div> \
                </div> \
                <div class='row'> \
                    <div class='col-12 col-md-8'> \
                        " + info.Description + " \
                    </div> \
                    <div class='d-none d-md-block col-md-4 text-right'> \
                        " + tag + " \
                    </div> \
                </div> \
                <a href=" + href + " class='stretched-link'></a> \
            </div>";
}
