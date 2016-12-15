(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .constant('uiDeniTreeviewConstant', {

      ROOT_ITEM: {
        id: -1,
        text: 'root',
        expanded: true,
        root: true
      }

    });

})();
