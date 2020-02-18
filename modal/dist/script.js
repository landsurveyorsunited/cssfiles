// Function to show modal
$( '#show-modal' ).on( 'click', function( ev ) {
  $( '#modal' ).fadeIn();
  $( '#modal-background' ).fadeTo( 500, .5 );
  ev.preventDefault();
} );

// Function to hide modal
$( '#close-modal' ).on( 'click', function( ev ) {
  $( '#modal, #modal-background' ).fadeOut();
  ev.preventDefault();
} );