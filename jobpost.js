x$('#bootstrapForm').submit(function (event) {
    event.preventDefault()
    var extraData = {}
    {
        /* Parsing input date id=2082236816 */
        var dateField = x$("#2082236816_date").val()
        var timeField = x$("#2082236816_time").val()
        let d = new Date(dateField)
        if (!isNaN(d.getTime())) {
            extraData["entry.2082236816_year"] = d.getFullYear()
            extraData["entry.2082236816_month"] = d.getMonth() + 1
            extraData["entry.2082236816_day"] = d.getUTCDate()
        }
        if (timeField && timeField.split(':').length >= 2) {
            let values = timeField.split(':')
            extraData["entry.2082236816_hour"] = values[0]
            extraData["entry.2082236816_minute"] = values[1]
        }
    }
    x$('#bootstrapForm').ajaxSubmit({
        data: extraData,
        dataType: 'jsonp',  // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
        error: function () {
            // Submit of form should be successful but JSONP callback will fail because Google Forms
            // does not support it, so this is handled as a failure.
            alert('Form Submitted. Thanks.')
            // You can also redirect the user to a custom thank-you page:
            // window.location = 'https://landsurveyorsunited.com/thank-you'
        }
    })
})
