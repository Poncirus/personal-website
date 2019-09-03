/********************************
    load articles
********************************/

$(document).ready(function () {
    $.get("/go/get-article-list",
        function (data, status) {
            // request not success
            if (status != "success") {
                return;
            }
            // parse data to json object
            var json = JSON.parse(data);

            if(json.Result != "Success") {
                return;
            }

            html = ""
            for (const i in json.ArticleInfo) {
                if (json.ArticleInfo.hasOwnProperty(i)) {
                    const a = json.ArticleInfo[i];
                    html = html + "<div class='text-muted small py-2 px-2 border-bottom border-gray'  style='transform: rotate(0);'> \
                    <h5 class='text-dark font-weight-bold'>" + a.Title + "</h5>" + a.Description + "<a href='../article?title=" + a.Title + "' class='stretched-link'></a></div>";
                }
            }

            $("#articles").html(html);
        })
});