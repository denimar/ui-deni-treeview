(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .run(uiDeniTreeviewRun);

  uiDeniTreeviewRun.$inject = ['$templateCache'];

  function uiDeniTreeviewRun($templateCache) {

    //ui-deni-treeview's template
    $templateCache.put('ui-deni-treeview.view.html',
      '<div class="ui-deni-treeview-container" ng-class="ctrl.theme">\n' +
      '  <div>\n' +
      '    <ui-deni-treeview-item theme="{{ctrl.theme}}" item="ctrl.rootItem" level=0 ng-if="ctrl.showRoot"></ui-deni-treeview-item>\n' +
      '    <div ng-repeat="item1 in ctrl.rootItem.children">\n' +
      '      <ui-deni-treeview-item theme="{{ctrl.theme}}" parent="ctrl.rootItem" item="item1" level=1></ui-deni-treeview-item>\n' +
      '      <div class="ng-hide" ng-repeat="item2 in item1.children" ng-show="item1.expanded">\n' +
      '        <ui-deni-treeview-item theme="{{ctrl.theme}}" parent="item1" item="item2" level=2></ui-deni-treeview-item>\n' +
      '        <div class="ng-hide" ng-repeat="item3 in item2.children" ng-show="item2.expanded">\n' +
      '          <ui-deni-treeview-item theme="{{ctrl.theme}}" parent="item2" item="item3" level=3></ui-deni-treeview-item>\n' +
      '          <div class="ng-hide" ng-repeat="item4 in item3.children" ng-show="item3.expanded">\n' +
      '            <ui-deni-treeview-item theme="{{ctrl.theme}}" parent="item3" item="item4" level=4></ui-deni-treeview-item>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '      </div>\n' +
      '    </div>\n' +
      '  </div>\n' +
      '</div>');

    }

})();
