(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .service('uiDeniTreeviewItemService', uiDeniTreeviewItemService);

  uiDeniTreeviewItemService.$inject = ['uiDeniTreeviewEnum'];

  function uiDeniTreeviewItemService(uiDeniTreeviewEnum) {

    let vm = this;

    vm.getNgClassItem = function(parentController, controller) {
      let ngClass = [controller.theme];

      if (parentController.selectRow) {
        ngClass.push('select-row');
        if (controller.isSelected(parentController, controller.item)) {
          ngClass.push('selected');
        }
      }

      return ngClass;
    };

    vm.expandButtonClick = function(scope, item) {
      let expanded = !item.expanded;

      if (expanded) {
        scope.ctrl.loading = true;

        let finishExpandRoutine = function() {
          if (item.children) {
            item.expanded = expanded;
            _setChildrenVisibility(item.children, true, true);
          }
          scope.ctrl.loading = false;
        };

        if (scope.$parent.ctrl.lazyLoad) {
          if (angular.isDefined(item.children)) {
            finishExpandRoutine();
          } else {
            scope.$emit('onload', item, function(children) {
              item.children = children;
              finishExpandRoutine();
            });
          }
        } else {
          finishExpandRoutine();
        }
      } else {
        item.expanded = expanded;
        _setChildrenVisibility(item.children, false, true);
      }
    };

    vm.getClassIcon = function(controller, item) {
      if (item.isLeaf) {
        return 'isleaf';
      } else if (item.expanded) {
        return 'expanded';
      }
    };

    vm.checkboxClick = function(scope, item) {
      _setCheckboxStateByClicking(item);
      _refreshCheckboxStateChildren(item);
      _refreshCheckboxStateParents(scope.ctrl);

      //
      scope.$emit('oncheck', item);
    };

    vm.itemMousedown = function(treeviewCtrl, scope, item) {
      let target = angular.element(event.target);
      let finishRoutine = function() {
        treeviewCtrl.selectedItem = item;
        scope.$emit('onselect', item);
      };

      if (treeviewCtrl.selectRow) {
        finishRoutine();
      } else {
        if ((target.is('.icon')) || (target.is('.text-inner')) || (target.is('.text'))) {
          finishRoutine();
        }
      }
    };

    vm.itemDoubleClick = function(treeview, scope, item) {
      vm.expandButtonClick(scope, item);
    };

    vm.isSelected = function(treeview, item) {
      return angular.equals(treeview.selectedItem, item);
    };

    vm.isChecked = function(item) {
      return item.state === uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED;
    };

    vm.isUnchecked = function(item) {
      return item.state === uiDeniTreeviewEnum.CHECKBOX_STATE.UNCHECKED;
    };

    vm.isUndetermined = function(item) {
      return item.state === uiDeniTreeviewEnum.CHECKBOX_STATE.UNDETERMINED;
    };

    //
    function _setChildrenVisibility(children, visible, recursively) {
      if (children) {
        angular.forEach(children, function(child) {
          child.hidden = !visible;
          if (recursively && child.expanded) {
            _setChildrenVisibility(child.children, visible, recursively);
          }
        });
      }
    }

    //
    function _setCheckboxStateByClicking(item) {
      if (vm.isChecked(item)) {
        item.state = uiDeniTreeviewEnum.CHECKBOX_STATE.UNCHECKED;
      } else {
        item.state = uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED;
      }
    }

    //
    function _refreshCheckboxStateChildren(item) {
      if (item.children) {
        angular.forEach(item.children, function(child) {
          child.state = item.state;
          _refreshCheckboxStateChildren(child);
        });
      }
    }

    //
    function _refreshCheckboxStateParents(controller) {
      //
      if ((controller) && (!controller.root) && (angular.isDefined(controller.parent))) {
        let siblings = _getSiblingsItems(controller);
        let allSiblingsAreChecked = _allItemsAreChecked(siblings);

        //
        if (allSiblingsAreChecked) {
          controller.parent.state = uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED;
        } else {
          let allSiblingsAreUnchecked = _allItemsAreUnchecked(siblings);
          if (allSiblingsAreUnchecked) {
            controller.parent.state = uiDeniTreeviewEnum.CHECKBOX_STATE.UNCHECKED;
          } else {
            controller.parent.state = uiDeniTreeviewEnum.CHECKBOX_STATE.UNDETERMINED;
          }
        }

        _refreshCheckboxStateParents(controller.parent.ctrl);
      }
    }

    //
    function _getSiblingsItems(controller) {
      if (angular.isDefined(controller.parent)) {
        return controller.parent.children;
      }
    }

    //
    function _allItemsAreChecked(items) {
      for (let index = 0 ; index < items.length ; index++) {
        let item = items[index];

        if (!vm.isChecked(item)) {
          return false;
        }
      }
      return true;
    }

    //
    function _allItemsAreUnchecked(items) {
      for (let index = 0 ; index < items.length ; index++) {
        let item = items[index];

        if (!vm.isUnchecked(item)) {
          return false;
        }
      }
      return true;
    }

  }

})();
