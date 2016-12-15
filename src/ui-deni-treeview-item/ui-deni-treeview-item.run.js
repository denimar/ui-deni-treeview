(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .run(uiDeniTreeviewItemRun);

  uiDeniTreeviewItemRun.$inject = ['$templateCache'];

  function uiDeniTreeviewItemRun($templateCache) {

    //ui-deni-treeview-item's template
    $templateCache.put('ui-deni-treeview-item.view.html',
      // '<div class="ui-deni-treeview-item-container ng-hide"  ng-show="!ctrl.item.hidden" ng-class="{ctr.theme, \'selected\' : ($parent.ctrl.selectRow && ctrl.isSelected($parent.ctrl, ctrl.item))}" ng-mousedown="ctrl.itemMousedown($parent.ctrl, this, ctrl.item)">\n' +
      '<div class="ui-deni-treeview-item-container ng-hide"  ng-show="!ctrl.item.hidden" ng-class="ctrl.getNgClassItem($parent.ctrl, ctrl)" ng-mousedown="ctrl.itemMousedown($parent.ctrl, this, ctrl.item)">\n' +

      '  <div class="expand-button" ng-click="ctrl.expandButtonClick(this, ctrl.item)" ng-class="{\'hasChild\' : ctrl.hasChild, \'colapsed\' : !ctrl.item.expanded, \'expanded\' : ctrl.item.expanded, \'loading\' : ctrl.loading, \'selected\' : ctrl.isSelected($parent.ctrl, ctrl.item)}"></div>\n' +

      '  <div class="checkbox ng-hide" ng-click="ctrl.checkboxClick(this, ctrl.item)" ng-class="{\'checked\' : ctrl.isChecked(ctrl.item), \'selected\' : ctrl.isSelected($parent.ctrl, ctrl.item)}" ng-show="$parent.ctrl.checkbox">\n' +
      '    <div class="undetermined ng-hide" ng-show="ctrl.isUndetermined(ctrl.item)"></div>\n' +
      '  </div>\n' +

      '  <div class="icon-and-text" ng-class="{\'select-row\': $parent.ctrl.selectRow, \'selected\' : (!$parent.ctrl.selectRow && ctrl.isSelected($parent.ctrl, ctrl.item))}">\n' +
      '    <div class="icon ng-hide" ng-class="ctrl.getClassIcon(ctrl, ctrl.item)" ng-dblclick="ctrl.itemDoubleClick($parent.ctrl, this, ctrl.item)" ng-show="$parent.ctrl.showIcon"></div>\n' +
      '    <div class="text" ng-dblclick="ctrl.itemDoubleClick($parent.ctrl, this, ctrl.item)">\n' +
      '      <span class="text-inner unselectable" ng-bind="ctrl.item.text" unselectable="on"></span>\n' +
      '    </div>\n' +
      '  </div\n' +

      '</div>');

  }

})();
