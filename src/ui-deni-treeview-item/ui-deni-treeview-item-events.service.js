(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .service('uiDeniTreeviewItemEventsService', uiDeniTreeviewItemEventsService);

  uiDeniTreeviewItemEventsService.$inject = ['$timeout', 'uiDeniTreeviewItemService', 'uiDeniTreeviewEnum'];

  function uiDeniTreeviewItemEventsService($timeout, uiDeniTreeviewItemService, uiDeniTreeviewEnum) {

    let vm = this;

    //
    vm.implementEvents = function(scope) {

      //
      scope.$on('scrollintoview', function (event, itemToView) {
        //scrollIntoView
        if (scope.ctrl.item === itemToView) {
          $timeout(function() {
            scope.ctrl.element.get(0).scrollIntoView(false);
          });

        }
  		});

      //
      scope.$on('checkitem', function (event, itemToCheck) {
        if ((scope.ctrl.item.isLeaf) && (scope.ctrl.item === itemToCheck)) {
          scope.ctrl.item.state = uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED;
          uiDeniTreeviewItemService.refreshCheckboxStateParents(scope.ctrl);
        }
      });

      //
      scope.$on('checkall', function (event) {
        if (scope.ctrl.item.isLeaf) {
          scope.ctrl.item.state = uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED;
          uiDeniTreeviewItemService.refreshCheckboxStateParents(scope.ctrl);
        }
  		});

      scope.$on('uncheckitem', function (event, itemToUncheck) {
        if ((scope.ctrl.item.isLeaf) && (scope.ctrl.item === itemToUncheck)) {
          scope.ctrl.item.state = uiDeniTreeviewEnum.CHECKBOX_STATE.UNCHECKED;
          uiDeniTreeviewItemService.refreshCheckboxStateParents(scope.ctrl);
        }
      });

      //
      scope.$on('uncheckall', function (event) {
        if (scope.ctrl.item.isLeaf) {
          scope.ctrl.item.state = uiDeniTreeviewEnum.CHECKBOX_STATE.UNCHECKED;
          uiDeniTreeviewItemService.refreshCheckboxStateParents(scope.ctrl);
        }
  		});

      //
      scope.$on('invertcheckitem', function (event, itemToInvert) {
        if ((scope.ctrl.item.isLeaf) && (scope.ctrl.item === itemToInvert)) {
          uiDeniTreeviewItemService.invertStateItem(scope.ctrl.item);
          uiDeniTreeviewItemService.refreshCheckboxStateParents(scope.ctrl);
        }
      });

      //
      scope.$on('invertallchecks', function (event) {
        if (scope.ctrl.item.isLeaf) {
          uiDeniTreeviewItemService.invertStateItem(scope.ctrl.item);
          uiDeniTreeviewItemService.refreshCheckboxStateParents(scope.ctrl);
        }
  		});

    }

  }

})();
