(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .service('uiDeniTreeviewService', uiDeniTreeviewService);

  uiDeniTreeviewService.$inject = ['$http', '$q', 'uiDeniTreeviewEnum', 'uiDeniTreeviewApiService', 'uiDeniTreeviewConstant'];

  function uiDeniTreeviewService($http, $q, uiDeniTreeviewEnum, uiDeniTreeviewApiService, uiDeniTreeviewConstant) {

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

      let config = {};

      let currentItem = item || scope.ctrl.rootItem;
      let itemToLoad = angular.copy(currentItem);

      //
      if (scope.ctrl.url) {
        let dataConfig = {
          params: {
            lazyLoad: scope.ctrl.lazyLoad,
            item: itemToLoad
          }
        };

        $http.get(scope.ctrl.url, dataConfig).then(function(response) {
          _loadData(scope.ctrl, uiDeniTreeviewConstant, response.data, item);
          deferred.resolve(response.data);
        }, function(response) {
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
      vm.load(scope);
    };

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

    //
    vm.getSelectedItem = function(scope) {
      return scope.ctrl.selectedItem;
    };

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
