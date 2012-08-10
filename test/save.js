new BrowserDb({
  db:"saveDb",
  collections:["one", "two", "three"]
}, function (error, browserDb) {

  module("Save");

  asyncTest("Save an object", 3, function () {
    browserDb.one.save({
      name:"Sri"
    }, function (error, savedObject) {
      ok(savedObject, "savedObject must be created");
      deepEqual(savedObject.name, "Sri", "savedObject.name === 'Sri'");
      ok(savedObject._id, "savedObject._id must be auto generated");
      start();
    });
  });

  asyncTest("Save an object with manual _id", 1, function () {
    browserDb.two.save({
      _id:"wtf",
      name:"Sri"
    }, function (error, savedObject) {
      deepEqual(savedObject._id, "wtf", "savedObject._id === 'wtf'");
      start();
    });
  });

  asyncTest("Update an object", 1, function () {
    browserDb.two.save({
      _id:"wtf",
      name:"Srirangan"
    }, function (error, savedObject) {
      deepEqual(savedObject.name, "Srirangan", "savedObject.name === 'Srirangan'");
      start();
    });
  });

  QUnit.done(function () {
    browserDb.delete();
  });

});