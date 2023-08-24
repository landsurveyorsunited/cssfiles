    // Automatically load the OPML file
    var opmlUrl = "https://landsurveyorsuniteddocs.on.drv.tw/membertools/opml/subscriptions.opml";
    loadOpmlFile(opmlUrl);

    // Function to load OPML file and extract links
    function loadOpmlFile(url) {
      var opmlLinksContainer = x$('#opmlLinksContainer');
      opmlLinksContainer.empty();
      x$.ajax({
        url: url,
        type: 'GET',
        dataType: 'xml',
        success: function(opmlDoc) {
          var links = x$(opmlDoc).find('outline[xmlUrl]');
          links.each(function() {
            var url = x$(this).attr('xmlUrl');
            var title = x$(this).attr('title');
            var linkElement = x$('<a>').attr('href', '#').text(title).click(function() {
              loadRssFeed(url);
            });
            var listItem = x$('<div>').append(linkElement);
            opmlLinksContainer.append(listItem);
          });
        },
        error: function() {
          opmlLinksContainer.text('Error loading OPML file.');
        }
      });
    }

    // Function to load RSS feed
    function loadRssFeed(url) {
      var rssFeedContainer = x$('#rssFeedContainer');
      rssFeedContainer.empty();
      x$.ajax({
        url: 'https://api.rss2json.com/v1/api.json',
        type: 'GET',
        data: {
          rss_url: url
        },
        success: function(response) {
          var items = response.items.slice(0, 25);
          items.forEach(function(item) {
            var title = x$('<h4>').text(item.title).click(function() {
              x$(this).nextAll().toggle();
            });

            var firstImage = null;
            var firstVideo = null;
            var description = x$('<p>').html(item.description.substr(0, 500));
            var originalLink = x$('<a>').attr('href', item.link).attr('target', '_blank').text('View Original Post');
            
            // Check for images and videos in the content
            var content = x$(item.content);
            content.find('img').each(function() {
              if (!firstImage) {
                firstImage = x$('<img>').attr('src', x$(this).attr('src')).addClass('img-fluid');
              }
            });
            content.find('video').each(function() {
              if (!firstVideo) {
                firstVideo = x$('<video controls>').append(x$('<source>').attr('src', x$(this).attr('src')));
              }
            });

            var listItem = x$('<div>').append(title, firstImage, firstVideo, description, originalLink);
            rssFeedContainer.append(listItem);
          });
        },
        error: function() {
          rssFeedContainer.text('Error loading RSS feed.');
        }
      });
    }
  
