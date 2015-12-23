;(function () {
    angular.module('starter').directive('movieThumbnail', [function () {
        return {
            restrict: 'E',
            templateUrl: 'components/movieDirective/movieThumbnail.html'
        };
    }]);
})();
