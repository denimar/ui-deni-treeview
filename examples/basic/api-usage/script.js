(function() {

  'use strict'

  angular
    .module('exampleApp',
      ['uiDeniTreeview']
    )
    .controller('exampleController', exampleController);

  function exampleController() {

    //
    this.reload = function() {
      _getApi().reload().then(function(data) {
        _setResult('data reloaded successfully : ' + data.length + ' items.');
      })
    };

    //
    this.selectAfrica = function() {
      _getApi().selectFolder({text: 'Africa'});
    };

    //
    this.selectBrazil = function() {
      _getApi().selectItem({text: 'Brazil'});
    };

    //
    this.getSelectedItem = function() {
      var selectedItem = _getApi().getSelectedItem();
      if (selectedItem) {
        _setResult(JSON.stringify(selectedItem, null, 2));
      } else {
        _setResult('No items selected');
      }
    };

    //
    this.getCheckedItems = function() {
      var checkedItems = _getApi().getCheckedItems();
      if (checkedItems) {
        _setResult(JSON.stringify(checkedItems, null, 2));
      } else {
        _setResult('No items selected');
      }
    }

    //
    this.getCheckedIds = function() {
      var checkedIds = _getApi().getCheckedIds();
      if (checkedIds) {
        _setResult(JSON.stringify(checkedIds, null, 2));
      } else {
        _setResult('No items selected');
      }
    }

    //
    this.checkAll = function() {
      _getApi().checkAll();
    }

    //
    this.checkUnitedStates = function() {
      _getApi().checkItem({text: 'United States'});
    }

    //
    this.uncheckAll = function() {
      _getApi().uncheckAll();
    }

    //
    this.invertAllChecks = function() {
      _getApi().invertAllChecks();
    }

    ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////

    function _getApi() {
      return angular.element('.myTreeview').api;
    }

    function _setResult(result) {
      var textarea = angular.element('textarea');
      textarea.val(result);
    }

  };

})();
