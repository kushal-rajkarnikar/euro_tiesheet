// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function(){ 

  var app = angular.module('euro', ['ion-sticky']);

  app.factory('MatchesFactory', ['$http','$rootScope','$stateParams', function($http, $rootScope, $stateParams){
  return {
    all: function () {
      return $http.get('matches.json', { params: { match_id: $rootScope.session } })
    }
    // },
    // get: function () {
    //   return $http.get('https://friends.json/getOne', { params: { user_id: $rootScope.session, chat_id: $stateParams.idchat } })
    // },
    // add: function (id) {
    //   return $http.get('https://friends.json/new', { params: {idfriends:id}})
    // }
  };
  }]);



  app.controller('EuroCtrl', function($http, $scope){

    $scope.matches = [];

    $http.get('matches.json')
    .success(function(response){

      angular.forEach(response.matches, function(index){

       $scope.matches.push(index);

     });

      
        //console.log(response.matches.day);

    //    $scope.matches.push(response.matches);
  });

  });

   app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('list',{
      url: '/list',
      templateUrl: 'templates/list.html'
    });

    $stateProvider.state('details',{
      url: '/details/:matchId',
      templateUrl: 'templates/details.html'
    });

    $urlRouterProvider.otherwise('/list');

  });


app.controller('matchDetails', function($scope, $state, MatchesFactory){
  $scope.matchId = $state.params.matchId;     

  MatchesFactory.all().success(function (response) {
    // $scope.matches = response;
    angular.forEach(response.matches, function(index){

       $scope.matches.push(index);

     });
  })
});

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  })

}())