var url = "https://lsucommunity.vercel.app/freeder/index.html";
$("body #iframe").each(function(){
  $(this).attr("src",url);
});

$(document).on('submit', 'form', function(e) {
    e.preventDefault()
    $frm = $("input#url").val();
    $("body #iframe").each(function(){
      $(this).attr("src",$frm);
    });
});