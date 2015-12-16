angular.module('Connect4App')
    .controller('HomePageController', ['$scope', '$http','$routeParams', '$location', '$rootScope', function($scope, $http, $routeParams, $location, $rootScope){
    var socket = io()

    $scope.players = []
    $scope.submitForm = function() {
        $rootScope.playerInfo = $scope.players
        $location.url('/game')
        // socket.emit('gameInit', $scope.form)
        // $rootScope.nickname = $scope.form.nickname
        // $location.url('/' + $scope.form.room)
    }
}]);

