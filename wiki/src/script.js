$(document).ready(function () {
  ///SEAR AN ARTICLE BY IT'S NAME///
    $('#inputSearch').click(function () {
      ///KEEP THE DATA FROM OUTPUT FIELD///
        var mySearch = $('#searchField').val();
      ///URL FOR API CALL
        var myUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + mySearch + '&format=json&callback=?';
      ///// MAKE AJAX CALL TO KEEP DATA FROM SEARCHING RESULT///
      if(mySearch){
        $.ajax({
            type: "GET",
            url: myUrl,
            async: false,
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data[1].length; i++) {
                    $('#myOutput').prepend("<div class='txtStyle'><a href=" + data[3][i] + ">" + data[1][i] + "</a><p>" + data[2][i] + "</p></div>");
                }
                $('#searchField').val('');
            },
            error: function (errorMessage) {
                alert("Error!");
            }
        });
      }
    });
   ///ENTER-PRESS BUTTON///
    $('#searchField').keyup(function (a) {
        if (a.which == 13) {
            $('#inputSearch').click();
            $('#myModal').fadeIn();
        }
    });
   ///CLOSE THE MODAL WINDOW///
    $('.close').click(function () {
        $('#myModal').fadeOut();
    });
});