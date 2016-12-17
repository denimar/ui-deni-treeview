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
    $templateCache.put('ui-deni-treeview-item.view.html', '<div class="ui-deni-treeview-item-container ng-hide"  ng-show="!ctrl.item.hidden" ng-class="ctrl.getNgClassItem($parent.ctrl, ctrl)" ng-mousedown="ctrl.itemMousedown($parent.ctrl, this, ctrl.item)">\n' + '  <div class="expand-button ng-hide" ng-click="ctrl.expandButtonClick(this, ctrl.item)" ng-class="ctrl.getNgClassExpandButton($parent.ctrl, ctrl)" ng-show="!ctrl.item.isLeaf"></div>\n' + '  <div class="checkbox ng-hide" ng-click="ctrl.checkboxClick(this, ctrl.item)" ng-class="ctrl.getNgClassCheckbox($parent.ctrl, ctrl)" ng-show="$parent.ctrl.checkbox">\n' + '    <div class="undetermined ng-hide" ng-show="ctrl.isUndetermined(ctrl.item)"></div>\n' + '  </div>\n' + '  <div class="icon-and-text" ng-class="{\'select-row\': $parent.ctrl.selectRow, \'selected\' : (!$parent.ctrl.selectRow && ctrl.isSelected($parent.ctrl, ctrl.item))}">\n' + '    <div class="icon ng-hide" ng-class="ctrl.getNgClassIcon(ctrl, ctrl.item)" ng-dblclick="ctrl.itemDoubleClick($parent.ctrl, this, ctrl.item)" ng-show="$parent.ctrl.showIcon"></div>\n' + '    <div class="text" ng-dblclick="ctrl.itemDoubleClick($parent.ctrl, this, ctrl.item)">\n' + '      <span class="text-inner unselectable" ng-bind="ctrl.item.text" unselectable="on"></span>\n' + '    </div>\n' + '  </div\n' + '</div>');
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
        },

        //
        // item is a optional param that when it is set load will return just the children items.
        //
        load: function load(item) {
          return uiDeniTreeviewService.load(scope, item);
        },

        //
        // item is a optional param that when it is set load will return just the children items.
        //
        loadData: function loadData(data, item) {
          return uiDeniTreeviewService.loadData(scope, data, item);
        },

        //
        reload: function reload() {
          return uiDeniTreeviewService.reload(scope);
        }

      };
    }

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
        //event.stopPropagation();
        //scope.$emit('onload', item, callbackFunction);
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

  uiDeniTreeviewService.$inject = ['$http', '$q', 'uiDeniTreeviewEnum', 'uiDeniTreeviewApiService', 'uiDeniTreeviewConstant'];

  function uiDeniTreeviewService($http, $q, uiDeniTreeviewEnum, uiDeniTreeviewApiService, uiDeniTreeviewConstant) {

    var vm = this;

    vm.setDefaultValues = function (controller, element, uiDeniTreeviewConstant) {

      //theme
      controller.theme = controller.theme || 'classic';
      element.addClass(controller.theme);

      controller.showIcon = controller.showIcon || true;
      controller.showRoot = controller.showRoot || false;
      controller.selectRow = controller.selectRow || false;
      controller.lazyLoad = controller.lazyLoad || false;
      controller.marginItems = controller.marginItems || 30;

      //should it load the data automatically?
      controller.autoLoad = controller.autoLoad || true;

      if (controller.url || controller.lazyLoad) {
        //
        if (controller.autoLoad) {
          vm.load(controller.scope);
        }
      } else {
        if (controller.items) {
          _loadData(controller, uiDeniTreeviewConstant, controller.items);
        }
      }
    };

    //
    // item is a optional param that when it is set load will return just the children items.
    //
    vm.load = function (scope, item) {
      var deferred = $q.defer();

      var config = {};

      var currentItem = item || scope.ctrl.rootItem;
      var itemToLoad = angular.copy(currentItem);

      //
      if (scope.ctrl.url) {
        var dataConfig = {
          params: {
            lazyLoad: scope.ctrl.lazyLoad,
            item: itemToLoad
          }
        };

        $http.get(scope.ctrl.url, dataConfig).then(function (response) {
          _loadData(scope.ctrl, uiDeniTreeviewConstant, response.data, item);
          deferred.resolve(response.data);
        }, function (response) {
          var msg = 'Error loading data.';
          throw new Error(msg);
        });

        //
      } else if (scope.ctrl.lazyLoad) {
        (function () {
          delete currentItem['children'];
          var watchItems = scope.$watch('ctrl.rootItem', function (newValue, oldValue) {
            if (newValue !== oldValue) {
              deferred.resolve(currentItem.children);
              watchItems(); //unregister the watch
            }
          }, true);
          scope.$emit('onload', currentItem);

          //
        })();
      } else {
        var msg = 'To use load function you must define lazyLoad:true or a valid url.';
        console.error(msg);
        deferred.reject(msg);
      }

      return deferred.promise;
    };

    vm.loadData = function (scope, data, item) {
      _loadData(scope.ctrl, uiDeniTreeviewConstant, data, item);
    };

    //
    vm.reload = function (scope) {
      vm.load(scope);
    };

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

    //
    vm.getSelectedItem = function (scope) {
      return scope.ctrl.selectedItem;
    };

    //
    // item is a optional param that when it is set data must be an array (children)
    //
    function _loadData(controller, uiDeniTreeviewConstant, data, item) {
      //
      var dataToLoad = data || [];

      //
      if (angular.isDefined(item)) {
        //
        if (angular.isArray(dataToLoad)) {
          item.children = dataToLoad;
        } else {
          throw new Error('When item param is set the data must be an array.');
        }
      } else {
        //
        if (angular.isArray(dataToLoad)) {
          controller.rootItem.children = dataToLoad;
          //
        } else {
          controller.rootItem = angular.merge(uiDeniTreeviewConstant.ROOT_ITEM, dataToLoad);
        }
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
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('uiDeniTreeview').service('uiDeniTreeviewItemService', uiDeniTreeviewItemService);

  uiDeniTreeviewItemService.$inject = ['uiDeniTreeviewEnum'];

  //
  function uiDeniTreeviewItemService(uiDeniTreeviewEnum) {

    var vm = this;

    //
    vm.setDefaultValues = function (scope, element) {
      scope.ctrl.item.expanded = scope.ctrl.item.expanded || false;
      scope.ctrl.hasChild = scope.ctrl.item.children || scope.$parent.ctrl.lazyLoad ? true : false;
      scope.ctrl.root = scope.ctrl.item.root || false;

      var leftPos = 5 + scope.ctrl.level * scope.$parent.ctrl.marginItems;
      if (!scope.$parent.ctrl.showRoot) {
        leftPos -= scope.$parent.ctrl.marginItems;
      }
      element.css('padding-left', leftPos + 'px');
    };

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

    //
    vm.getNgClassExpandButton = function (parentController, controller) {
      var ngClass = [];

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
    vm.getNgClassCheckbox = function (parentController, controller) {
      var ngClass = [];

      if (controller.isChecked(controller.item)) {
        ngClass.push('checked');
      }

      if (controller.isSelected(parentController, controller.item)) {
        ngClass.push('selected');
      }

      return ngClass;
    };

    //
    vm.getNgClassIcon = function (controller, item) {
      var ngClass = [];

      if (item.isLeaf) {
        ngClass.push('isleaf');
      }

      if (item.expanded) {
        ngClass.push('expanded');
      }

      return ngClass;
    };

    //
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
              scope.$parent.ctrl.element.api.load(item).then(function (dataLoaded) {
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

    //
    vm.checkboxClick = function (scope, item) {
      _setCheckboxStateByClicking(item);
      _refreshCheckboxStateChildren(item);
      _refreshCheckboxStateParents(scope.ctrl);

      //
      scope.$emit('oncheck', item);
    };

    //
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
    this.scope = $scope;
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
    this.getNgClassExpandButton = uiDeniTreeviewItemService.getNgClassExpandButton;
    this.getNgClassCheckbox = uiDeniTreeviewItemService.getNgClassCheckbox;
    this.getNgClassIcon = uiDeniTreeviewItemService.getNgClassIcon;
    this.expandButtonClick = uiDeniTreeviewItemService.expandButtonClick;
    this.checkboxClick = uiDeniTreeviewItemService.checkboxClick;
    this.itemMousedown = uiDeniTreeviewItemService.itemMousedown;
    this.itemDoubleClick = uiDeniTreeviewItemService.itemDoubleClick;
    this.isSelected = uiDeniTreeviewItemService.isSelected;
    this.isChecked = uiDeniTreeviewItemService.isChecked;
    this.isUndetermined = uiDeniTreeviewItemService.isUndetermined;
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
        url: '=?',
        autoLoad: '=?',
        checkbox: '=?',
        items: '=?',
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
        uiDeniTreeviewService.setDefaultValues(scope.ctrl, element, uiDeniTreeviewConstant);

        //
        uiDeniTreeviewApiService.implementApi(scope, scope.ctrl.element, uiDeniTreeviewService);

        //
        uiDeniTreeviewEventsService.implementEvents(scope);
      }
    };
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('uiDeniTreeview').directive('uiDeniTreeviewItem', uiDeniTreeviewItem);

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
      link: function link(scope, element, attr) {

        //
        uiDeniTreeviewItemService.setDefaultValues(scope, element);

        //
        scope.$watch('ctrl.item.expanded', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            scope.$emit('onexpand', scope.ctrl.item);
          }
        });
      }
    };
  }
})();