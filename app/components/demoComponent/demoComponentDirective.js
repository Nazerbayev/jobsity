;(function () {
    angular.module('starter')

    .directive('demoComponent', [function () {
        return {
            restrict: 'A',
            templateUrl: 'components/demoComponent/demoComponent.html'
        };
    }]);
})();
