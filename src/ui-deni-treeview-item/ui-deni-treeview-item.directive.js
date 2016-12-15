(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .directive('uiDeniTreeviewItem', uiDeniTreeviewItem);

  uiDeniTreeviewItem.$inject = ['$templateCache'];

  function uiDeniTreeviewItem($templateCache) {

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
        _setDefaultValues(scope, element);

        scope.$watch('ctrl.item.expanded', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            scope.$emit('onexpand', scope.ctrl.item);
          }
        });
      }
    };

  }

  function _setDefaultValues(scope, element) {
    scope.ctrl.item.ctrl = scope.ctrl;
    scope.ctrl.item.expanded = scope.ctrl.item.expanded || false;
    scope.ctrl.hasChild = (scope.ctrl.item.children || scope.$parent.ctrl.lazyLoad) ? true : false;
    scope.ctrl.root = scope.ctrl.item.root || false;

    let leftPos = 5 + scope.ctrl.level * scope.$parent.ctrl.marginItems;
    if (!scope.$parent.ctrl.showRoot) {
      leftPos -= scope.$parent.ctrl.marginItems;
    }
    element.css('padding-left', leftPos + 'px');
  }

})();
