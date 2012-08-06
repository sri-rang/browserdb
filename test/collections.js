new BrowserDb({
  db:"testDB",
  collections:["one", "two", "three"]
}, function (error, testDb) {

  test("Collection APIs must be exposed in db instance", function () {
    ok(testDb.one, "testDb.one must exist");
    ok(testDb.two, "testDb.two must exist");
    ok(testDb.three, "testDb.three must exist");
  });

});