(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .service('uiDeniTreeviewItemService', uiDeniTreeviewItemService);

  uiDeniTreeviewItemService.$inject = ['uiDeniTreeviewEnum'];

  //
  function uiDeniTreeviewItemService(uiDeniTreeviewEnum) {

    let vm = this;

    //
    vm.setDefaultValues = function(scope, element) {
      scope.ctrl.item.expanded = scope.ctrl.item.expanded || false;
      scope.ctrl.hasChild = (scope.ctrl.item.children || scope.$parent.ctrl.lazyLoad) ? true : false;
      scope.ctrl.root = scope.ctrl.item.root || false;
      scope.ctrl.item.parent = scope.ctrl.parent.id;

      let leftPos = 5 + scope.ctrl.level * scope.$parent.ctrl.marginItems;
      if (!scope.$parent.ctrl.showRoot) {
        leftPos -= scope.$parent.ctrl.marginItems;
      }
      element.css('padding-left', leftPos + 'px');
    };

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

    //
    vm.getNgClassExpandButton = function(parentController, controller) {
      let ngClass = [];

      if (controller.hasChild) {
        ngClass.push('hasChild');
      }

      if (controller.item.expanded) {
        ngClass.push('expanded');
      } else {
        ngClass.push('colapsed');
      }

      if (controller.loading) {
        ngClass.push('loading');
      }

      if (controller.isSelected(parentController, controller.item)) {
        ngClass.push('selected');
      }

      return ngClass;
    };

    //
    vm.getNgClassCheckbox = function(parentController, controller) {
      let ngClass = [];

      if (controller.isChecked(controller.item)) {
        ngClass.push('checked');
      }

      if (controller.isSelected(parentController, controller.item)) {
        ngClass.push('selected');
      }

      return ngClass;
    };

    //
    vm.getNgClassIcon = function(controller, item) {
      let ngClass = [];

      if (item.isLeaf) {
        ngClass.push('isleaf');
      }

      if (item.expanded) {
        ngClass.push('expanded');
      }

      return ngClass;
    };

    //
    vm.expandButtonClick = function(scope, item) {
      item.expanded = !item.expanded;
    };

    //
    vm.checkboxClick = function(scope, item) {
      if (vm.isChecked(item)) {
        vm.uncheckNode(scope, item);
      } else {
        vm.checkNode(scope, item);
      }

      //
      scope.$emit('oncheck', item);
    };

    //
    vm.checkNode = function(scope, item) {
      item.state = uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED;
      _refreshCheckboxStateChildren(item);
      vm.refreshCheckboxStateParents(scope.ctrl);
    };

    //
    vm.uncheckNode = function(scope, item) {
      item.state = uiDeniTreeviewEnum.CHECKBOX_STATE.UNCHECKED;
      _refreshCheckboxStateChildren(item);
      vm.refreshCheckboxStateParents(scope.ctrl);
    };

    //
    vm.invertCheckNode = function(scope, item) {
      vm.invertStateItem(item);
      _refreshCheckboxStateChildren(item);
      vm.refreshCheckboxStateParents(scope.ctrl);
    };


    //
    vm.itemMousedown = function(treeviewCtrl, scope, item) {
      let target = angular.element(event.target);
      let finishRoutine = function() {
        treeviewCtrl.selectedItem = item;
        scope.$emit('onselect', item);
      };

      if (treeviewCtrl.selectRow) {
        finishRoutine();
      } else {
        if ((target.is('.icon-and-text')) || (target.is('.icon')) || (target.is('.text-inner')) || (target.is('.text'))) {
          finishRoutine();
        }
      }
    };

    vm.itemDoubleClick = function(treeview, scope, item) {
      vm.expandButtonClick(scope, item);
    };

    vm.isSelected = function(treeviewController, item) {
      return angular.equals(treeviewController.selectedItem, item);
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
    vm.expandItem = function(scope, item) {
      //let expanded = !item.expanded;

      if (item.expanded) {
        scope.ctrl.loading = true;

        let finishExpandRoutine = function() {
          if (item.children) {
            //item.expanded = expanded;
            _setChildrenVisibility(item.children, true, true);
          }
          scope.ctrl.loading = false;
        };

        if (scope.$parent.ctrl.lazyLoad) {

          if (angular.isDefined(item.children)) {
            finishExpandRoutine();
          } else {
            scope.$parent.ctrl.element.api.load(item).then(function(dataLoaded) {
              finishExpandRoutine();
            });
          }
        } else {
          finishExpandRoutine();
        }
      } else {
        //item.expanded = expanded;
        _setChildrenVisibility(item.children, false, true);
      }
    };

    //
    vm.refreshCheckboxStateParents = function(controller) {
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

        vm.refreshCheckboxStateParents(controller.parent.ctrl);
      }
    }

    //
    vm.invertStateItem = function(item) {
      if (vm.isChecked(item)) {
        item.state = uiDeniTreeviewEnum.CHECKBOX_STATE.UNCHECKED;
      } else {
        item.state = uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED;
      }
    }

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
    function _refreshCheckboxStateChildren(item) {
      if (item.children) {
        angular.forEach(item.children, function(child) {
          child.state = item.state;
          _refreshCheckboxStateChildren(child);
        });
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
