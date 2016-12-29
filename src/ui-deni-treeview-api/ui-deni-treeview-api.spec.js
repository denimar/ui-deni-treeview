var uiDeniTreeviewApiMock = new require('./ui-deni-treeview-api.mock');

describe('ui-deni-treeview API', function() {

  beforeEach(function() {
    browser.get('http://localhost:3001/examples/basic/api-usage/index.html');
  });

  it('should test (checkItem, getCheckedIds)', function() {
    element(by.id('btnCheckUnitedStates')).click();
    element(by.id('btnCheckedIds')).click();
    element(by.id('memResults')).getAttribute("value")
      .then(function(val) {
        var json = JSON.parse(val);

        expect(json.length).toEqual(1);
        expect(json).toEqual([233]);
      });
  });

  it('should test (checkItem, getCheckedItems)', function() {
    element(by.id('btnCheckUnitedStates')).click();
    element(by.id('btnCheckedItems')).click();
    element(by.id('memResults')).getAttribute("value")
      .then(function(val) {
        var json = JSON.parse(val);

        expect(json.length).toEqual(1);
        expect(json[0].id).toEqual(233);
        expect(json[0].text).toEqual('United States');
      });
  });

  it('should test (checkAll, getCheckedIds)', function() {
    element(by.id('btnCheckAll')).click();
    element(by.id('btnCheckedIds')).click();
    element(by.id('memResults')).getAttribute("value")
      .then(function(val) {
        var json = JSON.parse(val);

        expect(json.length).toEqual(uiDeniTreeviewApiMock.allItems.length);
        expect(json).toEqual(uiDeniTreeviewApiMock.allItems);
      });
  });

  it('should test (checkAll, getCheckedItems)', function() {
    element(by.id('btnCheckAll')).click();
    element(by.id('btnCheckedItems')).click();
    element(by.id('memResults')).getAttribute("value")
      .then(function(val) {
        var json = JSON.parse(val);

        expect(json.length).toEqual(uiDeniTreeviewApiMock.allItems.length);
      });
  });

  it('should test (checkAll, uncheckAll)', function() {
    element(by.id('btnCheckAll')).click();
    element(by.id('btnCheckedItems')).click();
    element(by.id('memResults')).getAttribute("value")
      .then(function(val) {
        var json = JSON.parse(val);

        expect(json.length).toEqual(uiDeniTreeviewApiMock.allItems.length);
      });
      element(by.id('btnUncheckAll')).click();
      element(by.id('btnCheckedItems')).click();
      element(by.id('memResults')).getAttribute("value")
        .then(function(val) {
          var json = JSON.parse(val);

          expect(json.length).toEqual(0);
        });
  });

  it('should test (checkItem, invertAllChecks)', function() {
    element(by.id('btnCheckUnitedStates')).click();
    element(by.id('btnInvertAllChecks')).click();
    element(by.id('btnCheckedIds')).click();
    element(by.id('memResults')).getAttribute("value")
      .then(function(val) {
        var json = JSON.parse(val);

        expect(json.length).toEqual(uiDeniTreeviewApiMock.allItems.length - 1);
      });
  });

  it('should select a folder and get its values (selectFolder, getSelectItem)', function() {
    element(by.id('btnSelectAfrica')).click();
    element(by.id('btnGetSelectedItem')).click();

    element(by.id('memResults')).getAttribute("value")
      .then(function(val) {
        var json = JSON.parse(val);

        expect(json.children.length).toEqual(58);
        expect(4).toEqual(json.id);
        expect('Africa').toEqual(json.text);
        expect(false).toEqual(json.expanded);
        expect(-1).toEqual(json.parent);
      });
  });

  it('should select a item and get its values (selectItem, getSelectItem)', function() {
    element(by.id('btnSelectBrazil')).click();
    element(by.id('btnGetSelectedItem')).click();

    var memo = element(by.id('memResults'));
    memo.getAttribute("value")
      .then(function(val) {
        var json = JSON.parse(val);

        expect(json.isLeaf).toEqual(true);
        expect(31).toEqual(json.id);
        expect('Brazil').toEqual(json.text);
        expect(false).toEqual(json.expanded);
        expect(6).toEqual(json.parent);
      });
  });

});
