;(function(){
    "use strict";
    angular.module("starter").controller("ActorEditController", ["$scope", "$state", "$window", "MovieService", "Actor", "Movies", "StarredMovies", function($scope, $state, $window, MovieService, Actor, Movies, StarredMovies) {
        $scope.actor = Actor;
        $scope.today = new Date();
        $scope.selectedMovies = StarredMovies;
        $scope.movies = Movies;
        
        $scope.deleteProfile = function() {
            if ($window.confirm("Do you really want to delete this Profile?")) {
                MovieService.DeleteActorById($scope.actor.Id).then(function(msg) {
                    $state.go("actor.list");
                }, function(reason){
                    $scope.status_message = "Actor could not be deleted, please try later...";
                    $scope.success = false;
                });
                
            }
        }
        
        $scope.save = function() {
            MovieService.AddOrUpdateActor($scope.actor, $scope.selectedMovies).then(function(status){
                $scope.status_message = "Actor was saved successfully!";
                $scope.success = true;
            }, function(reason){
                $scope.status_message = "Actor could not be saved, please try later...";
                $scope.success = false;
            });
        }
        $scope.reset = function() {
            $scope.actor.Name = "";
            $scope.actor.LastName = ""
            $scope.actor.BirthDate = new Date(1900,0,1);
            $scope.actor.Gender = "F";
            $scope.actor.ImageUrl = "http://placehold.it/200x200"
        }
        $scope.selectMovie = function(movie) {
            var index = -1;
            for (var i = $scope.selectedMovies.length; i--;) {
                if ($scope.selectedMovies[i].Id == movie.Id) {
                    index = i;
                }
            }
            /* si no esta lo agregamos, si ya esta lo quitamos */
            if (index === -1) {
                $scope.selectedMovies.push(movie);
            }
        }
        $scope.removeMovie = function(movie) {
            var index = -1;
            for (var ii = $scope.selectedMovies.length; ii--;) {
                if ($scope.selectedMovies[ii].Id == movie.Id) {
                    index = ii;
                }
            }
            if (index !== -1) {
                $scope.selectedMovies.splice(index, 1);
            }
        }


    }]);
})();