;(function(){
    "use strict";
    angular.module("starter").controller("ActorController", ["$scope", "MovieService", "AllActors", function($scope, MovieService, AllActors) {
        $scope.actors = AllActors;
        $scope.selectActor = function(actor) {
            $scope.actor = actor;
            MovieService.FindMoviesByActorId(actor.Id).then(function(movies){
                $scope.knownMovies = movies;
            });
        }
    }]);
})();