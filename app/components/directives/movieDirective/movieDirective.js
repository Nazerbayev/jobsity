;(function () {
    angular.module('starter').directive('movie', [function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directives/movieDirective/movieDirective.html'
        };
    }]);
})();
