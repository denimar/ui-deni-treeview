(function() {

  'use strict'

  angular
    .module('exampleApp',
      ['uiDeniTreeview']
    )
    .controller('exampleController', exampleController);

  exampleController.$injection = ['$scope', '$http'];

  function exampleController($scope, $http) {

    $scope.$on('onload', function (event, itemToLoad) {
      let dataConfig = {
        params: {
          lazyLoad: true, //this property say to the server do not load deeply
          item: itemToLoad
        }
      };
      $http.get('http://fakedata-denimarm.rhcloud.com/data?type=countries', dataConfig).then(function(response) {
        let element = angular.element('treeview');
        element.api.loadData(response.data, itemToLoad);
      });

    });

  };

})();
