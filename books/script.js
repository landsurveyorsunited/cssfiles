$("#search_form").submit(function(e) {
  $("#books").html("");

  e.preventDefault();

  var searchQuery = $("#search_txt").val();
  searchQuery = searchQuery.split(" ").join("+");

  if (!searchQuery) {
    searchQuery = "paleo";
  }

  $.ajax({
    url: "https://www.googleapis.com/books/v1/volumes?q=" + searchQuery,
    success: function(json) {
      var htmlcontent = "";
      var thumb = "";
      var author = "";
      var description = "";
      var isbn = "";

      for (i = 0; i < json.items.length; i++) {
        if (typeof json.items[i].volumeInfo.imageLinks != "undefined") {
          thumb = json.items[i].volumeInfo.imageLinks.smallThumbnail;
        } else {
          thumb = "http://i.imgur.com/oM3MdAi.png";
          //thumb = 'http://slems-oldboys.org.uk/library/wp-content/uploads/2013/11/library_nocover.jpg'
        }
        // AUTHOR
        if (typeof json.items[i].volumeInfo.authors != "undefined") {
          author = json.items[i].volumeInfo.authors[0];
        }
        
             // AUTHOR
        if (typeof json.items[i].volumeInfo.description != "undefined") {
          description = json.items[i].volumeInfo.description;
        }
        
         if (typeof json.items[i].volumeInfo.industryIdentifiers != "undefined") {
          isbn = json.items[i].volumeInfo.industryIdentifiers[0].identifier;
        }

        htmlcontent +=
          "<div class='thumbs'><b>Title:</b> " +
          json.items[i].volumeInfo.title +
          "</b> " +
          '<img src="' +
          thumb +
          '" + alt="' +
          json.items[i].volumeInfo.title +
          '">' +
          "<br><b>Author: </b>" +
          author +
          "<br><b>ISBN_13: </b>" +
          isbn +
          "<br><br>" +
          "<b>description:</b> " +
          trunc(description, 400) +
          "</div>";
      }
      document.getElementById("books").innerHTML =
        "<div>" + htmlcontent + "</div><br>";
    }
  });
});

function trunc(s, n) {
  //if(typeof s !== "undefined"){
  var t = s.indexOf(" ", n);
  if (t == -1) return s;
  return s.substring(0, t) + "...";
  // } else {
  //   return s;
  // }
}