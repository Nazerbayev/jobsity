;(function(){
    "use strict";
    angular.module("starter").controller("MovieEditController", ["$scope", "$state", "$window", "MovieService", "Movie", "Actors", "MovieActors", function($scope, $state, $window, MovieService, Movie, Actors, MovieActors) {
        $scope.movie = Movie;
        $scope.actors = Actors;
        $scope.selectedActors = MovieActors;

        $scope.deleteProfile = function() {
            if ($window.confirm("Do you really want to delete this Profile?")) {
                MovieService.DeleteMovieById($scope.movie.Id).then(function(msg) {
                    $state.go("movie.list");
                }, function(reason){
                    $scope.status_message = "Movie could not be deleted, please try later...";
                    $scope.success = false;
                });
                
            }
        };
        
        
        $scope.addGenre = function() {
            if ($scope.newGenre !== "") {
                $scope.movie.Genres.push($scope.newGenre);
                $scope.newGenre = "";
            }
        };
        $scope.selectActor = function(actor) {
            var index = -1;
            for (var i = $scope.selectedActors.length; i--;) {
                if ($scope.selectedActors[i].Id == actor.Id) {
                    index = i;
                }
            }
            /* si no esta lo agregamos, si ya esta lo quitamos */
            if (index === -1) {
                $scope.selectedActors.push(actor);
            }
        };
        $scope.removeActor = function(actor) {
            var index = -1;
            for (var ii = $scope.selectedActors.length; ii--;) {
                if ($scope.selectedActors[ii].Id == actor.Id) {
                    index = ii;
                }
            }
            if (index !== -1) {
                $scope.selectedActors.splice(index, 1);
            }
        };
        $scope.removeGenre = function(index) {
            $scope.movie.Genres.splice(index,1);
        };
        $scope.save = function() {
            MovieService.AddOrUpdateMovie($scope.movie, $scope.selectedActors).then(function(status){
                $scope.status_message = "Movie was saved successfully!";
                $scope.success = true;
                
            }, function(reason){
                $scope.status_message = "Movie could not be saved, please try later...";
                $scope.success = true;
            });
        };
    }]);
})();