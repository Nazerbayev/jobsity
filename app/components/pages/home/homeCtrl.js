;(function(){
    "use strict";
    angular.module("starter").controller("HomeController", ["$scope", "MovieService", "AllMovies", function($scope, MovieService, AllMovies) {
        $scope.Movies = AllMovies;
        console.log(AllMovies);
        
    }]);
})();