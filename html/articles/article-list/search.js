function search() {
    var title = $("#search-title").val();
    if (title == "") {
        return;
    }

    $("#alert").html(getAlertHtml(title));

    // close alert
    $('#alert .alert').on('closed.bs.alert', function () {
        alert("In progress");
    })
}

function getAlertHtml(title) {
    return "<div class='alert alert-success alert-dismissible fade shadow show' role='alert'> \
                Search <strong>" + title + "</strong> \
                <button type='button' class='close' data-dismiss='alert' aria-label='Close'> \
                    <span aria-hidden='true'>&times;</span> \
                </button> \
            </div>"
}
