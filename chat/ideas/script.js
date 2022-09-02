var app = angular.module('chatApp', ['firebase', 'ngAnimate']);

app.controller('chatController', ['$scope', 'Message', function($scope, Message) {

  $scope.searchInput = '';
  $scope.user = "Guest";

  $scope.messages = Message.all;
  
  $scope.getTotalMessages = function() {
    return $scope.messages.length;
  };
  
  $scope.addFavorite = function(message){
    message.favorite += 1;
  };

  $scope.insert = function(message) {
    message.timestamp = Firebase.ServerValue.TIMESTAMP;
    Message.create(message);
    $scope.newmessage.text = null;
  };
}]);

app.factory('Message', ['$firebase',
  function($firebase) {
    //var ref = new Firebase('https://luminous-heat-165.firebaseio.com');
    var ref = new Firebase('https://angularslalom.firebaseio.com');
    var messages = $firebase(ref.child('messages')).$asArray();

    var Message = {
      all: messages,
      create: function(message) {
        return messages.$add(message);
      },
      get: function(messageId) {
        return $firebase(ref.child('messages').child(messageId)).$asObject();
      },
      delete: function(message) {
        return messages.$remove(message);
      }
    };

    return Message;

  }
]);