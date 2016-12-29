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
      /*
      scope.$on('onload', function (event, item, data) {
        //event.stopPropagation();
        //scope.$emit('onload', item, callbackFunction);
      });
      */

      //
      scope.$on('onselect', function (event, item) {
        event.stopPropagation();
        scope.$emit('onselectitem', item);
      });
    };
  }
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {

  'use strict';

  angular.module('uiDeniTreeview').service('uiDeniTreeviewService', uiDeniTreeviewService);

  uiDeniTreeviewService.$inject = ['$http', '$q', '$timeout', 'uiDeniTreeviewEnum', 'uiDeniTreeviewApiService', 'uiDeniTreeviewConstant'];

  function uiDeniTreeviewService($http, $q, $timeout, uiDeniTreeviewEnum, uiDeniTreeviewApiService, uiDeniTreeviewConstant) {

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
          $timeout(function () {
            scope.$emit('onload', response.data);
          });
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
      return vm.load(scope);
    };

    //
    // return only the last level
    // items array optional param
    //
    vm.getCheckedItems = function (scope, children) {
      var checkedItems = [];
      var itemsToAnalyze = children || scope.ctrl.rootItem.children;

      angular.forEach(itemsToAnalyze, function (item) {

        if (item.isLeaf) {
          if (item.state === uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED) {
            checkedItems.push(item);
          }
        } else {
          //when is checked but not expanded must see who are its children
          if (angular.isDefined(item.state) && item.state !== uiDeniTreeviewEnum.CHECKBOX_STATE.UNCHECKED) {

            var itemChildren = item.children;
            if (!item.expanded && item.state === uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED) {
              var itemCopy = angular.copy(item);
              scope.$emit('onexpanditem', itemCopy);
              itemChildren = itemCopy.children;
              _refreshCheckboxStateChildren(itemCopy);
            }

            if (itemChildren) {
              var checkeds = vm.getCheckedItems(scope, itemChildren);
              checkedItems = checkedItems.concat(checkeds);
            }
          }
        }
      });

      return checkedItems;
    };

    //
    // itemToCheck can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.checkItem(357) //357 is a id value or
    //  treeviewEl.api.checkItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
    //
    vm.checkItem = function (scope, itemToCheck) {
      var item = vm.findItem(scope, itemToCheck);
      //
      scope.$broadcast('checkitem', item);
    };

    //
    vm.checkAll = function (scope, children) {
      scope.$broadcast('checkall');
    };

    //
    // itemToUncheck can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.uncheckItem(357) //357 is a id value or
    //  treeviewEl.api.uncheckItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
    //
    vm.uncheckItem = function (scope, itemToUncheck) {
      //
    };

    //
    vm.uncheckAll = function (scope, children) {
      scope.$broadcast('uncheckall');
    };

    //
    // itemToInvert can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.invertCheckItem(357) //357 is a id value or
    //  treeviewEl.api.invertCheckItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
    //
    vm.invertCheckItem = function (scope, itemToInvert) {
      scope.$broadcast('invertcheckitem');
    };

    //
    vm.invertAllChecks = function (scope, children) {
      scope.$broadcast('invertallchecks');
    };

    //
    // return only the last level
    // items array optional param
    //
    vm.getCheckedIds = function (scope, items) {
      var checkedItems = vm.getCheckedItems(scope, items);
      var checkedIds = [];
      angular.forEach(checkedItems, function (checkedItem) {
        checkedIds.push(checkedItem.id);
      });
      return checkedIds;
    };

    //
    vm.getSelectedItem = function (scope) {
      return scope.ctrl.selectedItem;
    };

    //
    // folderToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.findFolder(456) //456 is a id value or
    //  treeviewEl.api.findFolder({name: 'Brazil'}) //it will searches for the first folder that match the passed data and leaf is not true
    //
    vm.findFolder = function (scope, folderToFind) {
      var dataToFind = _normalizeDataToFind(folderToFind);
      var keys = Object.keys(dataToFind);
      var node = _findNode(scope.ctrl.rootItem.children, dataToFind, keys);
      if (!node) {
        throw new Error('Folder not found!');
      } else {
        return node;
      }
    };

    //
    // itemToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.findItem(357) //357 is a id value or
    //  treeviewEl.api.findItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
    //
    vm.findItem = function (scope, itemToFind) {
      var dataToFind = _normalizeDataToFind(itemToFind);
      dataToFind['isLeaf'] = true;
      var keys = Object.keys(dataToFind);
      var node = _findNode(scope.ctrl.rootItem.children, dataToFind, keys);
      if (!node) {
        throw new Error('Item not found!');
      } else {
        return node;
      }
    };

    //
    // folderToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.selectFolder(456) //456 is a id value or
    //  treeviewEl.api.selectFolder({name: 'Brazil'}) //it will searches for the first folder that match the passed data and leaf is not true
    //
    vm.selectFolder = function (scope, folderToFind) {
      var folder = vm.findFolder(scope, folderToFind);
      _selectNode(scope, folder);
    };

    //
    // itemToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.selectItem(357) //357 is a id value or
    //  treeviewEl.api.selectItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
    //
    vm.selectItem = function (scope, itemToFind) {
      var item = vm.findItem(scope, itemToFind);
      _selectNode(scope, item);
    };

    //
    function _selectNode(scope, node) {
      //node.expanded = true;
      //console.log(node);
      var parentNodes = _getParentNodes(scope, node);
      angular.forEach(parentNodes, function (parent) {
        if (!parent.expanded) {
          parent.expanded = true;
        }
      });
      scope.ctrl.selectedItem = node;
      scope.$broadcast('scrollintoview', node);

      //if (scope.$$phase) {
      //scope.$apply();
      //}
    }

    //
    /*
    function _getParentNodes(scope, node) {
      let parents = [];
      let currentNode = node;
      while (true) {
        currentNode = currentNode.parent;
        if (angular.isDefined(currentNode)) {
          if ((currentNode.root) && (!scope.showRoot)) {
            break;
          } else {
            parents.push(currentNode);
          }
        } else {
          break;
        }
      }
      return parents;
    }
    */
    //
    function _getParentNodes(scope, node) {
      var parents = [];
      var currentNode = node;
      while (true) {
        currentNode = _getParentNode(scope, currentNode);
        if (angular.isDefined(currentNode)) {
          if (currentNode.root && !scope.showRoot) {
            break;
          } else {
            parents.push(currentNode);
          }
        } else {
          break;
        }
      }
      return parents;
    }

    //
    function _getParentNode(scope, node) {
      if (node.parent === scope.ctrl.rootItem.id) {
        if (scope.ctrl.showRoot) {
          return scope.ctrl.rootItem;
        } else {
          return undefined;
        }
      } else {
        var parentNode = vm.findFolder(scope, node.parent);
        return parentNode;
      }
    }

    //
    function _findNode(children, dataToFind, keys) {
      for (var index = 0; index < children.length; index++) {
        var child = children[index];
        var allFieldsAreEqual = true;

        for (var index2 = 0; index2 < keys.length; index2++) {
          var key = keys[index2];

          if (child[key] !== dataToFind[key]) {
            allFieldsAreEqual = false;
          }
        }

        if (allFieldsAreEqual) {
          if (child.isLeaf === dataToFind.isLeaf) {
            return child;
          }
        }

        if (child.children) {
          var searchInChildren = _findNode(child.children, dataToFind, keys);
          if (searchInChildren) {
            return searchInChildren;
          }
        }
      }
    }

    //
    function _normalizeDataToFind(dataToFind) {
      var normalizedData = {};
      if (typeof dataToFind === 'number') {
        normalizedData['id'] = dataToFind;
      } else if (typeof dataToFind === 'string') {
        normalizedData['id'] = parseInt(dataToFind);
      } else if ((typeof dataToFind === 'undefined' ? 'undefined' : _typeof(dataToFind)) === 'object') {
        normalizedData = dataToFind;
      } else {
        throw new Error('Parameter set in a wrong way.');
      }
      return normalizedData;
    }

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

  angular.module('uiDeniTreeview').service('uiDeniTreeviewApiService', uiDeniTreeviewApiService);

  function uiDeniTreeviewApiService() {

    var vm = this;

    //
    function _getApi(scope, uiDeniTreeviewService) {

      return {

        //
        checkAll: function checkAll() {
          return uiDeniTreeviewService.checkAll(scope);
        },

        //
        // itemToCheck can be passed as a "id" or as a "object" ex:
        //
        //  treeviewEl.api.checkItem(357) //357 is a id value or
        //  treeviewEl.api.checkItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
        //
        checkItem: function checkItem(itemToCheck) {
          return uiDeniTreeviewService.checkItem(scope, itemToCheck);
        },

        //
        // folderToFind can be passed as a "id" or as a "object" ex:
        //
        //  treeviewEl.api.findFolder(456) //456 is a id value or
        //  treeviewEl.api.findFolder({name: 'Brazil'}) //it will searches for the first folder that match the passed data and leaf is not true
        //
        findFolder: function findFolder(folderToFind) {
          return uiDeniTreeviewService.findFolder(scope, folderToFind);
        },

        //
        // itemToFind can be passed as a "id" or as a "object" ex:
        //
        //  treeviewEl.api.findItem(357) //357 is a id value or
        //  treeviewEl.api.findItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
        //
        findItem: function findItem(itemToFind) {
          return uiDeniTreeviewService.findItem(scope, itemToFind);
        },

        //
        getCheckedIds: function getCheckedIds() {
          return uiDeniTreeviewService.getCheckedIds(scope);
        },

        //
        getCheckedItems: function getCheckedItems() {
          return uiDeniTreeviewService.getCheckedItems(scope);
        },

        //
        getSelectedItem: function getSelectedItem() {
          return uiDeniTreeviewService.getSelectedItem(scope);
        },

        //
        invertAllChecks: function invertAllChecks() {
          return uiDeniTreeviewService.invertAllChecks(scope);
        },

        //
        // itemToInvert can be passed as a "id" or as a "object" ex:
        //
        //  treeviewEl.api.invertCheckItem(357) //357 is a id value or
        //  treeviewEl.api.invertCheckItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
        //
        invertCheckItem: function invertCheckItem(itemToInvert) {
          return uiDeniTreeviewService.invertCheckItem(scope, itemToInvert);
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
        },

        //
        uncheckAll: function uncheckAll() {
          return uiDeniTreeviewService.uncheckAll(scope);
        },

        //
        // folderToFind can be passed as a "id" or as a "object" ex:
        //
        //  treeviewEl.api.selectFolder(456) //456 is a id value or
        //  treeviewEl.api.selectFolder({name: 'Brazil'}) //it will searches for the first folder that match the passed data and leaf is not true
        //
        selectFolder: function selectFolder(folderToFind) {
          uiDeniTreeviewService.selectFolder(scope, folderToFind);
        },

        //
        // itemToFind can be passed as a "id" or as a "object" ex:
        //
        //  treeviewEl.api.selectItem(357) //357 is a id value or
        //  treeviewEl.api.selectItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
        //
        selectItem: function selectItem(itemToFind) {
          uiDeniTreeviewService.selectItem(scope, itemToFind);
        },

        //
        // itemToUncheck can be passed as a "id" or as a "object" ex:
        //
        //  treeviewEl.api.uncheckItem(357) //357 is a id value or
        //  treeviewEl.api.uncheckItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
        //
        uncheckItem: function uncheckItem(itemToUncheck) {
          return uiDeniTreeviewService.uncheckItem(scope, itemToUncheck);
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

  angular.module('uiDeniTreeview').service('uiDeniTreeviewItemEventsService', uiDeniTreeviewItemEventsService);

  uiDeniTreeviewItemEventsService.$inject = ['$timeout', 'uiDeniTreeviewItemService', 'uiDeniTreeviewEnum'];

  function uiDeniTreeviewItemEventsService($timeout, uiDeniTreeviewItemService, uiDeniTreeviewEnum) {

    var vm = this;

    //
    vm.implementEvents = function (scope) {

      //
      scope.$on('scrollintoview', function (event, itemToView) {
        //scrollIntoView
        if (scope.ctrl.item === itemToView) {
          console.log(itemToView);

          $timeout(function () {
            scope.ctrl.element.get(0).scrollIntoView(false);
          });
        }
      });

      //
      scope.$on('checkitem', function (event, itemToCheck) {
        if (scope.ctrl.item.isLeaf && scope.ctrl.item === itemToCheck) {
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
        if (scope.ctrl.item.isLeaf && scope.ctrl.item === itemToUncheck) {
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
        if (scope.ctrl.item.isLeaf && scope.ctrl.item === itemToInvert) {
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
    };
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
      scope.ctrl.item.parent = scope.ctrl.parent.id;

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
      item.expanded = !item.expanded;
    };

    //
    vm.checkboxClick = function (scope, item) {
      if (vm.isChecked(item)) {
        vm.uncheckNode(scope, item);
      } else {
        vm.checkNode(scope, item);
      }

      //
      scope.$emit('oncheck', item);
    };

    //
    vm.checkNode = function (scope, item) {
      item.state = uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED;
      _refreshCheckboxStateChildren(item);
      vm.refreshCheckboxStateParents(scope.ctrl);
    };

    //
    vm.uncheckNode = function (scope, item) {
      item.state = uiDeniTreeviewEnum.CHECKBOX_STATE.UNCHECKED;
      _refreshCheckboxStateChildren(item);
      vm.refreshCheckboxStateParents(scope.ctrl);
    };

    //
    vm.invertCheckNode = function (scope, item) {
      vm.invertStateItem(item);
      _refreshCheckboxStateChildren(item);
      vm.refreshCheckboxStateParents(scope.ctrl);
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
        if (target.is('.icon-and-text') || target.is('.icon') || target.is('.text-inner') || target.is('.text')) {
          finishRoutine();
        }
      }
    };

    vm.itemDoubleClick = function (treeview, scope, item) {
      vm.expandButtonClick(scope, item);
    };

    vm.isSelected = function (treeviewController, item) {
      return angular.equals(treeviewController.selectedItem, item);
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
    vm.expandItem = function (scope, item) {
      //let expanded = !item.expanded;

      if (item.expanded) {
        (function () {
          scope.ctrl.loading = true;

          var finishExpandRoutine = function finishExpandRoutine() {
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
              scope.$parent.ctrl.element.api.load(item).then(function (dataLoaded) {
                finishExpandRoutine();
              });
            }
          } else {
            finishExpandRoutine();
          }
        })();
      } else {
        //item.expanded = expanded;
        _setChildrenVisibility(item.children, false, true);
      }
    };

    //
    vm.refreshCheckboxStateParents = function (controller) {
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

        vm.refreshCheckboxStateParents(controller.parent.ctrl);
      }
    };

    //
    vm.invertStateItem = function (item) {
      if (vm.isChecked(item)) {
        item.state = uiDeniTreeviewEnum.CHECKBOX_STATE.UNCHECKED;
      } else {
        item.state = uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED;
      }
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
    function _refreshCheckboxStateChildren(item) {
      if (item.children) {
        angular.forEach(item.children, function (child) {
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
      link: function link(scope, element, attr) {

        //
        scope.ctrl.element = angular.element(element);

        //
        uiDeniTreeviewItemService.setDefaultValues(scope, element);

        //
        uiDeniTreeviewItemEventsService.implementEvents(scope);

        //
        scope.$watch('ctrl.item.expanded', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            uiDeniTreeviewItemService.expandItem(scope, scope.ctrl.item);
            scope.$emit('onexpand', scope.ctrl.item);
          }
        });
      }
    };
  }
})();