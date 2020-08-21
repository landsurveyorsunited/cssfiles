// MODULE: Container that holds the different compenents of the app
// (Source: https://docs.angularjs.org/guide/module).
var app = angular.module('gbSearch', ['ngRoute', 'ngResource'])

// The config function setups up routing to different html templates 
// depending on the hash (Sources:
// https://docs.angularjs.org/api/ngRoute/provider/$routeProvider, 
// https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating).
.config(function($routeProvider) {

  $routeProvider

    .when('/', {
      template: '<book-search-form class="search"></book-search-form>'
    })
    .when('/bookList', {
      template: '<book-search-form class="return-search"></book-search-form> <book-list></book-list>'
    })
    .otherwise({
      template: '<book-search-form class="search"></book-search-form>'
    })

})

// CONTROLLER: This app has two controllers. Each controller acts as a
// constructor for an new object. Each controller is tied to a template by 
// means of the ng-controller directive. The controllers manage the data 
// (i.e. Model) bound to the HTML templates (i.e. view). Note: I choose to 
// use the 'Controller As' syntax instead of injecting the $scope object. 
// (Sources: https://docs.angularjs.org/guide/controller, 
// https://scotch.io/tutorials/making-skinny-angularjs-controllers, 
// http://odetocode.com/blogs/scott/archive/2014/11/12/constructor-functions-and-controllers-in-angularjs.aspx, 
// https://www.w3schools.com/angular/angular_controllers.asp )
.controller('searchController', ['$location', 'searchFormData', 'bookData', function($location, searchFormData, bookData) {
  var mv = this;

  mv.searchFeilds = searchFormData;
  mv.searchFeild = mv.searchFeilds[0];

  mv.search = function(isValid) {
    if (isValid) {
      bookData.setQueryString(mv.query, mv.searchFeild.keyword);
      $location.path("/bookList");
    }
  };
}]).controller('bookListController', ['bookData', 'bookResourceFactory', '$scope', function(bookData, bookResourceFactory, $scope) {
  var mv = this;

  bookResourceFactory.get({
    q: bookData.getQueryString(),
    maxResults: '25'
  }, function(response) {
    bookData.setBookArray(response.items);
    mv.searchResults = bookData.getBookArray();
  });

  mv.order = function(predicate) {
    mv.reverse = (mv.predicate === predicate) ? !mv.reverse : false;
    mv.predicate = predicate;
  };

  $scope.$watch(function() {
    return bookData.getQueryString()
  }, function(newValue, oldValue) {
    if (newValue !== oldValue) {
      bookResourceFactory.get({
        q: bookData.getQueryString(),
        maxResults: '25'
      }, function(response) {
        bookData.setBookArray(response.items);
        mv.searchResults = bookData.getBookArray();
      });
    }
  });
}])

// SERVICE: Services re objects that contain business logic. They can 
// aument the capabilities of controllers 
// (Sources: https://docs.angularjs.org/guide/services,
// http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/,
// http://blog.pluralsight.com/angularjs-step-by-step-services).
.service('bookResourceFactory', ['$resource', 'bookData', function($resource, bookData) {
  return $resource('https://www.googleapis.com/books/v1/volumes', {
    callback: 'JSON_CALLBACK'
  }, {
    get: {
      method: 'JSONP'
    }
  });
}]).service('searchFormData', function() {
  return [{
    text: 'Title',
    keyword: 'intitle'
  }, {
    text: 'Author',
    keyword: 'inauthor'
  }, {
    text: 'Subject',
    keyword: 'insubject'
  }];
}).service('bookData', function() {
  var bookArray = [];
  var queryString = '';

  return {
    setQueryString: function(q, feild) {
      queryString = feild + ':' + q.split(' ').join('+');
    },

    getQueryString: function() {
      return queryString;
    },
    setBookArray: function(data) {
      for (var book in data) {
        if (data.hasOwnProperty(book)) {

          if (data[book].accessInfo.textToSpeechPermission === "ALLOWED" || data[book].accessInfo.textToSpeechPermission === "ALLOWED_FOR_ACCESSIBILITY") {
            data[book].accessInfo.isTTSE = true;
          } else {
            data[book].accessInfo.isTTSE = false;
          }

          if (!data[book].volumeInfo.hasOwnProperty('averageRating')) {
            data[book].volumeInfo.averageRating = 'Note yet rated';
          }

          if (!data[book].volumeInfo.hasOwnProperty('imageLinks')) {
            data[book].volumeInfo.imageLinks = {
              thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=Not+Found&w=128&h=166'
            };
          }

          bookArray.push(data[book]);
        }
      }
    },
    getBookArray: function() {
      return bookArray;
    }
  };
})

