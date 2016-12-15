(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .service('uiDeniTreeviewEventsService', uiDeniTreeviewEventsService);

  function uiDeniTreeviewEventsService() {

    let vm = this;

    //
    vm.implementEvents = function(scope) {

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
