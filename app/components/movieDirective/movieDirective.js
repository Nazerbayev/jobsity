;(function () {
    angular.module('starter').directive('movie', [function () {
        return {
            restrict: 'E',
            templateUrl: 'components/movieDirective/movieDirective.html'
        };
    }]);
})();
