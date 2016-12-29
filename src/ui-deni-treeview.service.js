(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .service('uiDeniTreeviewService', uiDeniTreeviewService);

  uiDeniTreeviewService.$inject = ['$http', '$q', '$timeout', 'uiDeniTreeviewEnum', 'uiDeniTreeviewApiService', 'uiDeniTreeviewConstant'];

  function uiDeniTreeviewService($http, $q, $timeout, uiDeniTreeviewEnum, uiDeniTreeviewApiService, uiDeniTreeviewConstant) {

    let vm = this;

    vm.setDefaultValues = function(controller, element, uiDeniTreeviewConstant) {

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
    vm.load = function(scope, item) {
      let deferred = $q.defer();

      let currentItem = item || scope.ctrl.rootItem;

      //
      if (scope.ctrl.url) {
        let itemToLoad = angular.copy(currentItem);
        let dataConfig = {
          params: {
            lazyLoad: scope.ctrl.lazyLoad,
            item: itemToLoad
          }
        };

        $http.get(scope.ctrl.url, dataConfig).then(function(response) {
          _loadData(scope.ctrl, uiDeniTreeviewConstant, response.data, item);
          deferred.resolve(response.data);
          $timeout(function() {
            scope.$emit('onload', response.data);
          });
        }, function() {
          let msg = 'Error loading data.';
          throw new Error(msg);
        });

      //
      } else if (scope.ctrl.lazyLoad) {
        delete currentItem['children'];
        let watchItems = scope.$watch('ctrl.rootItem', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            deferred.resolve(currentItem.children);
            watchItems(); //unregister the watch
          }
        }, true);
        scope.$emit('onload', currentItem);

      //
      } else {
        let msg = 'To use load function you must define lazyLoad:true or a valid url.';
        console.error(msg);
        deferred.reject(msg);
      }

      return deferred.promise;
    };

    vm.loadData = function(scope, data, item) {
      _loadData(scope.ctrl, uiDeniTreeviewConstant, data, item);
    };

    //
    vm.reload = function(scope) {
      return vm.load(scope);
    };

    //
    // return only the last level
    // items array optional param
    //
    vm.getCheckedItems = function(scope, children) {
      let checkedItems = [];
      let itemsToAnalyze = children || scope.ctrl.rootItem.children;

      angular.forEach(itemsToAnalyze, function(item) {

        if (item.isLeaf) {
          if (item.state === uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED) {
            checkedItems.push(item);
          }
        } else {
          //when is checked but not expanded must see who are its children
          if (angular.isDefined(item.state) && item.state !== uiDeniTreeviewEnum.CHECKBOX_STATE.UNCHECKED) {

            let itemChildren = item.children;
            if (!item.expanded && item.state === uiDeniTreeviewEnum.CHECKBOX_STATE.CHECKED) {
              let itemCopy = angular.copy(item);
              scope.$emit('onexpanditem', itemCopy);
              itemChildren = itemCopy.children;
              _refreshCheckboxStateChildren(itemCopy);
            }

            if (itemChildren) {
              let checkeds = vm.getCheckedItems(scope, itemChildren);
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
    vm.checkItem = function(scope, itemToCheck) {
      let item = vm.findItem(scope, itemToCheck);
      //
      scope.$broadcast('checkitem', item);
    };

    //
    vm.checkAll = function(scope) {
      scope.$broadcast('checkall');
    };

    //
    // itemToUncheck can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.uncheckItem(357) //357 is a id value or
    //  treeviewEl.api.uncheckItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
    //
    vm.uncheckItem = function(scope, itemToUncheck) {
      let item = vm.findItem(scope, itemToUncheck);
      //
      scope.$broadcast('uncheckitem', item);
    };

    //
    vm.uncheckAll = function(scope) {
      scope.$broadcast('uncheckall');
    };

    //
    // itemToInvert can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.invertCheckItem(357) //357 is a id value or
    //  treeviewEl.api.invertCheckItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
    //
    vm.invertCheckItem = function(scope, itemToInvert) {
      scope.$broadcast('invertcheckitem', itemToInvert);
    };

    //
    vm.invertAllChecks = function(scope) {
      scope.$broadcast('invertallchecks');
    };

    //
    // return only the last level
    // items array optional param
    //
    vm.getCheckedIds = function(scope, items) {
      let checkedItems = vm.getCheckedItems(scope, items);
      let checkedIds = [];
      angular.forEach(checkedItems, function(checkedItem) {
        checkedIds.push(checkedItem.id);
      });
      return checkedIds;
    };


    //
    vm.getSelectedItem = function(scope) {
      return scope.ctrl.selectedItem;
    };

    //
    // folderToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.findFolder(456) //456 is a id value or
    //  treeviewEl.api.findFolder({name: 'Brazil'}) //it will searches for the first folder that match the passed data and leaf is not true
    //
    vm.findFolder = function(scope, folderToFind) {
      let dataToFind = _normalizeDataToFind(folderToFind);
      let keys = Object.keys(dataToFind);
      let node = _findNode(scope.ctrl.rootItem.children, dataToFind, keys);
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
    vm.findItem = function(scope, itemToFind) {
      let dataToFind = _normalizeDataToFind(itemToFind);
      dataToFind['isLeaf'] = true;
      let keys = Object.keys(dataToFind);
      let node = _findNode(scope.ctrl.rootItem.children, dataToFind, keys);
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
    vm.selectFolder = function(scope, folderToFind) {
      let folder = vm.findFolder(scope, folderToFind);
      _selectNode(scope, folder);
    };

    //
    // itemToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.selectItem(357) //357 is a id value or
    //  treeviewEl.api.selectItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
    //
    vm.selectItem = function(scope, itemToFind) {
      let item = vm.findItem(scope, itemToFind);
      _selectNode(scope, item);
    };

    //
    function _selectNode(scope, node) {
      let parentNodes = _getParentNodes(scope, node);
      angular.forEach(parentNodes, function(parent) {
        if (!parent.expanded) {
          parent.expanded = true;
        }
      });
      scope.ctrl.selectedItem = node;
      scope.$broadcast('scrollintoview', node);
    }

    //
    function _getParentNodes(scope, node) {
      let parents = [];
      let currentNode = node;
      while (true) {
        currentNode = _getParentNode(scope, currentNode);
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
      for (let index = 0 ; index < children.length ; index++) {
        let child = children[index];
        let allFieldsAreEqual = true;

        for (let index2 = 0 ; index2 < keys.length ; index2++) {
          let key = keys[index2];

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
          let searchInChildren = _findNode(child.children, dataToFind, keys);
          if (searchInChildren) {
            return searchInChildren;
          }
        }
      }
      return null;
    }

    //
    function _normalizeDataToFind(dataToFind) {
      let normalizedData = {};
      if (typeof  dataToFind === 'number') {
        normalizedData['id'] = dataToFind;
      } else if (typeof  dataToFind === 'string') {
        normalizedData['id'] = parseInt(dataToFind);
      } else if (typeof  dataToFind === 'object') {
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
      let dataToLoad = data || [];

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
          controller.rootItem = angular.merge(uiDeniTreeviewConstant.ROOT_ITEM,  dataToLoad);
        }
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

  }

})();
