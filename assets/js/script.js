(function() {

    var transformDateTime = function(time) {
        return $.format.date(time, "yyyy年MM月dd日 hh:mm");
    } 

    $(document).ready(function() {
        console.log("ready");
        $(".datetime").each(function() {
            $(this).text( transformDateTime($(this).attr("datetime")) );
        })
    })
})();