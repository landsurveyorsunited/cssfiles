//usemuzli/portfolio/

var feeds = [
  //'https://www.pinterest.it/dribbble/feed.rss',
  'https://learn.landsurveyorsunited.com/feed/category/87',
  'https://learn.landsurveyorsunited.com/feed/category/89',
  'https://learn.landsurveyorsunited.com/feed/category/90',
  'https://learn.landsurveyorsunited.com/feed/category/102',
 'https://learn.landsurveyorsunited.com/feed/category/86',
 
  //'https://rss.app/feeds/Hz2Rxx5TeVVmN4zd.xml',
];


var postTemplate = `
  <article class="post" data-date="{date}" data-order="{index}" data-site="{site}">
    <a target="_self" href="{url}">{teaserImage}
      <div class="post-title">{title}
      </div>
    </a>
  </article>
`;

$("#articles .post-list").rss(feeds,
  {
    limit: 50,
    layoutTemplate: '{entries}',
    entryTemplate:postTemplate,
    dateFormat: "MMMM DD, YY HH:mm:ss",
    tokens: {
      site: function(entry, tokens) {
        urlSplit = tokens.url.split('/')[2];
        urlClear = urlSplit.replace('www.','')
        return urlClear;
      }
    },
    onData: function(entry) {

      console.log(entry)
    }
  },
  function() {
    posts = $('#articles .post');
    posts.each( function(i,v){
      //console.log(v)
      var postTitle = ($(v).find('.post-title'));
      var postImg = ($(v).find('img'));
      
      if( postTitle.html()=='') {
        $(this).find('.post-title').remove()
      }
      postImg.on('error', function() {
        $(this).parents('.post').remove()
      })  
      
    })
  
  
    $(".post-list .post").sort(function(a,b){
        
      a = new Date($(a).data("date"));
      b = new Date($(b).data("date"));
    
      return a - b;
      
    }).each(function(i,p){
        $(".post-list").prepend(this);
    })  
    
    $('.bigger').append($(".post-list .post").eq(0)) 
    secondFour = $(".post-list .post").slice(0,4)
    
    secondFour.each( function(i,post){
      $('.fourth').append(post)
    })
   
    $('.preview .post').each(function(i,v,) {
      $(v).find('.post-title').append('<p>' + $(v).data('site') + '<p>')
    })
  }
);