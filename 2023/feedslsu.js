    // Fetch RSS feed from URL
    function fetchRssFeed(url) {
      const container = document.querySelector('.feed-container');
      container.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading Articles...</span></div></div>';

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          renderFeed(response);
        }
      };
      xhr.open('GET', `https://api.rss2json.com/v1/api.json?rss_url=${url}`, true);
      xhr.send();
    }

    function renderFeed(feed) {
      const container = document.querySelector('.feed-container');
      container.innerHTML = '';

      feed.items.forEach(function(item) {
        const feedItem = document.createElement('div');
        feedItem.classList.add('feed-item');

        const title = document.createElement('div');
        title.classList.add('feed-title');
        title.textContent = item.title;
        feedItem.appendChild(title);

        const description = document.createElement('div');
        description.classList.add('feed-description');
        const parser = new DOMParser();
        const descriptionContent = parser.parseFromString(item.description, 'text/html');
        description.appendChild(descriptionContent.body);
        feedItem.appendChild(description);

        const link = document.createElement('a');
        link.classList.add('feed-link');
        link.href = item.link;
        link.textContent = 'Read More';
        feedItem.appendChild(link);

        const date = document.createElement('div');
        date.classList.add('feed-date');
        date.textContent = new Date(item.pubDate).toDateString();
        feedItem.appendChild(date);

        const tags = document.createElement('div');
        tags.classList.add('feed-tags');
        item.categories.forEach(function(tag) {
          const tagElement = document.createElement('span');
          tagElement.classList.add('feed-tag');
          tagElement.textContent = tag;
          tags.appendChild(tagElement);
        });
        feedItem.appendChild(tags);

        container.appendChild(feedItem);
      });
    }

    // Load selected feed when button is clicked
    document.getElementById('loadFeedBtn').addEventListener('click', function() {
      const feedSelect = document.getElementById('feedSelect');
      const selectedFeed = feedSelect.value;
      fetchRssFeed(selectedFeed);
    });

    // Load default feed on page load
    fetchRssFeed('https://landsurveyorsunited.com/articles/feed/all');
