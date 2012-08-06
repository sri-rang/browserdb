new BrowserDb({
  db:"db",
  collections:["one", "two", "three"]
}, function (error, browserDb) {

  test("No errors connecting to browserDb", function () {
    ok(!error, "Error must be undefined")
  });

  test("Db created", function () {
    ok(browserDb, "browserDb")
  });

});