// DIRECTIVE: Directives place a marker in the form of an attribute, 
// element, comment, or css class on the DOM. These markers tell the 
// AngularJS to attach custom behavior to the DOM. Although AngularJS 
// contains several built-in directives, such as ng-class, ng-app, and ng-
// hide, the following two directives substitue custome elements for the 
// HTML code contained in the specified templates 
// (Sources: https://docs.angularjs.org/guide/directive, 
// http://www.sitepoint.com/practical-guide-angularjs-directives/).
.directive('bookSearchForm', function() {
  return {
    restrict: 'E',
    template: searchFormTemp,
    replace: true,
    controller: 'searchController',
    controllerAs: 'searchCtr'
  }
}).directive('bookList', function() {
  return {
    restrict: 'E',
    template: bookListTemp,
    replace: true,
    controller: 'bookListController',
    controllerAs: 'bookListCtr'
  }
});

// The following two Javascript variables contain the code for the app's 
// HTML templates. Normally this code would be stored inside sperate files 
// under a "pages" directory.
var searchFormTemp = '<div class="row"><div class="col-md-12"><form name="searchForm" ng-submit="searchCtr.search(searchForm.$valid)" class="form-inline" role="form" novalidate><div class="form-group" ng-class="{ \'has-error\' : searchForm.query.$invalid && !searchForm.query.$pristine }"><label class="sr-only" for="searchfeild">Search:</label><input type="text" class="form-control" name="query" ng-model="searchCtr.query" placeholder="Search..." required><p ng-show="searchForm.query.$invalid && !searchForm.query.$pristine" class="help-block">A search query is required.</p></div><div class="form-group"><label for="searchScope" class="sr-only">Limit Search Scope:</label><select class="form-control" ng-model="searchCtr.searchFeild" ng-options="feild.text for feild in searchCtr.searchFeilds"></select></div><button type="submit" class="btn ng-class:{ \'btn-primary\' : searchForm.query.$valid, \'btn-danger\': searchForm.query.$invalid && !searchForm.query.$pristine}" ng-disabled="userForm.$invalid">Submit</button></form></div></div>';

var bookListTemp = '<section><div class=row><div class="col-md-12"><p class="order-by-group">Sort Results by:</p><div class="btn-group order-by-group" role="group" aria-label="Order Results By"><button type="button" class="btn" ng-class="(bookListCtr.predicate === \'volumeInfo.title\') ? \'btn-primary\' : \'btn-default\'" ng-click="bookListCtr.order(\'volumeInfo.title\')">Title</button><button type="button" class="btn" ng-class="(bookListCtr.predicate === \'volumeInfo.authors\') ? \'btn-primary\' : \'btn-default\'" ng-click="bookListCtr.order(\'volumeInfo.authors\')">Author</button><button type="button" class="btn" ng-class="(bookListCtr.predicate === \'volumeInfo.averageRating\') ? \'btn-primary\' : \'btn-default\'" ng-click="bookListCtr.order(\'volumeInfo.averageRating\')">Rating</button></div></div></div><div class="row"><div class="col-md-12"><p ng-show="bookListCtr.searchResults.length === 0" class="bg-danger center-block text-center">No Results Returned</p><ul class="media-list" ng-show="bookListCtr.searchResults.length > 0"><li class="media" ng-repeat="book in bookListCtr.searchResults | orderBy:bookListCtr.predicate:BookListCtr.reverse"><div class="media-left"><a ng-href="{{book.volumeInfo.infoLink}}"><img class="media-object" ng-src={{book.volumeInfo.imageLinks.thumbnail}} alt="Book Cover"></a></div><div class="media-body"><h4 class="media-heading">{{book.volumeInfo.title}}</h4><h5>{{book.volumeInfo.authors.join(", ")}}</h5><p ng-show="book.accessInfo.isTTSE" class="text-success center-block">Text-To-Speech is Enabled</p><p ng-show="!book.accessInfo.isTTSE" class="text-danger center-block">Text-To-Speech Not Enabled</p><p>Average Rating: <span class="rating">{{book.volumeInfo.averageRating}}</span></p><p>{{book.volumeInfo.description}}</p></div></li></ul></div></div></section>';