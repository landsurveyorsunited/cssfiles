// Google Sheet
// https://docs.google.com/spreadsheets/d/1ZoG_xxNuQ92KBQdAc1_YwNjT63UsG37TPJfEl9F0PbM/edit#gid=20287649

//var googleSheetTsvPublishedUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSwS6mST_pthZFwqnuiEXmgS8b1uETvh8-I6xG7g7jZaGXWoRf_h5VoYYeaG7o_uispyQXJYSzBWpji/pub?gid=20287649&single=true&output=tsv';


$( document ).ready(function() {
  
  $('.js-input').on('input change', function() {
    var inputText = $(this).val();
    var $button = $('.js-button');
    if (inputText === '') {
      $button.prop('disabled', true);
    } else {
      $button.prop('disabled', false);
    }
  });
  
  $('.js-textarea').on('input change', function() {
    var textareaText = $(this).val();
    var $copyButton = $('.js-copy-btn');
    if (textareaText === '') {
      $copyButton.prop('disabled', true);
    } else {
      $copyButton.prop('disabled', false);
    }
  });
  

  $('.js-button').click(function() {
    var url = $('.js-input').val();
    if (url !== '') {
      populateTextarea('Loading data ...');
      $('.js-array-count').text('');
      $('.js-copy-btn').prop('disabled', true);
      loadTsv(url);
    }
  });
  
  $('.js-copy-btn').click(function() {
    $('.js-textarea').select();
    document.execCommand('copy');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }
    $.notify({
      message: 'The JSON data has been copied to your clipboard'
    }, {
      type: 'success',
      delay: 5000,
	    timer: 1000,
      offset: {
        x: 50,
        y: 100
      },
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      }
    });
  });

  function loadTsv(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var jsonStr = tsvToJson(this.responseText);
        jsonStr = jsonStr.replace(/\\r/g, '');
        var jsonData = JSON.parse(jsonStr);
        for (let i=0; i<jsonData.length; i++) {
          jsonData[i]['spreadsheet_row'] = (i + 2).toString();
        }
        $('.js-array-count').text(jsonData.length + ' rows');
        var jsonStr = JSON.stringify(jsonData, undefined, 4);
        populateTextarea(jsonStr);
        $('.js-copy-btn').prop('disabled', false);
      } else if (this.status === 404) {
        populateTextarea('Error code: ' + this.status + ' - Error loading external data!\nMake sure you have entered the Google Sheet (.tsv) Publish URL correctly!\n\nFor example ...\nhttps://docs.google.com/spreadsheets/d/e/xxxxxxxxxxxxxxxxxxxxxxxxxxx/pub?gid=xxxxxxxxxxxxx&single=true&output=tsv');
        $('.js-copy-btn').prop('disabled', true);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }

  function emptyTextarea() {
    var $textarea = $('.js-textarea');
    $textarea.val('');
    $('.js-array-count').text('');
  }

  function populateTextarea(str) {
    var $textarea = $('.js-textarea');
    $textarea.val(str);
  }

  function tsvToJson(tsv) {
    var lines = tsv.split("\n");
    var result = [];
    var headers = lines[0].split("\t");
    for(var i=1; i<lines.length; i++) {
      var obj = {};
      var currentline=lines[i].split("\t");
      for(var j=0; j<headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return JSON.stringify(result);
  }
});