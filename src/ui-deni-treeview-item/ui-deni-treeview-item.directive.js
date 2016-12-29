(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .directive('uiDeniTreeviewItem', uiDeniTreeviewItem);

  uiDeniTreeviewItem.$inject = ['$templateCache', 'uiDeniTreeviewItemService', 'uiDeniTreeviewItemEventsService'];

  function uiDeniTreeviewItem($templateCache, uiDeniTreeviewItemService, uiDeniTreeviewItemEventsService) {

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
        scope.ctrl.element = angular.element(element);
        
        //
        uiDeniTreeviewItemService.setDefaultValues(scope, element);

        //
        uiDeniTreeviewItemEventsService.implementEvents(scope);

        //
        scope.$watch('ctrl.item.expanded', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            uiDeniTreeviewItemService.expandItem(scope, scope.ctrl.item);
            scope.$emit('onexpand', scope.ctrl.item);
          }
        });
      }
    };

  }

})();
