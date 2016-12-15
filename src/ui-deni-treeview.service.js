(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .service('uiDeniTreeviewService', uiDeniTreeviewService);

  uiDeniTreeviewService.$inject = ['uiDeniTreeviewEnum', 'uiDeniTreeviewApiService'];

  function uiDeniTreeviewService(uiDeniTreeviewEnum, uiDeniTreeviewApiService) {

    let vm = this;

    //
    // return only the last level
    // items array optional param
    //
    vm.getCheckedItems = function(scope, items) {
      let checkedItems = [];
      let itemsToAnalyze = items || scope.ctrl.items;

      angular.forEach(itemsToAnalyze, function(item) {

        if (item.type === 'VD') {
          if (item.state === uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED) {
            checkedItems.push(item.id);
          }
        } else {
          //when is checked but not expanded must see who are its children
          if (angular.isDefined(item.state) && item.state !== uiDeniTreeviewEnum.CHECKBOX_STATE.UNCHECKED) {

            let children = item.children;
            if (!item.expanded && item.state === uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED) {
              let itemCopy = angular.copy(item);
              scope.$emit('onexpanditem', itemCopy);
              children = itemCopy.children;
              _refreshCheckboxStateChildren(itemCopy);
            }

            if (children) {
              let selecteds = vm.getCheckedItems(scope, children);
              checkedItems = checkedItems.concat(selecteds);
            }
          }
        }
      });

      return checkedItems;
    };

    vm.getSelectedItem = function(scope) {
      return scope.ctrl.selectedItem;
    };

    //
    function _refreshCheckboxStateChildren(item) {
      if (item.children) {
        angular.forEach(item.children, function(child) {
          child.state = item.state;
          _refreshCheckboxStateChildren(child);
        });
      }
    }

  }

})();
