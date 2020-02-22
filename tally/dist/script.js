var tallyDisplay = document.getElementById('tally');
var globalTally = 0;

tallyDisplay.innerHTML = globalTally;

document.addEventListener('keyup', function(event) {
    if ( event.which === 32 ) {
        globalTally++;
        tallyDisplay.innerHTML = globalTally;
    }
});

document.getElementById('plusBtn').addEventListener('click', function(event) {
    globalTally++;
    tallyDisplay.innerHTML = globalTally;
});

document.getElementById('resetBtn').addEventListener('click', function(event) {
    globalTally = 0;
    tallyDisplay.innerHTML = globalTally;
});