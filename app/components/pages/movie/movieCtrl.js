;(function(){
    "use strict";
    angular.module("starter").controller("MovieController", function($scope, MovieService, AllMovies) {
        $scope.movies = AllMovies;
        $scope.voting = { value: 3 };
        $scope.selectMovie = function(movie) {
            $scope.movie = movie;
            MovieService.FindActorsByMovieId(movie.Id).then(function(actors){
                $scope.knownActors = actors;
            });
            
        };
        $scope.vote = function() {
            MovieService.rateMovie($scope.movie, $scope.voting.value).then(function(msg){
                if (msg.status === "success"){
                    $scope.movie.Rating = msg.new_rating;
                    $scope.movie.Raters = msg.raters;
                }
            }, function(reason){
                
            });
        };
    });
})();