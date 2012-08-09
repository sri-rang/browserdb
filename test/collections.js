new BrowserDb({
  db:"collectionsDb",
  collections:["one", "two", "three"]
}, function (error, browserDb) {

  test("Collection APIs must be exposed in db instance", function () {
    ok(browserDb.one, "browserDb.one must exist");
    ok(browserDb.two, "browserDb.two must exist");
    ok(browserDb.three, "browserDb.three must exist");
  });

  setTimeout(browserDb.delete, 500);

});