new BrowserDb({
  db:"db",
  collections:["one", "two", "three"]
}, function (error, browserDb) {

  module("DB");

  asyncTest("No errors connecting to browserDb", 1, function () {
    ok(typeof error === "undefined", "Error is undefined, so this works");
    start();
  });

  asyncTest("Db created", 1, function () {
    ok(browserDb, "browserDb is defined");
    start();
  });

  QUnit.done(function () {
    browserDb.delete();
  });
});

