$(document).ready(function() {
  
  $('form').submit(function(e) {
    e.preventDefault();
  });
  
  // when the width changes...
  $('select[name="width"]').change(function() {
    $('#iframe').css('width',$(this).val()); 
  });
  
  // when the height changes...
  $('select[name="height"]').change(function() {
    $('#iframe').css('height',$(this).val()); 
  });
  
  // alert the url if changed
  $('input[name="url"]').change(function() {
    $('#iframe').attr('src', $(this).val());
  });
  
  $('.rotate').click(function(e) {
    e.preventDefault();
    var width = $('select[name="width"]').val();
    var height = $('select[name="height"]').val();
    $('select[name="width"]').val(height);
    $('select[name="height"]').val(width);
    $('select').change();
  });
  
  $('.refresh').click(function(e) {
    e.preventDefault();
    $('#iframe').attr('src', $('input[name="url"]').val());
  });
  
});