/****************************
    Search button action
****************************/

/********************************************
    post key words and ban words
    get result and alert
********************************************/
$(document).ready(function () {
    $("#search").click(function () {
        // clear result
        $("#result").html("");

        // button on load
        $("#search").attr("disabled", true);
        $("#search").html("<div class=\"spinner-border text-light\" role=\"status\"></div>");

        // get value
        var company = $("#company-list").val();
        var key = $("#key-words").val();
        var ban = $("#ban-words").val();

        // company-list cannot be empty
        if (company == "") {
            setResult("company list cannot be empty", "danger");
            beforeReturn();
            return;
        }

        // key-words cannot be empty
        if (key == "") {
            setResult("key words cannot be empty", "danger");
            beforeReturn();
            return;
        }

        // post words
        $.post("/go/notice-search",
            {
                company_list: company,
                key_words: key,
                ban_words: ban
            },
            function (data, status) {
                // request not success
                if (status != "success") {
                    setResult(data, "danger");
                    beforeReturn();
                    return;
                }

                // parse data to json object
                var json = JSON.parse(data);

                // set result
                var alertJson = json.Alert;
                setResult(alertJson);

                // set pdf list
                var listJson = json.Stock;
                setPdfList(listJson);

                beforeReturn();
                return;
            });
    });
})


/*******************************************************************
    func:   beforeReturn
    brief:  actions before return
    action: set focus on search button
            enable search button
*******************************************************************/
function beforeReturn() {
    // set focus
    location.href = "#search";
    
    // enable search btton
    $("#search").attr("disabled", false);
    $("#search").html("Search");
}

/*******************************************************************
    func:   setResult
    brief:  set search button alert
    args:   alertJson - alert json data
*******************************************************************/
function setResult(alertJson) {
    var html = "";

    for (const i in alertJson) {
        const str = alertJson[i].Str;
        const status = alertJson[i].Status;

        // test status
        if (status != "success" && status != "warning" && status != "danger") {
            alert("setResult arg error: " + status);
        }

        // insert html
        html = html + "<div class=\"alert alert-" + status + " alert-dismissible fade show\" role=\"alert\">"
            + str + "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\
            <span aria-hidden=\"true\">&times;</span></button></div>";
    }

    // show alerts
    $("#result").html(html);
}


/*******************************************************************
    func:   setPdfList
    brief:  fill pdf-list block
    args:   json - pdf list json 
*******************************************************************/
function setPdfList(json) {
    var html = "";

    for (const i in json) {
        const info = json[i].Info;
        const anno = json[i].Anno;

        // add box outside (first part)
        // collapse id: collapse-out- + i
        html = html +
            "<div class=\"card mb-3\"> \
                <div class=\"card-header\" style=\"transform: rotate(0);\"> \
                    <!--add style=\"transform: rotate(0); to limit \"stretched-link\"--> \
                    <button class=\"btn btn-link text-decoration-none stretched-link text-dark\" type=\"button\" \
                        data-toggle=\"collapse\" data-target=\"#collapse-out-" + i + "\"> \
                        <span class=\"font-weight-bold mr-3\">" + info.Zwjc + "</span> \
                        <span class=\"font-weight-light\">" + info.Code + "</span> \
                    </button> \
                </div> \
                <div class=\"collapse show\" id=\"collapse-out-" + i + "\"> \
                    <div class=\"card-body\">"

        // add box inside
        for (const i in anno) {
            // add box inside (first part)
            // collapse id: collapse-in- + i
            html = html +
                "<div class=\"card mb-3\"> \
                    <div class=\"card-header\" style=\"transform: rotate(0);\"> \
                        <!--add style=\"transform: rotate(0); to limit \"stretched-link\"--> \
                        <button class=\"btn btn-link text-decoration-none stretched-link text-dark\" \
                            type=\"button\" data-toggle=\"collapse\" data-target=\"#collapse-in-" + i + "\"> \
                            " + anno[i].Key + " \
                        </button> \
                    </div> \
                    <div class=\"collapse show\" id=\"collapse-in-" + i + "\"> \
                        <div class=\"card-body\">"

            // add table head
            html = html +
                "<table class=\"table\"> \
                    <thead> \
                        <tr> \
                            <th scope=\"col\">Title</th> \
                            <th scope=\"col\" class=\"pr-md-5\" style=\"width: 0px;\">Time</th> \
                            <th scope=\"col\" class=\"pr-md-5\">Size</th> \
                        </tr> \
                    </thead> \
                    <tbody>"

            // add table
            const announcements = anno[i].Announcements;
            for (const i in announcements) {
                const a = announcements[i];
                html = html +
                    "<tr> \
                        <th scope=\"row\"> \
                            <a class=\"text-dark\" target=\"_blank\" href=\"http://static.cninfo.com.cn/" + a.AdjunctUrl + "\">"
                    + a.AnnouncementTitle +
                    "</a> \
                        </th> \
                        <td>" + timeFormat(a.AnnouncementTime) + "</td> \
                        <td>" + a.AdjunctSize + " KB</td> \
                    </tr>"
            }

            //add table tail
            html = html + "</tbody></table>"

            // add box inside (second part)
            html = html + "  </div></div></div>"
        }

        // add box outside (second part)
        html = html + "</div></div></div>"
    }

    // show announcements
    $("#pdf-list").html(html);
}


/*******************************************************************
    func:   timeFormat
    brief:  format timestamp
    args:   timestamp - timestamp to format
    return: string of time
*******************************************************************/
function add0(m) { return m < 10 ? '0' + m : m }
function timeFormat(timestamp) {
    var time = new Date(timestamp);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + '-' + add0(m) + '-' + add0(d);
}