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
		console.log($scope.form)
		socket.emit('gameInit', $scope.form)
		$rootScope.nickname = $scope.form.nickname
		$location.url('/' + $scope.form.room)			
	}
}])


angular.module('Connect4App')
	.controller('GameController', ['$scope', '$http','$routeParams', '$location', '$rootScope', function($scope, $http, $routeParams, $location, $rootScope){
	var socket = io()

	$scope.room = $routeParams.roomNumber
	$scope.gameBoard = []
	
	
//-----------creating the circle divs to populate game-----------//
	var populateGameBoard = function(){
		for(var i =0;i<42;i++){
 		$scope.gameBoard.push({holeNumber:i})
		}
	}
	populateGameBoard()
//--------------------------------------------------------------//

 	// $scope.players = [$rootScope.nickname]

	// socket.on('gameInfo', function(data){
	// 	console.log(data)
	// 	$scope.players.push(data.player)
	// 	$scope.$apply((function(){$scope.players}))
	// })


	socket.on('gameInfo', function(data){
		console.log(data)
	})



	$scope.log = function(){
		console.log($scope.players)
	}

	$scope.playerMove = function(index){
		console.log(index)
	}



}])