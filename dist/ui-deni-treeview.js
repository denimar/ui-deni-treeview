'use strict';

(function () {

  'use strict';

  angular.module('uiDeniTreeview', [

    //

  ]);
})();
'use strict';

(function () {

  'use strict';

  angular.module('uiDeniTreeview').run(uiDeniTreeviewRun);

  uiDeniTreeviewRun.$inject = ['$templateCache'];

  function uiDeniTreeviewRun($templateCache) {

    //ui-deni-treeview's template
    $templateCache.put('ui-deni-treeview.view.html', '<div class="ui-deni-treeview-container" ng-class="ctrl.theme">\n' + '  <div>\n' + '    <ui-deni-treeview-item theme="{{ctrl.theme}}" item="ctrl.rootItem" level=0 ng-if="ctrl.showRoot"></ui-deni-treeview-item>\n' + '    <div ng-repeat="item1 in ctrl.rootItem.children">\n' + '      <ui-deni-treeview-item theme="{{ctrl.theme}}" parent="ctrl.rootItem" item="item1" level=1></ui-deni-treeview-item>\n' + '      <div class="ng-hide" ng-repeat="item2 in item1.children" ng-show="item1.expanded">\n' + '        <ui-deni-treeview-item theme="{{ctrl.theme}}" parent="item1" item="item2" level=2></ui-deni-treeview-item>\n' + '        <div class="ng-hide" ng-repeat="item3 in item2.children" ng-show="item2.expanded">\n' + '          <ui-deni-treeview-item theme="{{ctrl.theme}}" parent="item2" item="item3" level=3></ui-deni-treeview-item>\n' + '          <div class="ng-hide" ng-repeat="item4 in item3.children" ng-show="item3.expanded">\n' + '            <ui-deni-treeview-item theme="{{ctrl.theme}}" parent="item3" item="item4" level=4></ui-deni-treeview-item>\n' + '          </div>\n' + '        </div>\n' + '      </div>\n' + '    </div>\n' + '  </div>\n' + '</div>');
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('uiDeniTreeview').run(uiDeniTreeviewItemRun);

  uiDeniTreeviewItemRun.$inject = ['$templateCache'];

  function uiDeniTreeviewItemRun($templateCache) {

    //ui-deni-treeview-item's template
    $templateCache.put('ui-deni-treeview-item.view.html',
    // '<div class="ui-deni-treeview-item-container ng-hide"  ng-show="!ctrl.item.hidden" ng-class="{ctr.theme, \'selected\' : ($parent.ctrl.selectRow && ctrl.isSelected($parent.ctrl, ctrl.item))}" ng-mousedown="ctrl.itemMousedown($parent.ctrl, this, ctrl.item)">\n' +
    '<div class="ui-deni-treeview-item-container ng-hide"  ng-show="!ctrl.item.hidden" ng-class="ctrl.getNgClassItem($parent.ctrl, ctrl)" ng-mousedown="ctrl.itemMousedown($parent.ctrl, this, ctrl.item)">\n' + '  <div class="expand-button" ng-click="ctrl.expandButtonClick(this, ctrl.item)" ng-class="{\'hasChild\' : ctrl.hasChild, \'colapsed\' : !ctrl.item.expanded, \'expanded\' : ctrl.item.expanded, \'loading\' : ctrl.loading, \'selected\' : ctrl.isSelected($parent.ctrl, ctrl.item)}"></div>\n' + '  <div class="checkbox ng-hide" ng-click="ctrl.checkboxClick(this, ctrl.item)" ng-class="{\'checked\' : ctrl.isChecked(ctrl.item), \'selected\' : ctrl.isSelected($parent.ctrl, ctrl.item)}" ng-show="$parent.ctrl.checkbox">\n' + '    <div class="undetermined ng-hide" ng-show="ctrl.isUndetermined(ctrl.item)"></div>\n' + '  </div>\n' + '  <div class="icon-and-text" ng-class="{\'select-row\': $parent.ctrl.selectRow, \'selected\' : (!$parent.ctrl.selectRow && ctrl.isSelected($parent.ctrl, ctrl.item))}">\n' + '    <div class="icon ng-hide" ng-class="ctrl.getClassIcon(ctrl, ctrl.item)" ng-dblclick="ctrl.itemDoubleClick($parent.ctrl, this, ctrl.item)" ng-show="$parent.ctrl.showIcon"></div>\n' + '    <div class="text" ng-dblclick="ctrl.itemDoubleClick($parent.ctrl, this, ctrl.item)">\n' + '      <span class="text-inner unselectable" ng-bind="ctrl.item.text" unselectable="on"></span>\n' + '    </div>\n' + '  </div\n' + '</div>');
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('uiDeniTreeview').constant('uiDeniTreeviewEnum', {

    CHECKBOX_STATE: {
      CHECKED: 1,
      UNCHECKED: 2,
      UNDETERMINED: 3
    }

  });
})();
'use strict';

(function () {

  'use strict';

  angular.module('uiDeniTreeview').constant('uiDeniTreeviewConstant', {

    ROOT_ITEM: {
      id: -1,
      text: 'root',
      expanded: true,
      root: true
    }

  });
})();
'use strict';

(function () {

    'use strict';

    angular.module('uiDeniTreeview').service('uiDeniTreeviewApiService', uiDeniTreeviewApiService);

    function uiDeniTreeviewApiService() {

        var vm = this;

        //
        function _getApi(scope, uiDeniTreeviewService) {

            return {

                //
                getCheckedItems: function getCheckedItems() {
                    return uiDeniTreeviewService.getCheckedItems(scope);
                },

                //
                getSelectedItem: function getSelectedItem() {
                    return uiDeniTreeviewService.getSelectedItem(scope);
                }

            };
        };

        //
        vm.implementApi = function (scope, element, uiDeniTreeviewService) {

            element.each(function () {
                angular.element(this).init.prototype.api = _getApi(scope, uiDeniTreeviewService);
            });
        };
    }
})();
'use strict';

(function () {

  'use strict';

  angular.module('uiDeniTreeview').service('uiDeniTreeviewEventsService', uiDeniTreeviewEventsService);

  function uiDeniTreeviewEventsService() {

    var vm = this;

    //
    vm.implementEvents = function (scope) {

      //
      scope.$on('onexpand', function (event, item) {
        event.stopPropagation();
        scope.$emit('onexpanditem', item);
      });

      //
      scope.$on('oncheck', function (event, item) {
        event.stopPropagation();
        scope.$emit('oncheckitem', item);
      });

      //
      scope.$on('onload', function (event, item, callbackFunction) {
        event.stopPropagation();
        scope.$emit('onloadchildren', item, callbackFunction);
      });

      //
      scope.$on('onselect', function (event, item) {
        event.stopPropagation();
        scope.$emit('onselectitem', item);
      });
    };
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('uiDeniTreeview').service('uiDeniTreeviewService', uiDeniTreeviewService);

  uiDeniTreeviewService.$inject = ['uiDeniTreeviewEnum', 'uiDeniTreeviewApiService'];

  function uiDeniTreeviewService(uiDeniTreeviewEnum, uiDeniTreeviewApiService) {

    var vm = this;

    //
    // return only the last level
    // items array optional param
    //
    vm.getCheckedItems = function (scope, items) {
      var checkedItems = [];
      var itemsToAnalyze = items || scope.ctrl.items;

      angular.forEach(itemsToAnalyze, function (item) {

        if (item.type === 'VD') {
          if (item.state === uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED) {
            checkedItems.push(item.id);
          }
        } else {
          //when is checked but not expanded must see who are its children
          if (angular.isDefined(item.state) && item.state !== uiDeniTreeviewEnum.CHECKBOX_STATE.UNCHECKED) {

            var children = item.children;
            if (!item.expanded && item.state === uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED) {
              var itemCopy = angular.copy(item);
              scope.$emit('onexpanditem', itemCopy);
              children = itemCopy.children;
              _refreshCheckboxStateChildren(itemCopy);
            }

            if (children) {
              var selecteds = vm.getCheckedItems(scope, children);
              checkedItems = checkedItems.concat(selecteds);
            }
          }
        }
      });

      return checkedItems;
    };

    vm.getSelectedItem = function (scope) {
      return scope.ctrl.selectedItem;
    };

    //
    function _refreshCheckboxStateChildren(item) {
      if (item.children) {
        angular.forEach(item.children, function (child) {
          child.state = item.state;
          _refreshCheckboxStateChildren(child);
        });
      }
    }
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('uiDeniTreeview').service('uiDeniTreeviewItemService', uiDeniTreeviewItemService);

  uiDeniTreeviewItemService.$inject = ['uiDeniTreeviewEnum'];

  function uiDeniTreeviewItemService(uiDeniTreeviewEnum) {

    var vm = this;

    vm.getNgClassItem = function (parentController, controller) {
      var ngClass = [controller.theme];

      if (parentController.selectRow) {
        ngClass.push('select-row');
        if (controller.isSelected(parentController, controller.item)) {
          ngClass.push('selected');
        }
      }

      return ngClass;
    };

    vm.expandButtonClick = function (scope, item) {
      var expanded = !item.expanded;

      if (expanded) {
        (function () {
          scope.ctrl.loading = true;

          var finishExpandRoutine = function finishExpandRoutine() {
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
              scope.$emit('onload', item, function (children) {
                item.children = children;
                finishExpandRoutine();
              });
            }
          } else {
            finishExpandRoutine();
          }
        })();
      } else {
        item.expanded = expanded;
        _setChildrenVisibility(item.children, false, true);
      }
    };

    vm.getClassIcon = function (controller, item) {
      if (item.isLeaf) {
        return 'isleaf';
      } else if (item.expanded) {
        return 'expanded';
      }
    };

    vm.checkboxClick = function (scope, item) {
      _setCheckboxStateByClicking(item);
      _refreshCheckboxStateChildren(item);
      _refreshCheckboxStateParents(scope.ctrl);

      //
      scope.$emit('oncheck', item);
    };

    vm.itemMousedown = function (treeviewCtrl, scope, item) {
      var target = angular.element(event.target);
      var finishRoutine = function finishRoutine() {
        treeviewCtrl.selectedItem = item;
        scope.$emit('onselect', item);
      };

      if (treeviewCtrl.selectRow) {
        finishRoutine();
      } else {
        if (target.is('.icon') || target.is('.text-inner') || target.is('.text')) {
          finishRoutine();
        }
      }
    };

    vm.itemDoubleClick = function (treeview, scope, item) {
      vm.expandButtonClick(scope, item);
    };

    vm.isSelected = function (treeview, item) {
      return angular.equals(treeview.selectedItem, item);
    };

    vm.isChecked = function (item) {
      return item.state === uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED;
    };

    vm.isUnchecked = function (item) {
      return item.state === uiDeniTreeviewEnum.CHECKBOX_STATE.UNCHECKED;
    };

    vm.isUndetermined = function (item) {
      return item.state === uiDeniTreeviewEnum.CHECKBOX_STATE.UNDETERMINED;
    };

    //
    function _setChildrenVisibility(children, visible, recursively) {
      if (children) {
        angular.forEach(children, function (child) {
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
        angular.forEach(item.children, function (child) {
          child.state = item.state;
          _refreshCheckboxStateChildren(child);
        });
      }
    }

    //
    function _refreshCheckboxStateParents(controller) {
      //
      if (controller && !controller.root && angular.isDefined(controller.parent)) {
        var siblings = _getSiblingsItems(controller);
        var allSiblingsAreChecked = _allItemsAreChecked(siblings);

        //
        if (allSiblingsAreChecked) {
          controller.parent.state = uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED;
        } else {
          var allSiblingsAreUnchecked = _allItemsAreUnchecked(siblings);
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
      for (var index = 0; index < items.length; index++) {
        var item = items[index];

        if (!vm.isChecked(item)) {
          return false;
        }
      }
      return true;
    }

    //
    function _allItemsAreUnchecked(items) {
      for (var index = 0; index < items.length; index++) {
        var item = items[index];

        if (!vm.isUnchecked(item)) {
          return false;
        }
      }
      return true;
    }
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('uiDeniTreeview').controller('uiDeniTreeviewController', uiDeniTreeviewController);

  uiDeniTreeviewController.$inject = ['$scope', 'uiDeniTreeviewService', 'uiDeniTreeviewConstant'];

  function uiDeniTreeviewController($scope, uiDeniTreeviewService, uiDeniTreeviewConstant) {
    this.rootItem = uiDeniTreeviewConstant.ROOT_ITEM;
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('uiDeniTreeview').controller('uiDeniTreeviewItemController', uiDeniTreeviewItemController);

  uiDeniTreeviewItemController.$inject = ['uiDeniTreeviewItemService'];

  function uiDeniTreeviewItemController(uiDeniTreeviewItemService) {
    this.getNgClassItem = uiDeniTreeviewItemService.getNgClassItem;
    this.expandButtonClick = uiDeniTreeviewItemService.expandButtonClick;
    this.checkboxClick = uiDeniTreeviewItemService.checkboxClick;
    this.itemMousedown = uiDeniTreeviewItemService.itemMousedown;
    this.itemDoubleClick = uiDeniTreeviewItemService.itemDoubleClick;
    this.isSelected = uiDeniTreeviewItemService.isSelected;
    this.isChecked = uiDeniTreeviewItemService.isChecked;
    this.isUndetermined = uiDeniTreeviewItemService.isUndetermined;
    this.getClassIcon = uiDeniTreeviewItemService.getClassIcon;
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('uiDeniTreeview').directive('uiDeniTreeview', uiDeniTreeview);

  uiDeniTreeview.$inject = ['$templateCache', 'uiDeniTreeviewConstant', 'uiDeniTreeviewService', 'uiDeniTreeviewEventsService', 'uiDeniTreeviewApiService'];

  function uiDeniTreeview($templateCache, uiDeniTreeviewConstant, uiDeniTreeviewService, uiDeniTreeviewEventsService, uiDeniTreeviewApiService) {

    return {
      restrict: 'E',
      scope: {},
      bindToController: {
        checkbox: '=?',
        items: '=',
        lazyLoad: '=?',
        selectRow: '=?',
        showIcon: '=?',
        showRoot: '=?',
        theme: '=?'
      },
      controller: 'uiDeniTreeviewController',
      controllerAs: 'ctrl',
      replace: true,
      template: $templateCache.get('ui-deni-treeview.view.html'),
      link: function link(scope, element, attr) {

        //
        scope.ctrl.element = angular.element(element);

        //
        _setDefaultValues(scope.ctrl, element, uiDeniTreeviewConstant);

        //
        uiDeniTreeviewApiService.implementApi(scope, scope.ctrl.element, uiDeniTreeviewService);

        //
        uiDeniTreeviewEventsService.implementEvents(scope);
      }
    };
  }

  function _setDefaultValues(controller, element, uiDeniTreeviewConstant) {

    //theme
    controller.theme = controller.theme || 'classic';
    element.addClass(controller.theme);

    controller.showIcon = controller.showIcon || true;
    controller.showRoot = controller.showRoot || false;
    controller.selectRow = controller.selectRow || false;
    controller.lazyLoad = controller.lazyLoad || false;
    controller.marginItems = controller.marginItems || 30;
    if (angular.isArray(controller.items)) {
      controller.rootItem.children = controller.items;
    } else {
      controller.rootItem = angular.merge(uiDeniTreeviewConstant.ROOT_ITEM, controller.items);
    }
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('uiDeniTreeview').directive('uiDeniTreeviewItem', uiDeniTreeviewItem);

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
      link: function link(scope, element, attr) {
        //
        _setDefaultValues(scope, element);

        scope.$watch('ctrl.item.expanded', function (newValue, oldValue) {
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
    scope.ctrl.hasChild = scope.ctrl.item.children || scope.$parent.ctrl.lazyLoad ? true : false;
    scope.ctrl.root = scope.ctrl.item.root || false;

    var leftPos = 5 + scope.ctrl.level * scope.$parent.ctrl.marginItems;
    if (!scope.$parent.ctrl.showRoot) {
      leftPos -= scope.$parent.ctrl.marginItems;
    }
    element.css('padding-left', leftPos + 'px');
  }
})();