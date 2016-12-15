(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .controller('uiDeniTreeviewItemController', uiDeniTreeviewItemController);

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
