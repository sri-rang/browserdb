new BrowserDb({
  db:"collectionsDb",
  collections:["one", "two", "three"]
}, function (error, browserDb) {

  module("Collections");

  asyncTest("Collection APIs must be exposed in db instance", 3, function () {
    ok(browserDb.one, "browserDb.one must exist");
    ok(browserDb.two, "browserDb.two must exist");
    ok(browserDb.three, "browserDb.three must exist");
    start();
  });

  QUnit.done(function () {
    browserDb.delete();
  });
});