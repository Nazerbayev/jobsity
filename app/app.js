;(function () {
    "use strict";
    angular.module('starter', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('home', {
                url: '/',
                templateUrl: 'components/pages/home/home.html',
                controller: "HomeController",
                resolve: {
                    AllMovies: function(MovieService) {
                        return MovieService.recentMovies();
                    }
                }
            });
            $stateProvider.state('actor', {
                abstract: true,
                url: '/actor',
                template: '<ui-view></ui-view>'
            });
            $stateProvider.state('movie', {
                abstract: true,
                url: '/movie',
                template: '<ui-view></ui-view>'
            });
            $stateProvider.state('actor.list', {
                url: '/list',
                templateUrl: 'components/pages/actor/actor.html',
                controller: "ActorController",
                resolve: {
                    AllActors: ["MovieService", function(MovieService) {
                        return MovieService.ListAllActors();
                    }]
                }
            });
            $stateProvider.state('movie.list', {
                url: '/list',
                templateUrl: 'components/pages/movie/movie.html',
                controller: "MovieController",
                resolve: {
                    AllMovies: ["MovieService", function(MovieService) {
                        return MovieService.ListAllMovies();
                    }]
                }
            });
            $stateProvider.state('actor.new', {
                url: '/new',
                templateUrl: 'components/pages/actor/actorEdit.html',
                controller: "ActorEditController",
                resolve: {
                    Actor: ["MovieService", function(MovieService){
                        return MovieService.FindActorById(0);
                    }],
                    Movies: ["MovieService", function(MovieService){
                        return MovieService.ListAllMovies();
                    }],
                    StarredMovies: ["MovieService", function(MovieService){
                        return MovieService.FindMoviesByActorId(0);
                    }]
                }
            });
            $stateProvider.state('actor.edit', {
                url: '/edit/:id',
                templateUrl: 'components/pages/actor/actorEdit.html',
                controller: "ActorEditController",
                resolve: {
                    Actor: ["$stateParams", "MovieService", function($stateParams, MovieService){
                        return MovieService.FindActorById($stateParams.id);
                    }],
                    Movies: ["MovieService", function(MovieService){
                        return MovieService.ListAllMovies();
                    }],
                    StarredMovies: ["$stateParams", "MovieService", function($stateParams, MovieService){
                        return MovieService.FindMoviesByActorId($stateParams.id);
                    }]
                }
            });
            $stateProvider.state('movie.new', {
                url: "/new",
                templateUrl: 'components/pages/movie/movieEdit.html',
                controller: "MovieEditController",
                resolve: {
                    Movie: ["MovieService", function(MovieService){
                        return MovieService.FindMovieById(0);
                    }],
                    Actors: ["MovieService", function(MovieService){
                        return MovieService.ListAllActors();
                    }],
                    MovieActors: ["MovieService", function(MovieService){
                        return MovieService.FindActorsByMovieId(0);
                    }]
                }
            });
            $stateProvider.state('movie.edit', {
                url: '/edit/:id',
                templateUrl: 'components/pages/movie/movieEdit.html',
                controller: "MovieEditController",
                resolve: {
                    Movie: ["$stateParams", "MovieService", function($stateParams, MovieService){
                        return MovieService.FindMovieById($stateParams.id);
                    }],
                    Actors: ["MovieService", function(MovieService){
                        return MovieService.ListAllActors();
                    }],
                    MovieActors: ["$stateParams", "MovieService", function($stateParams, MovieService){
                        return MovieService.FindActorsByMovieId($stateParams.id);
                    }]
                }
            });
    }]);
})();
