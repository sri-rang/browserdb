new BrowserDb({
  db:"testDB",
  collections:[]
}, function (error, testDb) {

  test("No errors connecting to db", function () {
    ok(!error, "Error must be undefined")
  });

  test("Db instance created", function () {
    ok(testDb, "testDb instance")
  });

});