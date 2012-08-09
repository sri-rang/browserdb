new BrowserDb({
  db:"saveDb",
  collections:["one", "two", "three"]
}, function (error, browserDb) {


  browserDb.one.save({
    name:"Sri"
  }, function (error, savedObject) {
    test("Save an object", function () {
      ok(savedObject, "savedObject must be created");
      deepEqual(savedObject.name, "Sri", "savedObject.name === 'Sri'");
      ok(savedObject._id, "savedObject._id must be auto generated");
    });
  });

  browserDb.two.save({
    _id:"wtf",
    name:"Sri"
  }, function (error, savedObject) {
    test("Save an object with manual _id", function () {
      deepEqual(savedObject._id, "wtf", "savedObject._id === 'wtf'");
    });
  });

  browserDb.two.save({
    _id:"wtf",
    name:"Srirangan"
  }, function (error, savedObject) {
    test("Update an object", function () {
      deepEqual(savedObject.name, "Srirangan", "savedObject.name === 'Srirangan'");
    });
  });

  setTimeout(browserDb.delete, 500);

});