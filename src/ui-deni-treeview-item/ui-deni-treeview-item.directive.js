(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .directive('uiDeniTreeviewItem', uiDeniTreeviewItem);

  uiDeniTreeviewItem.$inject = ['$templateCache', 'uiDeniTreeviewItemService'];

  function uiDeniTreeviewItem($templateCache, uiDeniTreeviewItemService) {

    return {
      restrict: 'E',
      scope: {},
      bindToController: {
        item: '=',
        level: '=',
        parent: '=?',
        theme: '@?'
      },
      controller: 'uiDeniTreeviewItemController',
      controllerAs: 'ctrl',
      replace: true,
      template: $templateCache.get('ui-deni-treeview-item.view.html'),
      link: function(scope, element, attr) {

        //
        uiDeniTreeviewItemService.setDefaultValues(scope, element);

        //
        scope.$watch('ctrl.item.expanded', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            scope.$emit('onexpand', scope.ctrl.item);
          }
        });
      }
    };

  }

})();
