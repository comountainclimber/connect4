(function(){
	var app = angular.module('Connect4App', ['ngRoute'])

	app.config(function($routeProvider){
		 $routeProvider
            .when('/', {
                templateUrl : '/html/home.html',
                controller : 'HomePageController'
            })
            .when('/game', {
                templateUrl : '/html/thegame.html',
                controller : 'GameController'
            })

			.otherwise({ redirectTo: '/'})
	})

    app.filter('reverse', function() {
        return function(items) {
        return items.slice().reverse()
        }
    })


}())