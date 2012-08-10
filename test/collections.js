new BrowserDb({
  db:"collectionsDb1",
  collections:["one", "two", "three"]
}, function (error, browserDb) {
  module("Collections");
  asyncTest("Collection APIs must be exposed in db instance", function () {
    ok(browserDb.one, "browserDb.one must exist");
    ok(browserDb.two, "browserDb.two must exist");
    ok(browserDb.three, "browserDb.three must exist");
	start();
  });

  QUnit.done(function(){
	browserDb.delete();
  });
});