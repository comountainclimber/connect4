angular.module('Connect4App', ['ngRoute'])

angular.module('Connect4App')
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl : '/html/home.html',
				controller : 'HomePageController'
			})
			.when('/:roomNumber', {
				templateUrl : '/html/thegame.html',
				controller : 'GameController'
			})


	}])

angular.module('Connect4App')
	.controller('HomePageController', ['$scope', '$http','$routeParams', '$location', '$rootScope', function($scope, $http, $routeParams, $location, $rootScope){
	var socket = io()

	

	$scope.submitForm = function() {
	
		socket.emit('gameInit', $scope.form)
		$location.url('/' + $scope.form.room)	
			
	}

	
}])


angular.module('Connect4App')
	.controller('GameController', ['$scope', '$http','$routeParams', '$location', '$rootScope', function($scope, $http, $routeParams, $location, $rootScope){
	var socket = io()
	$scope.room = $routeParams.roomNumber
	$scope.gameBoard = []
	$scope.currentPlayers = []


	var populateGameBoard = function(){
		for(var i =0;i<42;i++){
 		$scope.gameBoard.push({holeNumber:i})
		}
	}
	populateGameBoard()
 

	socket.on('gameInfo', function(data){
		$scope.currentPlayers.push(data.players)

	})

}])