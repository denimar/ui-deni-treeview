(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .directive('uiDeniTreeview', uiDeniTreeview);

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
      link: function(scope, element, attr) {

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
      controller.rootItem = angular.merge(uiDeniTreeviewConstant.ROOT_ITEM,  controller.items);
    }
  }

})();
