function parseTime(t) {
    var d = Date.parseRFC3339(t);
    var s = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
    return s;
}