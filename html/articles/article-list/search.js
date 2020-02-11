function search() {
    var title = $("#search-title").val();
    if (title == "") {
        return;
    }

    tagClear();
    $.post("/go/title-search",
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

            renderArticle(json.Articles);

            // set alert
            $("#alert").html(getAlertHtml(title));

            // close alert
            $('#alert .alert').on('closed.bs.alert', function () {
                tagClear();
                tagSearch();
            });
        });
}

function getAlertHtml(title) {
    return "<div class='alert alert-success alert-dismissible fade shadow show' role='alert'> \
                Search <strong>" + title + "</strong> \
                <button type='button' class='close' data-dismiss='alert' aria-label='Close'> \
                    <span aria-hidden='true'>&times;</span> \
                </button> \
            </div>"
}
