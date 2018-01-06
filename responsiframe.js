x$( document ).ready(function() {
    setiFrameAspectRatio();
    resizeiFrames();
});

x$( window ).resize(function() {
    resizeiFrames();
});

function setiFrameAspectRatio(){
    x$( "iframe" ).each(function( index ) {
      aspectRatio = parseInt($(this).attr('width'), 10) / parseInt( x$(this).attr('height'), 10);
      aspectRatio = Math.round(aspectRatio * 10000) / 10000;
      x$(this).data('aspect-ratio', aspectRatio);
      
      x$(this).attr('width',  x$(this).parent().width());
      x$(this).attr('height', x$(this).parent().width() / aspectRatio);
      // x$(this).data('max-width', x$(this).attr('width'));
    });   
}

function resizeiFrames(){
    x$( "iframe" ).each(function( index ) {

        // if($(this).parent().width() < x$(this).data('max-width')){
            x$(this).attr('width',  x$(this).parent().width());
            x$(this).attr('height', x$(this).parent().width() / x$(this).data('aspect-ratio'));
        //}
    }); 
}
