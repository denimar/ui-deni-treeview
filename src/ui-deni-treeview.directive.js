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
      link: function(scope, element, attr) {

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
