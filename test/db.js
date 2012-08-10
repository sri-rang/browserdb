new BrowserDb({
  db:"db",
  collections:["one", "two", "three"]
}, function (error, browserDb) {
  module("Browser DB Open tests");
  asyncTest("No errors connecting to browserDb", function () {
    ok(typeof error === "undefined", "Error is undefined, so this works");
	start();
  });

  asyncTest("Db created", function () {
    ok(browserDb, "browserDb is defined");
	start();
  });

  QUnit.done(function(){
  	browserDb.delete();
  });
});

