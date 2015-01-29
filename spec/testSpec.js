describe("Define", function () {
  it("can have no deps", function () {
    define('bar', function () {
      return 'abc';
    });
    require(['bar'], function (bar) {
      expect(bar).toEqual('abc');
    });
  });

  it("can have deps", function () {
    define('bar', function () {
      return 'abc';
    });
    define('baz', ['bar'], function (bar) {
      return bar + 'def';
    });
    require(['baz'], function (baz) {
      expect(baz).toEqual('abcdef');
    });
  });

  it("can have multiple deps", function () {
    var anotherOne = {
      a: 'b',
      c: 'd'
    };
    define('bar', function () {
      return 'abc';
    });
    define('another', function () {
      return anotherOne;
    });
    define('baz', ['bar'], function (bar) {
      return bar + 'def';
    });
    require(['baz', 'another'], function (baz, another) {
      expect(another).toEqual(anotherOne);
      expect(baz).toEqual('abcdef');
    });
  });

  it("will only call once", function () {
    var barSpy = jasmine.createSpy('dependency');

    define('bar', barSpy);
    define('baz', ['bar'], function (bar) {
    });
    define('boz', ['bar'], function (bar) {
    });
    require(['baz', 'bar'], function (baz, bar) {
    });
    require(['boz'], function (baz) {
    });

    expect(barSpy).toHaveBeenCalled();

    expect(barSpy.calls.count()).toEqual(1);
  });

  it ('takes only string deps', function() {
    expect(function(){
      define('foo', ['ok',{'not':'ok'}], function() {});
    }).toThrow();
    expect(function(){
      define('foo', ['ok',''], function() {});
    }).toThrow();
  });

  it("can be given non-function dep", function () {
    define('baz', 'foobar');
    var testVal = 'wrong';
    require(['baz'], function (baz) {
      testVal = baz;
    });

    expect(testVal).toEqual('foobar');
  });

});
