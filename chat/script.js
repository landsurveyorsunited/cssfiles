$.getJSON("https://spreadsheets.google.com/feeds/list/1lu6Wmm3MzcVnnEDRDjLOF51O0KU11N_HnFFYA51ZGl0/od6/public/values?alt=json", function(data) {
  for (var i = 0; i < data.feed.entry.length; i++) {
    var entry = data.feed.entry[i];
    document.getElementById('chat_s').innerHTML += '<div class="chat"><div class="chat_message">' + entry.gsx$message.$t + '</div><div class="chat_name">' + entry.gsx$name.$t + '</div></div>';
  }
  var x = document.getElementsByClassName("chat_name");
  var i;
  for (i = 0; i < x.length; i++) {
    if (x[i].innerHTML != "Man" && x[i].innerHTML != "Woman") {
      x[i].parentNode.classList.add('chat_other');
      x[i].innerHTML = 'Anonymous'
    }
  }
});

//metodo 1
//$(".messages").animate({ scrollTop: $(document).height()+1000 }, "slow");


/* // metodo 2
scrollSmoothToTop('chat_s')

  
function scrollSmoothToTop (id) {
   var div = document.getElementById(id);
   $('#' + id).animate({
      scrollTop: $(document).height()+100 
   }, 500);
}


*/
///metodo 3
var scrollContainer = $;

// Define the Mutation Observer
var observer = new MutationObserver(function(mutations) {

    // Compute sum of the heights of added Nodes
    var newNodesHeight = mutations.reduce(function(sum, mutation) {
        return sum + [].slice.call(mutation.addedNodes)
            .map(function (node) { return node.scrollHeight || 0; })
            .reduce(function(sum, height) {return sum + height});
      }, 0);

    // Scroll to bottom if it was already scrolled to bottom
    if (scrollContainer.clientHeight + scrollContainer.scrollTop + newNodesHeight + 10 >= scrollContainer.scrollHeight) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }

});

function add() {
  document.getElementById('chat_s').innerHTML += '<div class="chat chat_other"><div class="chat_message">' + document.querySelector('#chat input').value + '</div><div class="chat_name">' + 'Anonymous' + '</div></div>';
}
